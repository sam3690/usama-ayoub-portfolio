import { useEffect, useState } from 'react'
import { ScrollTrigger, usePrefersReducedMotion, useSmoothScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [loading, setLoading] = useState(true)
  useSmoothScroll(!reduced && !loading)

  useEffect(() => {
    // Pin distances depend on final font metrics
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Nav />
      <main>
        <Hero reduced={reduced} />
        <About reduced={reduced} />
        <Experience reduced={reduced} />
        <Skills reduced={reduced} />
        <Projects reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
      <div className="grain" aria-hidden />
    </>
  )
}
