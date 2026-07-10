import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const label = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
  letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
  textTransform: 'uppercase',
}
const h1Style = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
  fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15,
  color: 'var(--text1)', marginBottom: '20px', letterSpacing: '-1px',
}
const introStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: '17px',
  color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px',
}
const h2Style = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
  fontSize: '22px', color: 'var(--text1)', marginTop: '40px', marginBottom: '14px',
}
const pStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: '15px',
  color: 'var(--text2)', lineHeight: 1.75, marginBottom: '14px',
}
const linkStyle = { color: 'var(--crimson)' }

const FAQS = [
  {
    q: "How many hours of sleep is best for longevity?",
    a: "Cohort research consistently points to 7–8 hours a night. A 2025 meta-analysis of 79 cohort studies found sleeping under 7 hours carries a 14% higher all-cause mortality risk compared to the 7–8 hour band, while sleeping 9 or more hours carries a 34% higher risk — a wider gap on the long-sleep side than most people expect.",
  },
  {
    q: "Is sleeping too much bad for you?",
    a: "Statistically, yes — long sleep duration (9+ hours) is associated with a larger mortality risk increase than short sleep in recent meta-analyses, and the association is more pronounced in women. It's worth noting long sleep is often a marker of an underlying issue — illness, depression, or poor sleep quality that pushes someone to need more time in bed — rather than a direct cause of harm on its own.",
  },
  {
    q: "Does sleep quality matter more than sleep duration?",
    a: "A 2024 study in the journal SLEEP, tracking over 60,000 people with wearable devices, found sleep regularity — going to bed and waking at consistent times — was a stronger predictor of mortality risk than total sleep duration. Someone sleeping a consistent 6.5 hours nightly may statistically be doing better than someone averaging 7.5 hours with wildly inconsistent timing.",
  },
  {
    q: "Can bad sleep increase Alzheimer's risk?",
    a: "Emerging evidence points that way. A 2025 Yale School of Medicine study found people getting less slow-wave (deep) and REM sleep showed smaller volumes, over a decade later, in a brain region among the earliest affected in Alzheimer's disease. Separate 2025–2026 research found people who take longer to reach REM sleep each night show higher levels of amyloid-beta and p-tau181 — established Alzheimer's biomarkers.",
  },
  {
    q: "Is 6 hours of sleep enough?",
    a: "For most adults, no — 6 hours falls in the 'short sleep' category linked to a measurably higher mortality risk across large cohort studies. Some individuals genuinely function well on less due to rare genetic variants, but this is uncommon; for the general population, consistently sleeping 6 hours or less is associated with worse long-term health outcomes, not a harmless personal preference.",
  },
  {
    q: "Does sleeping at the same time every night actually matter?",
    a: "Based on current evidence, yes — arguably more than hitting a specific number of hours. Objective, wearable-tracked data from the 2024 SLEEP journal study found irregular sleep-wake timing was independently linked to higher mortality risk, even after accounting for total sleep duration.",
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
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--text1)', lineHeight: 1.4 }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
          <path d="M3 6l5 5 5-5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.25s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '18px' }}>{a}</p>
      </div>
    </div>
  )
}

