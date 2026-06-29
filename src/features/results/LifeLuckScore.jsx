import { useEffect, useMemo, useState } from 'react'
import { getLifeLuckScore } from '../../utils/calculations'
import { useTranslation } from '../../utils/i18n'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 8.3L6.8 10.6L11.5 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function LifeLuckScore({ dob }) {
  const { t } = useTranslation()
  const result = useMemo(() => getLifeLuckScore(dob), [dob])
  const [phase, setPhase] = useState('loading') // 'loading' | 'reveal'
  const [progress, setProgress] = useState(0)
  const [displayScore, setDisplayScore] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  // Loading bar fill: 0 -> 100% over 1.5s
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('reveal')
      return
    }
    const start = performance.now()
    const duration = 1500
    let raf
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
      else setPhase('reveal')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [prefersReducedMotion])

  // Count-up: 0 -> score, ease-out cubic, once revealed
  useEffect(() => {
    if (phase !== 'reveal') return
    if (prefersReducedMotion) {
      setDisplayScore(result.score)
      return
    }
    const target = result.score
    const start = performance.now()
    const duration = 1100
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayScore(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, result.score, prefersReducedMotion])

  return (
    <section className="life-luck-score">
      <h3 className="lls-title">{t('llsTitle')}</h3>

      {phase === 'loading' && (
        <div className="lls-loading">
          <p className="lls-loading-text">{t('llsCalculating')}</p>
          <div className="lls-progress-track">
            <div className="lls-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="lls-reveal">
          <div className="lls-score-display">
            <span className="lls-score-number">{displayScore}</span>
            <span className="lls-score-max"> {t('llsScoreMax')}</span>
          </div>
          <p className="lls-score-label">{result.label}</p>

          <ul className="lls-factors">
            {result.factors.map((f, i) => (
              <li key={i} className={`lls-factor ${f.positive ? 'is-positive' : 'is-negative'}`}>
                <span className="lls-factor-icon">
                  {f.positive ? <CheckIcon /> : <CrossIcon />}
                </span>
                <span className="lls-factor-label">{f.label}</span>
                <span className="lls-factor-value">{f.value > 0 ? `+${f.value}` : f.value}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="lls-expand-toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {t('llsHowCalculated')}
            <ChevronIcon open={expanded} />
          </button>

          {expanded && (
            <div className="lls-expand-content">
              <p>{t('llsExplanation')}</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}