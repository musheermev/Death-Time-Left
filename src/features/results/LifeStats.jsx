import { useMemo, useState, useEffect } from 'react'
import { fmt } from '../../utils/calculations'
import { useTranslation } from '../../utils/i18n'

export default function LifeStats({ totalDays }) {
  const { t } = useTranslation()
  const [factIdx, setFactIdx] = useState(0)

  const heartbeats = Math.round(totalDays * 100000)
  const breaths = Math.round(totalDays * 20000)
  const orbits = (totalDays / 365.25).toFixed(2)
  const cardiacOutput = Math.round(totalDays * 7200)
  const sleepYears = (totalDays * 8 / 24 / 365).toFixed(1)
  const meals = Math.round(totalDays * 3)
  const blinks = Math.round(totalDays * 15000)
  const bloodCircuits = Math.round(totalDays * 1440)

  const facts = [
    `You have taken approximately ${fmt(breaths)} breaths — each one without a single effort from your conscious mind.`,
    `Your heart has beaten ${fmt(heartbeats)} times since you were born — without a single scheduled break. Ever.`,
    `You've spent roughly ${sleepYears} years completely unconscious. Asleep. What did you do with the rest?`,
    `You've blinked ${fmt(blinks)} times — and every blink was a moment you'll never get back.`,
    `Your blood has completed roughly ${fmt(bloodCircuits)} full circuits of your body since birth.`,
    `You've eaten approximately ${fmt(meals)} meals — yet most of them you can't even remember.`,
  ]

  useEffect(() => {
    const t = setInterval(() => setFactIdx(i => (i + 1) % facts.length), 6000)
    return () => clearInterval(t)
  }, [])

  const goldCard = (value, label, sub) => (
    <div key={label} style={{
      background: 'rgba(201,168,76,0.06)',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '14px',
      padding: '20px',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize: '26px',
        color: 'var(--gold)',
        marginBottom: '4px',
        wordBreak: 'break-all',
      }}>{fmt(value)}</div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: '13px',
        color: 'var(--text2)',
      }}>{label}</div>
      {sub && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'var(--text3)',
          marginTop: '3px',
          letterSpacing: '0.3px',
        }}>{sub}</div>
      )}
    </div>
  )

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--gold)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('secLifeInNumbers')}</p>

      {/* Primary 4 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '12px',
      }} className="dtl-stats4-grid">
        {goldCard(heartbeats, t('statHeartbeats'), '~100K/day avg')}
        {goldCard(breaths, t('statBreaths'), '~20K/day')}
        {goldCard(parseFloat(orbits), t('statOrbits'), 'around the sun')}
        {goldCard(cardiacOutput, t('statBlood'), 'litres pumped by heart')}
      </div>

      {/* Secondary 3 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }} className="dtl-stats3-grid">
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border2)',
          borderRadius: '14px',
          padding: '18px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '28px',
            background: 'linear-gradient(135deg, #E74C3C, #C9A84C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{sleepYears}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{t('statSleep')}</div>
        </div>
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border2)',
          borderRadius: '14px',
          padding: '18px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '28px',
            background: 'linear-gradient(135deg, #E74C3C, #C9A84C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{fmt(meals)}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{t('statMeals')}</div>
        </div>
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border2)',
          borderRadius: '14px',
          padding: '18px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '28px',
            background: 'linear-gradient(135deg, #E74C3C, #C9A84C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{fmt(blinks)}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>{t('statBlinks')}</div>
        </div>
      </div>

      {/* Shocking callout */}
      <div style={{
        background: 'rgba(192,57,43,0.07)',
        border: '1px solid rgba(192,57,43,0.25)',
        borderRadius: '14px',
        padding: '20px 22px',
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        minHeight: '80px',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
          <path d="M9 2L1.5 15h15L9 2z" stroke="var(--crimson)" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M9 7v4M9 13v.5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: 'var(--text2)',
          lineHeight: 1.7,
          transition: 'opacity 0.4s',
        }}>{facts[factIdx]}</p>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .dtl-stats4-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dtl-stats3-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
