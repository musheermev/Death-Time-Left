import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { COUNTRY_LE, GLOBAL_LE } from '../constants/lifeExpectancy'

const FAQS = [
  {
    q: 'What is the average life expectancy in the USA in 2026?',
    a: 'The most current official figures come from the CDC\'s National Center for Health Statistics final mortality report released in January 2026, covering calendar year 2024. US life expectancy reached a record high of 79.0 years combined — 76.5 years for men and 81.4 years for women. This surpasses the previous record and marks a meaningful recovery from the lows recorded during the COVID-19 pandemic and peak opioid crisis years of 2020-2021.',
  },
  {
    q: 'Why is US life expectancy lower than other developed countries?',
    a: 'Even at its record high of 79.0 years, the US trails the average of comparable wealthy nations by about 3.7 years — those peer nations average 82.7 years (KFF/Peterson Health System Tracker, 2024 data). Researchers consistently point to several structural factors: a fragmented, non-universal insurance system that leads many Americans to delay care due to cost; higher rates of obesity, diabetes, and chronic disease; a uniquely severe drug overdose crisis that has no parallel in other wealthy nations; and higher rates of gun violence and traffic fatalities. Healthcare spending is not the issue — the US spends more per capita than any peer nation, yet achieves shorter lives.',
  },
  {
    q: 'Which state has the highest life expectancy in the USA?',
    a: 'Hawaii leads all 50 states with a life expectancy of 80.0 years, according to CDC state life tables based on 2022 data — the most recently published state-level figures as of 2026. Massachusetts follows at 79.8 years, with New Jersey and New York close behind. States in the Northeast and along the Pacific coast consistently dominate the top rankings, reflecting higher median incomes, greater healthcare access, lower smoking rates, and healthier average lifestyle patterns.',
  },
  {
    q: 'Which state has the lowest life expectancy in the USA?',
    a: 'West Virginia records the lowest life expectancy in the US at 72.2 years in the most recent CDC state-level data, closely followed by Mississippi at 72.6 years and Kentucky at 73.6 years. These states have been disproportionately affected by the opioid crisis, have higher rates of obesity and smoking, lower median incomes, and face significant challenges with rural hospital access. The gap between Hawaii and West Virginia — nearly eight years — is comparable to the difference between some entire countries.',
  },
  {
    q: 'What happened to US life expectancy during and after COVID-19?',
    a: 'US life expectancy fell sharply in 2020 and 2021 — dropping from 78.8 years in 2019 to 76.4 years in 2021, one of the steepest two-year declines recorded in modern American history. The country began recovering in 2022 (77.5 years), continued climbing through 2023 (78.4 years), and reached a new record of 79.0 years in 2024. The recovery was driven primarily by a dramatic decline in drug overdose deaths — total overdose deaths fell from 105,007 in 2023 to 79,384 in 2024, a drop of nearly 25 percent in a single year.',
  },
  {
    q: 'How did the opioid crisis affect US life expectancy?',
    a: 'The opioid epidemic has been one of the single largest suppressants of US life expectancy in modern history. At its peak in 2022-2023, drug overdose deaths — overwhelmingly driven by illicitly manufactured fentanyl — exceeded 105,000 per year and made overdose the leading cause of accidental death for Americans between the ages of 18 and 44. The 2024 final CDC data shows a significant reversal: deaths involving synthetic opioids like fentanyl fell by 35.6 percent, from 22.2 to 14.3 per 100,000 population. This single decline is the primary reason the national life expectancy figure reached its all-time high in 2024.',
  },
  {
    q: 'Why do American men live so much shorter lives than American women?',
    a: 'In 2024, the male-female life expectancy gap in the US was 4.9 years — men at 76.5 years, women at 81.4 years. Several factors drive this. Men in the US have substantially higher rates of drug overdose deaths, workplace fatalities, and gun-related mortality. They are also less likely to seek preventive medical care, more likely to smoke and drink heavily, and have higher rates of cardiovascular disease at younger ages. The gap narrowed slightly in 2024 (from 5.3 years in 2023) primarily because the opioid crisis had hit men harder, and the recent decline in overdose deaths benefited male life expectancy more.',
  },
  {
    q: 'Does health insurance or healthcare access affect life expectancy in the US?',
    a: 'Research strongly supports that it does. The US is unique among wealthy nations in not providing universal health coverage, and the consequences show up in mortality data. Studies estimate that lack of insurance leads many Americans to delay or avoid care for treatable conditions, which progresses them to more serious and expensive disease states. The National Research Council has concluded that lack of universal healthcare access has measurably increased US mortality and reduced life expectancy compared to peer nations. This partly explains why states with broader Medicaid coverage tend to have higher life expectancy than those that have historically limited eligibility.',
  },
  {
    q: 'How does life expectancy differ by race and ethnicity in the USA?',
    a: 'There are significant racial and ethnic disparities in US life expectancy. Hispanic Americans have historically had higher life expectancy than their socioeconomic status would predict — a pattern researchers call the "Hispanic paradox." Black Americans continue to face a measurable gap compared to white Americans, partly attributable to higher rates of cardiovascular disease, higher maternal mortality, and the disproportionate burden of the opioid crisis on certain communities. The CDC 2024 data shows the largest improvements in age-adjusted death rates among Hispanic males (-5.9%) and American Indian and Alaska Native populations (-5.1% to -5.2%), though these groups still face elevated risks compared to the national average.',
  },
  {
    q: 'If I am 65 years old in America, how much longer can I expect to live?',
    a: 'According to CDC 2024 final data, a 65-year-old American can expect to live an additional 19.7 years on average — meaning a total life expectancy of about 84.7 years at that age. For men at 65, remaining life expectancy is 18.4 additional years (total ~83.4); for women at 65, it is 20.8 additional years (total ~85.8). These figures are higher than the at-birth life expectancy of 79.0 years because a 65-year-old has already survived the causes of early-age mortality — accidents, overdoses, and other premature causes of death — that pull the at-birth average down.',
  },
  {
    q: 'Is US life expectancy improving or declining in 2026?',
    a: 'It is improving. The CDC\'s most recent final data (2024 calendar year, published January 2026) shows US life expectancy at a record 79.0 years. Provisional data from mid-2025 suggests the upward trend has continued through early 2025, driven largely by continued reductions in overdose deaths. However, some researchers and public health experts have raised concern that federal budget cuts and reductions in programs that support overdose prevention, Medicaid coverage, and CDC data infrastructure — implemented in 2025 — could slow or reverse this progress in coming years.',
  },
  {
    q: 'What are the leading causes of death that most affect US life expectancy?',
    a: 'Heart disease and cancer remain the top two causes of death in the US in 2024, accounting for a large share of all deaths. Unintentional injuries — primarily drug overdoses — held third place, though the dramatic 24 percent decline in overdose deaths in 2024 contributed most to the rise in life expectancy. Suicide entered the top 10 causes of death in 2024 for the first time, replacing COVID-19 which dropped from 10th to 15th. Chronic lower respiratory diseases, stroke, Alzheimer\'s, and diabetes complete the major causes. Heart disease alone kills roughly one American every 33 seconds.',
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

const G7_COMPARISON = [
  { country: 'Japan', value: 84.0 },
  { country: 'Italy', value: 83.4 },
  { country: 'Canada', value: 82.7 },
  { country: 'France', value: 83.0 },
  { country: 'Germany', value: 81.2 },
  { country: 'United Kingdom', value: 81.0 },
  { country: 'United States', value: 79.0 },
]

export default function LifeExpectancyUSA() {
  const usa = COUNTRY_LE.usa
  const sortedG7 = [...G7_COMPARISON].sort((a, b) => b.value - a.value)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Life Expectancy in the USA 2026 — CDC Data, State Rankings, and G7 Comparison',
    description: 'US life expectancy reached a record 79.0 years in 2024 (CDC final data) — 76.5 for men, 81.4 for women. State-by-state breakdown, opioid crisis impact, and why the US still trails other wealthy nations.',
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
        <title>Life Expectancy in the USA 2026 — CDC Record High, State Rankings & G7 Gap</title>
        <meta name="description" content="US life expectancy hit a record 79.0 years in 2024 (CDC final data) — 76.5 for men, 81.4 for women. State-by-state rankings, opioid crisis recovery, and why the US still trails comparable wealthy nations by 3.7 years." />
        <meta name="keywords" content="life expectancy USA, US life expectancy 2026, life expectancy by state USA, why is US life expectancy lower than other countries, CDC life expectancy 2024, opioid crisis life expectancy, US life expectancy ranking, life expectancy men vs women USA, Hawaii life expectancy, West Virginia life expectancy, US vs G7 life expectancy" />
        <meta property="og:title" content="Life Expectancy in the USA 2026 — CDC Record High, State Rankings & G7 Gap" />
        <meta property="og:description" content="US life expectancy hit a record 79.0 years in 2024. See state-by-state data, the opioid crisis recovery, and how the US compares to Japan, France, and other G7 nations." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy/usa" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy/usa" />
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
            Life Expectancy in the USA 2026 — CDC Record High, State Rankings and G7 Gap
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '17px',
            color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px',
          }}>
            US life expectancy reached a <strong style={{ color: 'var(--text1)' }}>record high of 79.0 years</strong> in 2024, according to final mortality data published by the CDC's National Center for Health Statistics in January 2026 — <strong style={{ color: 'var(--text1)' }}>76.5 years for men</strong> and <strong style={{ color: 'var(--text1)' }}>81.4 years for women</strong>. The record was driven primarily by a dramatic 24 percent decline in drug overdose deaths, the largest single-year drop in overdose mortality recorded in modern US history. Yet even at this peak, the US still trails comparable wealthy nations by nearly four years — a persistent structural gap that more spending, more technology, and even this record recovery have not closed.
          </p>

          {/* Stat strip — values from lifeExpectancy.js baseline (2022 CDC) */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'var(--border2)', border: '1px solid var(--border2)',
            borderRadius: '14px', overflow: 'hidden', marginBottom: '8px',
          }}>
            {[
              { label: 'Combined', value: usa.combined },
              { label: 'Male', value: usa.male },
              { label: 'Female', value: usa.female },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label} (years)</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginBottom: '40px', lineHeight: 1.6 }}>
            Calculator baseline figures (CDC 2022). Latest CDC 2024 final data: 79.0 combined, 76.5 male, 81.4 female — see article below.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            A Note on the Data
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Life expectancy statistics are published by the CDC's National Center for Health Statistics (NCHS) approximately 12-18 months after the end of the reference year, once death certificate data from all 50 states has been compiled and verified. The most current final national figures are from the 2024 calendar year, published as NCHS Data Brief No. 548 on January 29, 2026: combined 79.0 years, male 76.5 years, female 81.4 years. These supersede all prior figures and are what this article primarily references. State-level life tables lag further behind — the most recently published CDC state data as of 2026 is based on 2022 mortality, published in December 2025.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            The Opioid Crisis and Its Real Cost in American Lives
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            No public health crisis has marked US life expectancy data as visibly as the opioid epidemic. What began in the 1990s as a wave of over-prescribed pain medications escalated into a fentanyl-driven mass casualty event that, at its peak in 2022-2023, was killing more than 105,000 Americans per year from drug overdoses — more than the country lost in the entire Vietnam War, every single year, for multiple years in a row. Overdose became the leading cause of accidental death for Americans aged 18 to 44, surpassing car accidents and gun violence in that age group.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The 2024 final CDC data — published as a dedicated report alongside the life expectancy brief — shows the first major reversal of that trend. Total drug overdose deaths fell from 105,007 in 2023 to 79,384 in 2024, a decline of roughly 24 percent. Deaths specifically involving synthetic opioids like fentanyl fell by 35.6 percent, from a rate of 22.2 per 100,000 population to 14.3. According to the CDC, 45 of 50 states recorded declines in overdose deaths. The decline was the single largest driver of the record-high life expectancy figure, and provisional data from 2025 suggests the downward trend in overdoses has continued, though it has not yet returned to pre-pandemic levels — total opioid deaths in 2024 remained approximately 4,200 above 2019 figures.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The crisis did not affect all Americans equally. American Indian and Alaska Native communities have experienced a 175 percent increase in overdose deaths since the epidemic began. Black Americans face a 113 percent increase. Young adults aged 18 to 25 saw the largest single-year decline in 2024, dropping 42 percent, but their rates in 2024 remained 147 percent above pre-crisis levels. The opioid epidemic is improving — but unevenly, and from a very high baseline of suffering.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            US Life Expectancy vs Other G7 Nations
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '20px' }}>
            Even at its 2024 record of 79.0 years, the US ranks last among G7 nations on life expectancy. The KFF/Peterson Health System Tracker, which compares the US to eleven similarly large and wealthy OECD nations, found the peer-country average was 82.7 years in 2024 — meaning the US trails its comparators by 3.7 years despite spending more per capita on healthcare than any of them.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '32px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>RANK</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>G7 NATION</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>LIFE EXPECTANCY</th>
                </tr>
              </thead>
              <tbody>
                {sortedG7.map((c, i) => (
                  <tr key={c.country} style={{ borderTop: '1px solid var(--border2)', background: c.country === 'United States' ? 'rgba(192,57,43,0.06)' : 'transparent' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text3)' }}>{i + 1}</td>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{c.country}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: c.country === 'United States' ? 'var(--crimson)' : 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{c.value} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '-16px', marginBottom: '32px' }}>
            Sources: CDC NCHS 2024 final data (US); UN World Population Prospects 2024 Revision and national statistical offices (other G7 nations). Figures represent most recently published official estimates.
          </p>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            This gap is not new, and it is not narrowing. In 1980, the average American lived about as long as residents of most other wealthy countries — 73.7 years, close to the peer-nation average. Over the following four decades, life expectancy grew faster in peer nations than in the US. By 2019, the average American already lived nearly four years less than the average resident of comparable countries. The pandemic, the opioid crisis, and stagnation in several underlying health metrics extended and deepened the divergence. Even the 2024 record does not change the fundamental picture: the US remains structurally behind.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Why Healthcare Spending Does Not Explain the Gap
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The US healthcare spending paradox is one of the most studied questions in public health economics. The country spends roughly twice the per-capita amount on healthcare compared to most peer nations, yet achieves shorter average lifespans. The core reason is not that the US has bad hospitals, bad doctors, or bad technology — on those dimensions it leads the world. The problem is structural: where the money goes, and who gets access to it.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            US healthcare spending is heavily weighted toward late-stage treatment and expensive specialty and emergency procedures, with comparatively little invested in primary and preventive care. The US is the only high-income country that does not guarantee universal health coverage — meaning a meaningful share of the population delays care for cost reasons, turning manageable conditions into acute ones by the time they are treated. Research from the National Research Council concluded that lack of universal access to healthcare has measurably increased US mortality and reduced life expectancy relative to peer nations. Public health researchers also note that only about 10 to 20 percent of health outcomes are determined by healthcare access itself — the remaining 80 to 90 percent are shaped by social and economic conditions, lifestyle, and environment, areas where the US has persistently underinvested relative to peers.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            US Life Expectancy by State — Where the Gaps Are Widest
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The variation in life expectancy across US states is striking. Based on the CDC's 2022 state life tables — the most recently published state-level data as of 2026 — Hawaii leads the nation at 80.0 years and West Virginia sits at the bottom at 72.2 years, a gap of nearly eight years between the best and worst-performing states. That gap is larger than the difference between some entire countries. Massachusetts (79.8), New Jersey, New York, and Connecticut cluster near the top. Mississippi (72.6), Kentucky (73.6), and Alabama (73.2) sit near the bottom.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The pattern is not random. States at the bottom consistently share several characteristics: higher rates of obesity and smoking, higher rates of opioid overdose deaths, lower median household incomes, reduced access to healthcare (particularly in rural areas where hospital closures have accelerated), and lower rates of health insurance coverage. The opioid crisis has been particularly concentrated in Appalachia and parts of the Midwest, and its body count shows up directly in state life expectancy rankings. West Virginia, which had the highest opioid overdose death rate of any state in 2024 at 38.6 per 100,000, also has the lowest life expectancy. The relationship is not coincidental.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            States at the top of the ranking share different structural advantages: higher household incomes, lower rates of uninsured residents, lower smoking rates, more walkable urban environments, and — in the case of Hawaii — cultural and dietary patterns that researchers associate with reduced chronic disease risk. Utah's exceptionally low adult smoking rate, at around 6 percent, is the lowest in the nation and correlates directly with its position well above the national average.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Leading Causes of Death in the US Today
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The ten leading causes of death in the US shifted meaningfully in 2024. Heart disease and cancer remain the top two causes — heart disease kills approximately one American every 33 seconds. Unintentional injuries (primarily drug overdoses) held third place, though the sharp decline in overdose deaths in 2024 will reduce this cause's proportional share. Stroke, chronic lower respiratory diseases, Alzheimer's disease, and diabetes follow. Notably, suicide entered the top ten for the first time in 2024, replacing COVID-19, which fell from 10th to 15th place as COVID-19 deaths dropped sharply. Chronic liver disease, kidney disease, and pneumonia complete the list.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The rising profile of suicide in the top-ten causes of death is a signal worth taking seriously. Mental health burden in the US has been rising for years, and the integration of mental health into primary care — common in peer nations — remains patchy and inadequate in the US system. Public health experts note that addressing suicide and overdose as connected crises of despair, rather than separate medical events, is likely necessary to sustain the life expectancy gains recorded in 2024 into the decade ahead.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            What the 2024 Record Actually Means — and What It Does Not
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The record high US life expectancy of 79.0 years in 2024 is genuinely good news. It reflects real declines in preventable deaths, primarily from the opioid crisis. But it is important to read it accurately. The 79.0 figure is still below where the US would have been in 2024 had it maintained the pre-pandemic life expectancy growth trajectory — the crisis of 2020-2022 set the country back years. And even at 79.0, the US sits 3.7 years behind comparable wealthy nation averages, a gap that has existed for decades and reflects deep structural features of American health, wealth distribution, and social policy that no single year of progress resolves.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            For individuals, the national average is a starting point, not a destiny. The gap between the best and worst US states is nearly eight years. Within states, gaps by income, education, zip code, and race are larger still. Research consistently shows that individual-level factors — managing blood pressure and blood sugar, avoiding tobacco, maintaining physical activity, and accessing preventive care — can shift a person's personal life expectancy meaningfully above or below the number their birthplace or demography would predict.
          </p>

          {/* CTA */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: '16px', padding: '28px 24px', textAlign: 'center',
            margin: '40px 0',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              The national average is a baseline. Your personal estimate depends on your lifestyle, your health, and your choices — not just where you were born.
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
            Sources: CDC/NCHS Data Brief No. 548 (January 2026) — Mortality in the United States, 2024; CDC/NCHS Data Brief No. 549 — Drug Overdose Deaths, 2024; CDC U.S. State Life Tables 2022 (December 2025); KFF/Peterson Health System Tracker — How Does U.S. Life Expectancy Compare to Other Countries? (March 2026); KFF — Opioid Overdose Deaths: National Trends (February 2026); UN World Population Prospects 2024 Revision. All figures are population-level statistical estimates, not individual predictions.
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}