import { useState } from 'react'
import { calcDeathDate, calcPersonalizedLE } from '../../utils/calculations'
import { GLOBAL_LE } from '../../constants/lifeExpectancy'

import { useTranslation } from '../../utils/i18n'
import { formatDate } from '../../utils/dateHelpers'

const FACTORS = [
  {
    id: 'smoke', label: 'Smoking', labelKey: 'predFactorSmoke',
    options: [
      { label: 'Never', labelKey: 'calcQ3Opt1', value: 0 },
      { label: 'Quit 5+ yrs ago', labelKey: 'calcQ3Opt2', value: 2 },
      { label: 'Occasionally', labelKey: 'calcQ3Opt3', value: -4 },
      { label: 'Daily', labelKey: 'calcQ3Opt4', value: -8 },
    ],
  },
  {
    id: 'exercise', label: 'Exercise', labelKey: 'predFactorExercise',
    options: [
      { label: 'Sedentary', labelKey: 'calcQ5Opt1', value: 0 },
      { label: '1–2x/week', labelKey: 'calcQ5Opt2', value: 2 },
      { label: '3–4x/week', labelKey: 'calcQ5Opt3', value: 4 },
      { label: '5+x/week', labelKey: 'calcQ5Opt4', value: 6 },
    ],
  },
  {
    id: 'diet', label: 'Diet', labelKey: 'predFactorDiet',
    options: [
      { label: 'Poor — fast food', labelKey: 'calcQ4Opt1', value: -2 },
      { label: 'Average', labelKey: 'calcQ4Opt2', value: 0 },
      { label: 'Good', labelKey: 'calcQ4Opt3', value: 3 },
      { label: 'Excellent', labelKey: 'calcQ4Opt4', value: 5 },
    ],
  },
  {
    id: 'sleep', label: 'Sleep', labelKey: 'predFactorSleep',
    options: [
      { label: 'Under 5 hrs', labelKey: 'calcQ2Opt1', value: -3 },
      { label: '5–6 hrs', labelKey: 'calcQ2Opt2', value: -1 },
      { label: '7–8 hrs', labelKey: 'calcQ2Opt3', value: 2 },
      { label: '9+ hrs', labelKey: 'calcQ2Opt4', value: 0 },
    ],
  },
  {
    id: 'stress', label: 'Stress', labelKey: 'predFactorStress',
    options: [
      { label: 'Burning out', labelKey: 'calcQ6Opt1', value: -4 },
      { label: 'High', labelKey: 'calcQ6Opt2', value: -2 },
      { label: 'Moderate', labelKey: 'calcQ6Opt3', value: 0 },
      { label: 'Chill', labelKey: 'calcQ6Opt4', value: 3 },
    ],
  },
  {
    id: 'alcohol', label: 'Alcohol', labelKey: 'predFactorAlcohol',
    options: [
      { label: 'Never', labelKey: 'calcQ7Opt1', value: 0 },
      { label: 'Social', labelKey: 'calcQ7Opt2', value: -1 },
      { label: 'Regular', labelKey: 'calcQ7Opt3', value: -4 },
      { label: 'Heavy', labelKey: 'calcQ7Opt4', value: -8 },
    ],
  },
  {
    id: 'bmi', label: 'BMI Range', labelKey: 'predFactorBMI',
    options: [
      { label: 'Underweight', labelKey: 'calcQ8Opt1', value: -2 },
      { label: 'Normal', labelKey: 'calcQ8Opt2', value: 2 },
      { label: 'Overweight', labelKey: 'calcQ8Opt3', value: -2 },
      { label: 'Obese', labelKey: 'calcQ8Opt4', value: -5 },
    ],
  },
  {
    id: 'social', label: 'Social Life', labelKey: 'predFactorSocial',
    options: [
      { label: 'Isolated', labelKey: 'predSocialOpt1', value: -3 },
      { label: 'Limited', labelKey: 'predSocialOpt2', value: -1 },
      { label: 'Active', labelKey: 'predSocialOpt3', value: 2 },
      { label: 'Very social', labelKey: 'predSocialOpt4', value: 4 },
    ],
  },
  {
    id: 'family', label: 'Family History', labelKey: 'predFactorFamily',
    options: [
      { label: 'No major hereditary diseases', labelKey: 'predFamilyOpt1', value: 0 },
      { label: 'One parent: heart disease/cancer', labelKey: 'predFamilyOpt2', value: -3 },
      { label: 'Both parents: major diseases', labelKey: 'predFamilyOpt3', value: -6 },
      { label: 'Long-lived family (80+ avg)', labelKey: 'predFamilyOpt4', value: 4 },
    ],
  },
  {
    id: 'country', label: 'Country/Region', labelKey: 'predFactorCountry',
    options: [
      { label: 'High income (US/EU/JP/AU)', labelKey: 'predCountryOpt1', value: 5 },
      { label: 'Upper middle income', labelKey: 'predCountryOpt2', value: 2 },
      { label: 'Lower middle income', labelKey: 'predCountryOpt3', value: 0 },
      { label: 'Low income country', labelKey: 'predCountryOpt4', value: -5 },
    ],
  },
]

