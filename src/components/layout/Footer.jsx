import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../utils/i18n'

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hinglish' },
  { value: 'ar', label: 'العربية' },
  { value: 'es', label: 'Español' },
  { value: 'ru', label: 'Русский' },
]

export default function Footer() {
  const { t } = useTranslation()
  const [lang, setLang] = useState(() => localStorage.getItem('dtl-lang') || 'en')

  const handleLang = (e) => {
    const v = e.target.value
    setLang(v)
    localStorage.setItem('dtl-lang', v)
    window.dispatchEvent(new CustomEvent('dtl-lang-change', { detail: v }))
    document.documentElement.dir = v === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = v
    window.location.reload()
  }

  const linkStyle = {
    display: 'block',
    color: 'var(--text3)',
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
    padding: '3px 0',
    transition: 'color 0.2s',
  }

  const headingStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '2px',
    color: 'var(--text3)',
    textTransform: 'uppercase',
    marginBottom: '14px',
  }

  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border2)',
      paddingTop: '56px',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '48px',
      }} className="dtl-footer-grid">

        {/* Left */}
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            marginBottom: '12px',
          }}>
            <span style={{ color: 'var(--text1)' }}>Death </span>
            <span style={{ color: 'var(--crimson)' }}>Time Left</span>
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--gold)',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            lineHeight: 1.6,
          }}>
            {t('footerCraftedBy')}<br />by Musheer
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'var(--text3)',
          }}>
            {t('footerCopyrightLine1')}<br />{t('footerCopyrightLine2')}
          </p>
        </div>

        {/* Center */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <p style={headingStyle}>{t('footerToolsHeading')}</p>
            {[
              [t('footerToolCalc'), '/'],
              [t('footerToolPredictor'), '/'],
              [t('footerToolWeeks'), '/'],
              [t('footerToolBrain'), '/'],
            ].map(([label, href]) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--crimson)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >{label}</a>
            ))}
          </div>
          <div>
            <p style={headingStyle}>{t('footerCountriesHeading')}</p>
            {[
              [t('footerCountryIndia'), '/life-expectancy/india'],
              [t('footerCountryUSA'), '/life-expectancy/usa'],
              [t('footerCountryRussia'), '/life-expectancy/russia'],
              [t('footerCountrySpain'), '/life-expectancy/spain'],
            ].map(([label, href]) => (
              <Link key={label} to={href} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--crimson)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >{label}</Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <p style={headingStyle}>{t('footerSourcesHeading')}</p>
          {[
            t('footerSrc1'),
            t('footerSrc2'),
            t('footerSrc3'),
          ].map((s) => (
            <p key={s} style={{
              fontSize: '12px',
              color: 'var(--text3)',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '8px',
              lineHeight: 1.5,
            }}>{s}</p>
          ))}
          <p style={{
            fontSize: '11px',
            color: 'var(--text3)',
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            marginTop: '12px',
            lineHeight: 1.6,
            padding: '10px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
          }}>
            {t('footerDisclaimer')}
          </p>

          <div style={{ marginTop: '20px' }}>
            <p style={{ ...headingStyle, marginBottom: '8px' }}>{t('footerLanguageHeading')}</p>
            <select
              value={lang}
              onChange={handleLang}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text2)',
                background: 'var(--surface2)',
                border: '1px solid var(--border2)',
                borderRadius: '8px',
                padding: '7px 12px',
                cursor: 'pointer',
                outline: 'none',
                width: '100%',
              }}
            >
              {LANG_OPTIONS.map(o => (
                <option key={o.value} value={o.value} style={{ background: 'var(--surface)' }}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--crimson)',
        marginTop: '48px',
        padding: '16px 24px',
        textAlign: 'center',
        opacity: 0.5,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'var(--text3)',
          letterSpacing: '1.5px',
        }}>deathtimeleft.com — {t('scTagline')}</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dtl-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}
