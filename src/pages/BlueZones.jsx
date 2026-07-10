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

export default function BlueZones() {
  return (
    <>
      <Helmet>
        <title>Blue Zones: Where People Live the Longest — Death Time Left</title>
        <meta name="description" content="Okinawa, Sardinia, Nicoya, Ikaria, and Loma Linda — the five Blue Zones where people live measurably longer, and what research says explains it." />
        <link rel="canonical" href="https://www.deathtimeleft.com/blue-zones" />
        <meta property="og:title" content="Blue Zones: Where People Live the Longest — Death Time Left" />
        <meta property="og:description" content="The five regions where people live measurably longer, and what research says explains it." />
        <meta property="og:url" content="https://www.deathtimeleft.com/blue-zones" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blue Zones: Where People Live the Longest — Death Time Left" />
        <meta name="twitter:description" content="The five regions where people live measurably longer, and what research says explains it." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Blue Zones: Where People Live the Longest',
          description: 'The five regions where people live measurably longer, and what research says explains it.',
          url: 'https://www.deathtimeleft.com/blue-zones',
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
          }}>Longevity Hotspots</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '20px' }}>
            Blue Zones: Where People Live the Longest
          </h1>

          <p style={pStyle}>
            In the early 2000s, demographic researchers identified five regions around the world where people live measurably longer, healthier lives than the global average — with unusually high rates of residents reaching 90 and 100 years old. These regions, popularized by National Geographic fellow Dan Buettner and now widely studied by demographers, are called "Blue Zones." What's notable isn't any single miracle habit, but a cluster of overlapping lifestyle and environmental factors researchers believe compound over decades.
          </p>

          <h2 style={h2Style}>Okinawa, Japan</h2>
          <p style={pStyle}>
            Okinawa has one of the highest concentrations of centenarians in the world. Traditional Okinawan diets are built around sweet potatoes, tofu, bitter melon, and other low-calorie, nutrient-dense plant foods, with meat eaten sparingly. Researchers point to "hara hachi bu" — a cultural habit of eating until roughly 80% full — as a contributor to naturally lower caloric intake. Strong multi-generational social ties, often formalized through lifelong friendship groups called moai, are also cited as a major protective factor against the isolation that correlates with poor health outcomes in old age.
          </p>

          <h2 style={h2Style}>Sardinia, Italy</h2>
          <p style={pStyle}>
            The mountainous Nuoro province of Sardinia has an unusually high ratio of male centenarians, an anomaly compared to most regions where women dominate extreme old age. Researchers attribute this partly to genetics specific to the region's historically isolated population, combined with a diet rich in whole grains, beans, garden vegetables, and moderate red wine, and a lifestyle built around physically demanding shepherding and farming work well into old age. Close-knit family structures, where elders are cared for at home rather than in institutions, are also frequently cited as a contributing factor.
          </p>

          <h2 style={h2Style}>Nicoya Peninsula, Costa Rica</h2>
          <p style={pStyle}>
            The Nicoya Peninsula shows notably lower rates of middle-age mortality than the rest of Costa Rica. Researchers point to hard water high in calcium and magnesium, a traditional diet centered on corn, beans, and tropical fruit, strong family and faith-community bonds, and a cultural concept locals call "plan de vida" — a clear sense of life purpose that persists into old age. Nicoyans also tend to maintain physical labor and daily walking well past typical retirement age elsewhere.
          </p>

          <h2 style={h2Style}>Ikaria, Greece</h2>
          <p style={pStyle}>
            On the Greek island of Ikaria, researchers found rates of dementia and chronic disease markedly lower than mainland Greece. Contributing factors identified include a Mediterranean diet heavy in olive oil, wild greens, and legumes, near-universal afternoon napping, herbal tea consumption, and a slower daily pace of life with less emphasis on strict scheduling. Ikaria also has strong informal social networks — most residents know and regularly interact with their neighbors, which researchers link to lower rates of depression and social isolation in older age.
          </p>

          <h2 style={h2Style}>Loma Linda, USA</h2>
          <p style={pStyle}>
            Loma Linda, California is the only Blue Zone in the United States, home to a large Seventh-day Adventist community. Adherents commonly follow a largely vegetarian diet, abstain from alcohol and tobacco, and observe a weekly day of rest that researchers associate with reduced chronic stress. Studies comparing Adventists to the general California population found a life expectancy advantage of roughly 7 to 10 years for men and 4 to 6 years for women, largely attributed to these combined lifestyle and dietary practices rather than genetics.
          </p>

          <p style={pStyle}>
            Across all five regions, researchers consistently find the same overlapping threads: mostly plant-based diets, natural daily movement rather than structured gym exercise, strong social and family bonds, and a clear sense of purpose in old age. No single factor explains Blue Zone longevity — it's the combination, sustained over an entire lifetime, that appears to matter most.
          </p>

          {/* Related */}
          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={{ color: 'var(--crimson)' }}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy-factors" style={{ color: 'var(--crimson)' }}>What affects life expectancy</Link>{' — '}
            <Link to="/life-expectancy/spain" style={{ color: 'var(--crimson)' }}>Life expectancy in Spain</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}