export default function DeathPredictor({ dob, lifestyleAnswers = {} }) {
  const { t, lang } = useTranslation()
  const initValues = () => {
    const init = {}
    FACTORS.forEach(f => {
      // Use pre-filled lifestyle answer if exists, else default to first option
      init[f.id] = f.id in lifestyleAnswers
        ? lifestyleAnswers[f.id]
        : f.options[0].value
    })
    return init
  }

  const [values, setValues] = useState(initValues)

  const totalAdj = Object.values(values).reduce((a, b) => a + b, 0)
  const personalizedLE = Math.max(50, GLOBAL_LE + totalAdj)
  const deathDate = calcDeathDate(dob, personalizedLE)
  const now = new Date()
  const yearsAge = (now - dob) / (365.25 * 86400000)
  const yearsRemaining = Math.max(0, personalizedLE - yearsAge).toFixed(1)
  const daysRemaining = Math.max(0, Math.floor((deathDate - now) / 86400000))

  const selectStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: 'var(--text1)',
    background: 'var(--surface2)',
    border: '1px solid var(--border2)',
    borderRadius: '8px',
    padding: '8px 10px',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    colorScheme: 'dark',
  }

  // Build factor bars for result card
  const factorBars = FACTORS.map(f => ({
    label: t(f.labelKey),
    value: values[f.id],
    positive: values[f.id] >= 0,
  }))

  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--crimson)',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>{t('predSectionLabel')}</p>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: '18px',
        padding: '28px',
      }}>
        {/* Dropdowns grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          marginBottom: '28px',
        }} className="dtl-predictor-grid">
          {FACTORS.map(f => (
            <div key={f.id}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '1.5px',
                color: 'var(--text3)',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>{t(f.labelKey)}</p>
              <select
                value={values[f.id]}
                onChange={e => setValues(prev => ({ ...prev, [f.id]: Number(e.target.value) }))}
                style={selectStyle}
              >
                {f.options.map(o => (
                  <option key={o.label} value={o.value} style={{ background: 'var(--surface)' }}>
                    {t(o.labelKey)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Result card */}
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '20px',
          }} className="dtl-pred-result-grid">
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '2px',
                color: 'var(--text3)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>{t('predResultDateLabel')}</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                color: 'var(--text1)',
                letterSpacing: '-0.3px',
              }}>
                {formatDate(deathDate, lang, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'var(--crimson)',
                marginTop: '6px',
              }}>
                {yearsRemaining} {t('predYearsRemainingSuffix')} · {daysRemaining.toLocaleString()} {t('predDaysSuffix')}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: 'var(--text3)',
                marginTop: '8px',
                fontStyle: 'italic',
              }}>
                {t('predAdjustNote')}
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '2px',
                color: 'var(--text3)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>{t('predFactorBreakdownLabel')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {factorBars.filter(f => f.value !== 0).map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text3)',
                      width: '70px',
                      flexShrink: 0,
                    }}>{f.label}</span>
                    <div style={{
                      flex: 1,
                      height: '4px',
                      background: 'var(--surface3)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(100, Math.abs(f.value) / 10 * 100)}%`,
                        background: f.positive ? 'var(--gold)' : 'var(--crimson)',
                        borderRadius: '2px',
                      }}/>
                    </div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: f.positive ? 'var(--gold)' : 'var(--crimson)',
                      width: '28px',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}>{f.positive ? '+' : ''}{f.value}y</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dtl-predictor-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .dtl-predictor-grid { grid-template-columns: 1fr !important; }
          .dtl-pred-result-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
