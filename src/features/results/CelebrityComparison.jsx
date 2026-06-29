import { useMemo } from 'react'
import { CELEBRITIES } from '../../utils/celebrities'
import { useTranslation } from '../../utils/i18n'

export default function CelebrityComparison({ ageYears }) {
  const { t } = useTranslation()
  const comparisons = useMemo(() => {
    const outlived = []
    const close = []
    const longer = []

    CELEBRITIES.forEach((c) => {
      const diff = c.diedAge - ageYears
      if (diff <= 0) outlived.push({ ...c, diff: Math.abs(diff) })
      else if (diff <= 10) close.push({ ...c, diff })
      else longer.push({ ...c, diff })
    })

    outlived.sort((a, b) => a.diff - b.diff)
    close.sort((a, b) => a.diff - b.diff)
    longer.sort((a, b) => b.diff - a.diff) // most aspirational first

    const picks = [
      ...outlived.slice(0, 2).map((c) => ({ ...c, kind: 'outlived' })),
      ...close.slice(0, 2).map((c) => ({ ...c, kind: 'close' })),
      ...longer.slice(0, 1).map((c) => ({ ...c, kind: 'longer' })),
    ]

    if (picks.length < 5) {
      const used = new Set(picks.map((p) => p.name))
      const rest = [
        ...outlived.map((c) => ({ ...c, kind: 'outlived' })),
        ...close.map((c) => ({ ...c, kind: 'close' })),
        ...longer.map((c) => ({ ...c, kind: 'longer' })),
      ].filter((c) => !used.has(c.name))
      for (const c of rest) {
        if (picks.length >= 5) break
        picks.push(c)
      }
    }

    return picks.slice(0, 5)
  }, [ageYears])

  function renderLine(c) {
    if (c.kind === 'outlived') {
      return (
        <>
          {t('celOutlived')} <strong>{c.name}</strong>, {t('celWhodied')} {c.diedAge}
          {c.diff > 0 ? ` — by ${c.diff} year${c.diff === 1 ? '' : 's'}` : ''}.
        </>
      )
    }
    if (c.kind === 'close') {
      return (
        <>
          <strong>{c.name}</strong> {t('celWhodied')} {c.diedAge} — {t('celYouHave')} {c.diff} {t('celMore')} to reach that age.
        </>
      )
    }
    return (
      <>
        <strong>{c.name}</strong> {t('celLived')} {c.diedAge} — {t('celYouHave')} {c.diff} {t('celMore')} to reach that.
      </>
    )
  }

  return (
    <section className="celebrity-comparison">
      <h3 className="cc-title">{t('secCelebrity')}</h3>
      <ul className="cc-list">
        {comparisons.map((c, i) => (
          <li key={i} className={`cc-item cc-item--${c.kind}`}>
            <span className="cc-field">{c.field}</span>
            <p className="cc-line">{renderLine(c)}</p>
          </li>
        ))}
      </ul>
      <p className="cc-footer">{t('celTagline')}</p>
    </section>
  )
}