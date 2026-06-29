import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { COUNTRY_LE, INDIA_STATE_LE, GLOBAL_LE } from '../constants/lifeExpectancy'

const STATE_LABELS = {
  kerala: 'Kerala',
  goa: 'Goa',
  delhi: 'Delhi',
  maharashtra: 'Maharashtra',
  punjab: 'Punjab',
  karnataka: 'Karnataka',
  tamilnadu: 'Tamil Nadu',
  westbengal: 'West Bengal',
  gujarat: 'Gujarat',
  rajasthan: 'Rajasthan',
  up: 'Uttar Pradesh',
  bihar: 'Bihar',
  mp: 'Madhya Pradesh',
  assam: 'Assam',
}

const FAQS = [
  {
    q: 'What is the average life expectancy in India in 2026?',
    a: 'According to the UN World Population Prospects 2024 Revision — the most comprehensive and widely cited international dataset — India\'s national average life expectancy is 72 years, with 70.52 years for males and 73.60 years for females. Official 2026 figures will not be published until demographic surveys are compiled and released, typically two to three years after the reference year, so this 2023 benchmark from the UN WPP 2024 release is the most current verified number available.',
  },
  {
    q: 'How does India\'s life expectancy compare to the world average?',
    a: 'India sits slightly below the global average. The world average life expectancy for 2023 was approximately 73.2 years (UN WPP 2024), while India\'s combined figure stands at 72 years — a gap of roughly 1.2 years. Thirty years ago that gap was closer to five years, so India has been closing it steadily, driven by falling infant mortality, improved maternal care, and expanded vaccination coverage.',
  },
  {
    q: 'Which state in India has the highest life expectancy?',
    a: 'Kerala consistently leads all Indian states with a life expectancy of approximately 77.3 years, based on India\'s Sample Registration System (SRS) abridged life tables. This reflects decades of near-universal literacy, a dense public healthcare network, and historically low infant and maternal mortality rates. Goa ranks second at around 76.1 years, sharing similar structural advantages.',
  },
  {
    q: 'Which state in India has the lowest life expectancy?',
    a: 'Assam records the lowest life expectancy among the 14 major states tracked in India\'s SRS data, at approximately 65.1 years. Madhya Pradesh (65.8) and Bihar (66.2) are also in the bottom tier. These states face higher rates of childhood malnutrition, lower per-capita healthcare spending, and greater distances to functioning medical facilities — all of which directly suppress average lifespan.',
  },
  {
    q: 'Why do men live shorter lives than women in India?',
    a: 'Several compounding factors explain the male-female gap. Biologically, women have stronger immune responses and lower baseline cardiovascular risk in early life. Socially, Indian men have significantly higher rates of tobacco and alcohol use, which are major contributors to premature death. Men also face higher rates of workplace accidents and are less likely to seek medical care early. Interestingly, before the 1980s, Indian men actually lived longer than women — the female advantage only emerged as maternal mortality declined sharply through healthcare improvements.',
  },
  {
    q: 'What is the healthy life expectancy (HALE) in India?',
    a: 'India\'s healthy life expectancy — the number of years a person can expect to live in full health, free from serious disease or disability — is approximately 58 years for both men and women combined, according to WHO estimates. This means the average Indian spends roughly 14 years of their life in poor health or with a significant disability. Closing this gap between lifespan and healthspan is increasingly the focus of India\'s public health planning.',
  },
  {
    q: 'How has India\'s life expectancy changed over time?',
    a: 'At independence in 1947, India\'s life expectancy was roughly 32 years — reflecting widespread infectious disease, recurring famines, and almost no organised healthcare infrastructure. By 1990 it had risen to around 58 years, and it crossed 70 years for the first time around 2019. The only notable reversal came during the COVID-19 pandemic in 2020-2021, when life expectancy dipped by an estimated 1.5 to 2 years before recovering. This trajectory — more than doubling in seven decades — is one of the fastest improvements in life expectancy recorded for a large country.',
  },
  {
    q: 'What are the leading causes of death in India that shorten life expectancy?',
    a: 'Cardiovascular diseases — heart attacks and stroke — are now the single largest cause of adult death in India, accounting for over a quarter of all deaths. Non-communicable diseases overall (heart disease, diabetes, chronic respiratory illness, and cancer) are responsible for the majority of premature adult mortality. Infectious diseases including tuberculosis, diarrhoeal disease, and pneumonia remain significant contributors, particularly in children and in states with weaker health systems. Air pollution is an increasingly recognised risk factor, especially in North India.',
  },
  {
    q: 'If I am 30 years old in India, how long can I expect to live?',
    a: 'A 30-year-old in India today can expect to live, on average, to about 75.6 years, according to UN actuarial life table projections. This is higher than the at-birth figure of 72 years because you have already survived the causes of early-age mortality — infant deaths, childhood illness, and accidents in adolescence — all of which pull down the at-birth average. The older you already are, the higher your remaining life expectancy estimate becomes.',
  },
  {
    q: 'What is India\'s life expectancy ranking among countries of the world?',
    a: 'India ranks roughly in the middle tier globally — ahead of sub-Saharan Africa and parts of South Asia, but behind most of East Asia, Southeast Asia, the Middle East, and all high-income regions. In the World Bank\'s 2024 estimates, Japan leads globally at around 84 years, while countries like Australia, Spain, and the UK are in the 81–83 year range. India\'s 72 years places it alongside countries at a similar stage of economic and healthcare development.',
  },
  {
    q: 'Does urban versus rural location affect life expectancy in India?',
    a: 'Yes, significantly. Urban Indians on average live longer than their rural counterparts, primarily because of better access to hospitals, specialist care, cleaner water and sanitation, and higher average incomes. However, the urban advantage is narrowing: rural India\'s infant mortality rate has fallen sharply over the past two decades, and the SRS report 2024 shows the rural Infant Mortality Rate has dropped to 27 deaths per 1,000 live births, down substantially from where it stood in 2010. In some high-income, well-educated urban areas, rising sedentary lifestyles and pollution are now creating new health risks that partially offset the access advantage.',
  },
  {
    q: 'Will India\'s life expectancy continue to increase?',
    a: 'UN projections from the World Population Prospects 2024 Revision estimate India\'s combined life expectancy will reach approximately 78–80 years by 2050 and continue rising to around 85 years by 2100 under standard demographic assumptions. The pace of improvement depends heavily on how quickly India expands rural healthcare access, controls non-communicable diseases like diabetes and hypertension, reduces air pollution, and manages the health costs of an increasingly sedentary and urban population.',
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
        maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0,
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

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
      letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
      textTransform: 'uppercase',
    }}>{children}</p>
  )
}

