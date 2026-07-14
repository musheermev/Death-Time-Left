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

const STATE_ROWS = [
  { state: 'Baden-Württemberg', men: '79.92', women: '84.41' },
  { state: 'Sachsen', men: '78.04', women: '84.23' },
  { state: 'Bayern', men: '79.34', women: '84.03' },
  { state: 'Germany (average)', men: '78.47', women: '83.43' },
  { state: 'Sachsen-Anhalt', men: '75.93', women: '82.51' },
  { state: 'Bremen', men: '76.74', women: '82.26' },
]

const FAQS = [
  {
    q: "What is Germany's life expectancy in 2026?",
    a: "There's no single official 2026 figure — Germany's Federal Statistical Office (Destatis) publishes life tables roughly a year behind, and men and women aren't even measured on the same cycle. The most recent male life table (2022/2024, released July 2025) puts life expectancy at birth at 78.47 years. The most recent female life table (2023/2025, released July 2026) puts it at 83.43 years. Estimates that quote a single combined number around 82 years, like UN or Statista projections, are averaging two figures measured a year apart.",
  },
  {
    q: "Why is Germany's life expectancy lower than France, Spain, or Italy?",
    a: "As of the most recent comparable estimates, Germany trails most of Western Europe — Switzerland, Norway, Sweden, France, Italy, Spain, the Netherlands, Denmark, Austria, Belgium, and Luxembourg all rank higher. Researchers most often point to Germany's comparatively lax tobacco regulation (among the lowest cigarette taxes in the EU, still-legal street vending machines, no nationwide indoor smoking ban) and a diet higher in red meat and processed pork than its Mediterranean and Nordic neighbors.",
  },
  {
    q: "Which German state has the highest life expectancy?",
    a: "Baden-Württemberg, for both sexes — 79.92 years for men and 84.41 years for women, per Destatis's latest Länder life tables. Bavaria is close behind. Interestingly, Saxony (Sachsen), a former East German state, ranks second among women at 84.23 years, ahead of Bavaria and most western states — which complicates the simple 'East Germany lags West Germany' narrative you'll see repeated online.",
  },
  {
    q: "What's the gap between men and women in Germany?",
    a: "Roughly 5 years using the latest life tables (78.47 vs. 83.43), though Statista's 2025 projection puts the gap at a narrower 4.6 years. Either way, it's shrunk substantially from close to 7 years through the 1990s, mainly because German men have cut back on smoking and heavy drinking faster than German women have.",
  },
  {
    q: "How many people in Germany smoke in 2026?",
    a: "19.1% of the population aged 15 and over, per Destatis's 2025 Mikrozensus survey (the most recent available) — 22.4% of men, 15.8% of women. That's barely moved since 2021 (18.9%), and smoking has actually risen slightly among 15-24 year-olds, from 14.5% to 15.6% over the same period. Germany has one of the highest smoking rates in Western Europe.",
  },
  {
    q: "Is Germany's population shrinking?",
    a: "Yes. 2025 marked the 54th consecutive year that deaths outnumbered births in Germany. The total fertility rate sits at 1.32 children per woman, well under the 2.1 needed to hold population steady without immigration. The population has still grown, to roughly 83.47 million as of December 2025, entirely because of net migration.",
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

export default function LifeExpectancyGermany() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Germany Life Expectancy 2026: The Official Numbers, the East-West Divide, and the Smoking Problem Nobody Fixed",
    description: "Germany's latest official life expectancy data: 78.47 years for men, 83.43 for women, and why the country still trails most of Western Europe.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Helmet>
        <title>Germany Life Expectancy 2026 — Official Data, State-by-State Gaps, and Why It Lags Western Europe</title>
        <meta name="description" content="Germany's newest official life expectancy figures: 78.47 years for men, 83.43 for women. Why Germany trails France, Spain, and Switzerland, and what's really driving it." />
        <meta name="keywords" content="Germany life expectancy, life expectancy in Germany 2026, Germany life expectancy men women, Germany smoking rate 2026, Germany life expectancy by state, Germany aging population, Germany vs Western Europe life expectancy" />
        <meta property="og:title" content="Germany Life Expectancy 2026 — Official Data, State-by-State Gaps, and Why It Lags Western Europe" />
        <meta property="og:description" content="Germany's newest official data: 78.47 years for men, 83.43 for women — and why the country still trails most of Western Europe." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/germany" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Germany Life Expectancy 2026 — Official Data, State-by-State Gaps, and Why It Lags Western Europe" />
        <meta name="twitter:description" content="Germany's newest official data on longevity, the East-West state gap, and the smoking rate driving it." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/germany" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>Germany Life Expectancy 2026: The Official Numbers, the East-West Divide, and the Smoking Problem Nobody Fixed</h1>

          <p style={introStyle}>
            Germany runs a first-rate public healthcare system, universal insurance, and some of the best hospitals in Europe — and still trails almost every one of its Western European neighbors on life expectancy. That's not a coincidence, and it's not really a mystery either. Here's what Destatis's newest life tables actually say, plus the state-by-state and smoking data that explain the gap.
          </p>

          <img src="/images/blog/germany-life-expectancy-2026-hero.webp" alt="German countryside town representing Germany's life expectancy and quality of life" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Men (2022/2024 life table)', value: '78.47 yrs' },
              { label: 'Women (2023/2025 life table)', value: '83.43 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The Numbers, and Why They're Measured a Year Apart</h2>
          <p style={pStyle}>
            Destatis doesn't publish male and female life expectancy on the same schedule, which trips up a lot of sites that quote a single "Germany's life expectancy is X" number. The male life table currently in force covers 2022-2024 and was released in July 2025: 78.47 years at birth. The female table is newer — 2023-2025, released July 2026 — putting women at 83.43 years. Blend those two mismatched snapshots and you land near 81 years, which is roughly what Statista's UN-based 2025 projection shows too, at close to 82.2 years combined.
          </p>
          <p style={pStyle}>
            The gender gap itself has been narrowing for decades. It sat close to seven years through the 1990s; it's now down to around 4.6-5 years. Fewer German men smoking and drinking heavily than a generation ago is the most commonly cited reason, though it's also partly that female life expectancy gains have simply slowed compared to men's.
          </p>

          <h2 style={h2Style}>Germany Is Behind Most of Western Europe</h2>
          <p style={pStyle}>
            This is the part that surprises people who assume "rich Western European country" automatically means "long lifespan." Using the most recent comparable estimates, Germany trails Switzerland, Norway, Sweden, France, Italy, Spain, the Netherlands, Denmark, Austria, Belgium, and Luxembourg. It does beat most of Central and Eastern Europe — Czechia, Poland, Hungary — so it's not at the bottom of the continent. It's just not near the top, despite having one of the highest healthcare spends per capita in the EU.
          </p>
          <p style={pStyle}>
            My read on this, having looked at the same pattern across several EU countries now: the gap isn't really about hospital quality or insurance access. Germany's healthcare system is genuinely strong. It's about what happens before people ever need a hospital — and that's where the next two sections matter more than any policy paper admits.
          </p>

          <h2 style={h2Style}>The East-West Split Isn't What You'd Expect</h2>
          <p style={pStyle}>
            Baden-Württemberg leads the country for both sexes, and Bavaria isn't far behind — the wealthy southern states, unsurprisingly. Bremen and Sachsen-Anhalt sit at the bottom. That much fits the tired "rich west, poorer east" story. Except Saxony doesn't play along: its women rank second in the entire country, ahead of Bavaria and every other western state except Baden-Württemberg. Researchers who study this tend to point to lower obesity rates and a stronger public-health infrastructure specifically in Saxony, not some blanket East German pattern — because the rest of the former East doesn't show the same result at all.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>STATE</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>MEN</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>WOMEN</th>
                </tr>
              </thead>
              <tbody>
                {STATE_ROWS.map(row => (
                  <tr key={row.state} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{row.state}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.men}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.women}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={h2Style}>What's Actually Killing Germans</h2>
          <p style={pStyle}>
            Cardiovascular disease accounts for 33.7% of deaths in Germany, cancer another 23.7% — together well over half. Both are heavily influenced by smoking, and this is where Germany genuinely stands apart from its neighbors: it's been called the "smoker's paradise" of Europe, with the lowest tobacco taxes in the EU, cigarette vending machines still legally operating on public streets, and no nationwide ban on smoking in bars or restaurants under 75 square meters.
          </p>
          <img src="/images/blog/germany-elderly-couple-walking.webp" alt="Cigarette vending machine on a street in Germany, reflecting the country's lax tobacco regulation" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />
          <p style={pStyle}>
            19.1% of Germans aged 15+ currently smoke, per the 2025 Mikrozensus — 22.4% of men, 15.8% of women. That figure has barely budged since 2021 (18.9%), and it's actually crept up among 15-24 year-olds, from 14.5% to 15.6% over the same window. If you want to read more on exactly what quitting does to the body and how long the health gains take, we've broken down the full{' '}
            <Link to="/smoking-cessation-recovery" style={linkStyle}>smoking cessation recovery timeline</Link>{' '}
            in detail — including why only about one in five German quit-attempters in 2024 used an evidence-based method.
          </p>

          <h2 style={h2Style}>An Aging, Shrinking Population</h2>
          <p style={pStyle}>
            2025 marked the 54th consecutive year that Germany recorded more deaths than births. The fertility rate sits at 1.32 children per woman, well below the 2.1 needed to hold population steady on its own. Germany's population still grew, to roughly 83.47 million by the end of 2025 — entirely because of immigration offsetting the natural decline. It's the same demographic story playing out across most of Western Europe, just with Germany's numbers being some of the starkest.
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
            Sources: German Federal Statistical Office (Destatis) Life Tables 2022/2024 (male) and 2023/2025 (female), released July 2025 and July 2026; Destatis 2025 Mikrozensus health survey; Eurostat Life Expectancy at Birth by Sex 2023; UN World Population Prospects 2024 Revision; Destatis population and fertility statistics, December 2025.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/smoking-cessation-recovery" style={linkStyle}>Smoking cessation recovery timeline</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/life-expectancy/uk" style={linkStyle}>Life expectancy in the UK</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}