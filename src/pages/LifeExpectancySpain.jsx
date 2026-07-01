import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { COUNTRY_LE, GLOBAL_LE } from '../constants/lifeExpectancy'

const FAQS = [
  {
    q: 'What is the life expectancy in Spain in 2026?',
    a: 'According to INE — Spain\'s official national statistics institute — combined life expectancy reached 84.01 years in 2024, with men at 81.38 years and women at 86.53 years. These are the most recently published official figures. The calculator on this page uses the 2022 INE baseline of 83.0 years combined (80.1 male, 85.8 female), which remains a valid actuarial reference for life table calculations.',
  },
  {
    q: 'Why does Spain have such a high life expectancy?',
    a: 'Researchers consistently point to a combination of factors rather than a single cause: the Mediterranean diet, Spain\'s universal public healthcare system with strong primary care, a cultural pattern of daily walking and outdoor activity encouraged by the climate, and dense social and family ties that are independently linked to lower chronic stress and better mental health in later life. No single factor explains it — the combination is what makes Spain an outlier.',
  },
  {
    q: 'Why do Spanish people live so long compared to other Europeans?',
    a: 'Spain has the highest life expectancy among EU member states as of 2024 according to the OECD and European Commission, sitting 2.3 years above the EU average. The gap reflects lower premature mortality — particularly from cardiovascular disease — which researchers link to sustained adherence to Mediterranean dietary patterns, lower obesity rates than the OECD average, and a primary care system designed around chronic disease prevention and early detection.',
  },
  {
    q: 'Does the Mediterranean diet actually increase lifespan?',
    a: 'The evidence is stronger for the Mediterranean diet than for almost any other dietary pattern studied at population scale. Spain\'s own PREDIMED trial — one of the largest randomized nutrition studies ever conducted — found that a Mediterranean diet supplemented with extra-virgin olive oil reduced major cardiovascular events by approximately 30 percent compared to a low-fat control diet. Cardiovascular disease is the leading cause of preventable death globally, so this effect translates directly into measurable life expectancy gains.',
  },
  {
    q: 'What is Spain\'s life expectancy ranking globally?',
    a: 'Among sovereign nations with populations over 50,000, Spain typically ranks between 9th and 12th globally depending on the data source and year. It ranks 3rd highest in the EU as of 2024. Micro-states like Monaco and San Marino top the global list with figures above 85 years, but among large sovereign nations Spain consistently places in the top tier alongside Japan, Switzerland, Australia, and Italy.',
  },
  {
    q: 'Is Spain expected to have the world\'s highest life expectancy in the future?',
    a: 'A widely cited projection from the Institute for Health Metrics and Evaluation (IHME) suggests Spain could surpass Japan to reach the world\'s highest life expectancy among large sovereign nations by around 2040, with a projected figure of approximately 85.8 years. This projection assumes continued adherence to Mediterranean lifestyle patterns, improving healthcare, and ongoing reductions in cardiovascular mortality. Projections carry uncertainty and depend heavily on policy and behavioral trends holding.',
  },
  {
    q: 'Does the siesta help Spanish people live longer?',
    a: 'There is no study showing the siesta itself extends lifespan, but it represents a broader lifestyle rhythm that plausibly contributes: longer and more social mealtimes, a slower midday pace, and a cultural resistance to the rushed working lunch common in many northern European countries. Chronic stress is a well-established cardiovascular risk factor, and Spain\'s daily rhythm — combined with strong family ties and high social connectedness among older adults — is consistently linked in research to lower chronic stress.',
  },
  {
    q: 'How does Spain\'s healthcare system contribute to its life expectancy?',
    a: 'Spain\'s National Health System (SNS) covers 99.5 percent of residents and is built around universal primary care, where every resident is registered with a family doctor. According to OECD Health at a Glance 2025, Spain spends $5,346 per capita on health — below the OECD average of $5,967 — yet achieves preventable mortality of just 92 per 100,000 against an OECD average of 145. That combination of lower spending and better outcomes is evidence of genuine system efficiency rather than just wealth.',
  },
  {
    q: 'How does Spain compare to the US on life expectancy?',
    a: 'Spain\'s combined life expectancy of approximately 84 years is around 6 to 7 years higher than the United States figure of approximately 77.5 years. The gap is particularly wide for men — Spanish men live roughly 6 years longer than American men on average. The difference reflects substantially lower rates of cardiovascular disease mortality, lower obesity rates, and a diet pattern far lower in processed food and added sugar than the typical American diet.',
  },
  {
    q: 'What is Spain\'s life expectancy at age 65?',
    a: 'According to INE 2024 data, a person reaching age 65 in Spain can expect to live an additional 19.87 years on average if male and 23.64 years if female. Spain\'s post-65 life expectancy is among the highest in the EU, meaning Spain does not just produce longer lives overall — it also produces better survival well into old age, which is where lifestyle factors like diet and social connection are most influential.',
  },
  {
    q: 'Are younger Spaniards abandoning the Mediterranean diet?',
    a: 'This is a genuine concern flagged by nutrition researchers. Studies including baseline data from the PREDIMED trial note that younger Spanish populations have been shifting toward Western dietary patterns — more processed food, more sugar, less olive oil and fresh vegetables. If this trend continues over decades, it could narrow Spain\'s life expectancy advantage over peer countries, since the Mediterranean dietary pattern is considered a major structural driver of the current gap.',
  },
  {
    q: 'What role does walking and physical activity play in Spanish longevity?',
    a: 'Spain\'s climate and urban design both encourage daily walking to a degree uncommon in many comparable economies. Compact, walkable city centers, year-round mild temperatures across much of the country, and a culture of outdoor socializing combine to produce higher levels of routine physical activity among older adults in particular. Sustained moderate physical activity in later life is one of the strongest independent predictors of cardiovascular health and all-cause mortality reduction in the research literature.',
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
        maxHeight: open ? '500px' : '0', opacity: open ? 1 : 0,
        transition: 'max-height 0.4s ease, opacity 0.25s ease', overflow: 'hidden',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px',
          color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '18px',
        }}>{a}</p>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
      letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
      textTransform: 'uppercase',
    }}>{children}</p>
  )
}

