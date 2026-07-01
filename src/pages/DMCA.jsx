import { Helmet } from 'react-helmet-async'
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
const liStyle = { ...pStyle, marginBottom: '8px' }

export default function DMCA() {
  return (
    <>
      <Helmet>
        <title>DMCA Policy — Death Time Left</title>
        <meta name="description" content="DMCA Copyright Policy for Death Time Left. How to submit a copyright infringement notice or a counter-notice." />
        <link rel="canonical" href="https://www.deathtimeleft.com/dmca" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="DMCA Policy — Death Time Left" />
        <meta property="og:description" content="DMCA Copyright Policy for Death Time Left — how to submit a copyright notice or counter-notice." />
        <meta property="og:url" content="https://www.deathtimeleft.com/dmca" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DMCA Policy — Death Time Left" />
        <meta name="twitter:description" content="DMCA Copyright Policy for Death Time Left." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'DMCA Policy',
          url: 'https://www.deathtimeleft.com/dmca',
          description: 'DMCA Copyright Policy for Death Time Left.',
          isPartOf: { '@type': 'WebSite', name: 'Death Time Left', url: 'https://www.deathtimeleft.com' },
          dateModified: '2026-07-01',
        })}</script>
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px 40px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
            letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
            textTransform: 'uppercase',
          }}>Legal</p>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '8px' }}>
            DMCA Policy
          </h1>
          <p style={{ ...pStyle, color: 'var(--text3)', fontSize: '13px' }}>Last updated: July 1, 2026</p>

          <p style={pStyle}>
            Death Time Left respects the intellectual property rights of others and expects its users to do the same. We respond to notices of alleged copyright infringement that comply with the U.S. Digital Millennium Copyright Act ("DMCA") and equivalent laws in other jurisdictions.
          </p>

          <h2 style={h2Style}>1. Filing a Copyright Infringement Notice</h2>
          <p style={pStyle}>
            If you believe that content on deathtimeleft.com infringes a copyright you own, you may submit a written notice to our designated contact (see Section 4). To be effective, your notice must include:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
            <li style={liStyle}>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
            <li style={liStyle}>Identification of the copyrighted work claimed to have been infringed.</li>
            <li style={liStyle}>Identification of the material you claim is infringing, with enough detail (such as the specific URL) for us to locate it on the Site.</li>
            <li style={liStyle}>Your contact information, including address, telephone number, and email address.</li>
            <li style={liStyle}>A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li style={liStyle}>A statement, made under penalty of perjury, that the information in the notice is accurate and that you are authorized to act on behalf of the copyright owner.</li>
          </ul>

          <h2 style={h2Style}>2. Our Response Process</h2>
          <p style={pStyle}>
            Upon receiving a complete and valid notice, we will review the claim and, where warranted, remove or disable access to the allegedly infringing material in a timely manner. We will make reasonable efforts to notify the party responsible for the content of the removal.
          </p>

          <h2 style={h2Style}>3. Counter-Notification</h2>
          <p style={pStyle}>
            If you believe material you posted or that is attributed to you was removed in error, you may submit a counter-notice containing:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
            <li style={liStyle}>Your physical or electronic signature.</li>
            <li style={liStyle}>Identification of the material removed and its location on the Site before removal.</li>
            <li style={liStyle}>A statement, under penalty of perjury, that you have a good-faith belief the material was removed as a result of mistake or misidentification.</li>
            <li style={liStyle}>Your name, address, telephone number, and a statement consenting to the jurisdiction of the relevant federal court.</li>
          </ul>
          <p style={pStyle}>
            Upon receipt of a valid counter-notice, we may reinstate the material within the timeframe required by applicable law, unless the original complainant files a court action seeking to restrain the alleged infringer.
          </p>

          <h2 style={h2Style}>4. Designated Contact</h2>
          <p style={pStyle}>
            All DMCA notices and counter-notices should be sent to: <strong>contact@deathtimeleft.com</strong>
          </p>
          <p style={pStyle}>
            Please use the subject line "DMCA Notice" or "DMCA Counter-Notice" so it can be routed appropriately.
          </p>

          <h2 style={h2Style}>5. Repeat Infringers</h2>
          <p style={pStyle}>
            We reserve the right, in appropriate circumstances, to restrict or terminate access for users or contributors who are found to be repeat infringers of copyright.
          </p>

          <h2 style={h2Style}>6. Third-Party Content and Sources</h2>
          <p style={pStyle}>
            Statistical data referenced on this Site is drawn from publicly available sources such as the UN World Population Prospects, WHO Global Health Observatory, and World Bank Development Indicators, and is used for informational purposes with attribution. This policy addresses copyright claims regarding original content, code, and media on the Site — not publicly licensed statistical datasets.
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}