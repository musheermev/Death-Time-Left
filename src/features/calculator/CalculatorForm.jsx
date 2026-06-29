import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../utils/i18n'

const QUESTIONS = [
  {
    id: 'dob',
    type: 'date',
    label: 'ENTER YOUR DATE OF BIRTH',
    labelKey: 'calcQ1Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--crimson)" strokeWidth="1.5"/>
        <path d="M3 9h18" stroke="var(--crimson)" strokeWidth="1.5"/>
        <path d="M8 2v4M16 2v4" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sleep',
    type: 'choice',
    label: 'How many hours do you sleep per night?',
    labelKey: 'calcQ2Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    options: [
      { label: 'Under 5 hrs', labelKey: 'calcQ2Opt1', value: -3 },
      { label: '5–6 hrs', labelKey: 'calcQ2Opt2', value: -1 },
      { label: '7–8 hrs', labelKey: 'calcQ2Opt3', value: 2 },
      { label: '9+ hrs', labelKey: 'calcQ2Opt4', value: 0 },
    ],
  },
  {
    id: 'smoke',
    type: 'choice',
    label: 'Do you smoke?',
    labelKey: 'calcQ3Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 17h15v3H2z" stroke="var(--crimson)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M19 17v3" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 10c0-2 2-2 2-4" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 10c0-2 2-2 2-4" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    options: [
      { label: 'Never', labelKey: 'calcQ3Opt1', value: 0 },
      { label: 'Quit 5+ yrs ago', labelKey: 'calcQ3Opt2', value: 2 },
      { label: 'Occasionally', labelKey: 'calcQ3Opt3', value: -4 },
      { label: 'Daily', labelKey: 'calcQ3Opt4', value: -8 },
    ],
  },
  {
    id: 'diet',
    type: 'choice',
    label: "How's your diet?",
    labelKey: 'calcQ4Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="13" r="7" stroke="var(--crimson)" strokeWidth="1.5"/>
        <path d="M12 6V4M9 4c0 2 3 2 3 4" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    options: [
      { label: 'Poor — fast food', labelKey: 'calcQ4Opt1', value: -2 },
      { label: 'Average', labelKey: 'calcQ4Opt2', value: 0 },
      { label: 'Good', labelKey: 'calcQ4Opt3', value: 3 },
      { label: 'Excellent', labelKey: 'calcQ4Opt4', value: 5 },
    ],
  },
  {
    id: 'exercise',
    type: 'choice',
    label: 'Exercise frequency?',
    labelKey: 'calcQ5Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 12h2l2-6 4 12 2-6h2" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    options: [
      { label: 'Sedentary', labelKey: 'calcQ5Opt1', value: 0 },
      { label: '1–2x/week', labelKey: 'calcQ5Opt2', value: 2 },
      { label: '3–4x/week', labelKey: 'calcQ5Opt3', value: 4 },
      { label: '5+x/week', labelKey: 'calcQ5Opt4', value: 6 },
    ],
  },
  {
    id: 'stress',
    type: 'choice',
    label: 'Stress level?',
    labelKey: 'calcQ6Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="var(--crimson)" strokeWidth="1.5"/>
        <path d="M8 15s1.5-2 4-2 4 2 4 2" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="10" r="1" fill="var(--crimson)"/>
        <circle cx="15" cy="10" r="1" fill="var(--crimson)"/>
      </svg>
    ),
    options: [
      { label: 'Burning out', labelKey: 'calcQ6Opt1', value: -4 },
      { label: 'High', labelKey: 'calcQ6Opt2', value: -2 },
      { label: 'Moderate', labelKey: 'calcQ6Opt3', value: 0 },
      { label: 'Chill', labelKey: 'calcQ6Opt4', value: 3 },
    ],
  },
  {
    id: 'alcohol',
    type: 'choice',
    label: 'Alcohol?',
    labelKey: 'calcQ7Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 3l2 8h8l2-8H6zM10 11v8M14 11v8M8 19h8" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    options: [
      { label: 'Never', labelKey: 'calcQ7Opt1', value: 0 },
      { label: 'Social', labelKey: 'calcQ7Opt2', value: -1 },
      { label: 'Regular', labelKey: 'calcQ7Opt3', value: -4 },
      { label: 'Heavy', labelKey: 'calcQ7Opt4', value: -8 },
    ],
  },
  {
    id: 'bmi',
    type: 'choice',
    label: 'Your BMI range?',
    labelKey: 'calcQ8Title',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c-4 0-7 3.5-7 7 0 5 7 11 7 11s7-6 7-11c0-3.5-3-7-7-7z" stroke="var(--crimson)" strokeWidth="1.5"/>
        <circle cx="12" cy="10" r="2.5" stroke="var(--crimson)" strokeWidth="1.5"/>
      </svg>
    ),
    options: [
      { label: 'Underweight', labelKey: 'calcQ8Opt1', value: -2 },
      { label: 'Normal', labelKey: 'calcQ8Opt2', value: 2 },
      { label: 'Overweight', labelKey: 'calcQ8Opt3', value: -2 },
      { label: 'Obese', labelKey: 'calcQ8Opt4', value: -5 },
    ],
  },
]

