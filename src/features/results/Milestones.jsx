import { useMemo } from 'react'

import { useTranslation } from '../../utils/i18n'
import { formatDate } from '../../utils/dateHelpers'
import { buildMilestones } from '../../constants/milestones'

export default function Milestones({ dob }) {
  const { t, lang } = useTranslation()
  const now = new Date()
  const milestones = useMemo(() => buildMilestones(dob), [dob])

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--text3)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('msSectionLabel')}</p>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}>
        {milestones.map((m, i) => {
          const reached = m.date <= now
          const dateStr = formatDate(m.date, lang, {
            year: 'numeric', month: 'short', day: 'numeric',
          })
          return (
            <div
              key={m.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '14px 20px',
                borderBottom: i < milestones.length - 1 ? '1px solid var(--border2)' : 'none',
                background: reached ? 'rgba(192,57,43,0.04)' : 'transparent',
              }}
            >
              {/* Dot */}
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                flexShrink: 0,
                background: reached ? 'var(--crimson)' : 'transparent',
                border: reached ? 'none' : '2px solid var(--border2)',
              }}/>

              {/* Label */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: reached ? 'var(--text1)' : 'var(--text3)',
                }}>{t(m.labelKey)}</p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: 'var(--text3)',
                  marginTop: '2px',
                }}>{dateStr}</p>
              </div>

              {/* Badge */}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '20px',
                background: reached ? 'rgba(192,57,43,0.15)' : 'rgba(201,168,76,0.1)',
                color: reached ? 'var(--crimson)' : 'var(--gold)',
                border: reached ? '1px solid rgba(192,57,43,0.2)' : '1px solid rgba(201,168,76,0.2)',
                flexShrink: 0,
              }}>
                {reached ? t('msReached') : t('msUpcoming')}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
