import { useState, useEffect } from 'react'
import { useTranslation } from '../../utils/i18n'

function calcRemaining(deathDate) {
  const now = new Date()
  const diff = deathDate - now
  if (diff <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0 }

  let y = deathDate.getFullYear() - now.getFullYear()
  let mo = deathDate.getMonth() - now.getMonth()
  let d = deathDate.getDate() - now.getDate()
  let h = deathDate.getHours() - now.getHours()
  let mi = deathDate.getMinutes() - now.getMinutes()

  if (mi < 0) { mi += 60; h-- }
  if (h < 0) { h += 24; d-- }
  if (d < 0) { mo--; d += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() }
  if (mo < 0) { y--; mo += 12 }

  return { years: y, months: mo, days: d, hours: h, minutes: mi }
}

export default function TimeRemaining({ deathDate }) {
  const { t } = useTranslation()
  const [rem, setRem] = useState(() => calcRemaining(deathDate))

  useEffect(() => {
    const t = setInterval(() => setRem(calcRemaining(deathDate)), 1000)
    return () => clearInterval(t)
  }, [deathDate])

  const blocks = [
    { id: 'years', label: t('trYears'), value: rem.years },
    { id: 'months', label: t('trMonths'), value: rem.months },
    { id: 'days', label: t('trDays'), value: rem.days },
    { id: 'hours', label: t('trHours'), value: rem.hours },
    { id: 'minutes', label: t('trMinutes'), value: rem.minutes },
  ]

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--crimson)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('timeRemainingLabel')}</p>

      <div style={{
        background: 'linear-gradient(160deg, var(--surface) 0%, var(--surface2) 100%)',
        border: '1px solid var(--border2)',
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--crimson) 0%, transparent 100%)',
        }}/>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1px',
          background: 'var(--border2)',
          margin: '24px',
          borderRadius: '12px',
          overflow: 'hidden',
        }} className="dtl-countdown-grid">
          {blocks.map(({ id, label, value }) => (
            <div key={id} style={{
              background: 'var(--surface)',
              padding: '24px 12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 'clamp(24px, 4vw, 42px)',
                color: 'var(--text1)',
                lineHeight: 1,
                letterSpacing: '-1px',
                marginBottom: '6px',
              }}>{String(value).padStart(2, '0')}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '2px',
                color: 'var(--text3)',
                textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .dtl-countdown-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
