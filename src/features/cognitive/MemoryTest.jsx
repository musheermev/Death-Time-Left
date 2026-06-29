import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../../utils/i18n'

const LEVEL_CELL_COUNTS = [3, 4, 5, 6, 7]
const GRID_SIZE = 9
const SHOW_DURATION = 1000

function pickRandomCells(count) {
  const pool = Array.from({ length: GRID_SIZE }, (_, i) => i)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

function getMemoryAgeOffset(score) {
  if (score <= 2) return { offset: 10, label: '10 years above your age' }
  if (score <= 6) return { offset: 0, label: 'matches your age' }
  if (score <= 10) return { offset: -5, label: '5 years younger than your age' }
  return { offset: -10, label: '10 years younger than your age' }
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

export default function MemoryTest({ ageYears, onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | showing | recall | gameOver | finished
  const [level, setLevel] = useState(1)
  const [highlighted, setHighlighted] = useState([])
  const [found, setFound] = useState([])
  const [wrongCell, setWrongCell] = useState(null)
  const [score, setScore] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const startLevel = useCallback((lvl) => {
    const count = LEVEL_CELL_COUNTS[lvl - 1]
    setHighlighted(pickRandomCells(count))
    setFound([])
    setWrongCell(null)
    setPhase('showing')
    timeoutRef.current = setTimeout(() => setPhase('recall'), SHOW_DURATION)
  }, [])

  const handleStart = () => {
    setLevel(1)
    setScore(0)
    startLevel(1)
  }

  const handleCellClick = (idx) => {
    if (phase !== 'recall' || found.includes(idx)) return

    if (!highlighted.includes(idx)) {
      setWrongCell(idx)
      setPhase('gameOver')
      onComplete?.(score)
      return
    }

    const newFound = [...found, idx]
    setFound(newFound)
    const newScore = score + 1
    setScore(newScore)

    if (newFound.length === highlighted.length) {
      if (level >= LEVEL_CELL_COUNTS.length) {
        setPhase('finished')
        onComplete?.(newScore)
      } else {
        const nextLevel = level + 1
        setLevel(nextLevel)
        timeoutRef.current = setTimeout(() => startLevel(nextLevel), 600)
      }
    }
  }

  const ageInfo = getMemoryAgeOffset(score)
  const estimatedAge = typeof ageYears === 'number' ? Math.max(0, ageYears + ageInfo.offset) : null

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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '320px' }}>
              {Array.from({ length: GRID_SIZE }, (_, idx) => {
                const isHighlightedNow = phase === 'showing' && highlighted.includes(idx)
                const isFound = found.includes(idx)
                const isWrong = wrongCell === idx
                const isMissedCorrect = phase === 'gameOver' && highlighted.includes(idx) && !found.includes(idx)

                let bg = 'var(--surface2)'
                if (isHighlightedNow) bg = 'var(--crimson2)'
                else if (isWrong) bg = '#E74C3C'
                else if (isFound) bg = 'var(--gold2)'
                else if (isMissedCorrect) bg = 'rgba(192,57,43,0.35)'

                return (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    disabled={phase !== 'recall'}
                    style={{
                      aspectRatio: '1', borderRadius: '10px', border: 'none',
                      background: bg, cursor: phase === 'recall' ? 'pointer' : 'default',
                      transition: 'background 0.15s ease',
                    }}
                  />
                )
              })}
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
  )
}

function MemoryResult({ score, ageInfo, estimatedAge, onRetry, maxedOut }) {
  const { t } = useTranslation()
  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
          fontSize: 'clamp(36px, 6vw, 48px)', color: 'var(--crimson2)', letterSpacing: '-1px',
        }}>{score}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', color: 'var(--text3)' }}>/ 25</span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
        Estimated memory age {ageInfo.label}
        {estimatedAge !== null ? <span style={{ color: 'var(--gold2)' }}> — about {estimatedAge} years</span> : null}
        {maxedOut ? ' (you cleared every level — your real ceiling is even higher)' : ''}
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