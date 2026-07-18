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
    q: "Is there a safe amount of alcohol to drink?",
    a: "The current scientific consensus, reflected in WHO guidance and Canada's 2022 alcohol guidelines, is that no level of alcohol consumption is risk-free. A large 2026 study published in the Journal of Studies on Alcohol and Drugs found no protective effect at low levels of drinking, with lifetime alcohol-attributable mortality risk rising steadily from the very first regular drink upward.",
  },
  {
    q: "Wasn't moderate drinking supposed to be good for the heart?",
    a: "That belief came from the \"French Paradox\" and the J-shaped curve seen in older studies, where light drinkers appeared to have lower mortality than both heavy drinkers and abstainers. A 2023 re-analysis found this was largely a research design flaw: many of those studies' \"non-drinker\" comparison groups included people who'd quit drinking due to existing illness, which made light drinkers look artificially healthier by comparison. Once corrected, the protective effect at low doses mostly disappears.",
  },
  {
    q: "How many people die from alcohol each year globally?",
    a: "About 2.6 million deaths a year are attributable to alcohol consumption, according to WHO's most recent Global Status Report on Alcohol and Health — 4.7% of all deaths worldwide. Roughly 2 million of those deaths are among men, with the heaviest burden falling on Europe and Africa.",
  },
  {
    q: "Why is alcohol consumption so high in Europe specifically?",
    a: "Eight of the ten countries with the highest per-capita alcohol consumption globally are in the WHO European Region, which also has the highest rate of alcohol-attributable deaths of any region — accounting for close to 1 in 11 deaths overall. Researchers point to deep cultural normalization of drinking, alongside historically weaker regulation and advertising restrictions compared to tobacco.",
  },
  {
    q: "Are younger generations really drinking less?",
    a: "In most Western countries, yes — the global no- and low-alcohol drinks market has roughly doubled since 2019 to nearly $20 billion, and data suggests Gen Z drinks meaningfully less than Millennials did at the same age. France is a notable exception: a 2025 study found French 18-30 year-olds haven't followed the same decline seen in the UK, US, Australia, and New Zealand, which researchers link to weaker public health campaigns and continued alcohol industry influence over French advertising law.",
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

export default function AlcoholAndLongevity() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Alcohol and Longevity in 2026: What the Newest Research Actually Says About 'Moderate' Drinking",
    description: "A 2026 study found no protective effect from light drinking, and the old 'moderate drinking is healthy' consensus is unraveling. Here's what the current research shows.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Helmet>
        <title>Alcohol and Longevity 2026 — What the Newest Research Says About Moderate Drinking</title>
        <meta name="description" content="A 2026 study of over 4 million people found no protective effect from light drinking. Here's what the current alcohol and mortality research actually shows, and why the old advice changed." />
        <meta name="keywords" content="alcohol and longevity, is moderate drinking healthy 2026, French Paradox debunked, alcohol mortality risk study, no safe level of alcohol, alcohol life expectancy research" />
        <meta property="og:title" content="Alcohol and Longevity 2026 — What the Newest Research Says About Moderate Drinking" />
        <meta property="og:description" content="A major 2026 study found no protective effect from light drinking — here's what changed, and why." />
        <meta property="og:url" content="https://www.deathtimeleft.com/alcohol-and-longevity" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alcohol and Longevity 2026 — What the Newest Research Says About Moderate Drinking" />
        <meta name="twitter:description" content="Why the decades-old 'a little alcohol is good for you' consensus has fallen apart in 2026." />
        <link rel="canonical" href="https://www.deathtimeleft.com/alcohol-and-longevity" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Health Factor</p>
          <h1 style={h1Style}>Alcohol and Longevity in 2026: What the Newest Research Actually Says About "Moderate" Drinking</h1>

          <p style={introStyle}>
            For most of the last thirty years, the public message on alcohol was that a glass of wine a day might actually be good for you. That consensus has been quietly collapsing, and a major 2026 study has pushed it further than almost anything before it. Here's what changed, why, and what the data says now.
          </p>

          <img src="/images/blog/alcohol-mortality-risk-research-2026.webp" alt="Research chart concept illustrating alcohol consumption and mortality risk data" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Global deaths/year from alcohol', value: '2.6 million' },
              { label: 'Share of all global deaths', value: '4.7%' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '20px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The "Moderate Drinking Is Healthy" Myth, and Where It Came From</h2>
          <p style={pStyle}>
            The idea traces back to the "French Paradox" — the observation that France had lower heart disease mortality than countries like Finland despite a diet rich in saturated fat, with moderate wine drinking offered as the explanation. Plotted against mortality data, moderate drinkers appeared to fare slightly better than both heavy drinkers and people who didn't drink at all, producing what researchers called a J-shaped curve: risk dips at low consumption before climbing sharply at higher levels.
          </p>
          <p style={pStyle}>
            That curve shaped public health messaging for decades. It's also, as of a landmark 2023 re-analysis, now considered substantially flawed. The issue: many of the original studies' "non-drinker" control groups lumped in people who had quit drinking because they were already sick — heart disease, liver problems, and so on. That made the light-drinking group look artificially healthier by comparison, not because alcohol was doing anything protective, but because the comparison group was sicker to begin with. Correct for that recruitment bias and the dip at the low end of the curve mostly flattens out into something closer to a straight line.
          </p>

          <h2 style={h2Style}>What the Newest 2026 Study Found</h2>
          <p style={pStyle}>
            In June 2026, researchers published what's described as the most comprehensive U.S. estimate to date of lifetime alcohol-attributable mortality and morbidity risk, in the Journal of Studies on Alcohol and Drugs. The findings: no protective effect at any level of drinking. Lifetime alcohol-attributable mortality risk was 1 in 100 for people averaging more than 8.5 drinks a week, rising to roughly 1 in 25 at 14 drinks a week. For men drinking more than 6.5 drinks a week and women more than 7, that risk already exceeded 1 in 1,000.
          </p>
          <p style={pStyle}>
            One detail worth knowing, purely as context: the study was reportedly commissioned to help inform the U.S. Dietary Guidelines for Americans 2025-2030, and according to its authors and an accompanying editorial, its findings were not incorporated into the final guidelines. That's a separate story from the science itself, but it's relevant if you're wondering why the public messaging hasn't caught up to the research yet.
          </p>

          <h2 style={h2Style}>The Global Toll</h2>
          <p style={pStyle}>
            WHO's most recent Global Status Report on Alcohol and Health puts the annual global death toll at 2.6 million — 4.7% of all deaths worldwide, based on 2019 data across 145 countries. About 2 million of those deaths are among men, concentrated most heavily in Europe and Africa. Separately, an estimated 400 million people live with alcohol or drug use disorders globally, 209 million of them with alcohol dependence specifically.
          </p>
          <p style={pStyle}>
            Europe carries a disproportionate share of this. Eight of the ten highest per-capita alcohol-consuming countries in the world are in the WHO European Region, which also has the highest rate of alcohol-attributable deaths of any region — close to 1 in 11 deaths overall. Alcohol is causally linked to more than 200 diseases and conditions, most commonly liver disease, several cancers, and cardiovascular disorders, and it remains deeply culturally normalized across much of the continent despite that burden.
          </p>

          <h2 style={h2Style}>Younger Generations Are Quietly Opting Out — Except in One Notable Place</h2>
          <p style={pStyle}>
            The global no- and low-alcohol drinks market has nearly doubled since 2019 to almost $20 billion, and industry data suggests Gen Z drinks roughly 30% less than Millennials did at the same age. In England, close to one in three adults aged 16-24 now say they don't drink at all, nearly double the share from 2005. Similar declines have shown up in Australia, New Zealand, and the U.S.
          </p>
          <p style={pStyle}>
            France stands out as a genuine exception, and it's worth naming rather than smoothing over. A 2025 study tracking French 18-30 year-olds found their drinking habits haven't followed the same downward trend seen elsewhere, which researchers attribute to weaker public health campaigns — France's government still doesn't officially back Dry January, and a national alcohol-awareness campaign tied to the 2023 Rugby World Cup was cancelled — alongside the wine and spirits industry's continued lobbying influence over French advertising law. It's a genuinely different data point from most of the Western world, not a rounding error, and it's one of those places where a country's food-and-drink culture is arguably working against its own otherwise strong longevity numbers.
          </p>

          <h2 style={h2Style}>There's No Compound Interest on This One</h2>
          <p style={pStyle}>
            The pattern across almost all of the current research points the same direction: risk accumulates with both the amount and the duration of drinking, and it starts accumulating from the first regular drink rather than only past some higher threshold. That's a harder message to sell than "a glass of red wine is basically medicine," but it's the version that's held up under the closest scrutiny in the last few years. Whether public guidance and cultural habits catch up to that is a separate question from whether the evidence itself has changed — and at this point, the evidence pretty clearly has.
          </p>

          {/* CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              Lifestyle factors like alcohol use shift your personal estimate more than most people realize. See where you stand.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: WHO Global Status Report on Alcohol and Health and Treatment of Substance Use Disorders, June 2024; Journal of Studies on Alcohol and Drugs, "Alcohol Intake and Health Study," June 2026; Canada's Guidance on Alcohol and Health, 2023 revision; Institute of Alcohol Studies, France drinking trends research, April 2025; IWSR global no/low alcohol market data, 2025.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy/france" style={linkStyle}>France life expectancy 2026</Link>{' — '}
            <Link to="/life-expectancy/russia" style={linkStyle}>Life expectancy in Russia</Link>{' — '}
            <Link to="/smoking-cessation-recovery" style={linkStyle}>Smoking cessation recovery timeline</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}