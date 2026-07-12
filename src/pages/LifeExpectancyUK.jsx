import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const label = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase' }
const h1Style = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, color: 'var(--text1)', marginBottom: '20px', letterSpacing: '-1px' }
const introStyle = { fontFamily: "'Inter', sans-serif", fontSize: '17px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px' }
const h2Style = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '22px', color: 'var(--text1)', marginTop: '40px', marginBottom: '14px' }
const pStyle = { fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '14px' }
const linkStyle = { color: 'var(--crimson)' }

const NATION_ROWS = [
  { nation: 'England', male: '79.1', female: '83.0' },
  { nation: 'Northern Ireland', male: '78.6', female: '82.2' },
  { nation: 'Wales', male: '78.1', female: '82.0' },
  { nation: 'Scotland', male: '76.7', female: '80.7' },
]

const FAQS = [
  {
    q: "What is the UK's life expectancy in 2026?",
    a: "There's no confirmed single 2026 figure yet — UK life expectancy data is published on a lag. The most recent official update, released by GOV.UK in May 2026, put England's single-year 2025 life expectancy at 80.0 years for men (the first time it has reached 80) and 83.8 years for women. UK-wide period life tables (2021-2023, the most recent full three-year dataset) show 78.8 years for men and 82.8 for women — a slightly different, broader measure covering all four nations rather than England alone.",
  },
  {
    q: "Why is Scotland's life expectancy lower than England's?",
    a: "Scotland's life expectancy sits at roughly 76.7 years for men and 80.7 for women, about 2.3–2.4 years behind England for men. Researchers link the gap to higher rates of alcohol-related and drug-related deaths, higher smoking prevalence historically, and deeper pockets of deprivation concentrated in specific urban areas, particularly around Glasgow.",
  },
  {
    q: "What is healthy life expectancy, and why is it so much lower than life expectancy?",
    a: "Healthy life expectancy measures the years a person can expect to live in self-assessed good health, not just years alive. In England it sits around 62.4 years for men and 62.7 for women — meaning the average person spends 16 to 18 years of their life in declining health before death. That gap is arguably a bigger story than the headline life expectancy number itself.",
  },
  {
    q: "How big is the health gap between rich and poor areas in the UK?",
    a: "Substantial, and widening. In England, men in the least deprived 10% of areas live to about 83.7 years on average versus 74.1 years in the most deprived 10% — a 9.6-year gap. For healthy life expectancy specifically, the gap is even starker: roughly 71 years in the least deprived areas versus 52 years in the most deprived.",
  },
  {
    q: "How many centenarians are there in the UK?",
    a: "The number of UK centenarians has roughly doubled from 8,300 in 2004 to 16,600 in 2024, or about 24 per 100,000 people. Wales has the highest proportion of any UK nation at 25.9 centenarians per 100,000 residents.",
  },
  {
    q: "Has UK life expectancy recovered from COVID-19?",
    a: "Yes, and more than fully in England's case. Male life expectancy in England has risen 1.5 years since the pandemic low point in 2020, and female life expectancy by 1.3 years. As of 2025 data, female life expectancy in England is significantly higher than the pre-pandemic 2019 estimate.",
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border2)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--text1)', lineHeight: 1.4 }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
          <path d="M3 6l5 5 5-5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.25s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '18px' }}>{a}</p>
      </div>
    </div>
  )
}

