import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { COUNTRY_LE, GLOBAL_LE } from '../constants/lifeExpectancy'

const FAQS = [
  {
    q: 'What is the life expectancy in Russia in 2026?',
    a: 'The most widely cited combined figure for Russia is approximately 72 to 73 years, drawing on UN World Population Prospects 2024 data and the last confirmed Rosstat national estimates from 2023. The male-female breakdown shows men at roughly 67 to 68 years and women at approximately 78 to 79 years. Since mid-2025, Rosstat has stopped publishing regular demographic updates, so precise 2026 figures remain uncertain.',
  },
  {
    q: 'Why is the gender gap in Russian life expectancy so large?',
    a: 'Russia\'s male-female gap — currently around 10 to 11 years — is roughly double the gap seen in most developed countries. Health researchers consistently point to the same cluster of causes: substantially higher rates of alcohol consumption and tobacco use among men, more hazardous occupational exposure, higher rates of external-cause deaths such as accidents and violence, and a cultural pattern of avoiding preventive healthcare. These behavioral differences are more pronounced in Russia than in comparable economies and have persisted since at least the 1960s.',
  },
  {
    q: 'Why do Russian men die so young compared to Russian women?',
    a: 'A landmark Lancet study tracking over 151,000 men across three Russian cities found that roughly 25 percent of Russian men who die before age 55 do so because of alcohol-related causes — a rate more than three times higher than in countries like the UK. Beyond alcohol, Russian men die early from cardiovascular disease at unusually high rates, with researchers noting that alcohol-induced cardiomyopathy is significantly underreported in official cause-of-death statistics. Tobacco use, industrial accident rates, and lower uptake of medical care further compound the risk.',
  },
  {
    q: 'How does Russia\'s life expectancy compare to other countries?',
    a: 'Russia ranks around 107th out of 197 countries by life expectancy, placing it below the global average and well below comparable economies in Europe. Japan\'s combined life expectancy is 84.3 years, Spain\'s is 83.0, and the UK\'s is 80.9 — all more than a decade higher than Russia\'s national figure. Russia\'s low ranking is driven almost entirely by male mortality; Russian female life expectancy is substantially closer to the global average for women.',
  },
  {
    q: 'Has life expectancy in Russia changed since the war in Ukraine began in 2022?',
    a: 'Independent demographic researchers have documented renewed downward pressure on male life expectancy specifically since 2022, linked to large-scale military mobilization and the associated male mortality. Demographer Alexei Raksha published regional data suggesting male life expectancy fell from approximately 66 years in 2024 to around 61 years in parts of Russia by mid-2025. These figures are difficult to verify fully because Rosstat — Russia\'s federal statistics agency — progressively stopped publishing monthly and regional demographic data between late 2024 and mid-2025.',
  },
  {
    q: 'Why has Russia stopped publishing demographic statistics?',
    a: 'Since March 2025, Rosstat has gradually removed regular birth, death, and migration statistics from public access, publishing only rounded national totals with significant delays. Analysts including the U.S.-based Institute for the Study of War have linked the data blackout to efforts to limit independent estimates of military casualties derived from regional mortality spikes. Independent demographers have called the suppression unprecedented in modern Russian statistical history.',
  },
  {
    q: 'Did alcohol policy affect life expectancy in Russia?',
    a: 'Yes, and the evidence is measurable. Russian male life expectancy reached its highest Soviet-era level during Mikhail Gorbachev\'s anti-alcohol campaign of 1984 to 1987, which restricted production and raised prices. It fell sharply again when those restrictions were lifted. A similar pattern emerged in the 2000s and 2010s, when stricter controls coincided with years of improvement in male life expectancy. More recently, excise tax changes that hit lower-alcohol beverages like beer harder than spirits are linked by analysts to a partial shift back toward stronger drinks, which carry a higher mortality risk.',
  },
  {
    q: 'How does Russia\'s life expectancy compare to the Soviet era?',
    a: 'Soviet-era life expectancy stagnated and in some periods declined through the 1970s and 1980s, at a time when most industrialized nations were improving steadily — an unusual pattern attributed to alcohol, poor diet, occupational hazards, and a healthcare system unable to handle non-infectious chronic disease. Male life expectancy fell to approximately 58 years in 1994 following the Soviet collapse, the lowest point in modern Russian history for peacetime. Recovery through the 2000s and 2010s brought pre-pandemic figures to record highs for the post-Soviet era, before the trajectory changed again after 2022.',
  },
  {
    q: 'What are the leading causes of death in Russia?',
    a: 'Cardiovascular disease is the leading cause of death in Russia by a wide margin, accounting for a larger share of total mortality than in most European countries. Researchers note that a substantial portion of cardiovascular deaths among Russian men — particularly those under 50 — involve alcohol-induced cardiomyopathy that may be misclassified in official statistics. Cancer, external causes such as accidents and injuries, and respiratory disease follow as major contributors. Alcohol is estimated to be a contributing factor in approximately 20 percent of all deaths in Russia, which is roughly double the European average.',
  },
  {
    q: 'Is Russia\'s life expectancy going to improve?',
    a: 'UN World Population Prospects 2024 projects a gradual improvement in Russian life expectancy over coming decades under a medium-fertility scenario, reaching approximately 84 years by 2100. However, these projections assume gradual mortality improvements and do not fully account for the demographic impact of ongoing military losses, continued emigration of younger educated Russians, or the recent suppression of the official data needed to track actual trends. The Russian government has publicly set a target of 78 years by 2030 and 81 years by 2036, targets that most independent analysts consider highly optimistic given current conditions.',
  },
  {
    q: 'How does life expectancy vary across Russia\'s regions?',
    a: 'Russia shows significant regional variation. The predominantly Muslim republics of the North Caucasus — particularly Ingushetia, Dagestan, and Chechnya — consistently record the highest life expectancies in the country, driven by lower alcohol consumption and stronger family and community structures. Ingushetia is classified by some researchers as a longevity "blue zone." Major urban centers like Moscow and St. Petersburg also report above-average figures. Life expectancy tends to be lowest in remote Siberian and Far Eastern regions, where healthcare access is limited and alcohol-related mortality rates are higher.',
  },
  {
    q: 'What is Russia\'s healthy life expectancy?',
    a: 'According to WHO and UN estimates, Russia\'s healthy life expectancy at birth — the number of years a person can expect to live in full health — is approximately 58 years for men and 63 to 64 years for women, giving a combined figure of around 60 to 61 years. This means that on average, the final decade or more of life for Russians is lived with significant health limitations, a gap that reflects both high rates of chronic disease and inadequate management of preventable conditions.',
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

export default function LifeExpectancyRussia() {
  const russia = COUNTRY_LE.russia
  const genderGap = (russia.female - russia.male).toFixed(1)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Life Expectancy in Russia 2026: Gender Gap, Alcohol, and the Data Blackout',
    description: 'A factual guide to Russian life expectancy in 2026 — the 10-year male-female gap, causes of early male death, Soviet-era history, and the impact of Rosstat stopping data publication.',
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
        <title>Russia Life Expectancy 2026 — Gender Gap, Causes & Current Data</title>
        <meta name="description" content="Russia's life expectancy in 2026 is approximately 72–73 years, with men averaging 67–68 and women 78–79. Explore the 10-year gender gap, why Russian men die young, alcohol's role, and why Rosstat stopped publishing data." />
        <meta name="keywords" content="russia life expectancy 2026, russia life expectancy gender gap, why do russian men die young, russia male life expectancy, russia alcohol mortality, russia life expectancy vs usa, rosstat data 2025, russia healthy life expectancy, soviet life expectancy history, russia cardiovascular mortality" />
        <meta property="og:title" content="Russia Life Expectancy 2026 — Gender Gap, Causes & Current Data" />
        <meta property="og:description" content="Russia's combined life expectancy is approximately 72–73 years in 2026, hiding a 10-year gap between men and women. Find out why — and what the data blackout means." />
        <meta property="og:url" content="https://deathtimeleft.com/life-expectancy/russia" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://deathtimeleft.com/life-expectancy/russia" />
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
            Life Expectancy in Russia 2026
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '17px',
            color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px',
          }}>
            Russia's national life expectancy sits at approximately <strong style={{ color: 'var(--text1)' }}>72 to 73 years</strong> in 2026, based on UN World Population Prospects 2024 data and the last confirmed Rosstat national estimates from 2023. The breakdown by sex tells a more striking story: men average around <strong style={{ color: 'var(--text1)' }}>67 to 68 years</strong>, while women reach <strong style={{ color: 'var(--text1)' }}>78 to 79 years</strong> — a gap of roughly 10 to 11 years that ranks among the widest of any major country on Earth. The calculator on this page uses baseline figures of {russia.male} (male), {russia.female} (female), and {russia.combined} (combined), reflecting 2020 Rosstat data used as the modeling baseline. Understanding what drives this gap — and what has happened to Russia's official mortality data since 2022 — is the subject of this guide.
          </p>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'var(--border2)', border: '1px solid var(--border2)',
            borderRadius: '14px', overflow: 'hidden', marginBottom: '40px',
          }}>
            {[
              { label: 'Combined', value: russia.combined },
              { label: 'Male', value: russia.male },
              { label: 'Female', value: russia.female },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '22px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label} (years)</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginBottom: '40px', lineHeight: 1.6 }}>
            Calculator baseline: Rosstat 2020 figures. Latest national estimates (UN WPP 2024 / Rosstat 2023): combined ~73 years, male ~67–68 years, female ~78–79 years. Post-2024 figures carry additional uncertainty; see the data transparency section below.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            The 10-Year Gender Gap in Russian Life Expectancy
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            A gap of 10 to 11 years between male and female life expectancy is one of the largest recorded for any major country in the world. Most developed nations see women outlive men by 4 to 6 years. France, Germany, and the United States all fall within that typical range. Russia is an outlier — and has been for decades.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Health officials and academic researchers consistently point to the same cluster of causes. Russian men consume alcohol at significantly higher rates than women — and the pattern of consumption matters as much as the quantity. Binge drinking of strong spirits, particularly vodka, is associated with deaths from cardiovascular events, accidents, and alcohol poisoning at rates that have no equivalent in Western Europe. Russian men are also more likely to smoke, to work in hazardous occupations, to die from unintentional injuries, and to avoid seeking medical care until a condition becomes acute. Each of these factors adds years to the gap, and the combination is uniquely severe.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Research published in epidemiology journals has traced this divergence to at least the 1960s, when male mortality in Soviet-bloc countries began rising while female mortality stayed broadly stable. The pattern outlasted the Soviet Union itself. Three decades after the Soviet collapse, the gender gap in Russian life expectancy remains roughly twice the global average for comparable economies — and since 2022, independent analysts believe it may be widening again.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Why Russian Men Die Young: Alcohol, Heart Disease, and Behavior
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Alcohol is the single most-studied factor in Russian male mortality. A major Lancet study tracking more than 151,000 men across three Russian cities found that approximately 25 percent of Russian men who die before the age of 55 do so because of alcohol — a rate more than three times higher than in the United Kingdom. The causes of death linked to alcohol include liver disease, alcohol poisoning, and external causes such as accidents and violence. University of Oxford professor Richard Peto, one of the lead researchers, described Russian death rates as having "fluctuated wildly" in direct response to changing alcohol policy over three decades — a level of policy-mortality linkage rarely seen in any country.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The relationship between alcohol and cardiovascular death in Russia is more complex than it appears in official statistics. Russian cause-of-death reporting has historically aggregated alcoholic cardiomyopathy — a direct alcohol-caused heart condition — into broader cardiovascular categories, meaning official death records attributed to heart disease may systematically undercount the true role of alcohol. Peer-reviewed analysis of mortality data from Russian cities found that a substantial share of cardiovascular deaths among working-age men, particularly those under 50, involved patterns consistent with alcohol-induced cardiac damage rather than conventional atherosclerotic disease.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Beyond alcohol, Russian men face mid-life mortality rates that are strikingly higher than peers in neighboring countries. A man in Russia is more than three times as likely to die between the ages of 15 and 60 as a man in the United Kingdom. Tobacco use — particularly of strong, unfiltered cigarettes — contributes substantially. Healthcare access and engagement is another structural problem: Russia spent approximately 5.3 percent of GDP on healthcare as of 2018, notably lower than other developed nations, and working-age men in Russia are significantly less likely than women to seek preventive care or manage chronic conditions before they become acute.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            How Alcohol Policy Has Directly Moved Life Expectancy
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Russia is one of the rare countries where the direct mortality impact of alcohol policy is observable in national life expectancy data. During Mikhail Gorbachev's anti-alcohol campaign of 1984 to 1987 — which restricted state alcohol production, raised prices, and curbed distribution — Russian male life expectancy reached its highest level of the Soviet era. When the campaign ended and restrictions were lifted, mortality rates increased sharply again. The pattern repeated in the 2000s and 2010s under stricter controls introduced during the Putin era, when alcohol-related deaths fell and male life expectancy improved over a sustained period.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            More recent policy changes have moved in the other direction. Excise tax structures that imposed heavier duties on beer and wine relative to spirits led analysts to flag a likely shift in consumption patterns back toward stronger drinks — a shift that historically correlates with higher male mortality. Separately, in 2022 Russia recorded over 54,000 first-time diagnoses of alcohol use disorder, according to Rosstat data published before the agency's later data restrictions. The true figure is generally considered substantially higher given known underreporting in official Russian health statistics.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            From the Soviet Era to the Post-Soviet Mortality Crisis
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Russia's life expectancy history is unlike that of any other major industrialized nation. Through the 1970s and 1980s, Soviet-era life expectancy stagnated and in some years fell — at precisely the moment when most of Europe and North America were seeing sustained improvements. Health researchers attribute this to a combination of factors: rising alcohol consumption, an increasingly sedentary lifestyle as urbanization spread, high rates of tobacco use, and a healthcare system designed primarily for infectious disease that struggled to manage the growing burden of chronic cardiovascular conditions and cancers.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The collapse of the Soviet Union in 1991 triggered the most severe peacetime mortality crisis recorded in a modern industrialized country. Economic chaos, collapsing public health infrastructure, and a spike in alcohol-related deaths pushed male life expectancy to approximately 58 years by 1994 — a figure more commonly associated with low-income countries, not the world's largest nation. Female life expectancy fell too, but far less dramatically, widening the already-large gender gap to a staggering 13 years at its peak in the mid-1990s.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Recovery came gradually through the 2000s and 2010s. Improved economic conditions, stricter alcohol controls, and modest healthcare investment drove consistent gains. By 2019 — the last full year before the COVID-19 pandemic — Russia's combined life expectancy had reached 73.2 years, its highest point in the post-Soviet era. Male life expectancy reached 68.2 years and female life expectancy 78.2 years, with Russian officials describing these as record highs for the modern Russian state. The COVID-19 pandemic caused a sharp temporary reversal in 2020 and 2021, before partial recovery resumed.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Life Expectancy Since 2022: The Data Blackout Problem
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            Any discussion of current Russian life expectancy figures must acknowledge a significant and unusual problem: Russia's federal statistics agency, Rosstat, has progressively ceased publishing the demographic data that would allow accurate estimates. Since March 2025, Rosstat stopped releasing monthly regional statistics on births, deaths, marriages, and divorces. By mid-2025, it had stopped publishing monthly estimates of life expectancy altogether — a development that Worldcrunch and The Moscow Times reported coincided with a steady decline in the figure linked to male wartime casualties.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The U.S.-based Institute for the Study of War linked the data blackout to Kremlin efforts to limit independent analysis of military personnel losses, which researchers had previously estimated by tracking regional mortality spikes among working-age men. Independent demographer Alexei Raksha published regional data suggesting male life expectancy had fallen from approximately 66 years in 2024 to approximately 61 years in some regions by mid-2025 — a drop that, if confirmed nationally, would represent one of the largest single-year declines in Russian male life expectancy in modern history. Raksha described the full suppression of regional demographic statistics as a clear indicator of failed demographic policy.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The practical consequence for anyone reading Russian life expectancy data in 2026 is that no fully verified national figure exists for 2025 or 2026. The UN World Population Prospects 2024 medium variant — the most authoritative projection currently available — estimates Russia's combined life expectancy at approximately 73 to 73.5 years for 2025, but these projections were finalized before the scale of 2025 demographic disruptions became clear. All figures for Russia should be read as carrying meaningful uncertainty, with male life expectancy particularly at risk of being lower than any currently published estimate.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text1)', marginBottom: '14px', marginTop: '40px' }}>
            Russia vs. the Global Average and Comparable Countries
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            At {russia.combined} years on the baseline used by this calculator, Russia sits below the global average of {GLOBAL_LE} years. Against comparable economies, the gap is more striking. Russia ranks approximately 107th out of 197 countries by life expectancy — below neighbors like Finland (82.3 years) and Norway (83.2 years) by more than a decade, and well below the Western European average. Russian men are roughly three times more likely to die between ages 15 and 60 than men in the United Kingdom.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '16px' }}>
            The picture for women is different. Russian female life expectancy of approximately 78 to 79 years sits much closer to the global average for women, and while still below Western European levels, the gap is measured in years rather than decades. This asymmetry — where male life expectancy is the dominant driver of Russia's overall underperformance — is the core demographic reality that all analysis of Russia's health statistics has to confront. The national figure is not a story about Russian health broadly; it is largely a story about Russian male mortality specifically.
          </p>

          {/* CTA */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: '16px', padding: '28px 24px', textAlign: 'center',
            margin: '40px 0',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              National averages are a starting point. Your personal estimate depends on your own habits, health, and lifestyle factors.
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
            Sources: UN World Population Prospects 2024 (medium variant, retrieved March 2026); Rosstat national estimates 2023 (last published full dataset); WHO Global Health Observatory; The Moscow Times / Meduza reporting on Rosstat data blackout (May–July 2025); Worldcrunch demographic analysis (August 2025); The Lancet alcohol-mortality study (Zaridze et al.); RAND Corporation Russia mortality research; Geographical magazine Russia demographic analysis (May 2026). Calculator baseline figures reflect Rosstat 2020 data. Post-2024 Russian demographic figures carry significant uncertainty due to suppression of official statistics. All life expectancy figures are population-level statistical estimates, not individual predictions.
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}