export default function LifeExpectancyIndia() {
  const india = COUNTRY_LE.india
  const sortedStates = Object.entries(INDIA_STATE_LE).sort((a, b) => b[1] - a[1])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Life Expectancy in India 2026 — State by State Data and Rankings',
    description: 'Complete guide to life expectancy in India by state, with male/female breakdowns, historical trends, and comparison to the global average. Data sourced from UN World Population Prospects 2024 Revision and India SRS.',
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-01-15',
    dateModified: '2026-06-01',
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
        <title>Life Expectancy in India 2026 — State by State Rankings and Data</title>
        <meta name="description" content="India's life expectancy is 72 years (UN 2024) — 70.52 for men, 73.60 for women. Complete state-by-state breakdown from Kerala (77.3) to Assam (65.1), historical trends since 1950, and comparison to global averages." />
        <meta name="keywords" content="life expectancy in India, India life expectancy 2026, life expectancy by state India, how long do Indians live, India life expectancy ranking, Kerala life expectancy, India vs world life expectancy, average age of death in India, healthy life expectancy India, India life expectancy male female" />
        <meta property="og:title" content="Life Expectancy in India 2026 — State by State Rankings and Data" />
        <meta property="og:description" content="India's life expectancy is 72 years (UN 2024). See full state-by-state breakdown, why Kerala leads, how India compares globally, and what the numbers mean for you." />
        <meta property="og:url" content="https://deathtimeleft.com/life-expectancy/india" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://deathtimeleft.com/life-expectancy/india" />
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
            Life Expectancy in India 2026 — State by State Rankings and Data
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '17px',
            color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px',
          }}>
            India's national average life expectancy is <strong style={{ color: 'var(--text1)' }}>72 years</strong> according to the UN World Population Prospects 2024 Revision — the most comprehensive international demographic dataset currently available — with <strong style={{ color: 'var(--text1)' }}>70.52 years for men</strong> and <strong style={{ color: 'var(--text1)' }}>73.60 years for women</strong>. That national figure, however, conceals a gap of over twelve years between India's best- and worst-performing states. A child born in Kerala today can statistically expect to outlive a child born in Assam by more than a decade — despite living in the same country, under the same national healthcare system. This guide covers the full state-by-state life expectancy rankings in India, the structural reasons behind the regional divide, historical trends since 1950, and what India's numbers mean when placed alongside the global average.
          </p>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'var(--border2)', border: '1px solid var(--border2)',
            borderRadius: '14px', overflow: 'hidden', marginBottom: '40px',
          }}>
            {[
              { label: 'Combined', value: india.combined },
              { label: 'Male', value: india.male },
              { label: 'Female', value: india.female },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label} (years)</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            A Note on the Data Source
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Life expectancy figures for a given year are typically published two to three years after that year ends. The most current comprehensive dataset as of 2026 is the UN World Population Prospects 2024 Revision, which provides estimates up to 2023. The national figures cited in this article (72 years combined, 70.52 male, 73.60 female) come from that UN release and are also confirmed by World Bank indicators for the same period. The state-level data comes from India's own Sample Registration System (SRS) abridged life tables, which are compiled and published by the Office of the Registrar General of India. Where the most recent SRS state figures predate the national UN estimate, the SRS values have been retained as-is rather than projected, since state-level modelling without official SRS data would introduce error.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Life Expectancy in India by State — Full Rankings
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '20px' }}>
            Life expectancy in India varies by state more dramatically than in almost any comparable country of similar size. The difference between Kerala at the top and Assam at the bottom is around 12 years — a gap larger than the difference between some entire countries. This variation is not random. It tracks closely with state-level literacy rates, per-capita public health spending, infant mortality rates, and access to primary healthcare facilities. States that invested early in education and basic health infrastructure consistently show higher life expectancy across decades of data.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '32px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>RANK</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>STATE</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>LIFE EXPECTANCY</th>
                </tr>
              </thead>
              <tbody>
                {sortedStates.map(([key, value], i) => (
                  <tr key={key} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text3)' }}>{i + 1}</td>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{STATE_LABELS[key]}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: i < 3 ? 'var(--crimson)' : 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{value} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Why Kerala Has the Highest Life Expectancy in India
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Kerala's life expectancy of 77.3 years is not an accident — it is the compounded result of policy choices made over decades. The state achieved near-universal literacy before most Indian states had even begun expanding primary education, and the research linking literacy to health outcomes is consistent across countries: people who can read medical instructions, follow vaccination schedules, and navigate the healthcare system tend to live longer, full stop. Kerala also built a dense network of public health sub-centres, primary health centres, and district hospitals starting in the 1950s and 1960s, decades before such infrastructure reached most of rural India.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The state's historically low infant mortality rate plays a direct mechanical role in pushing up its life expectancy figure. Life expectancy at birth is heavily influenced by how many newborns survive their first year — every infant death pulls the average down sharply. Kerala's Infant Mortality Rate (IMR) is currently among the lowest in India at approximately 8 deaths per 1,000 live births, compared to a national average of 24. Goa, which ranks second in state life expectancy at 76.1 years, benefits from similar dynamics: a small, manageable population, high literacy, and per-capita health investment that is among the highest in the country.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Why Uttar Pradesh, Bihar, and Assam Rank Lowest
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Uttar Pradesh (67.0 years), Bihar (66.2 years), and Assam (65.1 years) sit at the bottom of the life expectancy ranking in India, and the reasons are structural rather than geographic. All three states have larger rural populations relative to available healthcare infrastructure, meaning each public hospital and primary health centre serves far more people than the national average. Poverty rates are substantially higher, which correlates directly with childhood malnutrition — particularly stunting, which has measurable, lifelong consequences on cardiovascular and metabolic health even decades after childhood.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Female literacy rates in these states, while improving, remain lower than the national average — and maternal health knowledge is one of the strongest predictors of infant and child survival. A mother's education level directly influences whether she seeks antenatal care, whether she delivers in a medical facility, and whether she follows child immunisation schedules. The life expectancy gap between a state like Kerala and a state like Assam is, in large part, the accumulated result of these educational and healthcare access differences compounding over multiple generations.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            How India's Life Expectancy Has Changed Since 1950
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            In 1950, the average Indian could expect to live to around 41 years — one of the lowest life expectancies in the world at that time, shaped by widespread infectious disease, recurring famines, and minimal organised healthcare. A child born in the UK that same year could expect to live to 69 — a gap of nearly 28 years between the two countries. That gap has since narrowed to under ten years, a compression that reflects the speed and scale of India's public health progress.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The improvement came from several overlapping interventions: mass vaccination campaigns — particularly against smallpox (eradicated in India in 1975) and polio — dramatically reduced infectious disease mortality in children. The Green Revolution of the 1960s and 1970s sharply reduced famine risk and improved overall nutrition. Expansion of clean water access and sanitation reduced diarrhoeal diseases, which had previously been major killers of children under five. Life expectancy crossed 60 years by the mid-1990s and passed 70 for the first time around 2019. The only interruption to this upward trend was the COVID-19 pandemic in 2020-2021, during which life expectancy is estimated to have dipped temporarily before recovering by 2022.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            India's Life Expectancy Ranking vs the World
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The global average life expectancy is approximately 73.2 years (UN WPP 2024). India, at 72 years, sits about 1.2 years below that line — a gap that has narrowed considerably over the past three decades and continues to close. India ranks in the middle tier globally, broadly comparable to countries at a similar stage of economic development. Japan leads the world at around 84.3 years, followed by Australia, Spain, and Switzerland. The United States sits at approximately 77.5 years. China, which India is often compared to, has a combined life expectancy of around 79 years — roughly seven years ahead of India — reflecting a different trajectory in healthcare spending and urbanisation over the past forty years.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            India's India life expectancy ranking among all countries places it around 130th globally, but this positional ranking understates the progress made. In absolute terms, the 31-year gain since 1950 is one of the largest life expectancy improvements recorded for a country of this population size. The challenge for the next phase is different from the first: early gains came from eliminating deaths that should never have happened — infectious disease in children, preventable maternal deaths, vaccine-preventable illness. The remaining gap to close is harder and more expensive: it involves managing chronic non-communicable diseases in adults, dealing with the health consequences of air pollution, reducing the burden of diabetes and hypertension, and building specialist and geriatric care capacity.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Lifespan vs Healthspan: India's Hidden Gap
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Life expectancy tells you how long the average Indian is likely to live. It does not tell you how many of those years are spent in good health. India's Healthy Life Expectancy (HALE) — the number of years expected to be lived free from serious disease or disability — is approximately 58 years, according to WHO estimates. This means the average Indian spends roughly 14 years at the end of their life in poor health, with chronic illness or disability significantly affecting their quality of life. In Japan, by comparison, healthy life expectancy is around 74 years — people there live longer and spend a much smaller proportion of their life in decline.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The leading drivers of this healthspan gap in India are cardiovascular disease, type 2 diabetes, chronic respiratory disease (worsened by high air pollution levels), and musculoskeletal conditions. The SRS Statistical Report 2024 notes that India's crude death rate has stabilised at 6.4 per thousand, while the population is ageing — the share of those aged 60 and above has reached 9.7 percent and is rising. This means a growing proportion of Indians will live longer but with greater chronic disease burden, making the management of non-communicable diseases one of the most pressing long-term public health challenges the country faces.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            What Can Help Indians Live Longer and Healthier
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            At a population level, the research is clear on where the biggest gains are achievable: expanding access to quality primary healthcare in low-ranking states, reducing childhood malnutrition — which the SRS 2024 report highlights as a continuing concern, particularly in Bihar, Madhya Pradesh, and Uttar Pradesh — and accelerating the reduction of India's infant mortality rate, which still has substantial room to fall before reaching the levels achieved by Kerala nationally. Addressing air pollution, particularly in North India's Indo-Gangetic Plain, is increasingly recognised as a public health intervention with significant life expectancy impact.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            At an individual level, the factors that move your personal life expectancy estimate beyond the regional average are well established: avoiding tobacco (India has among the highest rates of smokeless tobacco use in the world, which carries significant oral cancer and cardiovascular risk), managing blood pressure and blood sugar — both of which are massively underdiagnosed in India — maintaining regular physical activity, and seeking preventive health screenings before symptoms appear. Research published in Indian medical journals consistently shows that having three or more cardiometabolic risk factors — hypertension, diabetes, dyslipidaemia, smoking, obesity — can reduce remaining life expectancy at age 40 by more than six years compared to someone with none of those factors.
          </p>

          {/* CTA */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: '16px', padding: '28px 24px', textAlign: 'center',
            margin: '40px 0',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              The national average is a starting point. Your personal estimate depends on your age, lifestyle, and health — not just where you were born.
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
            Sources: UN World Population Prospects 2024 Revision (United Nations Population Division); World Bank Development Indicators 2024; India Sample Registration System (SRS) Abridged Life Tables, Office of the Registrar General of India; SRS Statistical Report 2024; WHO Global Health Observatory. State-level figures are based on the most recently published SRS data. All figures are population-level statistical estimates, not individual predictions. Official data for 2025 and 2026 will be published when demographic surveys are processed and released.
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}