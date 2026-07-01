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

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — Death Time Left</title>
        <meta name="description" content="Terms of Service for Death Time Left. Read the terms and conditions governing your use of this life expectancy calculator website." />
        <link rel="canonical" href="https://www.deathtimeleft.com/terms" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms of Service — Death Time Left" />
        <meta property="og:description" content="Terms and conditions governing your use of the Death Time Left website." />
        <meta property="og:url" content="https://www.deathtimeleft.com/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service — Death Time Left" />
        <meta name="twitter:description" content="Terms and conditions governing your use of Death Time Left." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Terms of Service',
          url: 'https://www.deathtimeleft.com/terms',
          description: 'Terms of Service for Death Time Left.',
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
            Terms of Service
          </h1>
          <p style={{ ...pStyle, color: 'var(--text3)', fontSize: '13px' }}>Last updated: July 1, 2026</p>

          <p style={pStyle}>
            These Terms of Service ("Terms") govern your access to and use of deathtimeleft.com (the "Site"). By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.
          </p>

          <h2 style={h2Style}>1. Nature of the Service</h2>
          <p style={pStyle}>
            Death Time Left is a statistical estimation and entertainment tool. It calculates a life expectancy estimate based on population-level demographic data and the inputs you provide. It is designed to encourage reflection on how time is spent — it is not a scientific prediction of any individual's actual lifespan.
          </p>

          <h2 style={h2Style}>2. Not Medical or Financial Advice</h2>
          <p style={pStyle}>
            The Site does not provide medical, psychological, actuarial, insurance, or financial advice. Nothing on this Site should be treated as a substitute for professional consultation with a qualified doctor, therapist, actuary, or financial advisor. Do not make medical, insurance, financial, or legal decisions based solely on results from this Site.
          </p>
          <p style={pStyle}>
            If you are experiencing thoughts of self-harm or a mental health crisis, please contact a licensed mental health professional or a crisis helpline in your country immediately. This Site is not equipped to provide crisis support.
          </p>

          <h2 style={h2Style}>3. Acceptable Use</h2>
          <p style={pStyle}>By using this Site, you agree that you will not:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
            <li style={{ ...pStyle, marginBottom: '8px' }}>Use the Site for any unlawful purpose or in violation of any applicable local, state, national, or international law.</li>
            <li style={{ ...pStyle, marginBottom: '8px' }}>Attempt to interfere with, disrupt, or gain unauthorized access to the Site's servers, systems, or data.</li>
            <li style={{ ...pStyle, marginBottom: '8px' }}>Use automated systems (bots, scrapers) to extract data from the Site at scale without our written permission.</li>
            <li style={{ ...pStyle, marginBottom: '8px' }}>Reproduce, duplicate, copy, sell, or exploit any portion of the Site without our express written permission.</li>
          </ul>

          <h2 style={h2Style}>4. Intellectual Property</h2>
          <p style={pStyle}>
            The Site's design, layout, original text, graphics, and underlying code are the property of Death Time Left / Musheer, unless otherwise noted, and are protected by applicable copyright and intellectual property laws. Life expectancy statistics referenced on the Site originate from public third-party sources (UN, WHO, World Bank, national statistical agencies) and are used for informational and journalistic purposes with source attribution.
          </p>

          <h2 style={h2Style}>5. Third-Party Advertising</h2>
          <p style={pStyle}>
            This Site may display third-party advertisements, including through Google AdSense. We are not responsible for the content of third-party advertisements or for the products and services advertised. Your interactions with advertisers are solely between you and the advertiser.
          </p>

          <h2 style={h2Style}>6. Disclaimer of Warranties</h2>
          <p style={pStyle}>
            The Site is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to accuracy, completeness, or fitness for a particular purpose. We do not guarantee that the Site will be uninterrupted, error-free, or that calculations will be free of inaccuracies.
          </p>

          <h2 style={h2Style}>7. Limitation of Liability</h2>
          <p style={pStyle}>
            To the fullest extent permitted by law, Death Time Left and its operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, use, or goodwill, arising out of or in connection with your use of the Site or reliance on any information it provides.
          </p>

          <h2 style={h2Style}>8. Changes to the Service and Terms</h2>
          <p style={pStyle}>
            We may modify, suspend, or discontinue any part of the Site at any time without notice. We may also update these Terms periodically; continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.
          </p>

          <h2 style={h2Style}>9. Governing Law</h2>
          <p style={pStyle}>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts located in India.
          </p>

          <h2 style={h2Style}>10. Contact Us</h2>
          <p style={pStyle}>
            For questions about these Terms, contact us at: <strong>contact@deathtimeleft.com</strong>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}