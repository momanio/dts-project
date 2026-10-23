import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SEO } from './components/SEO'
import { Hero } from './sections/Hero'
import { About, Services, TrustBar, WhyChooseUs } from './sections/Care'
import { Journey } from './sections/Journey'
import { Reviews } from './sections/Reviews'
import { Pricing } from './sections/Pricing'
import { FAQ } from './sections/FAQ'

const Results = lazy(() => import('./sections/Results'))
const Contact = lazy(() => import('./sections/Contact'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SEO />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <WhyChooseUs />
        <Suspense fallback={<div className="min-h-[600px] bg-soft" aria-busy="true" />}>
          <Results />
        </Suspense>
        <Journey />
        <Reviews />
        <Pricing />
        <FAQ />
        <Suspense fallback={<div className="min-h-[900px] bg-soft" aria-busy="true" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  )
}
