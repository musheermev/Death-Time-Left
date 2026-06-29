import { useMemo } from 'react'
import { WORLD_EVENTS } from '../../utils/worldEvents'
import { useTranslation } from '../../utils/i18n'

function TechIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.5H5M2 11.5H5M13 6.5H16M13 11.5H16M6.5 2V5M11.5 2V5M6.5 13V16M11.5 13V16" stroke="currentColor" strokeWidth="1.3" />
      <rect x="6" y="6" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4C4 3 5 2.5 9 2.5C13 2.5 14 3 14 4V14C14 15 13 15.5 9 15.5C5 15.5 4 15 4 14V4Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 6.5H11.5M6.5 9H11.5M6.5 11.5H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ScienceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="1.6" fill="currentColor" />
      <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 9 9)" />
      <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 9 9)" />
    </svg>
  )
}

function CultureIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L10.7 6.7L15.5 7L11.8 10L13 14.8L9 12L5 14.8L6.2 10L2.5 7L7.3 6.7L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function IndiaIcon() {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4
    return {
      x2: 9 + 6.5 * Math.cos(angle),
      y2: 9 + 6.5 * Math.sin(angle),
    }
  })
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
      {spokes.map((s, i) => (
        <line key={i} x1="9" y1="9" x2={s.x2} y2={s.y2} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  )
}

const ICONS = {
  tech: TechIcon,
  history: HistoryIcon,
  science: ScienceIcon,
  culture: CultureIcon,
  india: IndiaIcon,
}

export default function HistoryTimeline({ dob }) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const birthYear = dob.getFullYear()

  const items = useMemo(() => {
    return WORLD_EVENTS
      .filter((e) => e.year >= birthYear && e.year <= currentYear)
      .map((e) => {
        const age = e.year - birthYear
        let label
        if (e.year === currentYear) label = `This year: ${e.event}`
        else if (age === 0) label = `You were born the same year ${e.event}`
        else label = `You were ${age} when ${e.event}`
        return { ...e, age, label }
      })
  }, [birthYear, currentYear])

  if (items.length === 0) {
    return (
      <section className="history-timeline">
        <h3 className="ht-title">{t('secHistory')}</h3>
        <p className="ht-empty">No tracked events fall within your lifetime yet.</p>
      </section>
    )
  }

  return (
    <section className="history-timeline">
      <h3 className="ht-title">{t('secHistory')}</h3>
      <ul className="ht-list">
        {items.map((item, i) => {
          const Icon = ICONS[item.category] || HistoryIcon
          return (
            <li key={`${item.year}-${i}`} className="ht-item">
              <span className="ht-dot" />
              <div className="ht-content">
                <span className={`ht-badge ht-badge--${item.category}`}>
                  <Icon />
                </span>
                <p className="ht-label">{item.label}</p>
                <span className="ht-year">{item.year}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}