import { useState } from 'react'
import { useTranslation } from '../../utils/i18n'
import { QUOTES } from '../../utils/quotes'

export default function StoicQuote() {
  const { t } = useTranslation()
  const todayIndex = Math.floor(Date.now() / 86400000) % QUOTES.length
  const [index, setIndex] = useState(todayIndex)

  const quote = QUOTES[index]

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)' }} />
      <div style={{ padding: '36px 32px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--gold)', marginBottom: '24px', textTransform: 'uppercase',
        }}>— {t('secStoic')}</p>

        <blockquote style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
          fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--text1)',
          lineHeight: 1.6, letterSpacing: '-0.3px', marginBottom: '20px',
          borderLeft: '2px solid var(--gold)', paddingLeft: '20px',
        }}>
          "{quote.text}"
        </blockquote>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
          color: 'var(--gold2)', marginBottom: '28px',
        }}>— {quote.author}</p>

        <div style={{ display: 'flex', gap: '12px' }}>
<button
            onClick={() => setIndex(i => (i - 1 + QUOTES.length) % QUOTES.length)}
            style={navButtonStyle}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('stoicPrev')}
          </button>
          <button
            onClick={() => setIndex(i => (i + 1) % QUOTES.length)}
            style={navButtonStyle}
          >
            {t('stoicNext')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

const navButtonStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '13px',
  color: 'var(--text2)', background: 'var(--surface2)', border: '1px solid var(--border2)',
  borderRadius: '8px', padding: '9px 16px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '6px',
}