export default function SleepAndLongevity() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sleep and Longevity: What the Research Actually Says About Living Longer',
    description: "What cohort studies and 2025-2026 sleep research actually say about sleep duration, regularity, and deep/REM sleep's link to mortality and Alzheimer's risk.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-10',
    dateModified: '2026-07-10',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Helmet>
        <title>Sleep and Longevity 2026 — What the Research Actually Says</title>
        <meta name="description" content="Sleeping under 7 hours raises mortality risk by 14%, over 9 hours by 34%. What 2025-2026 research says about sleep duration, regularity, and deep sleep's link to Alzheimer's." />
        <meta name="keywords" content="sleep and longevity, how much sleep for longevity, sleep duration life expectancy, does sleep affect how long you live, deep sleep Alzheimer's risk, sleep regularity mortality" />
        <meta property="og:title" content="Sleep and Longevity 2026 — What the Research Actually Says" />
        <meta property="og:description" content="Sleeping under 7 hours raises mortality risk by 14%, over 9 hours by 34%. Here's what the actual research says." />
        <meta property="og:url" content="https://www.deathtimeleft.com/sleep-and-longevity" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sleep and Longevity 2026 — What the Research Actually Says" />
        <meta name="twitter:description" content="What 2025-2026 sleep research actually says about longevity, regularity, and Alzheimer's risk." />
        <link rel="canonical" href="https://www.deathtimeleft.com/sleep-and-longevity" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Longevity Factors</p>
          <h1 style={h1Style}>Sleep and Longevity: What the Research Actually Says About Living Longer</h1>

          <p style={introStyle}>
            Everyone recommends "eight hours of sleep" like it's a settled fact stitched into human biology, but the actual research is messier — and more interesting — than a single number. Cohort data spanning 2016 through early 2026 doesn't just say "sleep more." It says something closer to: get the right amount, consistently, in the right structure. Each of those three words is doing separate, measurable work on how long you live.
          </p>

          <img src="/images/blog/sleep-duration-mortality-risk-chart.webp" alt="U-shaped curve chart showing mortality risk increasing at both short and long sleep durations" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          <h2 style={h2Style}>Seven Hours Is the Number the Data Keeps Landing On</h2>
          <p style={pStyle}>
            A 2016 dose-response meta-analysis covering 35 studies and over 1.5 million participants found mortality risk climbs on both sides of 7 hours — sleeping 4 hours a night carried a 7% higher risk, sleeping 11 hours carried a 55% higher risk, both relative to the 7-hour mark. It's a U-shaped curve, not a "more is always better" line.
          </p>
          <p style={pStyle}>
            A more recent meta-analysis, covering 79 cohort studies and published in early 2025, sharpens the picture: sleeping under 7 hours carries a 14% higher all-cause mortality risk (hazard ratio 1.14) compared to the 7–8 hour reference band. Sleeping 9 or more hours carries a 34% higher risk (hazard ratio 1.34) — oversleeping is the bigger statistical red flag here, which isn't the part most "just sleep more" advice ever mentions.
          </p>

          <h2 style={h2Style}>Short Sleep Sits Uncomfortably Close to Smoking on the Risk Scale</h2>
          <p style={pStyle}>
            Recent longevity research summarized in early 2026 found short sleep's association with reduced life expectancy holds up even after controlling for smoking, physical inactivity, food access, insurance coverage, and social connection — and remains nearly as strong a predictor as obesity, only somewhat weaker than smoking itself. That's an uncomfortable comparison for anyone treating sleep as the flexible, sacrificeable part of the schedule. Cutting sleep to "get more done" is a bad trade dressed up as work ethic — the data just doesn't back the trade.
          </p>

          <h2 style={h2Style}>Long Sleep Isn't Automatically Better Either</h2>
          <p style={pStyle}>
            Long sleep duration is as much a marker as a cause. It often reflects an underlying issue — illness, depression, or fragmented sleep quality that pushes someone to need more total time in bed to get the same amount of restorative sleep. Sex-specific analysis in the 2025 meta-analysis found the mortality association with long sleep was more pronounced in women than men, a difference researchers haven't fully explained yet.
          </p>

          <h2 style={h2Style}>Consistency May Matter More Than the Number Itself</h2>
          <p style={pStyle}>
            A 2024 study published in the journal SLEEP tracked over 60,000 people using wearable devices for objective, rather than self-reported, sleep data. It found sleep regularity — going to bed and waking at consistent times — was a stronger predictor of mortality risk than sleep duration itself. Someone sleeping a consistent 6.5 hours every night may, statistically, be doing better than someone averaging 7.5 hours with wildly inconsistent bed and wake times. That upends the simple "hit your number" framing most sleep advice leans on.
          </p>

          <h2 style={h2Style}>What's Actually Happening in Deep and REM Sleep</h2>
          <p style={pStyle}>
            A 2025 Yale School of Medicine study led by researcher Gawon Cho found that people getting less slow-wave (deep) and REM sleep showed smaller volumes, more than a decade later, in the brain's inferior parietal region — one of the earliest areas affected in Alzheimer's disease. During deep sleep, the brain physically clears metabolic waste and dead cells; during REM, it consolidates memory and processes emotion. Skipping either isn't neutral — it's measurable, years down the line.
          </p>
          <p style={pStyle}>
            Separate research published across 2025 and 2026 found people who take longer to reach REM sleep each night showed higher levels of amyloid-beta and p-tau181 — established Alzheimer's biomarkers — even when their cognition tested normal at the time. Most adults should spend roughly 20–25% of total sleep time in deep sleep and a similar share in REM. US CDC data shows more than 1 in 3 American adults chronically fall short of the total sleep needed to reach that.
          </p>

          <img src="/images/blog/deep-sleep-rem-brain-health.webp" alt="Illustration of brain activity during deep sleep and REM sleep stages linked to long-term brain health" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />

          <h2 style={h2Style}>So What Do You Actually Do With This</h2>
          <p style={pStyle}>
            Skip the sleep-hack gimmicks. The single most controllable lever, based on the regularity data, is anchoring your wake time daily — even on weekends — rather than chasing a fixed bedtime. Protect a 7–8 hour window instead of drifting toward either extreme. And if you're persistently sleeping under 6 hours or over 9 hours for reasons you can't explain by choice, treat it as a signal worth investigating — thyroid issues, depression, and sleep apnea all show up first as a sleep-duration anomaly — rather than a lifestyle preference to defend.
          </p>

          {/* CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              Sleep is one of several factors that shape your personal estimate — see how yours adds up.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: meta-analysis of 79 cohort studies on sleep and mortality (PMC, 2025); dose-response meta-analysis of 35 cohort studies (Scientific Reports, 2016); sleep regularity and mortality study (SLEEP journal, Oxford Academic, 2024); Yale School of Medicine deep/REM sleep and Alzheimer's biomarker study (2025); US CDC sleep data.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}