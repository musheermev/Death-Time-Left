import { useState, useMemo, lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../utils/i18n'
import Header from '../components/layout/Header'
import PWAInstallBanner from '../components/ui/PWAInstallBanner'
import Footer from '../components/layout/Footer'
import CalculatorForm from '../features/calculator/CalculatorForm'
import AgeDisplay from '../features/results/AgeDisplay'
import LiveCounters from '../features/results/LiveCounters'
import LifeStats from '../features/results/LifeStats'
import DeathDate from '../features/results/DeathDate'
import TimeRemaining from '../features/results/TimeRemaining'
import LifeCalendar from '../features/results/LifeCalendar'
import DeathPredictor from '../features/results/DeathPredictor'
import BirthFacts from '../features/results/BirthFacts'
import Milestones from '../features/results/Milestones'
import { calcExactAge, calcDeathDate, calcPersonalizedLE, calcLifeProgress, getLifeArchetype } from '../utils/calculations'
import { GLOBAL_LE } from '../constants/lifeExpectancy'
import { AD_PLACEMENTS } from '../constants/adPlacements'
import AILifeNarrative from '../features/ai/AILifeNarrative'
import AIBucketList from '../features/ai/AIBucketList'
import AIDeathExplainer from '../features/ai/AIDeathExplainer'
const ReflexTest = lazy(() => import('../features/cognitive/ReflexTest'))
const MemoryTest = lazy(() => import('../features/cognitive/MemoryTest'))
const StroopTest = lazy(() => import('../features/cognitive/StroopTest'))
const BrainScore = lazy(() => import('../features/cognitive/BrainScore'))
import LifeLuckScore from '../features/results/LifeLuckScore'
import HistoryTimeline from '../features/results/HistoryTimeline'
import CelebrityComparison from '../features/results/CelebrityComparison'
import ParallelLives from '../features/results/ParallelLives'
import WouldYouRather from '../features/results/WouldYouRather'
import DeathRoulette from '../features/results/DeathRoulette'
import LifeInNumbers from '../features/results/LifeInNumbers'
import StoicQuote from '../features/results/StoicQuote'
const ShareCard = lazy(() => import('../features/results/ShareCard'))

const FAQS = [
  {
    q: 'How is my life expectancy calculated?', qKey: 'faqQ1',
    aKey: 'faqA1',
  },
  {
    q: 'Can this tool predict my actual death date?', qKey: 'faqQ2',
    aKey: 'faqA2',
  },
  {
    q: 'Is my data stored anywhere?', qKey: 'faqQ3',
    aKey: 'faqA3',
  },
  {
    q: 'How does the Life Luck Score work?', qKey: 'faqQ4',
    aKey: 'faqA4',
  },
  {
    q: 'What are the cognitive brain tests?', qKey: 'faqQ5',
    aKey: 'faqA5',
  },
  {
    q: 'How are life expectancy adjustments calculated?', qKey: 'faqQ6',
    aKey: 'faqA6',
  },
  {
    q: 'What does the Life in Weeks calendar show?', qKey: 'faqQ7',
    aKey: 'faqA7',
  },
  {
    q: 'Which countries are supported?', qKey: 'faqQ8',
    aKey: 'faqA8',
  },
  {
    q: 'Is this tool suitable for medical decisions?', qKey: 'faqQ9',
    aKey: 'faqA9',
  },
  {
    q: 'How accurate is the birth moon phase?', qKey: 'faqQ10',
    aKey: 'faqA10',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border2)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '18px 0', background: 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
          fontSize: '15px', color: 'var(--text1)', lineHeight: 1.4,
        }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
          <path d="M3 6l5 5 5-5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{
        maxHeight: open ? '400px' : '0', opacity: open ? 1 : 0,
        transition: 'max-height 0.35s ease, opacity 0.25s ease', overflow: 'hidden',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '18px',
        }}>{a}</p>
      </div>
    </div>
  )
}

function SectionLoader() {
  return (
    <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: 'var(--gold)', animation: 'dtl-pulse2 1s ease-in-out infinite',
      }} />
    </div>
  )
}

function AdSlot({ slot }) {
  return (
    <div className={slot.className} id={slot.id} style={{ margin: '0 0 24px', minHeight: '1px' }}>
      {/* insert ad code here */}
    </div>
  )
}

const STATS = [
  { value: '8.2B+', label: 'People alive in 2026', labelKey: 'statPeopleAlive' },
  { value: '72.6', label: 'WHO avg lifespan (yrs)', labelKey: 'statAvgLifespan' },
  { value: '~2.5B', label: 'Seconds in a life', labelKey: 'statSecondsInLife' },
  { value: '30%', label: 'Spent sleeping', labelKey: 'statSpentSleeping' },
]

