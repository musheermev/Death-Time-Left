import { useState, useRef } from 'react'
import { LIFE_FACTS } from '../../utils/lifeData'
import { useTranslation } from '../../utils/i18n'

export default function DeathRoulette() {
  const { t } = useTranslation()
  const [fact, setFact] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const seenRef = useRef([])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setFact(null)

    const newRotation = rotation + 720 + Math.floor(Math.random() * 360)
    setRotation(newRotation)

    setTimeout(() => {
      // Pick unseen fact
      if (seenRef.current.length >= LIFE_FACTS.length) seenRef.current = []
      let idx
      do { idx = Math.floor(Math.random() * LIFE_FACTS.length) }
      while (seenRef.current.includes(idx))
      seenRef.current.push(idx)
      setFact(LIFE_FACTS[idx])
      setSpinning(false)
    }, 2000)
  }

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--crimson) 0%, var(--gold) 100%)' }} />
      <div style={{ padding: '36px 32px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase',
        }}>{t('secRoulette')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '28px',
        }}>{t('drBtn')}</h3>

        {/* Wheel SVG */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
          <svg
            width="120" height="120" viewBox="0 0 120 120"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 2s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none',
            }}
          >
            {[0,1,2,3,4,5].map(i => {
              const angle = (i * 60) * (Math.PI / 180)
              const x2 = 60 + 55 * Math.cos(angle)
              const y2 = 60 + 55 * Math.sin(angle)
              return <line key={i} x1="60" y1="60" x2={x2} y2={y2} stroke="var(--border2)" strokeWidth="1.5"/>
            })}
            <circle cx="60" cy="60" r="55" fill="none" stroke="var(--crimson)" strokeWidth="2"/>
            <circle cx="60" cy="60" r="6" fill="var(--crimson)"/>
            <circle cx="60" cy="8" r="4" fill="var(--gold)"/>
            {[0,60,120,180,240,300].map((deg, i) => {
              const rad = (deg - 90) * (Math.PI / 180)
              const x = 60 + 36 * Math.cos(rad)
              const y = 60 + 36 * Math.sin(rad)
              return <circle key={i} cx={x} cy={y} r="3" fill={i % 2 === 0 ? 'var(--crimson2)' : 'var(--gold)'}/>
            })}
          </svg>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px',
            color: '#fff', background: spinning ? 'var(--surface3)' : 'var(--crimson2)',
            border: 'none', borderRadius: '10px', padding: '13px 32px',
            cursor: spinning ? 'not-allowed' : 'pointer', marginBottom: '24px',
          }}
        >
          {spinning ? '...' : fact ? t('drAgain') : t('drBtn')}
        </button>

        {fact && !spinning && (
          <div style={{
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: '14px', padding: '24px',
            animation: 'dtl-fadein 0.4s ease',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '16px',
              color: 'var(--text1)', lineHeight: 1.7, textAlign: 'left',
            }}>{fact}</p>
          </div>
        )}
      </div>
      <style>{`@keyframes dtl-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  )
}