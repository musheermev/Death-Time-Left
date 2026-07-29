import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLocalTime } from '../../hooks/useLocalTime'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../utils/i18n'

const HourglassIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3h14M7 25h14" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 3C8 3 9 10 14 14C9 18 8 25 8 25H20C20 25 19 18 14 14C19 10 20 3 20 3H8Z"
      fill="none" stroke="var(--crimson)" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 6C10 6 11.5 9.5 14 12L18 6H10Z" fill="var(--crimson)" opacity="0.3"/>
    <circle cx="14" cy="17.5" r="2" fill="#C9A84C"/>
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2.93" y1="2.93" x2="4.05" y2="4.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11.95" y1="11.95" x2="13.07" y2="13.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2.93" y1="13.07" x2="4.05" y2="11.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11.95" y1="4.05" x2="13.07" y2="2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 10.5A6 6 0 015.5 2.5a6 6 0 000 11 6 6 0 008-3z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const BlogIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="4.5" y1="5" x2="11.5" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="4.5" y1="8" x2="11.5" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="4.5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hinglish' },
  { value: 'ar', label: 'العربية' },
  { value: 'es', label: 'Español' },
  { value: 'ru', label: 'Русский' },
]

export default function Header() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { formatted } = useLocalTime()
  const [lang, setLang] = useState(() => localStorage.getItem('dtl-lang') || 'en')

  const THEME_CYCLE = { dark: 'light', light: 'device', device: 'dark' }
  const cycleTheme = () => setTheme(THEME_CYCLE[theme])

  const ThemeIcon = theme === 'light' ? SunIcon : theme === 'dark' ? MoonIcon : MonitorIcon
  const THEME_LABELS = { dark: t('headerThemeDark'), light: t('headerThemeLight'), device: t('headerThemeDevice') }

  const handleLang = (e) => {
    const v = e.target.value
    setLang(v)
    localStorage.setItem('dtl-lang', v)
    document.documentElement.dir = v === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = v
    window.location.reload()
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      background: 'var(--header-bg)',
      borderBottom: '1px solid var(--border2)',
    }}>
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <HourglassIcon />
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '17px',
            lineHeight: 1,
            letterSpacing: '-0.3px',
          }}>
            <span style={{ color: 'var(--text1)' }}>Death </span>
            <span style={{ color: 'var(--crimson)' }}>Time Left</span>
          </div>
          <div className="dtl-tagline" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            color: 'var(--text3)',
            letterSpacing: '2px',
            marginTop: '2px',
          }}>{t('headerTagline')}</div>
        </div>
      </a>

      <div style={{ flex: 1 }} />

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Blog button */}
        <Link
          to="/blog"
          className="dtl-blog-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            color: 'var(--text2)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.color = 'var(--text1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
        >
          <BlogIcon />
          <span className="dtl-blog-text">{t('headerBlogBtn')}</span>
        </Link>

        {/* Live time pill — hidden below 768px via inline trick using a class */}
        <div className="dtl-time-pill" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '5px 12px',
          background: 'var(--surface2)',
          border: '1px solid var(--border2)',
          borderRadius: '20px',
        }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--crimson)',
            animation: 'lblink 1.2s ease-in-out infinite',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--text2)',
            letterSpacing: '1px',
          }}>{formatted}</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          title={`${t('headerModePrefix')} ${THEME_LABELS[theme]}`}
          style={{
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            color: 'var(--text2)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.color = 'var(--text1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
        >
          <ThemeIcon />
        </button>

        {/* Language select */}
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
            padding: '6px 10px',
            cursor: 'pointer',
            outline: 'none',
            letterSpacing: '0.5px',
          }}
        >
          {LANG_OPTIONS.map(o => (
            <option key={o.value} value={o.value} style={{ background: 'var(--surface)' }}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dtl-time-pill { display: none !important; }
        }
        @media (max-width: 480px) {
          .dtl-blog-text { display: none !important; }
          .dtl-blog-btn { padding: 8px !important; gap: 0 !important; }
        }
        @media (max-width: 380px) {
          .dtl-tagline { display: none !important; }
        }
      `}</style>
    </header>
  )
}