import { fmt } from '../../utils/calculations'
import { useTranslation } from '../../utils/i18n'

function StatBar({ label, done, total, unit }) {
  const pct = Math.min(100, (done / total) * 100)
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text2)' }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--text3)' }}>
          {fmt(Math.round(done))} / {fmt(Math.round(total))} {unit}
        </span>
      </div>
      <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--crimson)', borderRadius: '3px' }}/>
      </div>
    </div>
  )
}

export default function LifeInNumbers({ ageYears, totalDays }) {
  const { t } = useTranslation()
  const TARGET = 75
  const targetDays = TARGET * 365.25

  const stats = [
    { label: t('linSleep'), done: totalDays * 8 / 24 / 365, total: TARGET * 8 / 24, unit: 'yrs' },
    { label: t('linMeals'), done: totalDays * 3, total: targetDays * 3, unit: '' },
    { label: t('linBeats'), done: totalDays * 100000, total: targetDays * 100000, unit: '' },
    { label: t('linBreaths'), done: totalDays * 20000, total: targetDays * 20000, unit: '' },
    { label: t('linBlinks'), done: totalDays * 15000, total: targetDays * 15000, unit: '' },
    { label: t('linSteps'), done: totalDays * 7500, total: targetDays * 7500, unit: '' },
    { label: t('linOrbits'), done: ageYears, total: TARGET, unit: 'yrs' },
  ]

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
        }}>{t('secLifeInNumbers')}</p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '20px', color: 'var(--text1)', marginBottom: '8px',
        }}>{t('linTitle')}</h3>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, marginBottom: '28px',
        }}>
          {t('linSubtitle')}
        </p>

        {stats.map(s => (
          <StatBar key={s.label} label={s.label} done={s.done} total={s.total} unit={s.unit} />
        ))}

        <div style={{
          marginTop: '20px', padding: '16px', background: 'var(--surface2)',
          borderRadius: '10px', border: '1px solid var(--border2)',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
            color: 'var(--text3)', lineHeight: 1.6,
          }}>
            {t('linNote')}
          </p>
        </div>
      </div>
    </section>
  )
}