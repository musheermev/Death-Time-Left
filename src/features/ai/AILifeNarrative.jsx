import { useState } from 'react'
import useTypewriter from '../../hooks/useTypewriter'
import { getAILifeNarrative } from '../../services/aiService'
import { useTranslation } from '../../utils/i18n'

function LoadingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%', background: 'var(--crimson2)',
          animation: `dtl-dot-pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
      <style>{`@keyframes dtl-dot-pulse { 0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.15); } }`}</style>
    </span>
  )
}

export default function AILifeNarrative({ dob, ageYears, totalDays, generation, lifestyle }) {
  const { t, lang } = useTranslation()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { displayed, isDone } = useTypewriter(text)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await getAILifeNarrative({ dob, ageYears, totalDays, generation, lifestyle, lang })
      setText(result)
    } catch (err) {
      setError(err.message === 'rate_limit' ? t('aiErrorRateLimit') : t('aiErrorFallback'))
    } finally {
      setLoading(false)
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
        }}>{t('aiNarrativeEyebrow')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '16px',
        }}>{t('aiNarrativeTitle')}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, marginBottom: '20px',
        }}>
          {t('aiNarrativeDesc')}
        </p>

        {!text && !loading && (
          <button onClick={handleGenerate} style={primaryButtonStyle}>
            {t('aiNarrativeBtn')}
          </button>
        )}
        {loading && <LoadingDots />}
        {error && !loading && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--crimson2)' }}>{error}</p>
        )}
        {text && !loading && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '15px',
            color: 'var(--text1)', lineHeight: 1.8,
            borderLeft: '2px solid var(--crimson)', paddingLeft: '16px',
          }}>
            {displayed}
            {!isDone && <span className="tw-cursor" />}
          </p>
        )}
      </div>
    </section>
  )
}

const primaryButtonStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
  color: '#fff', background: 'var(--crimson2)', border: 'none', borderRadius: '10px',
  padding: '12px 24px', cursor: 'pointer',
}