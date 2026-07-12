import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const label = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px', textTransform: 'uppercase' }
const h1Style = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, color: 'var(--text1)', marginBottom: '20px', letterSpacing: '-1px' }
const introStyle = { fontFamily: "'Inter', sans-serif", fontSize: '17px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '32px' }
const h2Style = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '22px', color: 'var(--text1)', marginTop: '40px', marginBottom: '14px' }
const pStyle = { fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', lineHeight: 1.75, marginBottom: '14px' }
const linkStyle = { color: 'var(--crimson)' }

const RISK_ROWS = [
  { pattern: 'No exercise (baseline)', risk: '—' },
  { pattern: 'Strength training alone (1–119 min/wk)', risk: '7–11% lower' },
  { pattern: 'Aerobic exercise alone (7.5+ MET-hrs/wk)', risk: '26–43% lower' },
  { pattern: 'Both: 30–44 MET-hrs aerobic + 60–119 min strength', risk: '45% lower' },
  { pattern: '45+ MET-hrs aerobic/wk (any strength level)', risk: '53–58% lower' },
]

const FAQS = [
  {
    q: "Is cardio or strength training better for longevity?",
    a: "Based on a large 2026 analysis combining three long-running US cohort studies spanning three decades, aerobic exercise alone shows a larger mortality-reduction effect than strength training alone — 26 to 43% lower risk of death versus 7 to 11%. But the lowest mortality risk overall was seen in people who did both: those combining high aerobic activity with 60–119 minutes of weekly strength training had a 45% lower risk of death.",
  },
  {
    q: "How much strength training is enough for health benefits?",
    a: "A 2025 study in the British Journal of Sports Medicine found the strongest association with lower all-cause, cardiovascular, and neurological disease mortality at 90 to 119 minutes of resistance training per week — roughly two to three sessions. Benefits plateaued above 120 minutes per week, meaning more wasn't better past that point.",
  },
  {
    q: "Does strength training actually reduce risk of death, or just build muscle?",
    a: "Both. A 2022 systematic review and meta-analysis of 16 studies found muscle-strengthening exercise reduced all-cause mortality risk by 15% compared with doing none, independent of aerobic activity. More recent research has focused on why: strength training preserves muscle mass and power, and low muscle power is itself an independent predictor of mortality in older adults.",
  },
  {
    q: "Is muscle power more important than muscle strength?",
    a: "Emerging research suggests it might be. A 2025 study published in Mayo Clinic Proceedings, tracking over 7,000 people in Brazil from 2001 to 2022, found muscle power — how fast you can generate force, like standing quickly from a chair — predicted mortality risk better than raw muscle strength alone in middle-aged and older adults. Most conventional strength routines train for strength, not speed of force production, which this research suggests may be an underused variable.",
  },
  {
    q: "What's a quick way to check my own muscle health for longevity?",
    a: "Grip strength is a simple, well-studied proxy. Using a hand-held dynamometer, scores of 26 kg or higher for women and 40 kg or higher for men are consistently linked with lower mortality risk and better long-term functional outcomes. It's not a diagnosis, but it's a fast, low-cost signal worth tracking over time.",
  },
  {
    q: "If I only have time for one type of exercise, which should I pick?",
    a: "Purely on mortality-reduction percentages, the data favors aerobic exercise as the higher-leverage single choice. But that's an incomplete answer — strength training protects muscle mass and functional independence in a way aerobic exercise doesn't fully replace, which matters enormously for quality of life in later decades. If time only allows for one, cardio wins on the numbers; if the goal is genuinely optimal long-term health, both belong in the routine.",
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border2)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '15px', color: 'var(--text1)', lineHeight: 1.4 }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
          <path d="M3 6l5 5 5-5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? '600px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.25s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '18px' }}>{a}</p>
      </div>
    </div>
  )
}

