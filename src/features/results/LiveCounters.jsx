import { useLiveCounter } from '../../hooks/useLiveCounter'
import { useTranslation } from '../../utils/i18n'

const CalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="15" rx="2" stroke="var(--crimson)" strokeWidth="1.4"/>
    <path d="M2 8h16" stroke="var(--crimson)" strokeWidth="1.4"/>
    <path d="M6 1v3M14 1v3" stroke="var(--crimson)" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="var(--crimson)" strokeWidth="1.4"/>
    <path d="M10 5v5.5l3 2" stroke="var(--crimson)" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const PulseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M1 10h3l2-5 4 10 3-7 2 2h4" stroke="var(--crimson)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const WeekIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.6"/>
    <rect x="8" y="4" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.6"/>
    <rect x="14" y="4" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.6"/>
    <rect x="2" y="11" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.3"/>
    <rect x="8" y="11" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.3"/>
    <rect x="14" y="11" width="4" height="4" rx="1" fill="var(--crimson)" opacity="0.3"/>
  </svg>
)

export default function LiveCounters({ dobTimestamp }) {
  const { t } = useTranslation()
  const { seconds, days, hours, weeks } = useLiveCounter(dobTimestamp)

  const cards = [
    { id: 'days', icon: <CalIcon />, value: days.toLocaleString(), label: t('ctrDaysLbl'), sub: t('ctrDaysSub') },
    { id: 'hours', icon: <ClockIcon />, value: hours.toLocaleString(), label: t('ctrHoursLbl'), sub: t('ctrHoursSub') },
    { id: 'secs', icon: <PulseIcon />, value: seconds.toLocaleString(), label: t('ctrSecsLbl'), sub: t('ctrSecsSub') },
    { id: 'weeks', icon: <WeekIcon />, value: weeks.toLocaleString(), label: t('ctrWeeksLbl'), sub: t('ctrWeeksSub') },
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
      }}>{t('ctrSectionLabel')}</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
      }} className="dtl-counters-grid">
        {cards.map(({ id, icon, value, label, sub }) => (
          <div key={id} style={{
            background: 'rgba(192,57,43,0.06)',
            border: '1px solid rgba(192,57,43,0.2)',
            borderRadius: '16px',
            padding: '20px 16px',
          }}>
            <div style={{ marginBottom: '12px' }}>{icon}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '22px',
              color: 'var(--text1)',
              letterSpacing: '-0.5px',
              marginBottom: '4px',
              wordBreak: 'break-all',
            }}>{value}</div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              color: 'var(--text2)',
            }}>{label}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--text3)',
              marginTop: '2px',
              letterSpacing: '0.5px',
            }}>{sub}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .dtl-counters-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
