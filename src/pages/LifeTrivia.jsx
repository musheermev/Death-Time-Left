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

export default function LifeTrivia() {
  return (
    <>
      <Helmet>
        <title>Life Trivia: Weird Numbers About a Human Lifetime — Death Time Left</title>
        <meta name="description" content="Heartbeats, hours slept, time spent commuting and scrolling — fun, surprising numbers about how a human lifetime actually gets spent." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-trivia" />
        <meta property="og:title" content="Life Trivia: Weird Numbers About a Human Lifetime — Death Time Left" />
        <meta property="og:description" content="Fun, surprising numbers about how a human lifetime actually gets spent." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-trivia" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Life Trivia: Weird Numbers About a Human Lifetime — Death Time Left" />
        <meta name="twitter:description" content="Fun, surprising numbers about how a human lifetime actually gets spent." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Life Trivia: Weird Numbers About a Human Lifetime',
          description: 'Fun, surprising numbers about how a human lifetime actually gets spent.',
          url: 'https://www.deathtimeleft.com/life-trivia',
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
          }}>Fun Facts</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '20px' }}>
            Life Trivia: Weird Numbers About a Human Lifetime
          </h1>

          <p style={pStyle}>
            Some numbers about a human life are less about mortality and more about scale — how much of it disappears into routine, repetition, and things you'll never remember doing. Here are a few, drawn from published research and straightforward math, that tend to surprise people the first time they see them.
          </p>

          <h2 style={h2Style}>Your Heart, By the Numbers</h2>
          <p style={pStyle}>
            The average human heart beats roughly 60 to 100 times per minute at rest. Over an 80-year lifespan, that adds up to somewhere between 2.5 and 3.4 billion heartbeats — all from a muscle roughly the size of your fist, working continuously without a single scheduled break. Your heart pumps somewhere around 7,500 liters of blood per day, enough to fill a small tanker truck over the course of a year. It's one of the few organs that genuinely cannot stop for even a few minutes without becoming a medical emergency.
          </p>

          <h2 style={h2Style}>Sleep Eats a Third of Your Life</h2>
          <p style={pStyle}>
            At roughly 8 hours of sleep a night, a person sleeps away about one-third of their entire life. Over 80 years, that's close to 26 to 27 years spent unconscious. It sounds like a lot until you consider what happens if you cut it: chronically shortened sleep is linked to a measurably shorter lifespan overall, meaning the years "saved" by sleeping less often don't translate into more waking years gained — they tend to be offset, or worse, by the health costs of insufficient rest.
          </p>

          <h2 style={h2Style}>Where the Rest of the Time Goes</h2>
          <p style={pStyle}>
            Time-use studies, including data from the U.S. Bureau of Labor Statistics, suggest the average adult spends roughly 5 to 6 years of their life eating and drinking, around 3 to 4 years commuting or in transit, and — increasingly — over 6 years on phone and social media screens if current usage trends hold across a lifetime. None of these are inherently wasteful; eating and commuting are simply part of living. But laid end to end, they're a useful reminder of how much of a finite total gets allocated automatically, before any deliberate choice about time even enters the picture.
          </p>

          <h2 style={h2Style}>A Few More Fast Facts</h2>
          <p style={pStyle}>
            The average person blinks about 15 to 20 times per minute, adding up to roughly 415 million blinks across a lifetime — with your eyes closed for a cumulative total of nearly a year and a half. You'll walk the equivalent of about four to five times around the Earth's circumference over an average lifetime of everyday walking. And if you live to 80, you'll have spent close to two full years of your life waiting — for buses, in lines, on hold, or otherwise stuck in transit between one place and the next.
          </p>

          <p style={pStyle}>
            None of these numbers change what you do today. But they're a useful reminder that the total is fixed, even when it doesn't feel like it.
          </p>

          {/* Related */}
          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={{ color: 'var(--crimson)' }}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-in-weeks" style={{ color: 'var(--crimson)' }}>Your life in weeks</Link>{' — '}
            <Link to="/life-expectancy/usa" style={{ color: 'var(--crimson)' }}>Life expectancy in the USA</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}