export default function CardioVsStrength() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cardio vs Strength Training for Longevity: What the Research Actually Shows',
    description: "A 2026 analysis of three decades of cohort data compares cardio and strength training's effect on mortality risk. The honest answer isn't either/or.",
    author: { '@type': 'Person', name: 'Musheer' },
    publisher: { '@type': 'Organization', name: 'Death Time Left' },
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }

  return (
    <>
      <Helmet>
        <title>Cardio vs Strength Training for Longevity 2026 — What the Data Shows</title>
        <meta name="description" content="A 2026 analysis of three decades of cohort data: aerobic exercise cuts mortality risk 26-43%, strength training 7-11%, and combining both cuts it 45-58%. Here's the full breakdown." />
        <meta name="keywords" content="cardio vs strength training longevity, does strength training increase life expectancy, cardio vs weights for longevity, how much exercise to live longer, muscle power mortality" />
        <meta property="og:title" content="Cardio vs Strength Training for Longevity 2026 — What the Data Shows" />
        <meta property="og:description" content="Aerobic exercise cuts mortality risk more than strength training alone — but combining both cuts it even further. Here's what three decades of data show." />
        <meta property="og:url" content="https://www.deathtimeleft.com/cardio-vs-strength-training" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cardio vs Strength Training for Longevity 2026 — What the Data Shows" />
        <meta name="twitter:description" content="Three decades of cohort data on cardio vs strength training and mortality risk, broken down honestly." />
        <link rel="canonical" href="https://www.deathtimeleft.com/cardio-vs-strength-training" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Longevity Factors</p>
          <h1 style={h1Style}>Cardio vs Strength Training for Longevity: What the Research Actually Shows</h1>

          <p style={introStyle}>
            Gym culture has turned "cardio vs weights" into a tribal argument, complete with sides. The actual research isn't interested in picking a side — a large analysis published in June 2026, drawing on three decades of data from three major long-running health studies, gives specific, comparable numbers for both, and the honest reading of them isn't the balanced non-answer you'd expect. One clearly moves the needle more on its own. The other does something the first one can't fully replace.
          </p>

          <img src="/images/blog/cardio-vs-strength-training-mortality-chart.webp" alt="Bar chart comparing mortality risk reduction from cardio exercise, strength training, and combined exercise" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          <h2 style={h2Style}>The Headline Numbers From Three Decades of Data</h2>
          <p style={pStyle}>
            The June 2026 analysis combined data from the Health Professionals Follow-up Study (1992–2022), the Nurses' Health Study (2002–2021), and the Nurses' Health Study II (2003–2021) — three of the longest-running cohort studies in health research, covering tens of thousands of participants. Compared with people doing less than 7.5 MET-hours of aerobic activity per week and no strength training at all, strength training alone — even just 1 to 119 minutes a week — was linked to a 7 to 11% lower risk of death. Aerobic exercise alone told a bigger story: any amount above 7.5 MET-hours per week was linked to a 26 to 43% lower risk of death, depending on volume.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>PATTERN</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>MORTALITY RISK</th>
                </tr>
              </thead>
              <tbody>
                {RISK_ROWS.map(row => (
                  <tr key={row.pattern} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)' }}>{row.pattern}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace" }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            The lowest mortality risk of all belonged to people combining high aerobic activity with regular strength training: 30 to 44 MET-hours of aerobic exercise plus 60 to 119 minutes of strength training weekly was linked to a 45% lower risk of death. Push the aerobic volume past 45 MET-hours a week, and the reduction climbed to 53 to 58% — regardless of how much strength training was added on top.
          </p>

          <h2 style={h2Style}>So Cardio Wins? Not Quite That Simple</h2>
          <p style={pStyle}>
            On raw percentages, yes — aerobic exercise shows a bigger mortality-reduction effect on its own. But that comparison undersells what strength training is actually protecting against, because it's measuring a different mechanism entirely. Cardio's benefit runs mostly through cardiovascular and metabolic pathways — heart efficiency, blood pressure, insulin sensitivity. Strength training's main benefit runs through something aerobic exercise doesn't directly build: muscle mass and, more specifically, muscle power.
          </p>
          <p style={pStyle}>
            A 2025 study in Mayo Clinic Proceedings, tracking over 7,000 people in Rio de Janeiro from 2001 to 2022, found that muscle power — force multiplied by velocity, essentially how fast you can generate strength, like standing up quickly from a chair — predicted mortality risk better than raw muscle strength alone in middle-aged and older adults. That's a meaningfully different variable than what most people train for in a typical gym routine, which optimizes for how much weight you can move, not how fast you can move it.
          </p>

          <h2 style={h2Style}>The Sweet Spot for Strength Training</h2>
          <p style={pStyle}>
            A 2025 study in the British Journal of Sports Medicine found the strongest association between resistance training and lower all-cause, cardiovascular, and neurological disease mortality landed at 90 to 119 minutes per week — roughly two 45-to-60-minute sessions or three shorter ones. Past 120 minutes a week, the researchers found no additional mortality benefit. More wasn't better beyond that point, which is a useful thing to know if you're the type who assumes doubling a good habit doubles the payoff.
          </p>
          <p style={pStyle}>
            A separate 2022 systematic review and meta-analysis of 16 studies found muscle-strengthening exercise reduced all-cause mortality risk by 15% compared with doing none at all — an effect that held independent of how much aerobic exercise someone was also doing. Strength training isn't a nice-to-have layered on top of cardio; the research treats it as carrying its own independent signal.
          </p>

          <img src="/images/blog/muscle-power-grip-strength-test.webp" alt="Person using a hand grip dynamometer to test muscle strength, a simple longevity health marker" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />

          <h2 style={h2Style}>Grip Strength as an Underrated Longevity Marker</h2>
          <p style={pStyle}>
            If you want a fast, low-cost way to check where you stand, grip strength is one of the most consistently studied proxies for overall muscle health and mortality risk. Scores of 26 kg or higher for women and 40 kg or higher for men, measured with a hand dynamometer, are linked with lower mortality and better long-term functional outcomes. It's not a diagnosis and it won't tell you anything about your cardiovascular fitness, but it's a two-minute test that tracks something cardio training genuinely doesn't measure.
          </p>

          <h2 style={h2Style}>So What Should You Actually Do</h2>
          <p style={pStyle}>
            If time is genuinely the constraint and you can only pick one, the numbers point to aerobic exercise as the higher-leverage single habit — the mortality-reduction gap between cardio-alone and strength-alone is too large to ignore. But treating that as the full answer misses what strength training uniquely protects: the muscle mass and power that determine whether someone in their 70s can get off the floor unassisted, not just whether their heart is efficient. The research isn't actually arguing for a side. It's arguing for roughly 30+ MET-hours of aerobic activity a week alongside two to three strength sessions landing somewhere in that 60-to-120-minute weekly range — and dropping either one entirely is leaving something specific and unreplaceable on the table.
          </p>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              Exercise is one of several factors that shape your personal life expectancy estimate.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: combined analysis of the Health Professionals Follow-up Study, Nurses' Health Study, and Nurses' Health Study II (published June 2026); Mayo Clinic Proceedings, muscle power vs strength mortality study, CLINIMEX cohort (2025); British Journal of Sports Medicine, resistance training dose-response study (2025); systematic review and meta-analysis of muscle-strengthening exercise and mortality, 16 studies (2022).
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/sleep-and-longevity" style={linkStyle}>Sleep and longevity</Link>{' — '}
            <Link to="/blue-zones" style={linkStyle}>Blue Zones: where people live the longest</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}