export default function LifeExpectancyUK() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UK Life Expectancy 2026: Record Highs, and a Health Gap That Keeps Widening',
    description: "England's male life expectancy just crossed 80 for the first time. But the real UK longevity story is the growing gap between lifespan and healthspan.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <Helmet>
        <title>UK Life Expectancy 2026 — Record Highs and a Widening Health Gap</title>
        <meta name="description" content="England's male life expectancy just crossed 80 for the first time (May 2026 data). Here's the full picture — nation-by-nation gaps, healthy life expectancy, and the deprivation divide." />
        <meta name="keywords" content="UK life expectancy, life expectancy UK 2026, England life expectancy record high, UK healthy life expectancy gap, Scotland vs England life expectancy" />
        <meta property="og:title" content="UK Life Expectancy 2026 — Record Highs and a Widening Health Gap" />
        <meta property="og:description" content="England's male life expectancy just crossed 80 for the first time. The real story is the widening gap between lifespan and healthspan." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/uk" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UK Life Expectancy 2026 — Record Highs and a Widening Health Gap" />
        <meta name="twitter:description" content="England's male life expectancy just crossed 80 for the first time — but the healthspan gap is the bigger story." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/uk" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>UK Life Expectancy 2026: Record Highs, and a Health Gap That Keeps Widening</h1>

          <p style={introStyle}>
            England's male life expectancy just crossed 80 years for the first time on record, according to data released by GOV.UK in May 2026. That's a genuinely notable milestone, and most coverage will stop right there. It shouldn't — because sitting underneath that headline number is a much less flattering statistic: the average UK adult now spends somewhere between 16 and 18 years of their life in declining health before they die, and that gap is widening fastest in the places that can least afford it.
          </p>

          <img src="/images/blog/uk-life-expectancy-2026-chart.webp" alt="Chart showing UK life expectancy trends by nation, England, Scotland, Wales, and Northern Ireland" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'England, Men (2025)', value: '80.0 yrs' },
              { label: 'England, Women (2025)', value: '83.8 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The Headline: England Crosses 80 for the First Time</h2>
          <p style={pStyle}>
            GOV.UK's May 2026 mortality profile update put England's single-year 2025 life expectancy at 80.0 years for men and 83.8 years for women — the first time male life expectancy in England has reached 80. It's worth separating this from the UK-wide period life tables (covering England, Scotland, Wales, and Northern Ireland together), which for the most recent full three-year window, 2021–2023, show 78.8 years for men and 82.8 for women. Both figures are correct; they're just measuring different things — a single-year England-only snapshot versus a smoothed three-year UK-wide average. Mixing them up is one of the more common mistakes in UK life expectancy reporting.
          </p>
          <p style={pStyle}>
            Since 2020, the pandemic's low point, male life expectancy in England has climbed 1.5 years and female life expectancy 1.3 years. As of 2025, female life expectancy has moved significantly above its pre-pandemic 2019 level — a genuine recovery, not just a return to where things were before COVID hit.
          </p>

          <h2 style={h2Style}>Not All of the UK Gets the Same Number</h2>
          <p style={pStyle}>
            Life expectancy varies more across the UK's four nations than most people realize. England sits at the top; Scotland trails by roughly 2.3 to 2.4 years for men.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>NATION</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>MEN</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>WOMEN</th>
                </tr>
              </thead>
              <tbody>
                {NATION_ROWS.map(row => (
                  <tr key={row.nation} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{row.nation}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.male}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.female}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            The divide shows up inside England too. In 2025, London had the highest regional life expectancy (81.1 years for men, 85.1 for women), while the North East had the lowest (78.4 for men, 82.3 for women) — nearly a three-year gap within a single country.
          </p>

          <h2 style={h2Style}>The Real Story Isn't Lifespan — It's Healthspan</h2>
          <p style={pStyle}>
            Here's the number that gets far less attention than it deserves. Healthy life expectancy — years lived in self-reported good health, not just years lived — sits at roughly 62.4 years for men and 62.7 for women in England. Subtract that from the headline figures and the average UK adult spends somewhere between 16 and 18 years in declining health before they die. That's not a small footnote; it's arguably the more important number for anyone trying to understand what a longer UK lifespan actually feels like day to day.
          </p>
          <p style={pStyle}>
            And the gap isn't distributed evenly. In England, men in the least deprived 10% of areas live to about 83.7 years on average, versus 74.1 years in the most deprived 10% — a 9.6-year gap that has widened from 8.4 years just over a decade ago. For healthy life expectancy specifically, the divide is even more brutal: roughly 71 years in the wealthiest areas versus 52 years in the poorest. Someone born in a deprived part of England can expect nearly two decades less time in good health than someone born a short drive away in a wealthier postcode. That's the part of the UK's longevity story that a single "life expectancy hits 80" headline completely erases.
          </p>

          <img src="/images/blog/uk-healthy-life-expectancy-deprivation-gap.webp" alt="Illustration representing the healthy life expectancy gap between wealthy and deprived areas in the UK" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />

          <h2 style={h2Style}>Centenarians and What's Actually Killing People</h2>
          <p style={pStyle}>
            The number of UK centenarians has roughly doubled over the past two decades, from 8,300 in 2004 to 16,600 in 2024 — about 24 per 100,000 people, with Wales leading at 25.9 per 100,000. On the mortality side, cancer, cardiovascular disease, dementia and Alzheimer's disease, respiratory disease, and liver disease together accounted for 77% of all deaths in England in 2025. All-cause mortality rates in 2025 were the lowest recorded since data collection began in 2001, and significantly below pre-pandemic 2019 levels — genuine progress, even while the healthspan and deprivation gaps remain the harder problem to solve.
          </p>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              National averages hide huge variation. Your personal estimate depends on your own age, lifestyle, and health.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: GOV.UK / Office for Health Improvement and Disparities, Mortality Profile May 2026 update; Office for National Statistics, National Life Tables UK 2021–2023 (released December 2025); ONS Healthy Life Expectancy, UK (released February 2026); ONS Estimates of the Very Old, UK: 2002–2024.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/life-expectancy/usa" style={linkStyle}>Life expectancy in the USA</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}