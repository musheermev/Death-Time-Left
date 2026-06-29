import { useTranslation } from '../../utils/i18n'

const ANIMALS = [
  { name: 'Dog', lifespan: 13, stages: [{pct:0.15,label:'Puppy'},{pct:0.35,label:'Young adult'},{pct:0.65,label:'Adult'},{pct:0.85,label:'Senior'},{pct:1,label:'Elder'}] },
  { name: 'Sea Turtle', lifespan: 80, stages: [{pct:0.1,label:'Hatchling'},{pct:0.3,label:'Juvenile'},{pct:0.6,label:'Adult'},{pct:0.9,label:'Mature adult'},{pct:1,label:'Elder'}] },
  { name: 'Mayfly', lifespan: 0.003, stages: [{pct:0.5,label:'Larva'},{pct:0.9,label:'Adult'},{pct:1,label:'End of life'}] },
  { name: 'Greenland Shark', lifespan: 400, stages: [{pct:0.1,label:'Juvenile'},{pct:0.3,label:'Young'},{pct:0.6,label:'Adult'},{pct:0.9,label:'Mature'},{pct:1,label:'Elder'}] },
  { name: 'Giant Tortoise', lifespan: 150, stages: [{pct:0.1,label:'Hatchling'},{pct:0.3,label:'Juvenile'},{pct:0.6,label:'Adult'},{pct:0.9,label:'Mature'},{pct:1,label:'Elder'}] },
  { name: 'Housefly', lifespan: 0.08, stages: [{pct:0.2,label:'Larva'},{pct:0.6,label:'Adult'},{pct:1,label:'End of life'}] },
]

function getStage(pct, stages) {
  for (const s of stages) { if (pct <= s.pct) return s.label }
  return stages[stages.length - 1].label
}

export default function ParallelLives({ totalDays }) {
  const { t } = useTranslation()
  const yearsLived = totalDays / 365.25

  return (
    <section style={{
      background: 'var(--surface)', border: '1px solid var(--border2)',
      borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)' }} />
      <div style={{ padding: '36px 32px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase',
        }}>{t('secParallel')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '8px',
        }}>{t('secParallel')}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, marginBottom: '28px',
        }}>
          {t('plIntro')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {ANIMALS.map(animal => {
            const pct = Math.min(1, yearsLived / animal.lifespan)
            const stage = getStage(pct, animal.stages)
            const isGone = pct >= 1
            const pctDisplay = Math.min(100, pct * 100)

            return (
              <div key={animal.name} style={{
                background: 'var(--surface2)', border: '1px solid var(--border2)',
                borderRadius: '12px', padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                      fontSize: '15px', color: 'var(--text1)',
                    }}>{animal.name}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
                      color: 'var(--text3)', marginLeft: '10px',
                    }}>avg {animal.lifespan < 1 ? `${Math.round(animal.lifespan * 365)} days` : `${animal.lifespan} yrs`}</span>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
                    color: isGone ? 'var(--crimson)' : 'var(--gold)',
                    background: isGone ? 'rgba(192,57,43,0.1)' : 'rgba(201,168,76,0.1)',
                    padding: '3px 8px', borderRadius: '6px',
                  }}>{isGone ? t('plLongGone') : stage}</span>
                </div>

                <div style={{ height: '5px', background: 'var(--surface3)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{
                    height: '100%', width: `${pctDisplay}%`,
                    background: isGone ? 'var(--crimson)' : 'var(--gold)',
                    borderRadius: '3px',
                  }}/>
                </div>

                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '13px',
                  color: 'var(--text3)', lineHeight: 1.5,
                }}>
                  {isGone
                    ? `${animal.name} ${t('plGone')} ${(yearsLived - animal.lifespan).toFixed(animal.lifespan < 1 ? 2 : 0)} ${animal.lifespan < 1 ? t('plDays') : t('plYears')} ${t('plGoneYears')}`
                    : `${animal.name} ${t('plNow')} ${stage.toLowerCase()} — ${pctDisplay.toFixed(1)}${t('plThrough')}`
                  }
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}