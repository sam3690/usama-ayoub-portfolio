import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, heroProgress } from '../lib/scroll'
import HeroScene from '../components/HeroScene'

interface HeroProps {
  reduced: boolean
}

/** Pinned cinematic hero. A MacBook running the CLI sits on a dark table.
 *  Scrolling closes the lid, pulls the camera up, and reveals the name in
 *  serif type: the site "boots" out of the terminal. */
export default function Hero({ reduced }: HeroProps) {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          heroProgress.value = self.progress
        },
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        })
        .fromTo('.hero-intro', { opacity: 1, y: 0 }, { opacity: 0, y: -32, duration: 0.16 }, 0.08)
        .fromTo(
          '.hero-name .line-inner',
          { yPercent: 115 },
          { yPercent: 0, stagger: 0.07, duration: 0.34, ease: 'power3.out' },
          0.52,
        )
        .fromTo('.hero-role', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.2 }, 0.8)
    }, section)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={section} id="top" className={reduced ? 'relative' : 'relative h-[380vh]'}>
      <div className="atmosphere sticky top-0 h-[100dvh] overflow-hidden">
        <HeroScene reduced={reduced} />

        <div className="hero-intro pointer-events-none absolute bottom-10 left-6 md:bottom-14 md:left-14">
          {/* <p className="font-heading text-[11px] uppercase tracking-[0.22em] text-brand-muted">
            AI automation engineer
          </p>
          <p className="mt-1 font-heading text-[11px] uppercase tracking-[0.22em] text-brand-muted">
            Web designer
          </p> */}
        </div>

        <div
          className={
            reduced
              ? 'pointer-events-none absolute inset-x-0 top-16 flex flex-col items-center'
              : 'hero-name pointer-events-none absolute inset-0 flex flex-col items-center justify-center'
          }
        >
          <h1 className="text-center font-heading font-bold leading-[0.95] tracking-tight text-brand-white">
            <span className="line-mask">
              <span className="line-inner block text-[16vw] md:text-[9rem]">Usama</span>
            </span>
            <span className="line-mask">
              <span className="line-inner block text-[16vw] italic text-emerald-brand md:text-[9rem]">
                Ayoub
              </span>
            </span>
          </h1>
          <p className="hero-role mt-6 max-w-md px-6 text-center text-sm leading-relaxed text-brand-light/80 md:text-base">
            AI systems and websites that founders can bet the business on.
          </p>
        </div>
      </div>
    </section>
  )
}
