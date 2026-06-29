import {
  getZodiac, getChineseZodiac, getSeason,
  getMoonPhase, getBirthstone, getBirthFlower, getGeneration
} from '../../utils/calculations'

import { useTranslation } from '../../utils/i18n'

const DAYS_KEYS = ['dowSun','dowMon','dowTue','dowWed','dowThu','dowFri','dowSat']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function BirthFacts({ dob }) {
  const { t } = useTranslation()
  const month = dob.getMonth() + 1
  const day = dob.getDate()
  const year = dob.getFullYear()
  const dow = dob.getDay()
  const quarter = Math.ceil(month / 3)

  const decade = t('bfDecadeTemplate').replace('{y}', Math.floor(year / 10) * 10)
  const gen = getGeneration(year)

  const facts = [
    { id: 'dow', label: t('bfDayOfBirth'), value: t(DAYS_KEYS[dow]) },
    { id: 'zodiac', label: t('bfZodiacSign'), value: getZodiac(month, day) },
    { id: 'chinese', label: t('bfChineseZodiac'), value: getChineseZodiac(year) },
    { id: 'season', label: t('bfBirthSeason'), value: getSeason(month) },
    { id: 'moon', label: t('bfMoonPhase'), value: getMoonPhase(dob) },
    { id: 'decade', label: t('bfDecadeBorn'), value: decade },
    { id: 'quarter', label: t('bfBirthQuarter'), value: `Q${quarter} ${year}` },
    { id: 'stone', label: t('bfBirthstone'), value: getBirthstone(month) },
    { id: 'flower', label: t('bfBirthFlower'), value: getBirthFlower(month) },
  ]

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--text3)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('bfSectionLabel')}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
      }} className="dtl-birthfacts-grid">
        {facts.map(({ id, label, value }) => (
          <div
            key={id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              borderRadius: '14px',
              padding: '18px 16px',
              cursor: 'default',
              transition: 'transform 0.18s ease, border-color 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--border2)'
            }}
          >
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '1.5px',
              color: 'var(--text3)',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>{label}</p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              color: 'var(--text1)',
              lineHeight: 1.3,
            }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Generation card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: '14px',
        padding: '20px',
        marginTop: '10px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
      }}>
        <div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>{t('bfGenerationLabel')}</p>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--text1)',
            marginBottom: '6px',
          }}>{gen.name} <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: '13px' }}>({gen.years})</span></p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'var(--text2)',
            lineHeight: 1.6,
          }}>{gen.desc}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .dtl-birthfacts-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
