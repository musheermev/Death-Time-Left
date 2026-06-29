import { calcDeathDate, calcLifeProgress, calcExactAge } from '../../utils/calculations'
import { GLOBAL_LE } from '../../constants/lifeExpectancy'
import LifeRing from './LifeRing'
import { useTranslation } from '../../utils/i18n'
import { formatDate } from '../../utils/dateHelpers'

export default function DeathDate({ dob, yearsAge }) {
  const { t, lang } = useTranslation()
  const deathDate = calcDeathDate(dob, GLOBAL_LE)
  const pct = calcLifeProgress(yearsAge, GLOBAL_LE)
  const yearsRemaining = Math.max(0, (GLOBAL_LE - yearsAge)).toFixed(1)

  const dateStr = formatDate(deathDate, lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--crimson)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('deathEndLabel')}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }} className="dtl-deathdate-grid">

        {/* Death date card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--crimson)',
          borderRadius: '18px',
          padding: '28px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--crimson), transparent)',
          }}/>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '2.5px',
            color: 'var(--crimson)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>{t('deathExpiryLabel')}</p>

          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(18px, 3vw, 26px)',
            color: 'var(--text1)',
            lineHeight: 1.25,
            marginBottom: '14px',
            letterSpacing: '-0.5px',
          }}>{dateStr}</div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'var(--text3)',
            lineHeight: 1.6,
          }}>
            {t('deathBasedOn1')} {GLOBAL_LE} {t('deathBasedOn2')}
            {t('deathBasedOn3')}
          </p>
        </div>

        {/* Life ring */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border2)',
          borderRadius: '18px',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LifeRing pct={pct} yearsRemaining={yearsRemaining} />
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .dtl-deathdate-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