function useCardAnimation() {
  const [anim, setAnim] = useState('enter') // 'enter' | 'idle' | 'exit-left'
  const [dir, setDir] = useState(1) // 1 = forward, -1 = back

  const triggerExit = (direction, cb) => {
    setDir(direction)
    setAnim('exit')
    setTimeout(cb, 260)
  }

  const triggerEnter = () => {
    setAnim('hidden')
    setTimeout(() => setAnim('enter'), 20)
  }

  return { anim, dir, triggerExit, triggerEnter }
}

export default function CalculatorForm({ onComplete }) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [dob, setDob] = useState('')
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const { anim, dir, triggerExit, triggerEnter } = useCardAnimation()

  const q = QUESTIONS[current]
  const total = QUESTIONS.length
  const pct = Math.round(((current) / total) * 100)

  const goNext = () => {
    triggerExit(1, () => {
      setCurrent(c => c + 1)
      setSelected(null)
      triggerEnter()
    })
  }

  const goBack = () => {
    triggerExit(-1, () => {
      setCurrent(c => c - 1)
      setSelected(answers[QUESTIONS[current - 1]?.id] ?? null)
      triggerEnter()
    })
  }

  const handleChoice = (opt) => {
    setSelected(opt.value)
    setAnswers(prev => ({ ...prev, [q.id]: opt.value }))
    if (current < total - 1) {
      setTimeout(() => {
        triggerExit(1, () => {
          setCurrent(c => c + 1)
          setSelected(null)
          triggerEnter()
        })
      }, 220)
    }
  }

  const handleSubmit = () => {
    if (!dob) return
    if (current === total - 1) {
      onComplete(new Date(dob), answers)
    } else {
      goNext()
    }
  }

  const canProceed = q.type === 'date' ? !!dob : selected !== null

  const cardStyle = {
    transform: anim === 'enter'
      ? 'translateX(0)' 
      : anim === 'exit'
        ? `translateX(${dir > 0 ? '-110px' : '110px'})`
        : `translateX(${dir > 0 ? '110px' : '-110px'})`,
    opacity: anim === 'idle' || anim === 'enter' ? 1 : 0,
    transition: anim === 'exit'
      ? 'transform 250ms ease-in, opacity 250ms ease-in'
      : 'transform 300ms ease-out, opacity 300ms ease-out',
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 16px' }}>

      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--text3)',
            letterSpacing: '1px',
          }}>{current + 1} {t('calcOf')} {total}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--crimson)',
          }}>{pct}%</span>
        </div>
        <div style={{
          height: '3px',
          background: 'var(--surface3)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--crimson)',
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '40px 36px',
        overflow: 'hidden',
        ...cardStyle,
      }}>
        {/* Icon */}
        <div style={{ marginBottom: '20px' }}>{q.icon}</div>

        {/* Label */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '22px',
          color: 'var(--text1)',
          marginBottom: '28px',
          lineHeight: 1.3,
        }}>{t(q.labelKey)}</p>

        {/* Date input */}
        {q.type === 'date' && (
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            min="1900-01-01"
            style={{
              width: '100%',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '24px',
              color: 'var(--text1)',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '16px 20px',
              outline: 'none',
              colorScheme: 'dark',
              cursor: 'pointer',
            }}
          />
        )}

        {/* Choice buttons */}
        {q.type === 'choice' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}>
            {q.options.map((opt) => {
              const isSel = selected === opt.value && answers[q.id] === opt.value
              return (
                <button
                  key={opt.label}
                  onClick={() => handleChoice(opt)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    padding: '14px 16px',
                    borderRadius: '50px',
                    border: isSel ? '1px solid var(--crimson)' : '1px solid var(--border2)',
                    background: isSel ? 'var(--crimson)' : 'var(--surface2)',
                    color: isSel ? '#fff' : 'var(--text2)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => {
                    if (!isSel) {
                      e.currentTarget.style.borderColor = 'var(--crimson)'
                      e.currentTarget.style.color = 'var(--text1)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSel) {
                      e.currentTarget.style.borderColor = 'var(--border2)'
                      e.currentTarget.style.color = 'var(--text2)'
                    }
                  }}
                >
                  {t(opt.labelKey)}
                </button>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '32px',
          justifyContent: current === 0 ? 'flex-end' : 'space-between',
          alignItems: 'center',
        }}>
          {current > 0 && (
            <button onClick={goBack} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'var(--text3)',
              background: 'transparent',
              border: '1px solid var(--border2)',
              borderRadius: '10px',
              padding: '11px 20px',
              cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text1)'; e.currentTarget.style.borderColor = 'var(--text3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            >{t('calcBack')}</button>
          )}

          {/* On date card show a Next button; on last card show Calculate */}
          {q.type === 'date' && (
            <button
              onClick={handleSubmit}
              disabled={!canProceed}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                color: canProceed ? '#fff' : 'var(--text3)',
                background: canProceed ? 'var(--crimson)' : 'var(--surface3)',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 28px',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s',
              }}
            >{t('calcContinue')}</button>
          )}

          {current === total - 1 && (
            <button
              onClick={() => onComplete(new Date(dob), answers)}
              disabled={selected === null}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: '#fff',
                background: selected !== null ? 'var(--crimson)' : 'var(--surface3)',
                border: 'none',
                borderRadius: '10px',
                padding: '13px 28px',
                cursor: selected !== null ? 'pointer' : 'not-allowed',
                letterSpacing: '0.3px',
                transition: 'background 0.2s',
              }}
            >{t('calcCalculate')}</button>
          )}
        </div>
      </div>
    </div>
  )
}
