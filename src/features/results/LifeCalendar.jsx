import { useMemo } from 'react'

import { useTranslation } from '../../utils/i18n'

const ROWS = 90
const COLS = 52
const TOTAL = ROWS * COLS // 4680

export default function LifeCalendar({ totalWeeks }) {
  const { t } = useTranslation()
  const currentWeek = Math.min(totalWeeks, TOTAL)

  const grid = useMemo(() => {
    const cells = []
    for (let i = 0; i < TOTAL; i++) {
      if (i < currentWeek - 1) cells.push('used')
      else if (i === currentWeek - 1) cells.push('current')
      else cells.push('future')
    }
    return cells
  }, [currentWeek])

  const usedCount = Math.max(0, currentWeek - 1)
  const remaining = TOTAL - currentWeek

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'var(--text3)',
          marginBottom: '6px',
          textTransform: 'uppercase',
        }}>{t('calSectionLabel')}</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'var(--text3)',
          lineHeight: 1.6,
          maxWidth: '560px',
        }}>
          {t('calGridFormula').replace('{rows}', ROWS).replace('{cols}', COLS).replace('{total}', TOTAL.toLocaleString())}
          {' '}{t('calDescNote')}
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { id: 'lived', color: 'var(--crimson)', label: t('calLegendLived') },
          { id: 'now', color: 'var(--gold)', label: t('calLegendNow') },
          { id: 'remaining', color: 'var(--surface3)', label: t('calLegendRemaining') },
        ].map(({ id, color, label }) => (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="11" height="11" viewBox="0 0 11 11">
              <rect width="11" height="11" rx="2" fill={color}/>
            </svg>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'var(--text3)',
              letterSpacing: '0.5px',
            }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: '16px',
        padding: '16px',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: '2px',
          width: '100%',
          minWidth: '400px',
        }}>
          {grid.map((type, i) => (
            <div
              key={i}
              title={`${t('calWeekTooltip')} ${i + 1}`}
              style={{
                aspectRatio: '1',
                borderRadius: '1px',
                background: type === 'used'
                  ? 'var(--crimson)'
                  : type === 'current'
                    ? 'var(--gold)'
                    : 'var(--surface3)',
                border: type === 'future' ? '1px solid var(--border2)' : 'none',
                animation: type === 'current' ? 'pulse-wk 1.5s ease-in-out infinite' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Summary */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: 'var(--text3)',
        marginTop: '12px',
        letterSpacing: '0.3px',
      }}>
        <span style={{ color: 'var(--crimson)' }}>{usedCount.toLocaleString()} {t('calWeeksUsedSuffix')}</span>
        {' · '}
        <span style={{ color: 'var(--text2)' }}>{remaining.toLocaleString()} {t('calWeeksRemainingSuffix')}</span>
        {' '}{t('calOfWord')}{' '}
        <span>{TOTAL.toLocaleString()}</span>
      </p>
    </div>
  )
}
