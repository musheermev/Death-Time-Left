import { useState, useEffect } from 'react'
import { useTranslation } from '../../utils/i18n'

export default function PWAInstallBanner() {
  const { t } = useTranslation()
  const [prompt, setPrompt] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      const dismissed = localStorage.getItem('dtl-pwa-dismissed')
      if (!dismissed) setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setShow(false)
  }

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('dtl-pwa-dismissed', '1')
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      right: '24px',
      maxWidth: '420px',
      margin: '0 auto',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '18px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 500,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="var(--crimson-faint)"/>
        <line x1="10" y1="7" x2="22" y2="7" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="25" x2="22" y2="25" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 7 C10 7 12 16 16 16 C12 16 10 25 10 25 L22 25 C22 25 20 16 16 16 C20 16 22 7 22 7 Z"
          fill="none" stroke="var(--crimson)" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="16" cy="20" r="2.5" fill="#C9A84C"/>
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px', fontWeight: 600,
          color: 'var(--text1)', marginBottom: '3px',
        }}>
          {t('pwaTitle')}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px', color: 'var(--text3)',
        }}>
          {t('pwaDesc')}
        </div>
      </div>
      <button onClick={install} style={{
        padding: '8px 14px',
        background: 'var(--crimson)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '13px', fontWeight: 600,
        cursor: 'pointer',
      }}>
        {t('pwaInstallBtn')}
      </button>
      <button onClick={dismiss} style={{
        width: '28px', height: '28px',
        background: 'transparent',
        border: 'none',
        color: 'var(--text3)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '6px',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}