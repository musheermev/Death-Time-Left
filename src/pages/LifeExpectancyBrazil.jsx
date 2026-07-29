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
  { state: 'Santa Catarina', overall: '82.51', men: '79.33', women: '85.69' },
  { state: 'São Paulo', overall: '81.26', men: '78.46', women: '84.07' },
  { state: 'Brazil (average)', overall: '77.76', men: '74.30', women: '81.23' },
  { state: 'Bahia', overall: '76.75', men: '72.24', women: '81.26' },
  { state: 'Amazonas', overall: '75.18', men: '71.72', women: '78.65' },
]

const FAQS = [
  {
    q: "What is Brazil's life expectancy in 2026?",
    a: "IBGE's most recent complete life tables put life expectancy at birth at 76.6 years for 2024, roughly 2.5 months higher than 2023's 76.4 years. Broken down by sex, the 2023 figures were 73.1 years for men and 79.7 for women. There's no separate 2026 government figure yet — Brazil's statistics agency, like most, reports about a year behind.",
  },
  {
    q: "Why did Brazil's life expectancy drop so sharply during COVID?",
    a: "Brazil was hit unusually hard. Life expectancy fell from 76.2 years in 2019 to 74.8 in 2020, then further to 72.8 in 2021 — a loss of 3.4 years compared to pre-pandemic levels, one of the steepest COVID-era declines recorded anywhere. Recovery started in 2022 (75.4 years) and by 2023 Brazil had finally surpassed its 2019 level again.",
  },
  {
    q: "Why is the gender gap in Brazil's life expectancy so wide?",
    a: "At roughly 6.6 years (2023 IBGE data), it's wider than in most Western European countries. Part of that is the usual pattern — men smoke and drink more, and have higher rates of cardiovascular disease. But research comparing Brazil to Canada found that injury deaths, mainly homicide and traffic accidents concentrated in men aged 20 to 64, cut 2.2 years off Brazilian male life expectancy on their own — more than all circulatory diseases combined. That's a distinctly Brazilian pattern not seen at this scale in most developed countries.",
  },
  {
    q: "Is violence really a major factor in Brazil's life expectancy numbers?",
    a: "Yes, particularly for young men. Brazil recorded roughly 34,000 to 44,000 violent deaths in 2024, depending on which official tracking system you use (police records versus death certificates give slightly different counts). Nearly half of all homicide victims in recent years have been aged 15-29, and the homicide rate for young men specifically has run close to double the general rate for youth overall.",
  },
  {
    q: "Is Brazil's homicide rate getting better or worse?",
    a: "Better, and substantially so. Brazil's homicide rate peaked at around 31 per 100,000 people in 2017 and has fallen roughly a third since, landing at its lowest level in over a decade by 2024-2025. Researchers most commonly attribute this to a truce between Brazil's two largest criminal factions consolidating control of the drug trade in many regions, rather than to a specific government policy — an uncomfortable explanation, but the one most consistently cited.",
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

export default function LifeExpectancyBrazil() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Brazil Life Expectancy 2026: The COVID Crash, the Recovery, and the Homicide Gap Nobody Else Has",
    description: "Brazil's life expectancy reached 76.6 years in 2024, recovering from one of the world's steepest COVID-era declines. Here's the data, and the violence-driven gender gap that sets Brazil apart.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-17',
    dateModified: '2026-07-17',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Helmet>
        <title>Brazil Life Expectancy 2026 — The COVID Crash, Recovery, and the Homicide-Driven Gender Gap</title>
        <meta name="description" content="Brazil's life expectancy reached 76.6 years in 2024, recovering from a steep COVID-era decline. Official IBGE data, the state-by-state gap, and why violence — not just disease — shapes Brazil's numbers." />
        <meta name="keywords" content="Brazil life expectancy, life expectancy in Brazil 2026, Brazil life expectancy men women, Brazil homicide rate life expectancy, Brazil aging population 2026, IBGE life expectancy data" />
        <meta property="og:title" content="Brazil Life Expectancy 2026 — The COVID Crash, Recovery, and the Homicide-Driven Gender Gap" />
        <meta property="og:description" content="76.6 years in 2024, recovering from one of the steepest COVID-era declines recorded — and a gender gap driven partly by violence, not just disease." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/brazil" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brazil Life Expectancy 2026 — COVID Crash, Recovery, and the Homicide Gap" />
        <meta name="twitter:description" content="76.6 years in 2024 — and the violence-driven gender gap that sets Brazil apart from most life expectancy stories." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/brazil" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>Brazil Life Expectancy 2026: The COVID Crash, the Recovery, and the Homicide Gap Nobody Else Has</h1>

          <p style={introStyle}>
            Most life expectancy stories are about diet, healthcare access, or smoking rates. Brazil's is genuinely different: it's the only major country where the gap between men and women is measurably shaped by homicide, not just heart disease. Here's the official IBGE data, the pandemic dip that briefly wiped out years of progress, and the violence numbers most life-expectancy coverage leaves out entirely.
          </p>

          <img src="/images/blog/brazil-life-expectancy-2026-hero.webp" alt="Brazilian city street scene representing the country's life expectancy and demographic trends" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Men (2023, IBGE)', value: '73.1 yrs' },
              { label: 'Women (2023, IBGE)', value: '79.7 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The Official Numbers and the COVID Crash</h2>
          <p style={pStyle}>
            IBGE's most recent complete life tables put Brazil's life expectancy at birth at 76.6 years for 2024, up about 2.5 months from 2023's 76.4 years — 73.1 for men, 79.7 for women. What makes Brazil's recent trend genuinely dramatic, though, is what happened just before that recovery. Life expectancy stood at 76.2 years in 2019, then fell to 74.8 in 2020 and further to 72.8 in 2021 — a loss of 3.4 years in two years, one of the steepest COVID-era declines recorded anywhere in the world. Recovery began in 2022 (75.4 years), and by 2023 Brazil had finally clawed back past its pre-pandemic level.
          </p>
          <p style={pStyle}>
            IBGE researcher Cíntia Agostinho described this plainly as an external shock working its way out of the data rather than a reversal of the underlying trend — and the numbers back that reading up. IBGE's own projections have Brazil reaching 77.8 years by 2030, 79.7 by 2040, and 81.3 by 2050, essentially picking back up the pre-pandemic trajectory rather than a new, permanently lower one.
          </p>

          <h2 style={h2Style}>The Gender Gap Nobody Else Quite Has</h2>
          <p style={pStyle}>
            A roughly 6.6-year gap between men and women is wider than what you'd see in France, Germany, or the UK, and the reason isn't identical to those countries either. A study comparing Brazil to Canada found that injury deaths — overwhelmingly homicide and traffic accidents concentrated in men aged 20 to 64 — cut 2.2 years off Brazilian male life expectancy on their own, more than all circulatory diseases combined. In women, by contrast, circulatory disease remained the dominant factor lowering life expectancy relative to Canada, which is the more familiar global pattern.
          </p>
          <p style={pStyle}>
            That's worth sitting with: in most of the countries covered on this site, the "why do men die younger" story is smoking, alcohol, and heart disease. In Brazil, violence is genuinely one of the leading drivers, not a footnote.
          </p>

          <h2 style={h2Style}>Violence Is a Measurable Life-Expectancy Factor Here</h2>
          <p style={pStyle}>
            Brazil recorded between roughly 34,000 and 44,000 violent deaths in 2024, the range depending on which official tracking system is used — Brazil's Public Security Forum counts police records, while the Atlas da Violência (produced by the Institute for Applied Economic Research) counts death certificates through the Ministry of Health, and the two disagree by about 3.6%, with both acknowledging the true figure is likely somewhat higher due to underreporting.
          </p>
          <p style={pStyle}>
            The 2026 edition of the Atlas da Violência found Brazil lost 301,825 young people aged 15-29 to violence between 2014 and 2024 — an average of about 75 deaths a day over the decade. In 2024 alone, 19,801 youths were murdered, 46.5% of all homicide victims that year, with young men specifically facing a homicide rate close to double the general youth rate. Researchers tied this to a combination of structural poverty, socially vulnerable territories, and cultural norms around masculinity that push young men toward risk exposure — not a single explanation, but an overlapping set of them.
          </p>
          <img src="/images/blog/brazil-homicide-rate-decline-chart.webp" alt="Chart-style illustration showing Brazil's declining homicide rate trend from 2017 to 2025" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />
          <p style={pStyle}>
            The genuinely good news buried in this: Brazil's homicide rate has fallen roughly a third since peaking at 31.2 per 100,000 in 2017, landing at its lowest level in over a decade by 2024-2025. The most consistently cited explanation isn't a government crackdown — it's a "pax mafiosa," where Brazil's largest criminal faction consolidated control of drug trafficking in many regions and reached a rough truce with its main rival. That's an uncomfortable thing to write as the leading explanation for falling deaths, but it's what the researchers actually point to, not a more flattering policy story.
          </p>

          <h2 style={h2Style}>An Aging Population, and a Wide State-by-State Gap</h2>
          <p style={pStyle}>
            Brazil's 60-and-over population rose from 8.7% of the total in 2000 to 15.6% by 2023, and IBGE projects that reaching 37.8% by 2070 — a faster aging trajectory than the country's income level would typically predict. Regionally, the gap between Brazilian states is stark: Santa Catarina leads the country at 82.51 years combined, while several northern states sit more than seven years behind.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>STATE</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>OVERALL</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>MEN</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>WOMEN</th>
                </tr>
              </thead>
              <tbody>
                {STATE_ROWS.map(row => (
                  <tr key={row.state} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{row.state}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.overall}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.men}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.women}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            The pattern roughly tracks income and healthcare access, similar to Germany's or the UK's regional divides — but the size of the gap, over seven years between the best and worst-performing states, is wider than what shows up in most wealthy countries covered on this site.
          </p>

          <h2 style={h2Style}>The Real-World Angle</h2>
          <p style={pStyle}>
            What's easy to miss in the raw numbers is how differently this plays out depending on where in Brazil someone actually lives. A middle-class family in a southern city like Florianópolis is, statistically, living something closer to a Western European life expectancy story — diet, healthcare, chronic disease. A young man in a socially vulnerable neighborhood in a northern state is living an almost entirely different risk profile, one where reaching 30 safely matters more than any diet or exercise choice. Averaging those two realities into one national number, the way most global rankings do, genuinely flattens something important about how unevenly "Brazilian life expectancy" is actually distributed.
          </p>
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
            Sources: IBGE Complete Life Tables 2024 and population projections, released August 2024-2025; Atlas da Violência 2026 (IPEA and Brazilian Public Security Forum); Brazilian Public Security Forum (FBSP) Anuário Brasileiro de Segurança Pública 2025; PubMed comparative injury and life expectancy study, Brazil vs. Canada; Wikipedia compilation of Brazilian state-level life expectancy data, 2022.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy/india" style={linkStyle}>Life expectancy in India</Link>{' — '}
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