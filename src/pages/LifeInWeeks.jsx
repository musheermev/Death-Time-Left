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

export default function LifeInWeeks() {
  return (
    <>
      <Helmet>
        <title>Your Life in Weeks — Why Seeing It Changes How You Live | Death Time Left</title>
        <meta name="description" content="Why visualizing your entire life as a grid of weeks changes how you think about time, and how to actually use that without it becoming anxiety." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-in-weeks" />
        <meta property="og:title" content="Your Life in Weeks — Death Time Left" />
        <meta property="og:description" content="Why visualizing your entire life as a grid of weeks changes how you think about time." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-in-weeks" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Life in Weeks — Death Time Left" />
        <meta name="twitter:description" content="Why visualizing your entire life as a grid of weeks changes how you think about time." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Your Life in Weeks',
          description: 'Why visualizing your entire life as a grid of weeks changes how you think about time.',
          url: 'https://www.deathtimeleft.com/life-in-weeks',
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
          }}>Perspective</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '20px' }}>
            Your Life in Weeks
          </h1>

          <p style={pStyle}>
            If you live to 80, your entire life adds up to about 4,160 weeks. Written as a number, it barely fills a line. Laid out as a grid — one box per week — it fills a single page. That's the entire premise behind the "life in weeks" visualization: taking something abstract, like "the rest of your life," and turning it into something you can actually look at.
          </p>

          <h2 style={h2Style}>Why a Number Doesn't Land, But a Grid Does</h2>
          <p style={pStyle}>
            Most people can tell you, roughly, how many years they have statistically left. But knowing a number and feeling its weight are different things. Our brains are bad at intuitively grasping large abstract quantities — the difference between 500 weeks remaining and 1,500 weeks remaining doesn't register the same way that seeing three-quarters of a grid already filled in does. Spatial representation exploits a different part of cognition than arithmetic does. It's the same reason a bar chart communicates a budget shortfall faster than a spreadsheet full of numbers.
          </p>

          <h2 style={h2Style}>What People Notice When They See Their Own Grid</h2>
          <p style={pStyle}>
            The most common reaction isn't dread — it's recalibration. People report noticing how much of the grid is already colored in, and disproportionately, they notice how few boxes are left in categories they assumed were "far off": years until a parent's estimated remaining time, years until a child leaves home, years of a career left before retirement. The grid doesn't add information you didn't already technically know. It just removes the comfortable distance that abstraction provides.
          </p>

          <h2 style={h2Style}>The Risk of Misreading It</h2>
          <p style={pStyle}>
            It's worth being direct about a limitation: a life-in-weeks grid is a statistical average, not a personal countdown clock. Nobody can know their actual remaining weeks. Treating the visualization as a literal prediction misses the point and can tip into unhelpful anxiety rather than useful reflection. The more productive read is as a prompt — a way to notice, once, how finite unstructured time actually is, and to let that noticing inform a handful of decisions, not to stare at a shrinking counter.
          </p>

          <h2 style={h2Style}>A Few Small Uses for It</h2>
          <p style={pStyle}>
            In practice, people use the visualization in narrow, specific ways rather than a constant background presence: deciding to actually schedule a trip they'd been indefinitely postponing, reconsidering a habit of skipping calls with people they care about, or simply noticing that "someday" has an implicit deadline attached to it, even if that deadline is unknown. The value isn't in checking the grid daily — it's in the one moment of registering it clearly enough that a decision changes.
          </p>

          {/* Related */}
          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={{ color: 'var(--crimson)' }}>See your own life in weeks</Link>{' — '}
            <Link to="/life-trivia" style={{ color: 'var(--crimson)' }}>Life trivia and fun facts</Link>{' — '}
            <Link to="/about-us" style={{ color: 'var(--crimson)' }}>About Death Time Left</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}