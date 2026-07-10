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

const CENTENARIAN_ROWS = [
  { year: '1963', value: '153' },
  { year: '1981', value: '1,000' },
  { year: '1998', value: '10,000' },
  { year: '2012', value: '50,000' },
  { year: '2022', value: '90,000' },
  { year: '2025', value: '99,763' },
]

const FAQS = [
  {
    q: "What is Japan's life expectancy in 2026?",
    a: "There is no measured 2026 figure yet — Japan's Ministry of Health, Labour and Welfare (MHLW) publishes full life tables about a year after the fact. The most recent official data, released in July 2025, covers 2024: 81.09 years for men and 87.13 years for women. Figures around 84.8–85.0 years you'll see on some sites are UN World Population Prospects projections, not fresh government measurements.",
  },
  {
    q: "Why do Japanese women live longer than Japanese men?",
    a: "Japanese women have held the world's top spot for female life expectancy for 40 consecutive years. Part of it is biological (women generally have a survival advantage), but Japan's gap — roughly six years — is wider than most high-income countries, and researchers point to men's higher smoking and drinking rates plus a long-hours work culture (karoshi, or overwork death, is a legally recognized cause-of-death category in Japan) as contributing factors.",
  },
  {
    q: "How many people over 100 live in Japan?",
    a: "A record 99,763 people in Japan were 100 or older as of September 2025, according to MHLW resident registry data — the 55th consecutive year the number has risen. About 88% are women. Japan's oldest living person is 114-year-old Kagawa Shigeko; the oldest man is 111-year-old Mizuno Kiyotaka.",
  },
  {
    q: "Is Japan still the country with the highest life expectancy?",
    a: "For women, yes — 40 straight years at number one. For men, Japan actually ranks 6th globally as of 2024 data, behind Sweden, Switzerland, Norway, Italy, and Spain, having slipped one place from 2023. \"Japan has the world's highest life expectancy\" is really a female-longevity statistic more than a national one.",
  },
  {
    q: "What causes Japan's high life expectancy?",
    a: "Researchers point to a cluster of factors rather than one cause: a traditional low-sodium, fish-and-vegetable-heavy diet (washoku), the cultural habit of eating until 80% full (hara hachi bu), near-universal health insurance coverage, low historical obesity rates, and strong community ties — especially visible in Okinawa, one of the world's five identified Blue Zones.",
  },
  {
    q: "Is Japan's aging population a problem?",
    a: "Yes, and it's arguably the more consequential story than the longevity headline itself. 2024 marked Japan's 17th consecutive year of natural population decline, the birth rate sits around 1.26 children per woman, and more than 29% of the population is now 65 or older. That's straining the pension system, elder-care workforce, and labor market — prompting government pushes into elder-care robotics and eased immigration policy.",
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

export default function LifeExpectancyJapan() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Japan Life Expectancy 2026: Why the World's Longest-Living Nation Keeps Getting Older",
    description: "Japan's latest MHLW data: 81.09 years for men, 87.13 for women, and a record 99,763 centenarians. What the numbers say, why they're rising, and the aging crisis behind them.",
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
        <title>Japan Life Expectancy 2026 — Latest Data, Centenarians, and the Aging Crisis</title>
        <meta name="description" content="Japan's newest official life expectancy data: 81.09 years for men, 87.13 for women, and a record 99,763 centenarians in 2025. What's driving it, and what it's costing the country." />
        <meta name="keywords" content="Japan life expectancy, life expectancy in Japan 2026, why do Japanese people live so long, Japan life expectancy men women, Japan aging population statistics, Japan centenarians 2026, Japan life expectancy ranking" />
        <meta property="og:title" content="Japan Life Expectancy 2026 — Latest Data, Centenarians, and the Aging Crisis" />
        <meta property="og:description" content="Japan's newest official data: 81.09 years for men, 87.13 for women, and a record 99,763 centenarians. What's really driving it." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/japan" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Life Expectancy 2026 — Latest Data, Centenarians, and the Aging Crisis" />
        <meta name="twitter:description" content="Japan's newest official data on longevity, centenarians, and the aging crisis behind the headline." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/japan" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Country Report</p>
          <h1 style={h1Style}>Japan Life Expectancy 2026: Why the World's Longest-Living Nation Keeps Getting Older</h1>

          <p style={introStyle}>
            Japan's life expectancy numbers get repeated so often they've become background noise — "Japan lives the longest," everyone says it, nobody checks the source. Here's what the actual data says: the latest official figures from Japan's Ministry of Health, Labour and Welfare, released in July 2025 and covering 2024, plus the part of the story that rarely makes the headline — keeping a population alive this long is turning into one of the most expensive problems the country has.
          </p>

          <img src="/images/blog/japan-life-expectancy-2026-hero.webp" alt="Elderly Japanese residents walking in a park, representing Japan's aging population and high life expectancy" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: 'Men (2024, MHLW)', value: '81.09 yrs' },
              { label: 'Women (2024, MHLW)', value: '87.13 yrs' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The Numbers Everyone Quotes, and How Current They Actually Are</h2>
          <p style={pStyle}>
            No country has "2026" life expectancy data in 2026 — it takes about a year to compile and publish. Japan's most recent full life table, released in July 2025, covers 2024: 81.09 years for men, 87.13 years for women. Both are essentially flat versus 2023, with women dipping just 0.01 years. If you've seen a combined figure of 84.8 or even 85.0 floating around Japan-focused blogs, that's usually a UN World Population Prospects projection, not a fresh government measurement — worth knowing the difference before you repeat it somewhere.
          </p>
          <p style={pStyle}>
            Life expectancy dipped in 2021 and 2022 during the COVID-19 period and has since recovered. It's not a straight line upward, even in a country this consistent.
          </p>

          <h2 style={h2Style}>Women Have Been Ranked #1 in the World for 40 Years Straight</h2>
          <p style={pStyle}>
            Japanese women have held the global top spot for female life expectancy for 40 consecutive years, per MHLW data. Something quietly telling shows up in the cause-of-death breakdown: for the first time, old age — not cancer — is now the single largest recorded cause of death for Japanese women born in 2024, at 20.75% versus 19.06% for cancer. You don't see that in countries where healthcare is still mainly a fight against disease. It's what shows up once a population has largely outrun the things that used to kill people early.
          </p>
          <p style={pStyle}>
            If cancer were eliminated entirely as a cause of death, MHLW's models estimate Japanese men would gain 3.11 years and women 2.68 years — a smaller upside for women than you might expect, precisely because so many already live long enough that "wearing out" outcompetes disease as a cause of death.
          </p>

          <h2 style={h2Style}>Men Are Falling Behind — Slowly, But Measurably</h2>
          <p style={pStyle}>
            Japanese men's life expectancy ranks 6th globally as of 2024 — behind Sweden, Switzerland, Norway, Italy, and Spain — down one spot from 2023. Not dramatic, but a useful reminder that "Japan has the world's highest life expectancy" is really a women's-longevity story wearing a national label. The male-female gap sits at roughly six years, wider than in most high-income countries. Higher smoking and drinking rates among men, plus Japan's historically demanding work culture — karoshi, literally "overwork death," is a legally recognized cause-of-death category there — are the factors most frequently cited, though isolating exact causal weight is genuinely harder than these explainer lists make it sound.
          </p>

          <h2 style={h2Style}>The Centenarian Numbers Are the Real Story</h2>
          <p style={pStyle}>
            A record 99,763 people in Japan were 100 or older as of September 2025 — the 55th consecutive year the count has risen. About 88% are women. Japan's oldest living person is 114-year-old Kagawa Shigeko, a former obstetrician-gynecologist who practiced medicine into her 80s; the oldest man is 111-year-old Mizuno Kiyotaka.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>YEAR</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>CENTENARIANS</th>
                </tr>
              </thead>
              <tbody>
                {CENTENARIAN_ROWS.map(row => (
                  <tr key={row.year} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{row.year}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            That growth line is almost eerie — it hasn't dropped once since Japan started tracking it in 1963, not even through the pandemic years that dented the overall life-expectancy average.
          </p>

          <h2 style={h2Style}>Why Japanese People Live So Long</h2>
          <p style={pStyle}>
            No single habit explains it — it's a cluster of overlapping factors researchers keep coming back to: a traditional diet (washoku) built around fish, vegetables, soy, and seaweed with historically low red meat and sodium intake; the cultural practice of hara hachi bu, eating until roughly 80% full rather than stopping at "full"; near-universal health insurance coverage; and daily, low-intensity communal exercise like Radio Taiso, broadcast on radio and TV since the 1920s and still practiced in parks by people of every age. Okinawa Prefecture specifically is one of the world's five identified{' '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones</Link>, where researchers have tracked over 3,000 residents for more than five decades to understand the region's unusually high concentration of centenarians.
          </p>

          <img src="/images/blog/okinawa-japan-longevity-diet.webp" alt="Traditional Okinawan diet of vegetables, tofu, and sweet potatoes linked to Japan's high life expectancy" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />

          <h2 style={h2Style}>The Bill Comes Due — Japan's Aging Problem</h2>
          <p style={pStyle}>
            Living long is only half of what gets discussed. The harder half is what happens to a country when it succeeds too well at it. 2024 marked Japan's 17th consecutive year of natural population decline — deaths outpacing births — the steepest drop on record, with the birth rate sitting around 1.26 children per woman. More than 29% of the population is now 65 or older, edging toward one in three.
          </p>
          <p style={pStyle}>
            That's straining the pension system, creating chronic nursing and elder-care staff shortages, and shrinking the working-age labor pool that funds it all. Japan's government response includes a push into elder-care robotics under its "Society 5.0" framework and a gradual loosening of immigration policy to offset the labor shortfall. My honest read on it: Japan is less a longevity blueprint to copy wholesale and more a live case study in the tradeoffs nobody plans for once the problem of premature death is mostly solved.
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
            Sources: Japan Ministry of Health, Labour and Welfare (MHLW) 2024 Abridged Life Table, released July 2025; UN World Population Prospects 2024 Revision; Okinawa Centenarian Study.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/life-expectancy/india" style={linkStyle}>Life expectancy in India</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}