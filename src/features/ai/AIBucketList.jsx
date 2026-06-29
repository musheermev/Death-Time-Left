import { useState } from 'react'
import useTypewriter from '../../hooks/useTypewriter'
import { getAIBucketList } from '../../services/aiService'
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

export default function AIBucketList({ ageYears, daysLeft, archetype, lifestyle }) {
  const { t, lang } = useTranslation()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { displayed, isDone } = useTypewriter(text)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await getAIBucketList({ ageYears, daysLeft, archetype, lifestyle, lang })
      setText(result)
    } catch (err) {
      setError(err.message === 'rate_limit' ? t('aiErrorRateLimit') : t('aiErrorFallback'))
    } finally {
      setLoading(false)
    }
  }

  // Parse line-break separated items into array
  // While typing: show raw displayed text as single block
  // Once done: split into list items
  const items = isDone
    ? text.split('\n').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--gold) 0%, var(--crimson) 100%)' }} />
      <div style={{ padding: '36px 32px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase',
        }}>{t('aiBucketEyebrow')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '16px',
        }}>{t('aiBucketTitle')}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, marginBottom: '20px',
        }}>
          {t('aiBucketDesc')}
        </p>

        {!text && !loading && (
          <button onClick={handleGenerate} style={primaryButtonStyle}>
            {t('aiBucketBtn')}
          </button>
        )}
        {loading && <LoadingDots />}
        {error && !loading && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--crimson2)' }}>{error}</p>
        )}
        {text && !loading && (
          <>
            {!isDone && (
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '15px',
                color: 'var(--text1)', lineHeight: 1.8, margin: 0,
              }}>
                {displayed}
                <span className="tw-cursor" />
              </p>
            )}
            {isDone && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                      fontSize: '13px', color: 'var(--crimson)', minWidth: '20px',
                    }}>{i + 1}.</span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontSize: '15px',
                      color: 'var(--text1)', lineHeight: 1.6, margin: 0,
                    }}>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </>
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