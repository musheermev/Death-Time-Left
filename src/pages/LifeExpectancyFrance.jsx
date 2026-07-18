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
    q: "What is France's life expectancy in 2026?",
    a: "INSEE's most recent published figures, covering 2024, put life expectancy at birth at 80.0 years for men and 85.6 years for women — both described by INSEE as stabilizing at a historically high level. There's no separate official 2026 figure yet; France's statistics office reports roughly a year behind, same as most countries.",
  },
  {
    q: "Why do French women live so much longer than French men?",
    a: "The gap was actually wider a generation ago — over 8 years through the 1980s and early 1990s — and has since narrowed to 5.6 years in 2024. Men's life expectancy has risen faster than women's since the mid-1990s, largely attributed to French men cutting back on smoking and heavy drinking more than women have over the same period.",
  },
  {
    q: "Is France's life expectancy still among the highest in Europe?",
    a: "Yes. France, Spain, and Luxembourg are consistently cited by INSEE and Eurostat as the EU countries where people live the longest. Spain has the longest life expectancy at 65 for women in the EU (continuing to 88.9 years), while Luxembourg has the longest for men at 65 (84.9 years) — France sits close behind both on the overall ranking.",
  },
  {
    q: "Is the French Paradox — wine drinking and heart health — still considered true?",
    a: "No, not in the form it was originally proposed. The term described lower cardiovascular mortality in wine-drinking France compared to countries like Finland, and was widely used to argue moderate drinking was heart-protective. A 2023 re-analysis found the earlier studies had a recruitment bias — they lumped sick ex-drinkers who'd quit for health reasons into the \"non-drinker\" comparison group, which artificially made light drinkers look healthier by comparison. Once corrected, the relationship between alcohol and mortality looks close to linear, not the protective dip the paradox implied.",
  },
  {
    q: "Is France's population growing or shrinking?",
    a: "Barely growing. As of January 2025, France's population stood at 68.6 million, up just 0.25% in a year — the smallest annual increase in recent years, and almost entirely from immigration. Births (663,000) barely outpaced deaths (646,000) in 2024, a gap of only 17,000, the narrowest ever recorded. The fertility rate fell to 1.62 children per woman, the lowest since 1919.",
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

export default function LifeExpectancyFrance() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "France Life Expectancy 2026: Record Highs, a Narrowing Gender Gap, and a Paradox That Didn't Hold Up",
    description: "France's latest official life expectancy data: 80.0 years for men, 85.6 for women. What's driving it, and why the famous 'French Paradox' about wine no longer holds up.",
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
        <title>France Life Expectancy 2026 — Official Data, EU Ranking, and the Wine Paradox Explained</title>
        <meta name="description" content="France's newest official life expectancy figures: 80.0 years for men, 85.6 for women — record highs. Why France ranks near the top of the EU, and why the 'French Paradox' about wine no longer holds up." />
        <meta name="keywords" content="France life expectancy, life expectancy in France 2026, France life expectancy men women, French Paradox wine health, France vs Europe life expectancy, France aging population 2026" />
        <meta property="og:title" content="France Life Expectancy 2026 — Official Data, EU Ranking, and the Wine Paradox Explained" />
        <meta property="og:description" content="France's newest official data: 80.0 years for men, 85.6 for women — record highs, and why the famous wine paradox no longer holds up." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/france" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="France Life Expectancy 2026 — Official Data, EU Ranking, and the Wine Paradox Explained" />
        <meta name="twitter:description" content="Record highs, a narrowing gender gap, and why the French Paradox about wine no longer holds up." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/france" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>France Life Expectancy 2026: Record Highs, a Narrowing Gender Gap, and a Paradox That Didn't Hold Up</h1>

          <p style={introStyle}>
            France sits near the top of every European longevity ranking, and for decades the go-to explanation was wine — the so-called "French Paradox." That story has quietly fallen apart in the research over the past few years, right around the same time French wine consumption itself hit a 70-year low. Here's what INSEE's actual 2024 data says, and what's really behind the numbers.
          </p>

          <img src="/images/blog/france-life-expectancy-2026-hero.webp" alt="French countryside vineyard and village representing France's life expectancy and aging population" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Men (2024, INSEE)', value: '80.0 yrs' },
              { label: 'Women (2024, INSEE)', value: '85.6 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The Official 2024 Numbers</h2>
          <p style={pStyle}>
            INSEE's latest demographic report describes life expectancy as having stabilized at a historically high level in 2024: 80.0 years for men, 85.6 years for women. The average age at death across both sexes was 79.4 years, up from 77.6 a decade earlier. Of everyone who died in France in 2024, 90.1% were 60 or older — up from 87.2% in 2014 — and 2.2% of deaths were people aged 100 or over, nearly double the 1.7% share recorded in 2014.
          </p>
          <p style={pStyle}>
            INSEE also flagged something worth noting rather than glossing over: the 2024 flu season returned to pre-pandemic intensity, and summer heatwaves were milder than 2023, so neither event meaningfully dragged the numbers down this time. Some years, the headline figure moves for reasons that have nothing to do with long-term trends.
          </p>

          <h2 style={h2Style}>The Gender Gap Has Nearly Halved Since the 1990s</h2>
          <p style={pStyle}>
            The gap between French men and women peaked above 8 years in the 1980s and early 1990s. It's now down to 5.6 years, continuing a steady narrowing that INSEE attributes mainly to men's life expectancy climbing faster than women's since the mid-90s — largely a reflection of French men reducing smoking and heavy drinking more than French women have over the same stretch.
          </p>
          <p style={pStyle}>
            There's a quieter, less flattering data point buried in the same research, though: healthy life expectancy — years lived before a disability or health condition seriously limits daily life — has actually been falling slightly for French women, by about 0.2 months a year between 2008 and 2023, while rising for men by roughly 0.6 months a year. Women are still living longer overall, but the extra years aren't necessarily healthier ones, and that gap between total years and healthy years is arguably the more important number nobody puts in headlines.
          </p>

          <h2 style={h2Style}>France vs. the Rest of Europe</h2>
          <p style={pStyle}>
            France, Spain, and Luxembourg are the three EU countries INSEE and Eurostat consistently flag as having the longest life expectancies. Spain holds the EU record for life expectancy at 65 for women, continuing to 88.9 years, while Luxembourg holds the equivalent record for men at 84.9 years. France doesn't top either individual ranking, but sits close behind both — solidly in Europe's top tier rather than at the very peak of any single metric.
          </p>

          <h2 style={h2Style}>The French Paradox Isn't What People Think Anymore</h2>
          <p style={pStyle}>
            The "French Paradox" was coined to describe something that genuinely puzzled researchers for years: France had lower cardiovascular mortality than countries like Finland despite a diet rich in saturated fat, and moderate wine consumption was the leading explanation offered. Plotted against mortality, the data formed what looked like a J-shaped curve — light-to-moderate drinkers appeared to fare slightly better than both heavy drinkers and total abstainers.
          </p>
          <img src="/images/blog/french-paradox-wine-myth-debunked.webp" alt="Wine glasses on a table, referencing the debunked French Paradox theory about wine and heart health" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />
          <p style={pStyle}>
            A 2023 re-analysis, since cited in Canada's revised alcohol guidance and by major health bodies, found a specific flaw: many of the original studies' "non-drinker" comparison groups included people who'd quit drinking because they were already sick — which made light drinkers look artificially healthier by comparison, not because alcohol was protective, but because the control group was skewed sicker to begin with. Correct for that, and the J-shaped curve mostly disappears into something closer to a straight line — more alcohol, more risk, without the protective dip at the low end.
          </p>
          <p style={pStyle}>
            The irony arguably writing itself here: French wine consumption fell to its lowest level in 70 years in 2025, down 3% year-on-year, with beer overtaking wine in national consumption for the first time on record. Younger French adults are increasingly cited as the driver, drinking less overall and moving away from wine specifically — happening at almost the exact moment the research finally caught up to say the wine wasn't doing what everyone assumed. My own read: France's longevity has always been carried more by its healthcare system, diet quality beyond just wine, and denser social fabric than by anything in the glass — the paradox was a correlation people wanted to believe, not a mechanism that held up.
          </p>

          <h2 style={h2Style}>An Aging, Barely-Growing Population</h2>
          <p style={pStyle}>
            As of January 2025, France's population reached 68.6 million, growing just 0.25% over the year — the smallest increase in recent years, and almost entirely down to net immigration. Births (663,000) only just outpaced deaths (646,000) in 2024, a gap of 17,000, the narrowest on record; compare that to 1957, when the gap was 309,000. The fertility rate fell to 1.62 children per woman, the lowest since the end of the First World War. Those aged 65 and over now make up 21.8% of the population, up from 16.3% in 2005, and INSEE projects that group to grow another 36% by 2050.
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
            Sources: INSEE Demographic Balance Sheet 2024 and Insee Première report, released January 2025; INED Mortality in France data, 2025; Eurostat Life Expectancy at Birth by Sex, 2025; International Organisation of Vine and Wine (OIV) 2025 consumption report.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/alcohol-and-longevity" style={linkStyle}>Alcohol and longevity: what the research says</Link>{' — '}
            <Link to="/life-expectancy/spain" style={linkStyle}>Life expectancy in Spain</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}