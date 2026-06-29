import { useState } from 'react'
import { getAIBrainAnalysis } from '../../services/aiService'
import { useTranslation } from '../../utils/i18n'

function BrainIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 3a4 4 0 0 0-4 4 3.5 3.5 0 0 0-2 6 3.5 3.5 0 0 0 2 6h0a4 4 0 0 0 8 0h0a3.5 3.5 0 0 0 2-6 3.5 3.5 0 0 0-2-6A4 4 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 7v12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

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

function reflexToPoints(ms) {
  return Math.max(0, Math.min(100, Math.round(((400 - ms) / 300) * 100)))
}

function getBrainAgeOffset(overall) {
  if (overall >= 80) return -8
  if (overall >= 60) return -3
  if (overall >= 40) return 0
  if (overall >= 20) return 3
  return 8
}

function Bar({ label, value }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text2)' }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--text1)' }}>{Math.round(value)}</span>
      </div>
      <svg width="100%" height="8" style={{ display: 'block' }}>
        <rect x="0" y="0" width="100%" height="8" rx="4" fill="var(--surface2)" />
        <rect x="0" y="0" width={`${pct}%`} height="8" rx="4" fill="var(--crimson2)" />
      </svg>
    </div>
  )
}

export default function BrainScore({ reflexScore, memoryScore, stroopScore, ageYears }) {
  const { t } = useTranslation()
  const [aiText, setAiText] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  const allComplete = reflexScore != null && memoryScore != null && stroopScore != null

  if (!allComplete) {
    return (
      <section style={{
        background: 'var(--surface)', border: '1px solid var(--border2)',
        borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
      }}>
        <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />
        <div style={{ padding: '36px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--crimson2)' }}>
            <BrainIcon />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: 'var(--text1)' }}>{t('btBrainScoreTitle')}</h3>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7 }}>
            {t('btBrainCompleteMsg')}
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--text3)', display: 'flex', gap: '16px', marginTop: '14px' }}>
            <span>{t('btReflex')} {reflexScore != null ? '✓' : '—'}</span>
            <span>{t('btMemory')} {memoryScore != null ? '✓' : '—'}</span>
            <span>{t('btStroop')} {stroopScore != null ? '✓' : '—'}</span>
          </div>
        </div>
      </section>
    )
  }

  const reflexPoints = reflexToPoints(reflexScore)
  const memoryPoints = Math.round((memoryScore / 25) * 100)
  const stroopPoints = stroopScore
  const overall = Math.round((reflexPoints + memoryPoints + stroopPoints) / 3)
  const brainAge = typeof ageYears === 'number'
    ? Math.max(0, ageYears + getBrainAgeOffset(overall))
    : null

  const handleAnalyze = async () => {
    setAiLoading(true)
    setAiError('')
    try {
      const text = await getAIBrainAnalysis({
        reflexMs: reflexScore,
        memoryScore,
        stroopScore,
        brainAge: brainAge ?? overall,
        ageYears: ageYears ?? 'unknown',
      })
      setAiText(text)
    } catch (err) {
      setAiError(err.message || t('btBrainAIError'))
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />
      <div style={{ padding: '36px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--crimson2)' }}>
          <BrainIcon />
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', color: 'var(--text1)' }}>{t('btBrainScoreTitle')}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 'clamp(40px, 7vw, 56px)', color: 'var(--crimson2)', letterSpacing: '-1px' }}>{overall}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '16px', color: 'var(--text3)' }}>/ 100</span>
        </div>
        {brainAge !== null && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', marginBottom: '24px' }}>
            {t('btBrainEstAge')} <span style={{ color: 'var(--gold2)' }}>{brainAge} years</span>
          </p>
        )}

        <Bar label={t('btBrainReflex')} value={reflexPoints} />
        <Bar label={t('btBrainMemory')} value={memoryPoints} />
        <Bar label={t('btBrainFocus')} value={stroopPoints} />

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border2)' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: 'var(--text3)', marginBottom: '12px', textTransform: 'uppercase' }}>
            {t('btBrainAIPowered')}
          </p>

          {!aiText && !aiLoading && (
            <button onClick={handleAnalyze} style={primaryButtonStyle}>{t('btBrainAnalyzeBtn')}</button>
          )}
          {aiLoading && <LoadingDots />}
          {aiError && !aiLoading && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--crimson2)' }}>{t('btBrainAIError')}</p>
          )}
          {aiText && !aiLoading && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text1)', lineHeight: 1.7 }}>{aiText}</p>
          )}
        </div>
      </div>
    </section>
  )
}

const primaryButtonStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
  color: '#fff', background: 'var(--crimson2)', border: 'none', borderRadius: '10px',
  padding: '12px 24px', cursor: 'pointer',
}