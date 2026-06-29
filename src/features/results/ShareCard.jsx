// src/features/results/ShareCard.jsx

import { useState } from 'react'
import { useTranslation } from '../../utils/i18n'
import { formatDate } from '../../utils/dateHelpers'

export default function ShareCard({ dob, ageYears, totalDays, deathDate, lifePct, lifeArchetype }) {
  const { t, lang } = useTranslation()
  const [downloading, setDownloading] = useState(false)

  const now = new Date()
  const dateStr = formatDate(now, lang, { year: 'numeric', month: 'long', day: 'numeric' })
  const deathStr = deathDate
    ? formatDate(deathDate, lang, { year: 'numeric', month: 'long' })
    : '—'
  const pct = Math.min(100, lifePct ?? 0)
  const yearsLeft = deathDate
    ? Math.max(0, ((deathDate - now) / (365.25 * 86400000))).toFixed(1)
    : '—'

  const downloadCard = async () => {
    const el = document.getElementById('share-card-inner')
    if (!el) return

    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: '#06080D',
        useCORS: true,
        logging: false,
        allowTaint: false,
        removeContainer: true,
      })
      const link = document.createElement('a')
      link.download = 'death-time-left-stats.png'
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
      showFallbackCopy()
    } finally {
      setDownloading(false)
    }
  }

  const showFallbackCopy = () => {
    const msg = document.getElementById('sc-copy-msg')
    if (msg) {
      msg.style.display = 'block'
      setTimeout(() => { msg.style.display = 'none' }, 3000)
    }
  }

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />
      <div style={{ padding: '36px 32px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase',
        }}>{t('scShareLabel')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '24px',
        }}>{t('scShareTitle')}</h3>

        {/* Card preview — this div gets captured by html2canvas */}
        <div
          id="share-card-inner"
          style={{
            width: '600px',
            maxWidth: '100%',
            background: '#06080D',
            border: '1px solid rgba(192,57,43,0.3)',
            borderRadius: '16px',
            padding: '32px',
            margin: '0 auto 24px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {/* Top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, #C0392B, #C9A84C)',
          }} />

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '14px', color: '#F1F3F8',
            }}>
              DEATH TIME LEFT
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: '#555B6E',
            }}>
              {dateStr}
            </span>
          </div>

          {/* Days lived */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 6vw, 48px)',
              color: '#C0392B',
              letterSpacing: '-1px',
            }}>
              {totalDays?.toLocaleString() ?? '—'}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px', color: '#8B90A0',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px',
            }}>
              {t('scDays')}
            </div>
          </div>

          {/* Years remaining */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px', color: '#F1F3F8',
            }}>
              {t('scEst')} {yearsLeft} {t('scLeft')}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: '#555B6E', marginTop: '4px',
            }}>
              {t('scExpiryPrefix')} {deathStr}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', color: '#555B6E',
              }}>
                {t('scLifeProgress')}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', color: '#C0392B',
              }}>
                {pct.toFixed(1)}%
              </span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: '#C0392B',
                borderRadius: '2px',
              }} />
            </div>
          </div>

          {/* Archetype (optional) */}
          {lifeArchetype && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: '#C9A84C', marginBottom: '16px',
            }}>
              {t('scArchetypePrefix')} {lifeArchetype}
            </div>
          )}

          {/* Footer */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', color: '#555B6E', letterSpacing: '1px',
            }}>
              deathtimeleft.com
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', color: '#C0392B', letterSpacing: '0.05em',
            }}>
              {t('scTagline')}
            </div>
          </div>
        </div>

        {/* Download button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={downloadCard}
            disabled={downloading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 22px',
              background: downloading ? 'var(--surface2)' : 'var(--crimson)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              cursor: downloading ? 'not-allowed' : 'pointer',
              transition: 'all 0.25s',
              opacity: downloading ? 0.7 : 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v8M5 7l3 3 3-3"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
              <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {downloading ? t('scDownloading') : t('scBtn')}
          </button>

          <div
            id="sc-copy-msg"
            style={{
              display: 'none',
              marginTop: '12px',
              padding: '10px 16px',
              background: 'rgba(192,57,43,0.1)',
              border: '1px solid rgba(192,57,43,0.3)',
              borderRadius: '8px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#E74C3C',
            }}
          >
            {t('scDownloadFailed')}
          </div>
        </div>
      </div>
    </section>
  )
}