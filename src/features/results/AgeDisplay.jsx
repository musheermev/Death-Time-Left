import { useMemo } from 'react'
import { calcExactAge } from '../../utils/calculations'
import { useTranslation } from '../../utils/i18n'

export default function AgeDisplay({ dob }) {
  const { t } = useTranslation()
  const now = new Date()
  const age = useMemo(() => calcExactAge(dob, now), [dob])

  const totalDays = Math.floor((now - dob) / 86400000)
  const totalHours = Math.floor((now - dob) / 3600000)
  const totalSeconds = Math.floor((now - dob) / 1000)

  const numStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    fontSize: 'clamp(52px, 9vw, 96px)',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #E74C3C 0%, #C9A84C 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-2px',
  }

  const labelStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '3px',
    color: 'var(--text3)',
    textTransform: 'uppercase',
    marginTop: '6px',
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border2)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '24px',
    }}>
      {/* Top gradient line */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)',
      }} />

      <div style={{ padding: '40px 36px 32px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'var(--text3)',
          marginBottom: '28px',
          textTransform: 'uppercase',
        }}>{t('ageOverline')}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {[
            { id: 'years', val: age.years, lbl: t('ageYears') },
            { id: 'months', val: age.months, lbl: t('ageMonths') },
            { id: 'days', val: age.days, lbl: t('ageDays') },
          ].map(({ id, val, lbl }) => (
            <div key={id} style={{ textAlign: 'center' }}>
              <div style={numStyle}>{val}</div>
              <div style={labelStyle}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border2)',
          paddingTop: '20px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: 'var(--text3)',
          lineHeight: 1.8,
          letterSpacing: '0.3px',
        }}>
          {t('ageThatIs')}{' '}
          <span style={{ color: 'var(--crimson)' }}>{totalDays.toLocaleString()} {t('ageDaysUnit')}</span>
          {', '}
          <span style={{ color: 'var(--gold)' }}>{totalHours.toLocaleString()} {t('ageHoursUnit')}</span>
          {', '}{t('ageOrConnector')}{' '}
          <span style={{ color: 'var(--text2)' }}>{totalSeconds.toLocaleString()} {t('ageSecondsUnit')}</span>
          {' '}{t('ageAndCounting')}
        </div>
      </div>
    </div>
  )
}
