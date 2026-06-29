import { useState, useRef } from 'react'
import { useTranslation } from '../../utils/i18n'

const WORDS = ['RED', 'BLUE', 'GREEN', 'GOLD']
const COLOR_HEX = { RED: '#E74C3C', BLUE: '#3498DB', GREEN: '#2ECC71', GOLD: '#C9A84C' }
const TOTAL_ROUNDS = 10

function FocusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

function pickRound() {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  const otherColors = WORDS.filter((c) => c !== word)
  const color = otherColors[Math.floor(Math.random() * otherColors.length)]
  return { word, color }
}

function getProcessingAgeOffset(avgMs) {
  if (avgMs < 500) return { offset: -8, label: '8 years younger than your age' }
  if (avgMs <= 800) return { offset: 0, label: 'matches your age' }
  return { offset: 5, label: '5 years above your age' }
}

export default function StroopTest({ ageYears, onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [roundIndex, setRoundIndex] = useState(0)
  const [current, setCurrent] = useState(null)
  const [results, setResults] = useState([])
  const [finalStats, setFinalStats] = useState(null)
  const startRef = useRef(0)

  const startTest = () => {
    setResults([])
    setRoundIndex(0)
    setFinalStats(null)
    setCurrent(pickRound())
    startRef.current = performance.now()
    setPhase('playing')
  }

  const finishTest = (allResults) => {
    const correctOnes = allResults.filter((r) => r.correct)
    const correctCount = correctOnes.length
    const avgMs = correctOnes.length > 0
      ? correctOnes.reduce((sum, r) => sum + r.time, 0) / correctOnes.length
      : 9999

    const accuracyPoints = (correctCount / TOTAL_ROUNDS) * 70
    const speedPoints = Math.max(0, 30 - Math.floor(avgMs / 100))
    const focusScore = Math.min(100, Math.round(accuracyPoints + speedPoints))

    setFinalStats({ correctCount, avgMs, focusScore })
    setPhase('result')
    onComplete?.(focusScore)
  }

  const handleAnswer = (chosenColor) => {
    if (phase !== 'playing' || !current) return
    const elapsed = performance.now() - startRef.current
    const correct = chosenColor === current.color
    const newResults = [...results, { correct, time: elapsed }]
    setResults(newResults)

    if (newResults.length >= TOTAL_ROUNDS) {
      finishTest(newResults)
    } else {
      setRoundIndex((r) => r + 1)
      setCurrent(pickRound())
      startRef.current = performance.now()
    }
  }

  const ageInfo = finalStats ? getProcessingAgeOffset(finalStats.avgMs) : null
  const estimatedAge = finalStats && typeof ageYears === 'number'
    ? Math.max(0, ageYears + ageInfo.offset)
    : null

  return (
    <section style={{
      background: 'var(--surface)',
      border: '1px solid var(--border2)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />

      <div style={{ padding: '36px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--crimson2)' }}>
          <FocusIcon />
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '20px', color: 'var(--text1)', letterSpacing: '-0.3px',
          }}>{t('btStroop')}</h3>
        </div>

        {phase === 'intro' && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t('btStroopInstr')}
            </p>
            <button onClick={startTest} style={primaryButtonStyle}>{t('btStart')}</button>
          </div>
        )}

        {phase === 'playing' && current && (
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text3)', marginBottom: '20px', textTransform: 'uppercase',
            }}>{t('btStroopRound')} {roundIndex + 1} {t('btStroopOf')} {TOTAL_ROUNDS}</p>

            <div style={{
              textAlign: 'center', padding: '40px 0', marginBottom: '24px',
              background: 'var(--surface2)', borderRadius: '14px',
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 'clamp(36px, 7vw, 56px)', color: COLOR_HEX[current.color], letterSpacing: '1px',
              }}>{current.word}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {WORDS.map((c) => (
                <button
                  key={c}
                  onClick={() => handleAnswer(c)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    padding: '14px 8px', borderRadius: '10px', border: '1px solid var(--border2)',
                    background: 'var(--surface2)', cursor: 'pointer',
                  }}
                >
                  <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: COLOR_HEX[c] }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--text3)', letterSpacing: '1px' }}>{c}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && finalStats && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 56px)', color: 'var(--crimson2)', letterSpacing: '-1px',
              }}>{finalStats.focusScore}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--text3)' }}>{t('btStroopFocus')}</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '4px' }}>
              {finalStats.correctCount}/{TOTAL_ROUNDS} correct, {Math.round(finalStats.avgMs)}ms avg on correct answers
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
              Brain processing age {ageInfo.label}
              {estimatedAge !== null ? <span style={{ color: 'var(--gold2)' }}> — about {estimatedAge} years</span> : null}
            </p>
            <button onClick={startTest} style={secondaryButtonStyle}>{t('btTestAgain')}</button>
          </div>
        )}
      </div>
    </section>
  )
}

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