const TOP_RANKED = [
  { country: 'Japan', value: 84.3 },
  { country: 'Switzerland', value: 84.0 },
  { country: 'Spain', value: 83.0 },
  { country: 'Australia', value: 83.3 },
  { country: 'Italy', value: 83.4 },
]

export default function LifeExpectancySpain() {
  const spain = COUNTRY_LE.spain
  const sortedTop = [...TOP_RANKED].sort((a, b) => b.value - a.value)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Life Expectancy in Spain 2026 — Why Spanish People Live So Long',
    description: 'Spain\'s life expectancy reached 84.01 years in 2024 per INE, with men at 81.38 and women at 86.53. Explore the Mediterranean diet, healthcare efficiency, and lifestyle factors that keep Spain at the top of global rankings.',
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-01-15',
    dateModified: '2026-06-15',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Helmet>
        <title>Spain Life Expectancy 2026 — Why Spanish People Live So Long</title>
        <meta name="description" content="Spain's life expectancy hit 84.01 years in 2024 (INE), with men at 81.38 and women at 86.53 — the highest in the EU. Learn why Spanish people live so long: Mediterranean diet, PREDIMED evidence, healthcare efficiency, and lifestyle factors." />
        <meta name="keywords" content="spain life expectancy 2026, why do spanish people live so long, mediterranean diet life expectancy, spain life expectancy ranking, spain life expectancy vs usa, spain healthcare system longevity, PREDIMED study olive oil, spain life expectancy male female, spain EU life expectancy ranking, why is spain so healthy" />
        <meta property="og:title" content="Spain Life Expectancy 2026 — Why Spanish People Live So Long" />
        <meta property="og:description" content="Spain's life expectancy reached 84.01 years in 2024, highest in the EU. See the diet, lifestyle, and healthcare factors behind Spain's longevity ranking." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/spain" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/spain" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <SectionLabel>Country Report</SectionLabel>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15,
            color: 'var(--text1)', marginBottom: '20px', letterSpacing: '-1px',
          }}>
            Life Expectancy in Spain 2026
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '17px',
            color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px',
          }}>
            Spain's combined life expectancy reached <strong style={{ color: 'var(--text1)' }}>84.01 years</strong> in 2024, according to INE — Spain's official national statistics institute — making it the highest life expectancy of any EU member state. Men average <strong style={{ color: 'var(--text1)' }}>81.38 years</strong> and women <strong style={{ color: 'var(--text1)' }}>86.53 years</strong>, with a gender gap of 5.15 years that is notably smaller than the double-digit gaps seen in countries like Russia. The calculator on this page uses the 2022 INE baseline of {spain.combined} years ({spain.male} male, {spain.female} female). This guide explains what drives Spain's exceptional ranking — the Mediterranean diet, a uniquely efficient public healthcare system, and a set of cultural lifestyle patterns that compound over a lifetime.
          </p>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'var(--border2)', border: '1px solid var(--border2)',
            borderRadius: '14px', overflow: 'hidden', marginBottom: '40px',
          }}>
            {[
              { label: 'Combined', value: spain.combined },
              { label: 'Male', value: spain.male },
              { label: 'Female', value: spain.female },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label} (years)</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginBottom: '40px', lineHeight: 1.6 }}>
            Calculator baseline: INE Spain 2022 figures. Latest official data (INE 2024, published November 2025): combined 84.01 years, male 81.38 years, female 86.53 years. Life expectancy at age 65: an additional 19.87 years for men and 23.64 years for women.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Why Spanish People Live So Long: The Full Picture
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Spain's longevity advantage is not explained by wealth alone. Several countries outspend Spain significantly on healthcare and achieve worse outcomes. According to OECD Health at a Glance 2025, Spain spends $5,346 per capita on health — below the OECD average of $5,967 — yet records preventable mortality of just 92 per 100,000, against an OECD average of 145. Spain performs better than the OECD average on 8 out of 10 key health status indicators. That combination points to something structural: a set of lifestyle and dietary patterns that reduce the underlying disease burden that healthcare systems elsewhere have to manage reactively.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            University of Valencia physiology researcher Consuelo Borrás has summarized the research consensus concisely: genetics matter most for reaching extreme old age, past 100, but for living to 85 — what she calls "normal longevity" — lifestyle is more important than genetic makeup. Spain's lifestyle pattern is the combination of diet, social structure, physical activity habits, and a healthcare system that catches problems early. Remove any single element and the effect would be smaller. The compounding of all four is what puts Spain at the top of EU rankings.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            The Mediterranean Diet: Clinical Evidence, Not Just Culture
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The Mediterranean diet is the most-cited explanation for Spain's longevity, and its evidence base is unusually strong for a population-level dietary claim. Spain's own PREDIMED trial — one of the largest randomized nutrition studies ever conducted — tracked over 7,500 adults at elevated cardiovascular risk across multiple Spanish cities for five years. Participants assigned to a Mediterranean diet supplemented with extra-virgin olive oil showed approximately a 30 percent reduction in major cardiovascular events compared to a low-fat control group. Because cardiovascular disease is the leading preventable cause of death globally, a 30 percent reduction in its incidence translates directly into measurable population-level life expectancy gains.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The diet emphasizes extra-virgin olive oil as the primary fat source, daily vegetables and legumes, fish and seafood several times per week, moderate fruit consumption, whole grains, and minimal processed food and red meat. It is anti-inflammatory at the biological level, which researchers believe contributes to lower rates of several chronic conditions beyond cardiovascular disease — including type 2 diabetes, certain cancers, and potentially neurodegenerative conditions like Alzheimer's disease. UNESCO recognized the Mediterranean diet as part of humanity's intangible cultural heritage in 2010, reflecting how the eating pattern is embedded in community life rather than being a modern health intervention.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            One important caveat noted by nutrition researchers: younger Spaniards are gradually shifting toward more Westernized dietary patterns — more processed food, more sugar, less olive oil. If this trend continues over decades, it could narrow Spain's longevity advantage over peer countries. The diet works because it is a lifetime habit, not a temporary intervention.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Social Life, Walking Culture, and Daily Pace
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The siesta itself is not proven to directly extend lifespan, but the broader rhythm it represents very plausibly does. Spain's daily structure — longer mealtimes, a slower midday pace, a strong cultural preference for eating with others rather than alone at a desk — is consistently linked to lower chronic stress in comparative lifestyle research. Chronic stress is a well-established and significant risk factor for cardiovascular disease, immune dysfunction, and accelerated biological aging. By building recovery into the daily rhythm, Spain's lifestyle pattern addresses one of the major hidden drivers of premature mortality in high-income countries.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Social connectedness among older adults is another structural advantage. Spain has relatively low rates of social isolation among the elderly compared to northern European peers, with fewer older adults living alone than the European average. Social isolation in old age is independently associated with increased mortality risk in the research literature — comparable in effect size to smoking 15 cigarettes per day in some studies. Spain's dense family networks and cultural norm of multi-generational contact appear to provide a meaningful protective effect at the population level.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Spain's climate and urban design also encourage something that is difficult to engineer in colder or more car-dependent countries: daily walking. Compact, walkable city centers across most of Spain, mild temperatures for much of the year, and a strong culture of outdoor socializing produce higher levels of routine physical activity among older adults than are typical in comparable economies. Sustained moderate physical activity in later life is among the strongest independent predictors of cardiovascular health and reduced all-cause mortality in epidemiological research.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Healthcare That Punches Above Its Budget
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Spain's National Health System (SNS) covers 99.5 percent of the resident population and is structured around universal primary care, with every resident registered to a family doctor responsible for preventive care, chronic disease management, and specialist referral. The European Health Observatory's Spain health system review noted that Spain has the highest life expectancy among EU countries while also recording some of the lowest rates of avoidable hospitalization and avoidable mortality in the EU — both strong markers of a system that is catching and managing disease early rather than treating late-stage complications.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The headline spending comparison is striking: Spain achieves a life expectancy 2.9 years above the OECD average while spending below the OECD average per capita. It has fewer hospital beds per 1,000 population than the OECD average (2.9 vs 4.2), fewer imaging machines, and a physician-to-population ratio that is not exceptional. What it does have is a primary care architecture that catches problems before hospitalization becomes necessary — reflected in preventable mortality rates that are among the lowest in the developed world. Only 1.7 percent of Spain's population reports unmet healthcare needs, against an OECD average of 3.4 percent.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Spain's Global and EU Life Expectancy Ranking
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '20px' }}>
            Spain holds the highest life expectancy among EU member states as of 2024, sitting 2.3 years above the EU average according to the European Commission's Country Health Profile 2025. Globally, Spain ranks around 9th to 12th among sovereign nations depending on the source and year — micro-states like Monaco (86.5 years) and San Marino (85.8 years) top the list but have populations under 50,000. Among large sovereign nations, Spain places consistently in the leading group alongside Japan, Switzerland, Australia, and Italy.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '32px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>RANK</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>COUNTRY</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>LIFE EXPECTANCY</th>
                </tr>
              </thead>
              <tbody>
                {sortedTop.map((c, i) => (
                  <tr key={c.country} style={{ borderTop: '1px solid var(--border2)', background: c.country === 'Spain' ? 'rgba(192,57,43,0.06)' : 'transparent' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text3)' }}>{i + 1}</td>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{c.country}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: c.country === 'Spain' ? 'var(--crimson)' : 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{c.value} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '-16px', marginBottom: '32px' }}>
            Calculator baseline reference values (INE 2022). Latest INE 2024 data places Spain at 84.01 years combined. Rankings shift with each annual data release; micro-states are excluded from this comparison.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Spain vs. the Global Average and the United States
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            At {spain.combined} years on the baseline used by this calculator, Spain sits more than 10 years above the global average of {GLOBAL_LE} years — one of the widest positive gaps of any major country. Against the United States, the difference is around 6 to 7 years in Spain's favor. For men specifically, Spanish men live roughly 6 years longer than American men on average — a gap that reflects substantially lower cardiovascular disease mortality, lower rates of obesity, and a dietary pattern far lower in processed food and added sugar than the typical American diet.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The comparison with the United States is particularly instructive because the US spends dramatically more on healthcare per capita — roughly double Spain's per-person expenditure — yet achieves significantly lower life expectancy. Spain's outcome is not a product of healthcare spending; it is a product of the lower disease burden that a Mediterranean lifestyle creates in the first place, combined with a public health system efficient enough to manage what remains.
          </p>

          {/* CTA */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: '16px', padding: '28px 24px', textAlign: 'center',
            margin: '40px 0',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              National averages tell part of the story. Your personal estimate depends on your own diet, habits, and lifestyle factors.
            </p>
            <Link to="/" style={{
              display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: '15px', color: '#fff', background: 'var(--crimson)',
              padding: '13px 28px', borderRadius: '10px', textDecoration: 'none',
            }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          {/* FAQ */}
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '20px', marginTop: '48px' }}>
            Frequently Asked Questions
          </h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: INE Spain Vital Statistics 2024 (published November 2025); OECD Health at a Glance 2025; European Commission Spain Country Health Profile 2025; European Health Observatory Spain Health System Review 2024; PREDIMED Study (New England Journal of Medicine, 2013 and 2018 reanalysis); UN World Population Prospects 2024; World Bank 2024. All life expectancy figures are population-level statistical estimates, not individual predictions.
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}