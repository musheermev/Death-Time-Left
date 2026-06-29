import { useTranslation } from '../../utils/i18n'

export default function LifeRing({ pct, yearsRemaining }) {
  const { t } = useTranslation()
  const r = 70
  const circ = 2 * Math.PI * r
  const used = (pct / 100) * circ
  const remaining = circ - used

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--text3)',
        marginBottom: '20px',
        textTransform: 'uppercase',
      }}>{t('lifeProgressLabel')}</p>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Track */}
          <circle cx="90" cy="90" r={r} fill="none" stroke="var(--surface3)" strokeWidth="10"/>
          {/* Used */}
          <circle
            cx="90" cy="90" r={r}
            fill="none"
            stroke="var(--crimson)"
            strokeWidth="10"
            strokeDasharray={`${used} ${remaining}`}
            strokeDashoffset={circ * 0.25}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
          {/* Remaining */}
          <circle
            cx="90" cy="90" r={r}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeDasharray={`${remaining - 6} ${used + 6}`}
            strokeDashoffset={circ * 0.25 - used}
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '28px',
            color: 'var(--crimson)',
            lineHeight: 1,
          }}>{pct.toFixed(1)}%</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            color: 'var(--text3)',
            marginTop: '4px',
          }}>{t('lifeProgressUsed')}</div>
        </div>
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        color: 'var(--text3)',
        marginTop: '12px',
        lineHeight: 1.5,
      }}>~{yearsRemaining} {t('lifeProgressYearsRemaining')}<br />{t('lifeProgressLiveIntentionally')}</p>
    </div>
  )
}
