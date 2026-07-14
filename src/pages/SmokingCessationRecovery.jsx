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

const TIMELINE_ROWS = [
  { time: '20 minutes', change: 'Heart rate and blood pressure begin dropping toward normal' },
  { time: '12 hours', change: 'Blood carbon monoxide falls back to normal; oxygen delivery improves' },
  { time: '2 weeks – 3 months', change: 'Circulation and lung function rise, in some cases by up to 30%' },
  { time: '1 – 9 months', change: 'Lung cilia regrow; coughing may briefly worsen before it improves' },
  { time: '1 year', change: 'Excess risk of coronary heart disease is roughly cut in half' },
  { time: '5 – 15 years', change: 'Stroke risk falls to about the same level as a never-smoker' },
  { time: '10 years', change: "Lung cancer death risk is roughly half that of someone still smoking" },
  { time: '15 years', change: "Heart disease risk approaches that of someone who never smoked" },
]

const FAQS = [
  {
    q: "How long does it take for your body to recover after quitting smoking?",
    a: "Some changes happen within minutes — heart rate and blood pressure start normalizing 20 minutes after the last cigarette, and blood oxygen levels return to normal within about 12 hours. But full cardiovascular and cancer-risk recovery is a multi-year process: coronary heart disease risk is roughly halved after 1 year, stroke risk matches a never-smoker's after 5-15 years, and heart disease risk only approaches baseline around the 15-year mark.",
  },
  {
    q: "Is it too late to quit smoking after 20 or 30 years?",
    a: "No. Research on cortical thinning found the brain needs roughly 0.9 years of not smoking to reverse the effect of each pack-year previously smoked — meaning the repair process scales with how long you smoked, but it still happens. DNA repair in lung and vascular tissue begins the moment smoking stops, regardless of how many decades a person smoked beforehand. The earlier you quit, the more years you gain back, but there's no point past which quitting stops mattering.",
  },
  {
    q: "Why do I cough more in the first few weeks after quitting?",
    a: "Cilia — the tiny hair-like structures lining your airways that sweep out mucus and debris — are paralyzed by long-term smoke exposure. Once smoking stops, cilia begin regenerating and start actively clearing out years of accumulated tar and mucus, which temporarily increases coughing. It's a sign of repair, not relapse or worsening damage, and it typically settles within a few weeks to a couple of months.",
  },
  {
    q: "Is vaping a safe way to quit smoking?",
    a: "Switching completely from cigarettes to e-cigarettes exposes users to meaningfully fewer carcinogens than continuing to smoke, and some research suggests nicotine vapes can be more effective than patches or gum at helping people quit. But the harm-reduction argument only holds for a full switch — a 2024 NEJM Evidence study found dual users, people who smoke and vape, have toxic exposure levels similar to smokers alone, meaning the health benefit disappears if cigarettes aren't actually dropped.",
  },
  {
    q: "How many people smoke worldwide in 2026?",
    a: "Around 1.2 billion people used tobacco in 2024, per WHO's most recent global report — down from 1.38 billion in 2000, but still roughly 1 in 5 adults worldwide. Europe is now the highest-prevalence region globally at 24.1% of adults, and European women have the highest female smoking rate of any region at 17.4%, even though women worldwide have led the decline overall, hitting the UN's 2025 reduction target five years early.",
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

export default function SmokingCessationRecovery() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Smoking Cessation Timeline 2026: What Actually Happens to Your Body After You Quit",
    description: "The real recovery timeline after quitting smoking — from the first 20 minutes to 15 years out — backed by CDC, WHO, and peer-reviewed data.",
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
        <title>Smoking Cessation Timeline 2026 — What Happens to Your Body After You Quit</title>
        <meta name="description" content="The real recovery timeline after quitting smoking, from 20 minutes to 15 years out, plus why vaping isn't the safety net people think it is. Backed by CDC, WHO, and peer-reviewed research." />
        <meta name="keywords" content="smoking cessation timeline, quit smoking recovery, benefits of quitting smoking 2026, body after quitting smoking, is it too late to quit smoking, vaping vs smoking health" />
        <meta property="og:title" content="Smoking Cessation Timeline 2026 — What Happens to Your Body After You Quit" />
        <meta property="og:description" content="From 20 minutes to 15 years: the real, data-backed recovery timeline after your last cigarette." />
        <meta property="og:url" content="https://www.deathtimeleft.com/smoking-cessation-recovery" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smoking Cessation Timeline 2026 — What Happens to Your Body After You Quit" />
        <meta name="twitter:description" content="The real, data-backed recovery timeline after quitting smoking — and why vaping isn't a free pass." />
        <link rel="canonical" href="https://www.deathtimeleft.com/smoking-cessation-recovery" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>

          <p style={label}>Health Factor</p>
          <h1 style={h1Style}>Smoking Cessation Timeline 2026: What Actually Happens to Your Body After You Quit</h1>

          <p style={introStyle}>
            Most "quit smoking" content either scares you with cancer statistics or hands you a generic wellness pep talk. Neither actually answers the question people want answered: what happens, physically, hour by hour and year by year, once you put out the last cigarette? Here's the real timeline, and what the data says about whether it's ever "too late" to start it.
          </p>

          <img src="/images/blog/smoking-cessation-recovery-timeline-2026.webp" alt="Timeline illustration showing the body's recovery stages after quitting smoking" style={{ width: '100%', borderRadius: '14px', marginBottom: '32px' }} />

          {/* Stat strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border2)', border: '1px solid var(--border2)', borderRadius: '14px', overflow: 'hidden', marginBottom: '40px' }}>
            {[
              { label: '20 minutes after quitting', value: 'Heart rate normalizes' },
              { label: '1 year after quitting', value: 'CHD risk halved' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '19px', color: 'var(--crimson)' }}>{s.value}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={h2Style}>The First 20 Minutes to 12 Hours</h2>
          <p style={pStyle}>
            The recovery starts faster than most people expect. Within 20 minutes of the last cigarette, heart rate and blood pressure begin dropping toward normal levels — nicotine constricts blood vessels and forces the heart to work harder, so removing it has an almost immediate mechanical effect. By around 12 hours, carbon monoxide levels in the blood, which had been displacing oxygen, fall back to normal, and oxygen starts moving through tissue more efficiently again.
          </p>
          <p style={pStyle}>
            This is also when cravings hit hardest. They're intense but short — typically 5 to 10 minutes per episode — and they space out and weaken over the following days. Nobody talks about how the first 48 hours are more of a psychological test than a physical one; the body is already doing most of its own work by then.
          </p>

          <h2 style={h2Style}>Two Weeks to Three Months: The Lungs Catch Up</h2>
          <p style={pStyle}>
            Circulation keeps improving through this window, and by three months lung function can rise by as much as 30% in some studies, though figures vary by source — some cite gains closer to 10%, depending on how heavily and how long someone smoked. Either way, this is usually when people notice they can climb stairs or exercise without getting winded the way they used to, which tends to be the first tangible "proof" that quitting is working.
          </p>
          <img src="/images/blog/lungs-recovery-after-quitting-smoking.webp" alt="Illustration of healthy lungs recovering after quitting smoking" style={{ width: '100%', borderRadius: '14px', marginBottom: '24px' }} />

          <h2 style={h2Style}>One to Nine Months: It Gets Messier Before It Gets Better</h2>
          <p style={pStyle}>
            Here's the part that trips people up and sometimes convinces them something's wrong: coughing often increases in this stretch. The cilia lining the airways — tiny hair-like structures that sweep out mucus and debris — have been paralyzed by years of smoke exposure. Once they start regenerating, they go to work clearing out everything that built up, and that shows up as more coughing, not less. It's the body doing housekeeping it couldn't do before, not a sign of relapse or new damage.
          </p>

          <h2 style={h2Style}>One Year to Fifteen Years: The Numbers That Matter Long-Term</h2>
          <p style={pStyle}>
            This is where the real payoff shows up, and it's worth seeing laid out plainly rather than buried in a wall of text.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '20px', border: '1px solid var(--border2)', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>TIME SINCE QUITTING</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text2)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px' }}>WHAT CHANGES</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE_ROWS.map(row => (
                  <tr key={row.time} style={{ borderTop: '1px solid var(--border2)' }}>
                    <td style={{ padding: '11px 16px', color: 'var(--text1)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>{row.time}</td>
                    <td style={{ padding: '11px 16px', color: 'var(--text2)' }}>{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            Beyond lung cancer specifically, the risk of cancers of the mouth, throat, esophagus, bladder, and pancreas all continue declining well past the 10-year mark. Not every bit of damage fully reverses — but the trend line only moves in one direction, for as long as someone stays smoke-free.
          </p>

          <h2 style={h2Style}>Vaping Isn't a Free Pass</h2>
          <p style={pStyle}>
            E-cigarettes are frequently pitched as a safer bridge away from smoking, and switching completely does expose users to far fewer carcinogens than combustible cigarettes — some research puts nicotine vapes ahead of patches or gum for quit success. The catch is the word "completely." A 2024 study published in NEJM Evidence found that people who smoke and vape at the same time carry toxic exposure levels similar to smoking alone; the reduced-harm case only holds if cigarettes are actually dropped, not supplemented.
          </p>
          <p style={pStyle}>
            Zoom out and the global picture is a genuine mixed bag. Around 1.2 billion people used tobacco in 2024, per WHO's most recent tracking report — down from 1.38 billion in 2000, but still about 1 in 5 adults worldwide. Women have led the decline globally, hitting the UN's 2025 reduction target five years early. Europe, meanwhile, is now the highest-prevalence region on the planet at 24.1% of adults, with European women posting the highest female smoking rate of any region, at 17.4%. Progress isn't evenly distributed, and it isn't guaranteed to continue on its own.
          </p>

          <h2 style={h2Style}>It's Never Too Late to Start the Clock</h2>
          <p style={pStyle}>
            The most common reason people don't try to quit after decades of smoking is the belief that the damage is already done, so what's the point. The evidence doesn't back that up. A widely cited 2015 study on cortical thinning found the brain needs roughly 0.9 years smoke-free to reverse the effect of each pack-year previously smoked — meaning recovery scales with smoking history, but it doesn't stop happening. DNA repair in lung and vascular tissue begins the moment the last cigarette is out, whether someone smoked for 5 years or 50. Quitting earlier in life buys back more years, no question — but there's no expiration date on the benefit itself.
          </p>

          {/* CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center', margin: '40px 0' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text2)', marginBottom: '16px' }}>
              Lifestyle factors like smoking shift your personal estimate more than almost anything else. See where you stand.
            </p>
            <Link to="/" style={{ display: 'inline-block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '15px', color: '#fff', background: 'var(--crimson)', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              Calculate YOUR Life Expectancy
            </Link>
          </div>

          <h2 style={{ ...h2Style, marginTop: '48px' }}>Frequently Asked Questions</h2>
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text3)', marginTop: '32px', lineHeight: 1.6 }}>
            Sources: CDC and American Cancer Society quitting-timeline data; WHO Global Report on Trends in Prevalence of Tobacco Use 2000-2024 and Projections 2025-2030 (October 2025); NEJM Evidence dual-use study, 2024; cortical thinning and pack-year study, 2015.
          </p>

          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={linkStyle}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy/germany" style={linkStyle}>Germany life expectancy 2026</Link>{' — '}
            <Link to="/cardio-vs-strength-training" style={linkStyle}>Cardio vs. strength training for longevity</Link>{' — '}
            <Link to="/life-expectancy-factors" style={linkStyle}>What affects life expectancy</Link>{' — '}
            <Link to="/sleep-and-longevity" style={linkStyle}>Sleep and longevity</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}