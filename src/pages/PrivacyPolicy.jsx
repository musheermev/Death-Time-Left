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

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Death Time Left</title>
        <meta name="description" content="Privacy Policy for Death Time Left — how we collect, use, and protect your data, including information about cookies and third-party advertising." />
        <link rel="canonical" href="https://www.deathtimeleft.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy — Death Time Left" />
        <meta property="og:description" content="How Death Time Left collects, uses, and protects your data, including cookies and third-party advertising." />
        <meta property="og:url" content="https://www.deathtimeleft.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.deathtimeleft.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy — Death Time Left" />
        <meta name="twitter:description" content="How Death Time Left collects, uses, and protects your data." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy',
          url: 'https://www.deathtimeleft.com/privacy-policy',
          description: 'Privacy Policy for Death Time Left.',
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
            Privacy Policy
          </h1>
          <p style={{ ...pStyle, color: 'var(--text3)', fontSize: '13px' }}>Last updated: July 1, 2026</p>

          <p style={pStyle}>
            This Privacy Policy explains how Death Time Left ("we", "our", "the site") handles information when you visit deathtimeleft.com. We built this site to be usable without an account and without collecting personal identity information — here is exactly what does and doesn't happen with your data.

          </p>

          <h2 style={h2Style}>1. Information We Collect</h2>
          <p style={pStyle}>
            <strong>Data you enter into the calculator</strong> (birth date, country, lifestyle answers) is processed locally in your browser to generate your results. We do not require you to create an account, and we do not ask for your name, email, or other directly identifying information to use the core calculator.
          </p>
          <p style={pStyle}>
            <strong>Locally stored preferences:</strong> we use your browser's local storage to remember settings like your selected language and theme. This data stays on your device and is not transmitted to our servers.
          </p>
          <p style={pStyle}>
            <strong>Automatically collected data:</strong> like most websites, our hosting and analytics providers may automatically log standard technical information such as your IP address, browser type, device type, pages visited, and approximate location (derived from IP). This is standard web server behavior used for security, performance, and understanding aggregate traffic — not for identifying you personally.
          </p>

          <h2 style={h2Style}>2. Cookies and Similar Technologies</h2>
          <p style={pStyle}>
            We use cookies and similar technologies (such as local storage) for basic site functionality — for example, remembering your language preference. If advertising is enabled on this site, our advertising partners (see Section 3) may also set their own cookies.
          </p>

          <h2 style={h2Style}>3. Advertising and Google AdSense</h2>
          <p style={pStyle}>
            This site may display advertisements served by Google AdSense and other third-party advertising networks. These third parties may use cookies, web beacons, and similar tracking technologies to collect information about your visits to this and other websites in order to provide advertisements about goods and services that may interest you.
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
            <li style={liStyle}>Google uses cookies, including the DoubleClick DART cookie, to serve ads based on your prior visits to this and other websites.</li>
            <li style={liStyle}>You can opt out of personalized advertising by visiting Google's Ads Settings at <span style={{ color: 'var(--crimson)' }}>adssettings.google.com</span>.</li>
            <li style={liStyle}>You can also opt out of some third-party vendor use of cookies for personalized advertising by visiting <span style={{ color: 'var(--crimson)' }}>aboutads.info</span>.</li>
            <li style={liStyle}>Third-party advertising partners have their own privacy policies governing their use of data, which we do not control.</li>
          </ul>

          <h2 style={h2Style}>4. Analytics</h2>
          <p style={pStyle}>
            We may use analytics tools (such as privacy-respecting or standard web analytics services) to understand aggregate traffic patterns — such as which pages are popular and which countries our visitors come from. This data is used in aggregate and is not used to identify individual visitors.
          </p>

          <h2 style={h2Style}>5. Children's Privacy</h2>
          <p style={pStyle}>
            This site is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can address it.
          </p>

          <h2 style={h2Style}>6. Data Security</h2>
          <p style={pStyle}>
            We take reasonable technical measures to protect any data associated with this site. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 style={h2Style}>7. Your Choices</h2>
          <p style={pStyle}>
            You can clear your browser's local storage at any time to remove any locally saved preferences from this site. You can also use your browser's cookie settings or ad-blocking tools to control third-party advertising cookies, as described in Section 3.
          </p>

          <h2 style={h2Style}>8. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The "Last updated" date at the top of this page will reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>

          <h2 style={h2Style}>9. Your Rights (GDPR / India DPDP Act)</h2>
          <p style={pStyle}>
            Depending on where you are located, you may have the following rights regarding your personal data:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>
            <li style={liStyle}>The right to access the data we hold about you.</li>
            <li style={liStyle}>The right to request correction of inaccurate data.</li>
            <li style={liStyle}>The right to request deletion of your data.</li>
            <li style={liStyle}>The right to object to or restrict certain processing.</li>
            <li style={liStyle}>The right to withdraw consent where processing is based on consent.</li>
          </ul>
          <p style={pStyle}>
            For users in the European Union or European Economic Area, these rights are provided under the General Data Protection Regulation (GDPR). For users in India, these rights are provided under the Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
          <p style={pStyle}>
            To exercise any of these rights, contact us at <strong>contact@deathtimeleft.com</strong>. We will respond within 30 days of receiving your request.
          </p>

          <h2 style={h2Style}>10. Contact Us</h2>
          <p style={pStyle}>
            If you have questions about this Privacy Policy, you can reach us at: <strong>contact@deathtimeleft.com</strong>
          </p>
        </article>
      </main>

      <Footer />
    </>
  )
}