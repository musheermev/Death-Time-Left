import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from '../../utils/i18n'

function LightningIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" />
    </svg>
  )
}

const BENCHMARKS = [
  { max: 150, label: 'Top 1%', percentile: 99 },
  { max: 200, label: 'Top 10%', percentile: 90 },
  { max: 250, label: 'Average', percentile: 50 },
  { max: 300, label: 'Below average', percentile: 25 },
  { max: Infinity, label: 'Slow', percentile: 10 },
]

function getBenchmark(ms) {
  return BENCHMARKS.find((b) => ms <= b.max) || BENCHMARKS[BENCHMARKS.length - 1]
}

const TOTAL_ROUNDS = 3
const MIN_DELAY = 1000
const MAX_DELAY = 4000
const FALSE_START_THRESHOLD = 100

export default function ReflexTest({ onComplete }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('intro') // intro | waiting | flash | falseStart | result
  const [round, setRound] = useState(1)
  const [times, setTimes] = useState([])
  const flashStartRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const startRound = useCallback(() => {
    setPhase('waiting')
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY)
    timeoutRef.current = setTimeout(() => {
      flashStartRef.current = performance.now()
      setPhase('flash')
    }, delay)
  }, [])

  const handleStart = () => {
    setRound(1)
    setTimes([])
    startRound()
  }

  const handlePanelClick = () => {
    if (phase === 'waiting') {
      clearTimeout(timeoutRef.current)
      setPhase('falseStart')
      return
    }
    if (phase === 'flash') {
      const elapsed = performance.now() - flashStartRef.current
      if (elapsed < FALSE_START_THRESHOLD) {
        setPhase('falseStart')
        return
      }
      const newTimes = [...times, elapsed]
      setTimes(newTimes)
      if (newTimes.length >= TOTAL_ROUNDS) {
        const avg = newTimes.reduce((a, b) => a + b, 0) / newTimes.length
        setPhase('result')
        onComplete?.(avg)
      } else {
        setRound((r) => r + 1)
        startRound()
      }
    }
  }

  const avgMs = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0
  const benchmark = getBenchmark(avgMs)

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
          <LightningIcon />
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '20px', color: 'var(--text1)', letterSpacing: '-0.3px',
          }}>{t('btReflex')}</h3>
        </div>

        {phase === 'intro' && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t('btRefInstr')}
            </p>
            <button onClick={handleStart} style={primaryButtonStyle}>{t('btStart')}</button>
          </div>
        )}

        {(phase === 'waiting' || phase === 'flash' || phase === 'falseStart') && (
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              letterSpacing: '2px', color: 'var(--text3)', marginBottom: '14px', textTransform: 'uppercase',
            }}>{t('btRefRound')} {round} {t('btRefOf')} {TOTAL_ROUNDS}</p>

            <button
              onClick={handlePanelClick}
              style={{
                width: '100%',
                minHeight: '220px',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px',
                background: phase === 'flash' ? 'var(--crimson2)' : 'var(--surface2)',
              }}
            >
              {phase === 'waiting' && (
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: 'var(--text3)', letterSpacing: '1px' }}>
                  {t('btRefWait')}
                </span>
              )}
              {phase === 'flash' && (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', color: '#fff' }}>
                  {t('btRefClick')}
                </span>
              )}
              {phase === 'falseStart' && (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '20px', color: 'var(--gold2)' }}>
                  {t('btRefTooSoon')}
                </span>
              )}
            </button>

            {phase === 'falseStart' && (
              <button onClick={startRound} style={{ ...primaryButtonStyle, marginTop: '16px' }}>
                {t('btRetryRound')}
              </button>
            )}
          </div>
        )}

        {phase === 'result' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                fontSize: 'clamp(40px, 7vw, 56px)', color: 'var(--crimson2)', letterSpacing: '-1px',
              }}>{Math.round(avgMs)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--text3)' }}>ms avg</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', marginBottom: '20px' }}>
              {t('btRefFasterThan')} {benchmark.percentile}{t('btRefOfPeople')} — <span style={{ color: 'var(--gold2)' }}>{benchmark.label}</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {times.map((ms, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--surface2)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text3)', marginBottom: '4px' }}>{t('btRefRound')} {i + 1}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '15px', color: 'var(--text1)' }}>{Math.round(ms)}ms</div>
                </div>
              ))}
            </div>
            <button onClick={handleStart} style={secondaryButtonStyle}>{t('btTestAgain')}</button>
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