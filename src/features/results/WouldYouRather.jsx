import { useState } from 'react'
import { useTranslation } from '../../utils/i18n'

const DILEMMAS = [
  {
    a: 'Live to 120 with average health',
    b: 'Live to 80 in perfect health',
    insightA: 'People who choose quantity often value legacy, long-term relationships, and witnessing the future.',
    insightB: 'People who choose quality prioritize vitality, presence, and experience over duration.',
    pctA: 38,
  },
  {
    a: 'Know the exact date of your death',
    b: 'Never know — die of surprise',
    insightA: 'Knowing creates urgency. Most people who choose this say they would finally stop procrastinating.',
    insightB: 'Uncertainty is the engine of hope. Most prefer to live without the countdown.',
    pctA: 29,
  },
  {
    a: 'Live twice as fast but twice as long',
    b: 'Normal pace, normal length',
    insightA: 'A preference for intensity — experiencing more, building more, risking more.',
    insightB: 'Steadiness is underrated. Most humans are wired for rhythm, not sprint.',
    pctA: 44,
  },
  {
    a: 'Skip your 20s but gain 20 extra years at the end',
    b: 'Keep your 20s, normal lifespan',
    insightA: 'The 20s are chaotic but formative. Most people say no — they would not trade the confusion.',
    insightB: 'The years of forming identity are irreplaceable. Choosing this values becoming over extending.',
    pctA: 19,
  },
  {
    a: 'Forget all memories but live 30 extra years',
    b: 'Keep all memories, normal lifespan',
    insightA: 'An identity without memory is still a life — but one starting from zero.',
    insightB: 'Memory IS the self. The overwhelming majority say their story is worth more than extra time.',
    pctA: 12,
  },
]

export default function WouldYouRather() {
  const { t } = useTranslation()
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)

  const q = DILEMMAS[qIndex]

  const handleChoice = (side) => setChosen(side)

  const next = () => {
    setChosen(null)
    setQIndex(i => (i + 1) % DILEMMAS.length)
  }

  const chosenPct = chosen === 'a' ? q.pctA : 100 - q.pctA
  const insight = chosen === 'a' ? q.insightA : q.insightB

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
        }}>{t('secWouldYou')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '28px',
        }}>Life Dilemma #{qIndex + 1}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }} className="dtl-wyr-grid">
          {['a', 'b'].map((side) => {
            const label = side === 'a' ? q.a : q.b
            const isChosen = chosen === side
            return (
              <button
                key={side}
                onClick={() => !chosen && handleChoice(side)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                  fontSize: '15px', lineHeight: 1.5,
                  color: isChosen ? '#fff' : 'var(--text1)',
                  background: isChosen ? 'var(--crimson)' : 'var(--surface2)',
                  border: `1px solid ${isChosen ? 'var(--crimson)' : 'var(--border2)'}`,
                  borderRadius: '14px', padding: '24px 20px',
                  cursor: chosen ? 'default' : 'pointer',
                  textAlign: 'left', transition: 'all 0.2s ease',
                }}
              >{label}</button>
            )
          })}
        </div>

        {chosen && (
          <div style={{
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            borderRadius: '12px', padding: '20px 24px', marginBottom: '20px',
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
              color: 'var(--gold)', marginBottom: '8px',
            }}>{chosenPct}{t('wyrChose')}</p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '14px',
              color: 'var(--text2)', lineHeight: 1.7,
            }}>{insight}</p>
          </div>
        )}

        {chosen && (
          <button onClick={next} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
            color: '#fff', background: 'var(--crimson2)', border: 'none',
            borderRadius: '10px', padding: '11px 24px', cursor: 'pointer',
          }}>{t('wyrNext')}</button>
        )}
      </div>
      <style>{`@media(max-width:600px){ .dtl-wyr-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}