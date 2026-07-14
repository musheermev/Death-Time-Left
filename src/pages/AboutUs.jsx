import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const h2Style = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
  fontSize: '22px', color: 'var(--text1)', marginTop: '40px', marginBottom: '14px',
}
const pStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: '15px',
  color: 'var(--text2)', lineHeight: 1.75, marginBottom: '14px',
}

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us — Death Time Left</title>
        <meta name="description" content="Learn about Death Time Left — a life expectancy calculator and awareness tool built to help people visualize their time and live more intentionally." />
        <link rel="canonical" href="https://www.deathtimeleft.com/about-us" />
        <meta property="og:title" content="About Us — Death Time Left" />
        <meta property="og:description" content="Learn about Death Time Left — a life expectancy calculator and awareness tool built to help people visualize their time and live more intentionally." />
        <meta property="og:url" content="https://www.deathtimeleft.com/about-us" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us — Death Time Left" />
        <meta name="twitter:description" content="Learn about Death Time Left — a life expectancy calculator and awareness tool." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Death Time Left',
          url: 'https://www.deathtimeleft.com/about-us',
          description: 'Learn about Death Time Left — a life expectancy calculator and awareness tool.',
          publisher: { '@type': 'Organization', name: 'Death Time Left', url: 'https://www.deathtimeleft.com' },
        })}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
            letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
            textTransform: 'uppercase',
          }}>About</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '20px' }}>
            About Death Time Left
          </h1>

          <p style={pStyle}>
            Death Time Left is a life expectancy calculator and awareness tool. It takes your birth date, lifestyle inputs, and country-level demographic data to give you a statistical estimate of your remaining time — then presents that estimate visually, through counters, calendars, and comparisons, so it actually registers instead of staying an abstract number.
          </p>
          <p style={pStyle}>
            The idea behind the project is simple: most people know intellectually that life is finite, but rarely sit with what that means in concrete terms — in weeks, in days, in hours. Seeing the number is often the nudge people need to reconsider how they are spending their time.
          </p>

          <h2 style={h2Style}>Who We Are</h2>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            margin: '20px 0',
          }}>
            <img
              src="/musheer.webp"
              alt="Musheer Mev — Founder of Death Time Left"
              width="96"
              height="113"
              style={{
                width: '96px', height: '113px', borderRadius: '13px',
                objectFit: 'cover', border: '2px solid var(--border2)',
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '17px', color: 'var(--text1)', margin: 0 }}>
                Musheer Mev
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text3)', margin: 0 }}>
                Founder, Death Time Left
              </p>
            </div>
          </div>
          <p style={pStyle}>
            Death Time Left is built and maintained by Musheer Mev, an independent developer. This is a solo-built project, not a product of a large company or medical organization. It was created out of personal interest in mortality awareness, statistics, and behavioral design — not as a commercial healthcare service.
          </p>

          <h2 style={h2Style}>What This Site Is — and Isn't</h2>
          <p style={pStyle}>
            This site is a statistical and entertainment tool. The estimates shown are based on publicly available population-level data — sources like the UN World Population Prospects, WHO Global Health Observatory, and national statistical agencies (referenced on individual pages and in the footer).
          </p>
          <p style={pStyle}>
            This site is <strong>not</strong> a medical, actuarial, or insurance-grade tool. It does not replace advice from a doctor, an actuary, or a financial planner. No calculator can predict an individual's actual date of death — what it can do is show you a population-average estimate and let you reflect on it.
          </p>

          <h2 style={h2Style}>Our Approach to Data</h2>
          <p style={pStyle}>
            We source life expectancy figures from recognized public datasets, including the UN World Population Prospects, World Bank Development Indicators, WHO Global Health Observatory, and national statistical offices (such as India's Sample Registration System). We update figures as newer datasets are published. Every country-specific page lists its exact sources at the bottom.
          </p>

          <h2 style={h2Style}>Contact</h2>
          <p style={pStyle}>
            Questions, feedback, or corrections? You can reach out through the contact details listed on our{' '}
            <Link to="/privacy-policy" style={{ color: 'var(--crimson)' }}>Privacy Policy</Link> and{' '}
            <Link to="/dmca" style={{ color: 'var(--crimson)' }}>DMCA</Link> pages.
          </p>

          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            borderRadius: '16px', padding: '24px', margin: '36px 0 0',
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text3)', lineHeight: 1.6, fontStyle: 'italic' }}>
              Disclaimer: All estimates on this site are statistical projections based on population averages and should be treated as informational and reflective, not predictive or medical in nature.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}