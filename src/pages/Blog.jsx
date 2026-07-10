import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { BLOG_POSTS } from '../constants/blogPosts'
import { useTranslation } from '../utils/i18n'

export default function Blog() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const posts = filter === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === filter)

  const FILTERS = [
    { key: 'all', label: t('blogFilterAll') },
    { key: 'guide', label: t('blogFilterGuides') },
    { key: 'country', label: t('blogFilterCountries') },
  ]

  return (
    <>
      <Helmet>
        <title>{t('blogMetaTitle')}</title>
        <meta name="description" content={t('blogMetaDescription')} />
        <link rel="canonical" href="https://www.deathtimeleft.com/blog" />
        <meta property="og:title" content={t('blogMetaTitle')} />
        <meta property="og:description" content={t('blogMetaDescription')} />
        <meta property="og:url" content="https://www.deathtimeleft.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 40px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
            letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '10px',
            textTransform: 'uppercase',
          }}>{t('blogEyebrow')}</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '32px', color: 'var(--text1)', marginBottom: '24px' }}>
            {t('blogTitle')}
          </h1>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '13px',
                  padding: '8px 18px', borderRadius: '20px', cursor: 'pointer',
                  border: `1px solid ${filter === f.key ? 'var(--crimson)' : 'var(--border2)'}`,
                  background: filter === f.key ? 'var(--crimson)' : 'transparent',
                  color: filter === f.key ? '#fff' : 'var(--text2)',
                }}
              >{f.label}</button>
            ))}
          </div>

          {/* Card grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px',
          }}>
            {posts.map(post => (
              <Link key={post.slug} to={post.path} style={{
                display: 'block', textDecoration: 'none',
                background: 'var(--surface)', border: '1px solid var(--border2)',
                borderRadius: '14px', overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--crimson)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
              >
                {post.image ? (
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '140px', background: 'var(--surface2)' }} />
                )}
                <div style={{ padding: '20px' }}>
                <span style={{
                  display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
                  letterSpacing: '1px', color: 'var(--crimson)', textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>{post.category === 'country' ? t('blogCategoryCountry') : t('blogCategoryGuide')}</span>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '17px', color: 'var(--text1)', marginBottom: '8px' }}>
                  {post.title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text3)', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}