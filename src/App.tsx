import { useEffect } from 'react'
import { ScrollTrigger, usePrefersReducedMotion, useSmoothScroll } from './lib/scroll'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  const reduced = usePrefersReducedMotion()
  useSmoothScroll(!reduced)

  useEffect(() => {
    // Pin distances depend on final font metrics
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
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
