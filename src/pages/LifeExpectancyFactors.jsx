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

export default function LifeExpectancyFactors() {
  return (
    <>
      <Helmet>
        <title>What Affects Your Life Expectancy? Smoking, Exercise, Sleep & Stress — Death Time Left</title>
        <meta name="description" content="A clear look at how smoking, exercise, sleep, and chronic stress actually affect life expectancy, based on WHO and CDC research." />
        <link rel="canonical" href="https://www.deathtimeleft.com/life-expectancy-factors" />
        <meta property="og:title" content="What Affects Your Life Expectancy? — Death Time Left" />
        <meta property="og:description" content="How smoking, exercise, sleep, and stress affect life expectancy, based on WHO and CDC research." />
        <meta property="og:url" content="https://www.deathtimeleft.com/life-expectancy-factors" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Affects Your Life Expectancy? — Death Time Left" />
        <meta name="twitter:description" content="How smoking, exercise, sleep, and stress affect life expectancy, based on WHO and CDC research." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'What Affects Your Life Expectancy?',
          description: 'How smoking, exercise, sleep, and stress affect life expectancy, based on WHO and CDC research.',
          url: 'https://www.deathtimeleft.com/life-expectancy-factors',
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
          }}>Lifestyle & Longevity</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '20px' }}>
            What Affects Your Life Expectancy?
          </h1>

          <p style={pStyle}>
            Life expectancy is not a fixed number handed to you at birth. While genetics and where you're born set a starting baseline, a handful of daily habits move that number more than almost anything else science has studied. Four factors — smoking, physical activity, sleep, and chronic stress — account for a disproportionate share of the gap between people who live into their 90s and those who don't reach 70.
          </p>

          <h2 style={h2Style}>Smoking and Tobacco Use</h2>
          <p style={pStyle}>
            Smoking remains the single largest preventable cause of early death worldwide. According to the World Health Organization, tobacco use kills more than 8 million people globally each year, and long-term smokers lose an average of about 10 years of life expectancy compared to non-smokers. The damage compounds: smoking accelerates cardiovascular disease, is the leading cause of lung cancer, and worsens nearly every chronic condition it touches. The good news, per CDC data, is that quitting works at almost any age — someone who quits by 40 recovers most of that lost decade, and even quitting after 60 adds meaningful years back. There's no "safe" level of smoking; the damage scales with duration and intensity, but reversal begins almost immediately after the last cigarette.
          </p>

          <h2 style={h2Style}>Physical Activity and Exercise</h2>
          <p style={pStyle}>
            Regular physical activity is one of the most consistently replicated predictors of longevity in medical research. The CDC recommends at least 150 minutes of moderate aerobic activity per week, and studies tracking hundreds of thousands of adults show that meeting this threshold is associated with a 3 to 7 year increase in life expectancy compared to sedentary adults. The benefit isn't just cardiovascular — regular movement lowers the risk of type 2 diabetes, several cancers, and cognitive decline. Importantly, research shows diminishing but still positive returns even for people who start exercising later in life; you don't need to have been athletic since childhood to benefit. Even brisk walking, done consistently, measurably shifts the numbers.
          </p>

          <h2 style={h2Style}>Sleep and Its Long-Term Effects</h2>
          <p style={pStyle}>
            Sleep sits in an unusual spot: both too little and too much are linked to shorter lifespans. Multiple large cohort studies show that adults who consistently sleep fewer than 6 hours a night have meaningfully higher rates of cardiovascular disease, obesity, and impaired immune function, while those regularly sleeping more than 9 to 10 hours also show elevated mortality risk — though that association is thought to partly reflect underlying illness rather than the sleep itself. The range most research converges on is 7 to 8 hours per night for adults. Sleep quality matters as much as quantity: fragmented sleep and untreated sleep apnea carry their own independent cardiovascular risks, separate from total hours logged.
          </p>

          <h2 style={h2Style}>Chronic Stress and Longevity</h2>
          <p style={pStyle}>
            Chronic, unmanaged stress doesn't just feel bad — it has measurable biological costs. Long-term elevated cortisol is linked to high blood pressure, weakened immune response, and accelerated cellular aging, with some studies using telomere length as a biomarker for this effect. This is distinct from short-term stress, which the body handles well. It's the sustained, unrelieved kind — chronic work pressure, financial strain, ongoing conflict — that correlates with earlier mortality in longitudinal research. Interventions with the strongest evidence behind them include regular physical activity, sufficient sleep, and social connection, all of which blunt the physiological impact of stress rather than eliminating its source.
          </p>

          <p style={pStyle}>
            None of these factors work in isolation — they reinforce each other, for better or worse. Our calculator factors several of these into your personalized estimate, but the underlying research applies regardless of what any single number says.
          </p>

          {/* Related */}
          <h2 style={h2Style}>Related</h2>
          <p style={pStyle}>
            <Link to="/" style={{ color: 'var(--crimson)' }}>Calculate your own life expectancy</Link>{' — '}
            <Link to="/life-expectancy/india" style={{ color: 'var(--crimson)' }}>Life expectancy in India</Link>{' — '}
            <Link to="/life-expectancy/usa" style={{ color: 'var(--crimson)' }}>Life expectancy in the USA</Link>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}