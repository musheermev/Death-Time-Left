import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../../utils/i18n'

const LEVEL_CELL_COUNTS = [3, 4, 5, 6, 7]
const GRID_SIZE = 9          // always a 3x3 grid — only highlighted-cell count grows per level
const GRID_COLS = 3
const SHOW_DURATION = 1000
const CANVAS_CSS_SIZE = 400
const CELL_GAP = 8
const CELL_RADIUS = 10
const TRAIL_DELAY = 200       // ms between each cell lighting up in the trail
const TRAIL_DWELL = 600       // ms to hold after last cell before switching to recall
const ANIM_DURATION_HIT = 350 // ms for the gold lock-in glow animation
const ANIM_DURATION_WRONG = 400 // ms for the wrong-cell shatter animation
const ANIM_DURATION_LEVEL = 300 // ms for the level-transition fade

function pickRandomCells(count) {
  const pool = Array.from({ length: GRID_SIZE }, (_, i) => i)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

function getMemoryAgeOffset(score) {
  if (score <= 2) return { offset: 10, labelKey: 'btAgeAbove10' }
  if (score <= 6) return { offset: 0, labelKey: 'btAgeMatchesYours' }
  if (score <= 10) return { offset: -5, labelKey: 'btAgeYounger5' }
  return { offset: -10, labelKey: 'btAgeYounger10' }
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="3" width="5" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="9.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="9.5" width="6" height="6" rx="1.2" fill="currentColor" />
      <rect x="16" y="9.5" width="5" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="16" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9.5" y="16" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="16" y="16" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

// Resolves a CSS custom property to a literal value canvas can use directly.
function getCssVar(name) {
  if (typeof window === 'undefined') return ''
  const val = getComputedStyle(document.documentElement).getPropertyValue(name)
  return val ? val.trim() : ''
}

// Converts a hex/rgb CSS color string + alpha into an rgba() string for canvas use.
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

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export default function MemoryTest({ ageYears, onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | showing | recall | gameOver | finished
  const [level, setLevel] = useState(1)
  const [highlighted, setHighlighted] = useState([])
  const [found, setFound] = useState([])
  const [wrongCell, setWrongCell] = useState(null)
  const [score, setScore] = useState(0)

  const timeoutRef = useRef(null)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const rafRef = useRef(null)
  const animRef = useRef({
    // trail: cells lighting up one by one during 'showing' phase
    trailIndex: -1,        // which cell in highlighted[] is currently lit (-1 = none yet)
    trailTimers: [],       // setTimeout IDs for cleanup

    // per-tile animations: map of cellIndex → { type: 'hit'|'wrong', startTime }
    tileAnims: {},

    // shake
    shakeUntil: 0,

    // level transition fade
    fadeUntil: 0,
    fadingIn: false,       // true = fading in, false = not fading

    // trail shown set (which cells have been revealed so far)
    trailRevealed: [],
  })

  // mirrors React state for use inside the canvas draw function without re-binding it constantly
  const stateRef = useRef({ phase, highlighted, found, wrongCell, canvasSize: CANVAS_CSS_SIZE })
  useEffect(() => {
    stateRef.current = { phase, highlighted, found, wrongCell, canvasSize: stateRef.current.canvasSize }
  }, [phase, highlighted, found, wrongCell])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      animRef.current.trailTimers.forEach(clearTimeout)
    }
  }, [])

  // ---- responsive canvas sizing + DPR handling ----
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

    stateRef.current.canvasSize = cssSize
    drawGrid()
  }, [])

  const drawGrid = useCallback((timestamp) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = stateRef.current.canvasSize
    const { phase: ph, highlighted: hi, found: fd, wrongCell: wc } = stateRef.current
    const anim = animRef.current
    const now = performance.now()

    // --- screen shake offset ---
    const shaking = now < anim.shakeUntil
    const shakeX = shaking ? (Math.random() - 0.5) * 6 : 0
    const shakeY = shaking ? (Math.random() - 0.5) * 6 : 0

    // --- level transition fade overlay alpha ---
    let fadeAlpha = 0
    if (anim.fadeUntil > 0) {
      const fadeProgress = 1 - Math.min((anim.fadeUntil - now) / ANIM_DURATION_LEVEL, 1)
      if (anim.fadingIn) {
        fadeAlpha = 1 - fadeProgress  // 1 → 0 (reveal)
      } else {
        fadeAlpha = fadeProgress       // 0 → 1 (cover)
      }
      if (now > anim.fadeUntil) { anim.fadeUntil = 0 }
    }

    ctx.save()
    ctx.clearRect(0, 0, size, size)
    ctx.translate(shakeX, shakeY)

    const cellSize = (size - CELL_GAP * (GRID_COLS - 1)) / GRID_COLS

    for (let idx = 0; idx < GRID_SIZE; idx++) {
      const col = idx % GRID_COLS
      const row = Math.floor(idx / GRID_COLS)
      const baseX = col * (cellSize + CELL_GAP)
      const baseY = row * (cellSize + CELL_GAP)

      const isTrailRevealed = ph === 'showing' && anim.trailRevealed.includes(idx)
      const isFound = fd.includes(idx)
      const isWrong = wc === idx
      const isMissedCorrect = ph === 'gameOver' && hi.includes(idx) && !fd.includes(idx)

      // check if this tile has an active animation
      const tileAnim = anim.tileAnims[idx]
      const animProgress = tileAnim
        ? Math.min((now - tileAnim.startTime) / (tileAnim.type === 'hit' ? ANIM_DURATION_HIT : ANIM_DURATION_WRONG), 1)
        : 1

      // --- determine base color ---
      let color = getCssVar('--surface2') || '#1a1a1a'
      if (isTrailRevealed) color = getCssVar('--crimson2') || '#ef4444'
      else if (isWrong) color = '#E74C3C'
      else if (isFound) color = getCssVar('--gold2') || '#f4c430'
      else if (isMissedCorrect) color = withAlpha(getCssVar('--crimson') || '#dc2626', 0.35)

      // --- scale/bounce for animations ---
      let scale = 1
      if (tileAnim) {
        if (tileAnim.type === 'hit') {
          // quick scale-up then settle: 1 → 1.12 → 1 over animProgress
          const bounce = Math.sin(animProgress * Math.PI)
          scale = 1 + bounce * 0.12
        } else if (tileAnim.type === 'wrong') {
          // shudder: rapid oscillation decaying to 1
          scale = 1 + Math.sin(animProgress * Math.PI * 6) * (1 - animProgress) * 0.1
        } else if (tileAnim.type === 'trail') {
          // pulse: scale up on reveal, settle back
          const pulse = Math.sin(animProgress * Math.PI)
          scale = 1 + pulse * 0.15
        }
      }

      // --- draw cell with scale from its center ---
      const cx = baseX + cellSize / 2
      const cy = baseY + cellSize / 2
      const scaledSize = cellSize * scale
      const drawX = cx - scaledSize / 2
      const drawY = cy - scaledSize / 2

      // glow shadow for trail and hit animations
      if (tileAnim && tileAnim.type === 'trail' && isTrailRevealed) {
        const glowOpacity = Math.sin(animProgress * Math.PI)
        ctx.shadowBlur = 18 * glowOpacity
        ctx.shadowColor = withAlpha(getCssVar('--crimson2') || '#ef4444', glowOpacity)
      } else if (tileAnim && tileAnim.type === 'hit') {
        const glowOpacity = Math.sin(animProgress * Math.PI)
        ctx.shadowBlur = 16 * glowOpacity
        ctx.shadowColor = withAlpha(getCssVar('--gold2') || '#f4c430', glowOpacity)
      } else {
        ctx.shadowBlur = 0
        ctx.shadowColor = 'transparent'
      }

      drawRoundedRect(ctx, drawX, drawY, scaledSize, scaledSize, CELL_RADIUS)
      ctx.fillStyle = color
      ctx.fill()

      // wrong cell: draw red crack lines over the tile as it animates
      if (tileAnim && tileAnim.type === 'wrong' && animProgress < 1) {
        const crackOpacity = 1 - animProgress
        ctx.strokeStyle = withAlpha('#ff0000', crackOpacity * 0.8)
        ctx.lineWidth = 1.5
        // two diagonal crack lines
        ctx.beginPath()
        ctx.moveTo(drawX + scaledSize * 0.25, drawY + scaledSize * 0.2)
        ctx.lineTo(drawX + scaledSize * 0.6, drawY + scaledSize * 0.75)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(drawX + scaledSize * 0.7, drawY + scaledSize * 0.15)
        ctx.lineTo(drawX + scaledSize * 0.3, drawY + scaledSize * 0.85)
        ctx.stroke()
      }

      // clean up finished tile animations
      if (tileAnim && animProgress >= 1) {
        delete anim.tileAnims[idx]
      }
    }

    // --- fade overlay (level transition) ---
    if (fadeAlpha > 0) {
      ctx.shadowBlur = 0
      ctx.fillStyle = withAlpha(getCssVar('--surface') || '#000', fadeAlpha)
      ctx.fillRect(0, 0, size, size)
    }

    ctx.restore()

    // --- decide whether to keep looping ---
    const hasActiveAnims = (
      shaking ||
      Object.keys(anim.tileAnims).length > 0 ||
      (anim.fadeUntil > 0 && now < anim.fadeUntil)
    )
    if (hasActiveAnims) {
      rafRef.current = requestAnimationFrame(drawGrid)
    } else {
      rafRef.current = null
    }
  }, [])

  const startAnimLoop = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(drawGrid)
    }
  }, [drawGrid])  

  // redraw whenever relevant state changes
  useEffect(() => {
    drawGrid()
  }, [phase, highlighted, found, wrongCell, drawGrid])

  // size canvas on mount/phase entry and on resize
  useEffect(() => {
    if (phase === 'intro' || phase === 'finished') return
    setupCanvas()
    const onResize = () => setupCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [phase, setupCanvas])

  // also size once when entering gameOver/finished from a freshly mounted canvas case
  useEffect(() => {
    if (phase === 'gameOver') setupCanvas()
  }, [phase, setupCanvas])

  const startLevel = useCallback((lvl) => {
    const count = LEVEL_CELL_COUNTS[lvl - 1]
    const cells = pickRandomCells(count)
    const anim = animRef.current

    // clear any previous trail state
    anim.trailTimers.forEach(clearTimeout)
    anim.trailTimers = []
    anim.trailRevealed = []
    anim.tileAnims = {}

    setHighlighted(cells)
    setFound([])
    setWrongCell(null)
    setPhase('showing')

    // schedule each cell in the trail, one by one
    cells.forEach((cellIdx, i) => {
      const timer = setTimeout(() => {
        anim.trailRevealed = [...anim.trailRevealed, cellIdx]
        anim.tileAnims[cellIdx] = { type: 'trail', startTime: performance.now() }
        stateRef.current = { ...stateRef.current, highlighted: cells }
        startAnimLoop()
      }, i * TRAIL_DELAY)
      anim.trailTimers.push(timer)
    })

    // after last cell + dwell time, switch to recall
    const totalTrailTime = count * TRAIL_DELAY + TRAIL_DWELL
    timeoutRef.current = setTimeout(() => {
      anim.trailRevealed = []
      setPhase('recall')
    }, totalTrailTime)
  }, [startAnimLoop])

  const handleStart = () => {
    setLevel(1)
    setScore(0)
    startLevel(1)
  }

// Is code ko replace karo:
  const handleCellClick = (idx) => {
    if (phase !== 'recall' || found.includes(idx)) return
    const anim = animRef.current

    if (!highlighted.includes(idx)) {
      // wrong tap: shake canvas + shatter animation on the tile
      setWrongCell(idx)
      anim.tileAnims[idx] = { type: 'wrong', startTime: performance.now() }
      anim.shakeUntil = performance.now() + 150
      startAnimLoop()
      // delay the phase change slightly so the animation plays
      setTimeout(() => {
        setPhase('gameOver')
        onComplete?.(score)
      }, 250)
      return
    }

    const newFound = [...found, idx]
    setFound(newFound)
    const newScore = score + 1
    setScore(newScore)

    // hit animation on this tile
    anim.tileAnims[idx] = { type: 'hit', startTime: performance.now() }
    startAnimLoop()

    if (newFound.length === highlighted.length) {
      if (level >= LEVEL_CELL_COUNTS.length) {
        setPhase('finished')
        onComplete?.(newScore)
      } else {
        const nextLevel = level + 1
        setLevel(nextLevel)
        // fade out, then start next level (which fades back in)
        anim.fadeUntil = performance.now() + ANIM_DURATION_LEVEL
        anim.fadingIn = false
        startAnimLoop()
        timeoutRef.current = setTimeout(() => {
          anim.fadeUntil = performance.now() + ANIM_DURATION_LEVEL
          anim.fadingIn = true
          startAnimLoop()
          startLevel(nextLevel)
        }, ANIM_DURATION_LEVEL + 50)
      }
    }
  }

  // ---- translate a click/touch point into a grid cell index ----
  const pointToCellIndex = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const size = stateRef.current.canvasSize
    const cellSize = (size - CELL_GAP * (GRID_COLS - 1)) / GRID_COLS

    const col = Math.floor(x / (cellSize + CELL_GAP))
    const row = Math.floor(y / (cellSize + CELL_GAP))
    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_COLS) return null

    // reject clicks that land in the gap between cells, not on a cell itself
    const cellLocalX = x - col * (cellSize + CELL_GAP)
    const cellLocalY = y - row * (cellSize + CELL_GAP)
    if (cellLocalX > cellSize || cellLocalY > cellSize) return null

    return row * GRID_COLS + col
  }, [])

  const onCanvasClick = (e) => {
    const idx = pointToCellIndex(e.clientX, e.clientY)
    if (idx !== null) handleCellClick(idx)
  }
  const onCanvasTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    if (!touch) return
    const idx = pointToCellIndex(touch.clientX, touch.clientY)
    if (idx !== null) handleCellClick(idx)
  }

  const ageInfo = getMemoryAgeOffset(score)
  const estimatedAge = typeof ageYears === 'number' ? Math.max(0, ageYears + ageInfo.offset) : null

  return (
    <>
    <style>{`
      @keyframes memoryResultIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
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
          <GridIcon />
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '20px', color: 'var(--text1)', letterSpacing: '-0.3px',
          }}>{t('btMemory')}</h3>
        </div>

        {phase === 'intro' && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t('btMemInstr')}
            </p>
            <button onClick={handleStart} style={primaryButtonStyle}>{t('btStart')}</button>
          </div>
        )}

        {(phase === 'showing' || phase === 'recall' || phase === 'gameOver') && (
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text3)', marginBottom: '14px', textTransform: 'uppercase',
            }}>
              {t('btMemLevel')} {level} — {highlighted.length} cells {phase === 'showing' ? t('btMemMemorize') : phase === 'recall' ? t('btMemYourTurn') : t('btMemGameOver')}
            </p>

            <div
              ref={containerRef}
              style={{
                width: '100%',
                maxWidth: `${CANVAS_CSS_SIZE}px`,
                aspectRatio: '1 / 1',
              }}
            >
              <canvas
                ref={canvasRef}
                onClick={onCanvasClick}
                onTouchStart={onCanvasTouchStart}
                style={{
                  display: 'block',
                  touchAction: 'none',
                  cursor: phase === 'recall' ? 'pointer' : 'default',
                }}
              />
            </div>

            {phase === 'gameOver' && (
              <MemoryResult score={score} ageInfo={ageInfo} estimatedAge={estimatedAge} onRetry={handleStart} />
            )}
          </div>
        )}

        {phase === 'finished' && (
          <MemoryResult score={score} ageInfo={ageInfo} estimatedAge={estimatedAge} onRetry={handleStart} maxedOut />
        )}
      </div>
    </section>
    </>
  )
}

function MemoryResult({ score, ageInfo, estimatedAge, onRetry, maxedOut }) {
  const { t } = useTranslation()
  return (
    <div style={{ marginTop: '20px', animation: 'memoryResultIn 350ms ease-out' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
          fontSize: 'clamp(36px, 6vw, 48px)', color: 'var(--crimson2)', letterSpacing: '-1px',
        }}>{score}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: 'var(--text3)' }}>/ 25</span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
        {t('btMemAgeLabel')} {t(ageInfo.labelKey)}
        {estimatedAge !== null
          ? estimatedAge <= 5
            ? <span style={{ color: 'var(--gold2)' }}> — {t('btMemOffCharts')}</span>
            : <span style={{ color: 'var(--gold2)' }}> — {t('btMemAgeApprox')} {estimatedAge} years</span>
          : null}
        {maxedOut ? ` (${t('btMemMaxedOut')})` : ''}
      </p>
      <button onClick={onRetry} style={secondaryButtonStyle}>{t('btTestAgain')}</button>
    </div>
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