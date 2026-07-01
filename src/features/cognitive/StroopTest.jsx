import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../../utils/i18n'

// ─── constants ────────────────────────────────────────────────────────────────
const WORDS = ['RED', 'BLUE', 'GREEN', 'GOLD']
const COLOR_HEX = { RED: '#E74C3C', BLUE: '#3498DB', GREEN: '#2ECC71', GOLD: '#C9A84C' }
const TOTAL_ROUNDS = 10
const RING_DURATION = 2000  // ms — how long the full ring depletion takes (purely visual)
const RING_SIZE = 220       // canvas CSS px (square)

// ─── helpers ──────────────────────────────────────────────────────────────────
function pickRound() {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  const otherColors = WORDS.filter((c) => c !== word)
  const color = otherColors[Math.floor(Math.random() * otherColors.length)]
  return { word, color }
}

function getProcessingAgeOffset(avgMs) {
  if (avgMs < 500) return { offset: -8, labelKey: 'btAgeYounger8' }
  if (avgMs <= 800) return { offset: 0, labelKey: 'btAgeMatchesYours' }
  return { offset: 5, labelKey: 'btAgeAbove5' }
}

// Resolves a CSS custom property to a literal string canvas can use.
function getCssVar(name) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// ─── icon ─────────────────────────────────────────────────────────────────────
function FocusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
export default function StroopTest({ ageYears, onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [roundIndex, setRoundIndex] = useState(0)
  const [current, setCurrent] = useState(null)
  const [results, setResults] = useState([])
  const [finalStats, setFinalStats] = useState(null)
  const [pressedColor, setPressedColor] = useState(null) // for button press animation
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null — drives ring glow + shake
  const [wordKey, setWordKey] = useState(0)       // increments each round to re-trigger word entrance CSS animation

  const startRef = useRef(0)         // performance.now() when current round started
  const ringStartRef = useRef(0)     // performance.now() when ring animation started
  const rafRef = useRef(null)
  const feedbackRef = useRef(null) 
  const canvasRef = useRef(null)

  // ── ring draw loop ──────────────────────────────────────────────────────────
  const drawRing = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const size = RING_SIZE
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const cx = size / 2
    const cy = size / 2
    const outerR = size / 2 - 8   // outer radius of ring
    const innerR = outerR - 7     // ring thickness = 7px

    const elapsed = performance.now() - ringStartRef.current
    const progress = Math.min(elapsed / RING_DURATION, 1) // 0 → 1

    // ── track (background ring, always full circle) ──
    const trackColor = getCssVar('--surface2') || '#222'
    ctx.beginPath()
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
    ctx.arc(cx, cy, innerR, Math.PI * 2, 0, true) // inner arc counterclockwise = annular clip
    ctx.fillStyle = trackColor
    ctx.fill()

    // ── depleting arc (from top, clockwise, shrinks as time passes) ──
    // progress=0 → full arc (2π), progress=1 → empty
    const startAngle = -Math.PI / 2                         // 12 o'clock
    const endAngle = startAngle + (1 - progress) * Math.PI * 2

if (progress < 1) {
      const isCorrect = feedbackRef.current === 'correct'
      const isWrong = feedbackRef.current === 'wrong'

      // arc color: green glow on correct, red on wrong, normal gradient otherwise
      let arcColor1, arcColor2
      if (isCorrect) {
        arcColor1 = '#2ECC71'
        arcColor2 = '#27ae60'
      } else if (isWrong) {
        arcColor1 = '#E74C3C'
        arcColor2 = '#c0392b'
      } else {
        arcColor1 = getCssVar('--crimson2') || '#ef4444'
        arcColor2 = getCssVar('--gold') || '#d4af37'
      }

      const grad = ctx.createLinearGradient(0, 0, size, size)
      grad.addColorStop(0, arcColor1)
      grad.addColorStop(1, arcColor2)

      // glow shadow on feedback states
      if (isCorrect || isWrong) {
        ctx.shadowBlur = 18
        ctx.shadowColor = isCorrect ? 'rgba(46,204,113,0.6)' : 'rgba(231,76,60,0.6)'
      } else {
        ctx.shadowBlur = 0
        ctx.shadowColor = 'transparent'
      }

      ctx.beginPath()
      ctx.arc(cx, cy, outerR, startAngle, endAngle)
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.shadowBlur = 0
    }

    rafRef.current = requestAnimationFrame(drawRing)
  }, [])

  const startRing = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    ringStartRef.current = performance.now()
    rafRef.current = requestAnimationFrame(drawRing)
  }, [drawRing])

  const stopRing = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // ── canvas DPR setup ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.style.width = RING_SIZE + 'px'
    canvas.style.height = RING_SIZE + 'px'
    canvas.width = Math.round(RING_SIZE * dpr)
    canvas.height = Math.round(RING_SIZE * dpr)
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [phase]) // re-run when phase changes to 'playing' so canvas is mounted

  // ── cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => stopRing()
  }, [stopRing])

  // ── game logic ──────────────────────────────────────────────────────────────
  const startTest = () => {
    stopRing()
    setResults([])
    setRoundIndex(0)
    setFinalStats(null)
    setPressedColor(null)
    const round = pickRound()
    setCurrent(round)
    setWordKey((k) => k + 1)
    startRef.current = performance.now()
    setPhase('playing')
    // ring starts after state settles + canvas mounts (next frame)
    requestAnimationFrame(() => startRing())
  }

  const finishTest = useCallback((allResults) => {
    stopRing()
    const correctOnes = allResults.filter((r) => r.correct)
    const correctCount = correctOnes.length
    const avgMs = correctOnes.length > 0
      ? correctOnes.reduce((sum, r) => sum + r.time, 0) / correctOnes.length
      : 9999

    // ── scoring formula: unchanged from original ──
    const accuracyPoints = (correctCount / TOTAL_ROUNDS) * 70
    const speedPoints = Math.max(0, 30 - Math.floor(avgMs / 100))
    const focusScore = Math.min(100, Math.round(accuracyPoints + speedPoints))

    setFinalStats({ correctCount, avgMs, focusScore })
    setPhase('result')
    onComplete?.(focusScore)
  }, [stopRing, onComplete])

  const handleAnswer = useCallback((chosenColor) => {
    if (phase !== 'playing' || !current) return

    // visual press feedback — cleared after 150ms
    setPressedColor(chosenColor)
    setTimeout(() => setPressedColor(null), 150)

    const elapsed = performance.now() - startRef.current
    const correct = chosenColor === current.color
    const newResults = [...results, { correct, time: elapsed }]
    setResults(newResults)

    // set feedback state + ref (ref is read by drawRing rAF closure)
    const fb = correct ? 'correct' : 'wrong'
    feedbackRef.current = fb
    setFeedback(fb)
    setTimeout(() => {
      feedbackRef.current = null
      setFeedback(null)
    }, 200)

    if (newResults.length >= TOTAL_ROUNDS) {
      finishTest(newResults)
    } else {
      setRoundIndex((r) => r + 1)
      const next = pickRound()
      setCurrent(next)
      setWordKey((k) => k + 1)  // triggers word entrance animation
      startRef.current = performance.now()
      startRing()
    }
  }, [phase, current, results, finishTest, startRing])

  // ── derived values for result screen ───────────────────────────────────────
  const ageInfo = finalStats ? getProcessingAgeOffset(finalStats.avgMs) : null
  const estimatedAge = finalStats && typeof ageYears === 'number'
    ? Math.max(0, ageYears + ageInfo.offset)
    : null

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <>
    <style>{`
      @keyframes stroopResultIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes wordEntrance {
        from { opacity: 0; transform: scale(0.82) rotate(-3deg); }
        to   { opacity: 1; transform: scale(1) rotate(0deg); }
      }
      @keyframes ringShake {
        0%   { transform: translate(0, 0); }
        20%  { transform: translate(-5px, 2px); }
        40%  { transform: translate(5px, -2px); }
        60%  { transform: translate(-4px, 2px); }
        80%  { transform: translate(3px, -1px); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
    <section style={{
      background: 'var(--surface)',
      border: '1px solid var(--border2)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />

      <div style={{ padding: '36px 32px' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--crimson2)' }}>
          <FocusIcon />
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '20px', color: 'var(--text1)', letterSpacing: '-0.3px',
          }}>{t('btStroop')}</h3>
        </div>

        {/* ── intro phase ── */}
        {phase === 'intro' && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t('btStroopInstr')}
            </p>
            <button onClick={startTest} style={primaryButtonStyle}>{t('btStart')}</button>
          </div>
        )}

        {/* ── playing phase ── */}
        {phase === 'playing' && current && (
          <div style={{ position: 'relative' }}>
            {/* subtle background tint toward current round's correct color — low opacity, Stroop interference */}
            <div style={{
              position: 'absolute',
              inset: '-36px -32px',   // bleeds to section padding edges
              background: COLOR_HEX[current.color],
              opacity: 0.055,
              pointerEvents: 'none',
              transition: 'background 300ms ease',
              borderRadius: '0',
            }} />
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text3)', marginBottom: '20px', textTransform: 'uppercase',
            }}>{t('btStroopRound')} {roundIndex + 1} {t('btStroopOf')} {TOTAL_ROUNDS}</p>

            {/*
              Layout: canvas ring sits behind the word.
              We use position:relative on the container, the canvas is
              position:absolute filling it, and the word sits centered on top.
              This avoids canvas text rendering and keeps HTML text for
              accessibility, RTL support, and font loading correctness.
            */}
            <div style={{
              position: 'relative',
              width: RING_SIZE,
              height: RING_SIZE,
              margin: '0 auto 24px',
              animation: feedback === 'wrong' ? 'ringShake 150ms ease-out' : 'none',
            }}>
              {/* ring canvas — drawn behind the word */}
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: RING_SIZE,
                  height: RING_SIZE,
                }}
              />
              {/* word overlay — HTML text on top of canvas */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span
                  key={wordKey}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 6vw, 42px)',
                    color: COLOR_HEX[current.color],
                    letterSpacing: '2px',
                    userSelect: 'none',
                    display: 'inline-block', // required for transform to work on inline element
                    animation: 'wordEntrance 200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                  }}
                >
                  {current.word}
                </span>
              </div>
            </div>

            {/* answer buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {WORDS.map((c) => {
                const isPressed = pressedColor === c
                return (
                  <button
                    key={c}
                    onClick={() => handleAnswer(c)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 8px',
                      borderRadius: '10px',
                      border: '1px solid var(--border2)',
                      background: 'var(--surface2)',
                      cursor: 'pointer',
                      // press animation: scale down + slight brightness on tap
                      transform: isPressed ? 'scale(0.93)' : 'scale(1)',
                      filter: isPressed ? 'brightness(1.3)' : 'brightness(1)',
                      transition: isPressed ? 'none' : 'transform 150ms ease, filter 150ms ease',
                    }}
                  >
                    <span style={{
                      width: '22px', height: '22px',
                      borderRadius: '6px',
                      background: COLOR_HEX[c],
                      // swatch also pops slightly on press
                      transform: isPressed ? 'scale(1.15)' : 'scale(1)',
                      transition: isPressed ? 'none' : 'transform 150ms ease',
                      display: 'block',
                    }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text3)',
                      letterSpacing: '1px',
                    }}>{c}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── result phase ── */}
        {phase === 'result' && finalStats && (
          <div style={{ animation: 'stroopResultIn 350ms ease-out' }}>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 56px)', color: 'var(--crimson2)', letterSpacing: '-1px',
              }}>{finalStats.focusScore}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--text3)' }}>
                {t('btStroopFocus')}
              </span>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '4px' }}>
              {finalStats.correctCount}/{TOTAL_ROUNDS} {t('btStroopCorrect')} — {Math.round(finalStats.avgMs)}ms {t('btStroopAvg')}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
              {t('btStroopBrainAge')} {t(ageInfo.labelKey)}
              {estimatedAge !== null
                ? <span style={{ color: 'var(--gold2)' }}> — about {estimatedAge} years</span>
                : null}
            </p>

            <button onClick={startTest} style={secondaryButtonStyle}>{t('btTestAgain')}</button>
          </div>
        )}
      </div>
    </section>
    </>
  )
}

// ─── styles ───────────────────────────────────────────────────────────────────
const primaryButtonStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
  color: '#fff', background: 'var(--crimson2)', border: 'none', borderRadius: '10px',
  padding: '12px 24px', cursor: 'pointer',
}

const secondaryButtonStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
  color: 'var(--text1)', background: 'var(--surface2)', border: '1px solid var(--border2)',
  borderRadius: '10px', padding: '12px 24px', cursor: 'pointer',
}