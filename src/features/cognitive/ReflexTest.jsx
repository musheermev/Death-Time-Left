import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from '../../utils/i18n'

function LightningIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" />
    </svg>
  )
}

const TOTAL_ROUNDS = 10
const MIN_SPAWN_DELAY = 500   // delay before next node appears after a round resolves
const MAX_SPAWN_DELAY = 1500
const RING_LIFETIME = 1400    // ms the ring takes to fully expand (= time user has to react)
const NODE_RADIUS = 22        // px, hit-test radius of the node (logical px, DPR-independent)
const RING_MAX_RADIUS = 70    // px, how far the ring expands before it's "missed"
const RING_LIFETIME_MIN = 700   // fastest ring at high rounds
const BONUS_NODE_CHANCE = 0.35  // chance of a second bonus node spawning from round 5+

const CANVAS_CSS_SIZE = 500 // matches max-width, also used as logical coordinate space

export default function ReflexTest({ onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [round, setRound] = useState(0)
  const [results, setResults] = useState([]) // { hit: bool, ms: number|null }
  const [streak, setStreak] = useState(0)
  const [finalScore, setFinalScore] = useState(0)

  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const spawnTimeoutRef = useRef(null)

  const gameRef = useRef({
    nodeActive: false,
    nodeX: 0,
    nodeY: 0,
    nodeSpawnTime: 0,
    canvasSize: CANVAS_CSS_SIZE,
    roundsResolved: 0,
    resultsAcc: [],
    running: false,
    bonusNode: null, // { x, y, spawnTime } | null — extra optional target, doesn't affect round count
    particles: [],   // active particle burst effects
    shakeUntil: 0,   // timestamp until which screen-shake is active
    flashUntil: 0,   // timestamp until which red miss-flash is active
    streak: 0,
  })

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current)
    }
  }, [])

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const cssSize = Math.min(container.clientWidth, CANVAS_CSS_SIZE)
    const dpr = window.devicePixelRatio || 1

    canvas.style.width = cssSize + 'px'
    canvas.style.height = cssSize + 'px'
    canvas.width = Math.round(cssSize * dpr)
    canvas.height = Math.round(cssSize * dpr)

    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    gameRef.current.canvasSize = cssSize
  }, [])

  useEffect(() => {
    if (phase !== 'playing') return
    setupCanvas()
    const onResize = () => setupCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [phase, setupCanvas])

    const spawnBonusNode = useCallback(() => {
    const g = gameRef.current
    const size = g.canvasSize
    const margin = RING_MAX_RADIUS + 10
    g.bonusNode = {
      x: margin + Math.random() * (size - margin * 2),
      y: margin + Math.random() * (size - margin * 2),
      spawnTime: performance.now(),
    }
  }, [])

  const spawnNode = useCallback(() => {
    const g = gameRef.current
    const size = g.canvasSize
    const margin = RING_MAX_RADIUS + 10
    g.nodeX = margin + Math.random() * (size - margin * 2)
    g.nodeY = margin + Math.random() * (size - margin * 2)
    g.nodeSpawnTime = performance.now()
    g.nodeActive = true
    g.bonusNode = null

    // from round 5 onwards, occasionally spawn a bonus second node
    if (g.roundsResolved >= 4 && Math.random() < BONUS_NODE_CHANCE) {
      spawnBonusNode()
    }
  }, [spawnBonusNode])

  const currentRingLifetime = useCallback((roundIndex) => {
    // ramps down linearly from RING_LIFETIME to RING_LIFETIME_MIN across all rounds
    const t = Math.min(roundIndex / (TOTAL_ROUNDS - 1), 1)
    return RING_LIFETIME - t * (RING_LIFETIME - RING_LIFETIME_MIN)
  }, [])

  const spawnParticles = useCallback((x, y) => {
    const g = gameRef.current
    const count = 5 + Math.floor(Math.random() * 4) // 5-8 particles
    const now = performance.now()
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const speed = 60 + Math.random() * 60 // px/sec
      g.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        startTime: now,
        life: 500, // ms
      })
    }
  }, [])

  const finishGame = useCallback((finalResults) => {
    gameRef.current.running = false
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const hits = finalResults.filter((r) => r.hit)
    const hitCount = hits.length
    const accuracy = hitCount / finalResults.length
    const avgMs = hitCount > 0 ? hits.reduce((a, r) => a + r.ms, 0) / hitCount : RING_LIFETIME

    const accuracyScore = accuracy * 70
    const speedRatio = Math.max(0, Math.min(1, 1 - avgMs / RING_LIFETIME))
    const speedScore = speedRatio * 30
    const score = Math.round(accuracyScore + speedScore)

    setFinalScore(score)
    setPhase('result')
    onComplete?.(score)
  }, [onComplete])

  const resolveRound = useCallback((hit, ms) => {
    const g = gameRef.current
    g.nodeActive = false
    g.bonusNode = null
    g.resultsAcc = [...g.resultsAcc, { hit, ms }]
    g.roundsResolved += 1
    setResults(g.resultsAcc)
    setRound(g.roundsResolved)

    if (hit) {
      g.streak += 1
    } else {
      g.streak = 0
      const now = performance.now()
      g.flashUntil = now + 150
      g.shakeUntil = now + 150
    }
    setStreak(g.streak)

    if (g.roundsResolved >= TOTAL_ROUNDS) {
      finishGame(g.resultsAcc)
      return
    }

    const delay = MIN_SPAWN_DELAY + Math.random() * (MAX_SPAWN_DELAY - MIN_SPAWN_DELAY)
    spawnTimeoutRef.current = setTimeout(spawnNode, delay)
  }, [spawnNode, finishGame])

  const tick = useCallback(() => {
    const g = gameRef.current
    if (!g.running) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = g.canvasSize
    const now = performance.now()

    // screen-shake: small random offset while active, applied via ctx.translate
    const shaking = now < g.shakeUntil
    const shakeX = shaking ? (Math.random() - 0.5) * 6 : 0
    const shakeY = shaking ? (Math.random() - 0.5) * 6 : 0

    ctx.save()
    ctx.clearRect(0, 0, size, size)
    ctx.translate(shakeX, shakeY)

    // background, with subtle red flash overlay on recent miss
    ctx.fillStyle = getCssVar('--surface2') || '#111'
    ctx.fillRect(0, 0, size, size)
    if (now < g.flashUntil) {
      const flashProgress = 1 - (g.flashUntil - now) / 150 // 0 -> 1 over the flash window
      const flashOpacity = 0.18 * (1 - flashProgress)
      ctx.fillStyle = withAlpha(getCssVar('--crimson') || '#dc2626', flashOpacity)
      ctx.fillRect(0, 0, size, size)
    }

    const ringLifetime = currentRingLifetime(g.roundsResolved)

    // main node
    if (g.nodeActive) {
      const elapsed = now - g.nodeSpawnTime
      const progress = Math.min(elapsed / ringLifetime, 1)

      if (progress >= 1) {
        ctx.restore()
        resolveRound(false, null)
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const ringRadius = NODE_RADIUS + progress * (RING_MAX_RADIUS - NODE_RADIUS)
      const ringOpacity = 1 - progress

      ctx.beginPath()
      ctx.arc(g.nodeX, g.nodeY, ringRadius, 0, Math.PI * 2)
      ctx.strokeStyle = withAlpha(getCssVar('--crimson') || '#dc2626', ringOpacity)
      ctx.lineWidth = 2.5
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(g.nodeX, g.nodeY, NODE_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = getCssVar('--crimson2') || '#ef4444'
      ctx.fill()
    }

    // bonus node (optional second target, doesn't affect round count)
    if (g.bonusNode) {
      const elapsed = now - g.bonusNode.spawnTime
      const progress = Math.min(elapsed / ringLifetime, 1)
      if (progress >= 1) {
        g.bonusNode = null
      } else {
        const ringRadius = NODE_RADIUS + progress * (RING_MAX_RADIUS - NODE_RADIUS)
        const ringOpacity = 1 - progress

        ctx.beginPath()
        ctx.arc(g.bonusNode.x, g.bonusNode.y, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = withAlpha(getCssVar('--gold') || '#d4af37', ringOpacity)
        ctx.lineWidth = 2.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(g.bonusNode.x, g.bonusNode.y, NODE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = getCssVar('--gold2') || '#f4c430'
        ctx.fill()
      }
    }

    // particles
    if (g.particles.length > 0) {
      g.particles = g.particles.filter((p) => now - p.startTime < p.life)
      for (const p of g.particles) {
        const t = (now - p.startTime) / p.life // 0 -> 1
        const px = p.x + p.vx * (t * (p.life / 1000))
        const py = p.y + p.vy * (t * (p.life / 1000))
        const opacity = 1 - t
        const radius = 4 * (1 - t * 0.6)

        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fillStyle = withAlpha(getCssVar('--gold2') || '#f4c430', opacity)
        ctx.fill()
      }
    }

    ctx.restore()
    rafRef.current = requestAnimationFrame(tick)
  }, [resolveRound, currentRingLifetime])

  const handleStart = () => {
    const g = gameRef.current
    g.roundsResolved = 0
    g.resultsAcc = []
    g.nodeActive = false
    g.bonusNode = null
    g.particles = []
    g.shakeUntil = 0
    g.flashUntil = 0
    g.streak = 0
    g.running = true
    setResults([])
    setRound(0)
    setStreak(0)
    setPhase('playing')
  }

  useEffect(() => {
    if (phase !== 'playing') return
    setupCanvas()
    gameRef.current.running = true
    spawnNode()
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      gameRef.current.running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const handlePointer = useCallback((clientX, clientY) => {
    const g = gameRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // check bonus node first (it's a free hit, doesn't consume a round)
    if (g.bonusNode) {
      const bdx = x - g.bonusNode.x
      const bdy = y - g.bonusNode.y
      if (Math.sqrt(bdx * bdx + bdy * bdy) <= NODE_RADIUS) {
        spawnParticles(g.bonusNode.x, g.bonusNode.y)
        g.bonusNode = null
        g.streak += 1
        setStreak(g.streak)
        return
      }
    }

    if (!g.nodeActive) return

    const dx = x - g.nodeX
    const dy = y - g.nodeY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist <= NODE_RADIUS) {
      const ms = performance.now() - g.nodeSpawnTime
      spawnParticles(g.nodeX, g.nodeY)
      resolveRound(true, ms)
    }
  }, [resolveRound, spawnParticles])

  const onClick = (e) => handlePointer(e.clientX, e.clientY)
  const onTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    if (touch) handlePointer(touch.clientX, touch.clientY)
  }

  const hitResults = results.filter((r) => r.hit)
  const hitCount = hitResults.length
  const missCount = results.length - hitCount
  const avgMs = hitCount > 0 ? hitResults.reduce((a, r) => a + r.ms, 0) / hitCount : 0

  return (
    <>
    <style>{`
      @keyframes reflexResultIn {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--crimson2)' }}>
          <LightningIcon />
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '20px', color: 'var(--text1)', letterSpacing: '-0.3px',
          }}>{t('btReflex') || 'Pulse Reactor'}</h3>
        </div>

        {phase === 'intro' && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t('btRefInstr') || 'A glowing node will appear at a random spot with an expanding ring. Tap it before the ring fully expands. 10 rounds — speed and accuracy both count.'}
            </p>
            <button onClick={handleStart} style={primaryButtonStyle}>{t('btStart') || 'Start'}</button>
          </div>
        )}

        {phase === 'playing' && (
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text3)', marginBottom: '14px', textTransform: 'uppercase',
            }}>{t('btRefRound') || 'Round'} {Math.min(round + 1, TOTAL_ROUNDS)} {t('btRefOf') || 'of'} {TOTAL_ROUNDS}</p>

            <div
              ref={containerRef}
              style={{
                width: '100%',
                maxWidth: `${CANVAS_CSS_SIZE}px`,
                aspectRatio: '1 / 1',
                margin: '0 auto',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <canvas
                ref={canvasRef}
                onClick={onClick}
                onTouchStart={onTouchStart}
                style={{ display: 'block', touchAction: 'none', cursor: 'pointer' }}
              />
              {streak > 1 && (
                <div style={{
                  position: 'absolute', top: '10px', right: '14px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
                  fontWeight: 600, color: 'var(--gold2)', letterSpacing: '1px',
                  pointerEvents: 'none',
                }}>
                  {streak}x
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div key="result-card" style={resultCardStyle}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 56px)', color: 'var(--crimson2)', letterSpacing: '-1px',
              }}>{finalScore}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--text3)' }}>/ 100</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
              {Math.round(avgMs)}ms {t('btRefAvg') || 'avg reaction'} — <span style={{ color: 'var(--gold2)' }}>{hitCount}/{TOTAL_ROUNDS} {t('btRefHits') || 'hits'}</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>{t('btRefHits') || 'Hits'}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '15px', color: 'var(--text1)' }}>{hitCount}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>{t('btRefMisses') || 'Misses'}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '15px', color: 'var(--text1)' }}>{missCount}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>{t('btRefAvgShort') || 'Avg'}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '15px', color: 'var(--text1)' }}>{Math.round(avgMs)}ms</div>
              </div>
            </div>
            <button onClick={handleStart} style={secondaryButtonStyle}>{t('btTestAgain') || 'Test Again'}</button>
          </div>
        )}
      </div>
    </section>
    </>
  )
}

function getCssVar(name) {
  if (typeof window === 'undefined') return ''
  const val = getComputedStyle(document.documentElement).getPropertyValue(name)
  return val ? val.trim() : ''
}

function withAlpha(cssColor, alpha) {
  const a = Math.max(0, Math.min(1, alpha))
  if (cssColor.startsWith('#')) {
    const hex = cssColor.replace('#', '')
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex
    const r = parseInt(full.substring(0, 2), 16)
    const g = parseInt(full.substring(2, 4), 16)
    const b = parseInt(full.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  if (cssColor.startsWith('rgb')) {
    const nums = cssColor.match(/[\d.]+/g)
    if (nums && nums.length >= 3) return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${a})`
  }
  return cssColor
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

const resultCardStyle = {
  animation: 'reflexResultIn 350ms ease-out',
}