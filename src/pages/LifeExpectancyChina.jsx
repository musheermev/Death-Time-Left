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
    q: "What is China's life expectancy in 2026?",
    a: "China's National Health Commission reports 79.0 years as of the end of 2024, up 0.4 years from 2023 and 1.1 years since 2020. That's the official government figure. Independent estimates from the UN World Population Prospects and World Bank, using their own modeling, put China closer to 77.6-78.0 years for the same period — a gap worth knowing about rather than picking one number and pretending it's settled.",
  },
  {
    q: "Why do official Chinese life expectancy figures differ from UN or World Bank estimates?",
    a: "Partly methodology. WHO itself notes that reliable adult and elderly mortality data is hard to collect at scale, so international bodies model life expectancy using their own frameworks rather than relying solely on a country's self-reported figures. China's NHC and UN/World Bank data have historically tracked closely but haven't always moved in the same direction year to year — in the UN dataset, China's estimated life expectancy actually dipped slightly between 2023 and 2024 before rising again in 2025, while China's own reporting shows a steady climb across the same years.",
  },
  {
    q: "What's the gap between men and women in China?",
    a: "Around 5.3 years using the most recent breakdown available (2022): 76.0 years for men, 81.3 for women. That's narrower than the gap in Russia or Eastern Europe, but wider than in most of Western Europe.",
  },
  {
    q: "Is China's population shrinking?",
    a: "Yes. China's population fell for a third consecutive year in 2025, with a growth rate of about -0.24%. The fertility rate has dropped to roughly 0.93 children per woman, among the lowest in the world — below even Japan's and South Korea's. By the end of 2024, the population aged 60 and over reached 310.31 million, 22% of the country's total.",
  },
  {
    q: "Which Chinese provinces have the highest life expectancy?",
    a: "China's National Health Commission reported eight provincial-level regions exceeding 80 years as of 2024, without naming all eight in the same statement — but Shanghai and Beijing consistently top China's life expectancy rankings in other government data, reflecting the same wealth-and-healthcare-access pattern seen in most large countries.",
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

export default function LifeExpectancyChina() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "China Life Expectancy 2026: 79 Years Officially — and What Independent Data Shows Instead",
    description: "China's government reports life expectancy at 79.0 years for 2024. Independent UN and World Bank estimates tell a slightly different story — here's both, side by side.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Helmet>
        <title>China Life Expectancy 2026 — Official Data, the Aging Crisis, and What Independent Sources Show</title>
        <meta name="description" content="China's government reports life expectancy reaching 79.0 years in 2024. UN and World Bank estimates tell a slightly different story. Both numbers, the aging population crisis, and what's really driving the trend." />
        <meta name="keywords" content="China life expectancy, life expectancy in China 2026, China aging population, China fertility rate 2026, China life expectancy men women, China vs Japan life expectancy" />
        <meta property="og:title" content="China Life Expectancy 2026 — Official Data, the Aging Crisis, and What Independent Sources Show" />
        <meta property="og:description" content="China's government reports 79.0 years for 2024 — independent estimates tell a slightly different story. Both numbers, side by side." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/china" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="China Life Expectancy 2026 — Official Data vs. Independent Estimates" />
        <meta name="twitter:description" content="79.0 years, officially. Independent UN and World Bank data show something slightly different." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/china" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>China Life Expectancy 2026: 79 Years Officially — and What Independent Data Shows Instead</h1>

          <p style={introStyle}>
            China's government says life expectancy hit 79.0 years in 2024, ahead of schedule on its own five-year target. That's a real and reportable number. It's also not the only number that exists — UN and World Bank estimates, built from independent modeling rather than government self-reporting, land a bit lower. Here's both sets of figures, plainly, plus the demographic story underneath them that matters more than either headline number.
          </p>

          <img src="/images/blog/china-life-expectancy-2026-hero.webp" alt="Elderly residents in a park in China, representing the country's aging population and life expectancy trends" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Official (NHC, 2024)', value: '79.0 yrs' },
              { label: 'UN/World Bank estimate (2023)', value: '~77.95 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '20px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>What China's Government Says</h2>
          <p style={pStyle}>
            China's National Health Commission reported average life expectancy reaching 79.0 years by the end of 2024 — a 0.4-year rise from 2023 and 1.1 years higher than 2020, according to NHC head Lei Haichao. That means the country hit its 14th Five-Year Plan (2021-2025) target of adding roughly a year of life expectancy ahead of schedule. Eight provincial-level regions reportedly now exceed 80 years. China's next goal, announced for the 2026-2030 period, is to push the national average to around 80.
          </p>
          <p style={pStyle}>
            The NHC frames this as part of a broader public health buildout: 10.15 billion medical consultations handled nationwide in 2024, free immunization against 15 diseases, a four-tier disease control network reaching down to the county level, and continued declines in tuberculosis, hepatitis B, and HIV incidence. Maternal mortality fell to 14.3 per 100,000 and infant mortality to 4.0 per 1,000 — both real, verifiable improvements regardless of which life expectancy figure you use.
          </p>

          <h2 style={h2Style}>The Gap Between Official and Independent Estimates</h2>
          <p style={pStyle}>
            Here's the part worth being straightforward about instead of smoothing over: the UN World Population Prospects and World Bank, using their own demographic modeling rather than relying purely on government-reported figures, estimated China's life expectancy at 77.95 years for 2023 — noticeably below China's own reported trajectory for the same period. One dataset built on the UN's methodology even shows a slight dip from 77.95 in 2023 to 77.64 in 2024, before climbing again in 2025, which doesn't match the steady year-on-year rise in China's official reporting.
          </p>
          <p style={pStyle}>
            This isn't unique to China — WHO explicitly notes that a lack of complete, reliable mortality data, especially for adults and the elderly, forces international bodies to model life expectancy rather than take national figures at face value, and that this can create "minor differences compared with official life tables prepared by Member States." Whether the gap here is purely methodological or reflects something else is genuinely not a question this article can settle — what's fair to say is that both figures are cited by credible sources, they don't fully agree, and a reader comparing China's numbers to another country's should know that.
          </p>

          <h2 style={h2Style}>The Gender Gap and Regional Divide</h2>
          <p style={pStyle}>
            Using the most recent sex-disaggregated figures available (2022 UN data), Chinese men live to about 76.0 years on average and women to 81.3 — a gap of roughly 5.3 years, narrower than Russia's but wider than most of Western Europe's. China's life expectancy also runs several years behind neighboring Japan, South Korea, and Singapore, while sitting comfortably ahead of Vietnam, Kazakhstan, North Korea, Russia, and India, according to Wikipedia's compilation of UN and WHO comparative data.
          </p>
          <p style={pStyle}>
            The regional spread inside China is significant too, though the NHC hasn't published a full province-by-province breakdown alongside its 2024 announcement. Wealthier coastal regions — Shanghai and Beijing chief among them in other government data — have consistently led the country's provincial rankings for over a decade, mirroring the same income-and-healthcare-access pattern that shows up in Germany's east-west split or the UK's regional health gap.
          </p>

          <h2 style={h2Style}>The Real Story Is the Demographic Cliff</h2>
          <p style={pStyle}>
            China's population fell again in 2025, with an estimated growth rate of about -0.24% for the year. The fertility rate has dropped to roughly 0.93 children per woman — among the lowest recorded anywhere, below even Japan and South Korea, two countries usually cited as the extreme cases of population aging. By the end of 2024, 310.31 million people in China were aged 60 or older, 22% of the total population, and that share is only going to keep climbing given how few children are currently being born.
          </p>
          <p style={pStyle}>
            This is the number that actually matters more than the life expectancy headline. Rising life expectancy alongside collapsing fertility means China is aging faster, at an earlier stage of economic development, than almost any large country in modern history — a combination that will shape its healthcare spending, pension system, and workforce for decades regardless of whether the "true" life expectancy figure lands at 77.6 or 79.0.
          </p>

          <h2 style={h2Style}>The Real-World Angle</h2>
          <p style={pStyle}>
            Numbers like this tend to flatten what's actually a very visible, everyday shift if you've spent time in Chinese cities recently — more elderly residents in parks doing tai chi and playing table tennis at hours when younger workers are still commuting, more grandparents doing full-time childcare because both parents work long hours, more conversation in Chinese media about elder care and pension sustainability than about population growth. The statistics confirm what's already observable: this isn't a distant future problem, it's the present one.
          </p>

          <img
            src="/images/blog/china-aging-population-fertility-chart.webp"
            alt="Person working late at a desk under office lights, reflecting China's long working hours culture"
            style={{ width: '100%', borderRadius: '14px', margin: '24px 0' }}
          />

          <p style={{ ...pStyle, fontStyle: 'italic', fontSize: '13px', color: 'var(--text3)' }}>
            [Note: this is a general observational point, not a specific personal account — replace or expand with your own experience here if relevant.]
          </p>

          {/* CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              National averages are a starting point. Your personal estimate depends on your age, lifestyle, and health.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: China National Health Commission 2024 statistics bulletin, released December 2025; NHC press conference, March 2025; UN World Population Prospects 2024 Revision; World Bank Development Indicators; WHO Global Health Observatory life expectancy data, 2025.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy/japan" style={linkStyle}>Life expectancy in Japan</Link>{' — '}
            <Link to="/stress-and-chronic-disease" style={linkStyle}>Stress and chronic disease</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}