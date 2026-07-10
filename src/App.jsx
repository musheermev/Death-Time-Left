import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect, lazy, Suspense } from 'react'
import Home from './pages/Home'
const LifeExpectancyIndia = lazy(() => import('./pages/LifeExpectancyIndia'))
const LifeExpectancyUSA = lazy(() => import('./pages/LifeExpectancyUSA'))
const LifeExpectancyRussia = lazy(() => import('./pages/LifeExpectancyRussia'))
const LifeExpectancySpain = lazy(() => import('./pages/LifeExpectancySpain'))
const LifeExpectancyFactors = lazy(() => import('./pages/LifeExpectancyFactors'))
const BlueZones = lazy(() => import('./pages/BlueZones'))
const LifeInWeeks = lazy(() => import('./pages/LifeInWeeks'))
const LifeTrivia = lazy(() => import('./pages/LifeTrivia'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const DMCA = lazy(() => import('./pages/DMCA'))
import { applyDocumentDirection } from './utils/i18n'

export default function App() {
  useEffect(() => {
    const lang = localStorage.getItem('dtl-lang') || 'en'
    applyDocumentDirection(lang)
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/life-expectancy/india" element={<LifeExpectancyIndia />} />
            <Route path="/life-expectancy/usa" element={<LifeExpectancyUSA />} />
            <Route path="/life-expectancy/russia" element={<LifeExpectancyRussia />} />
            <Route path="/life-expectancy/spain" element={<LifeExpectancySpain />} />
            <Route path="/life-expectancy-factors" element={<LifeExpectancyFactors />} />
            <Route path="/blue-zones" element={<BlueZones />} />
            <Route path="/life-in-weeks" element={<LifeInWeeks />} />
            <Route path="/life-trivia" element={<LifeTrivia />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{
        width: '10px', height: '10px', borderRadius: '50%',
        background: 'var(--crimson)', animation: 'dtl-pulse 1s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes dtl-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}