export default function Home() {
  const { t } = useTranslation()
  const [result, setResult] = useState(null)

  const [reflexScore, setReflexScore] = useState(null)
  const [memoryScore, setMemoryScore] = useState(null)
  const [stroopScore, setStroopScore] = useState(null)

  const handleResults = (dob, lifestyle) => {
    setResult({ dob, lifestyle })
    sessionStorage.setItem('dtl-dob', dob.toISOString())
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  // Derived values — only computed when result exists
  const derived = useMemo(() => {
    if (!result) return null
    const { dob, lifestyle } = result
    const now = new Date()
    const age = calcExactAge(dob, now)
    const totalDays = Math.floor((now - dob) / 86400000)
    const totalWeeks = Math.floor(totalDays / 7)
    const deathDate = calcDeathDate(dob, GLOBAL_LE)

    // Archetype from lifestyle
    const smoke = lifestyle?.smoke ?? 0
    const exercise = lifestyle?.exercise ?? 0
    const stress = lifestyle?.stress ?? 0
    const diet = lifestyle?.diet ?? 0
    let archetype = t('archBalanced')
    if (smoke <= -4) archetype = t('archRiskTaker')
    else if (exercise >= 4 && diet >= 3) archetype = t('archOptimizer')
    else if (stress <= -2) archetype = t('archBurnedOut')
    else if (exercise === 0 && diet <= 0) archetype = t('archSedentary')

    // Generation
    const birthYear = dob.getFullYear()
    let generation = 'Millennial'
    if (birthYear <= 1945) generation = 'Silent Generation'
    else if (birthYear <= 1964) generation = 'Baby Boomer'
    else if (birthYear <= 1980) generation = 'Gen X'
    else if (birthYear <= 1996) generation = 'Millennial'
    else if (birthYear <= 2012) generation = 'Gen Z'
    else generation = 'Gen Alpha'

    // Personalized LE
    const personalLE = calcPersonalizedLE(GLOBAL_LE, lifestyle ?? {})
    const daysLeft = Math.max(0, Math.floor((calcDeathDate(dob, personalLE) - now) / 86400000))

    const archetypeData = getLifeArchetype(lifestyle ?? {})
    return { age, totalDays, totalWeeks, deathDate, archetype, generation, personalLE, daysLeft, archetypeData }
  }, [result])

  return (
    <>
      <Helmet>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta name="keywords" content={t('metaKeywords')} />
        <meta property="og:title" content={t('ogTitle')} />
        <meta property="og:description" content={t('ogDescription')} />
        <meta property="og:url" content="https://www.deathtimeleft.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('ogTitle')} />
        <meta name="twitter:description" content={t('ogDescription')} />
        <meta name="twitter:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <link rel="canonical" href="https://www.deathtimeleft.com" />
      </Helmet>

      <Header />

      <PWAInstallBanner />

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', background: 'rgba(192,57,43,0.1)',
            border: '1px solid rgba(192,57,43,0.25)', borderRadius: '50px', marginBottom: '28px',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="var(--crimson)" strokeWidth="1.2"/>
              <path d="M6.5 3.5v3.2l2 1.2" stroke="var(--crimson)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
              color: 'var(--crimson)', letterSpacing: '1px',
            }}>{t('heroEyebrow')}</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1,
            color: 'var(--text1)', marginBottom: '20px', letterSpacing: '-1.5px',
          }}>
            {t('heroTitle1')}<br />
            <span style={{ color: 'var(--crimson)' }}>{t('heroTitle2')}</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text2)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 44px',
          }}>
            {t('heroSub')}
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
            background: 'var(--border2)', border: '1px solid var(--border2)',
            borderRadius: '16px', overflow: 'hidden', maxWidth: '680px', margin: '0 auto',
          }} className="dtl-stats-grid">
            {STATS.map((s) => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                  fontSize: '22px', color: 'var(--crimson)', marginBottom: '4px',
                }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', lineHeight: 1.4 }}>{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section style={{ padding: '0 0 80px' }}>
          <CalculatorForm onComplete={handleResults} />
        </section>

        {/* Results */}
        <section id="results" style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 24px 80px',
          display: result ? 'block' : 'none',
        }}>
          {result && derived && (
            <>
              <AgeDisplay dob={result.dob} />

              <LiveCounters dobTimestamp={result.dob.getTime()} />

              <AdSlot slot={AD_PLACEMENTS[0]} />

              <LifeStats totalDays={derived.totalDays} />

              <DeathDate dob={result.dob} yearsAge={derived.age.years} />

              <TimeRemaining deathDate={derived.deathDate} />

              <LifeCalendar totalWeeks={derived.totalWeeks} />

              <AdSlot slot={AD_PLACEMENTS[1]} />

              <DeathPredictor dob={result.dob} lifestyleAnswers={result.lifestyle} />

              <AIDeathExplainer
                lifestyle={result.lifestyle}
                personalLE={derived.personalLE}
                baseLE={GLOBAL_LE}
              />

              <AILifeNarrative
                dob={result.dob}
                ageYears={derived.age.years}
                totalDays={derived.totalDays}
                generation={derived.generation}
                lifestyle={result.lifestyle}
              />

              <AIBucketList
                ageYears={derived.age.years}
                daysLeft={derived.daysLeft}
                archetype={derived.archetype}
                lifestyle={result.lifestyle}
              />

              {/* Cognitive Tests */}
              <div style={{ marginBottom: '8px' }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
                  letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '16px',
                  textTransform: 'uppercase',
                }}>{t('homeBrainTestsLabel')}</p>
              </div>

              <Suspense fallback={<SectionLoader />}>
                <ReflexTest onComplete={(ms) => setReflexScore(ms)} />
                <MemoryTest ageYears={derived.age.years} onComplete={(score) => setMemoryScore(score)} />
                <StroopTest ageYears={derived.age.years} onComplete={(score) => setStroopScore(score)} />
                <BrainScore
                  reflexScore={reflexScore}
                  memoryScore={memoryScore}
                  stroopScore={stroopScore}
                  ageYears={derived.age.years}
                />
              </Suspense>

              {/* Personality Archetype Card */}
              <section style={{
                background: 'var(--surface)', border: `1px solid ${derived.archetypeData.color}33`,
                borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
              }}>
                <div style={{ height: '3px', background: derived.archetypeData.color }} />
                <div style={{ padding: '36px 32px' }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
                    letterSpacing: '3px', color: derived.archetypeData.color,
                    marginBottom: '10px', textTransform: 'uppercase',
                  }}>{t('homeArchetypeLabel')}</p>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(24px, 4vw, 36px)', color: derived.archetypeData.color,
                    marginBottom: '16px', letterSpacing: '-0.5px',
                  }}>{derived.archetypeData.name}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '16px',
                    color: 'var(--text1)', lineHeight: 1.7, marginBottom: '24px',
                    maxWidth: '560px',
                  }}>{derived.archetypeData.desc}</p>
                  <button
                    onClick={() => {
                      const text = `${t('homeArchetypeClipboardPrefix')} ${derived.archetypeData.name} — "${derived.archetypeData.desc}" ${t('homeArchetypeClipboardSuffix')}`
                      navigator.clipboard?.writeText(text).catch(() => {})
                      alert(t('homeArchetypeCopiedAlert'))
                    }}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px',
                      color: '#fff', background: derived.archetypeData.color,
                      border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer',
                    }}
                  >{t('homeShareArchetypeBtn')}</button>
                </div>
              </section>

              <BirthFacts dob={result.dob} />

              <Milestones dob={result.dob} />

              <LifeLuckScore dob={result.dob} />

              <HistoryTimeline dob={result.dob} ageYears={derived.age.years} />

              <CelebrityComparison ageYears={derived.age.years} />

              <ParallelLives totalDays={derived.totalDays} />

              <WouldYouRather />

              <DeathRoulette />

              <LifeInNumbers ageYears={derived.age.years} totalDays={derived.totalDays} />

              <StoicQuote />

              <Suspense fallback={<SectionLoader />}>
                <ShareCard
                  dob={result.dob}
                  ageYears={derived.age.years}
                  totalDays={derived.totalDays}
                  deathDate={derived.deathDate}
                  lifePct={calcLifeProgress(derived.age.years)}
                  lifeArchetype={derived.archetype}
                />
              </Suspense>

              <AdSlot slot={AD_PLACEMENTS[2]} />
            </>
          )}
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 96px' }}>
          <div style={{ marginBottom: '36px' }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
              letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
            }}>{t('homeFaqEyebrow')}</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: '28px', color: 'var(--text1)', letterSpacing: '-0.5px',
            }}>{t('homeFaqTitle')}</h2>
          </div>
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={t(item.qKey)} a={t(item.aKey)} />
          ))}
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .dtl-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes dtl-pulse2 {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  )
}