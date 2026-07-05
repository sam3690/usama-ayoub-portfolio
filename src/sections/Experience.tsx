import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { experience } from '../data'

interface ExperienceProps {
  reduced: boolean
}

export default function Experience({ reduced }: ExperienceProps) {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => {
      gsap.from('.exp-title .line-inner', {
        yPercent: 115,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-title', start: 'top 88%' },
      })
      // The rail draws itself as the reader moves down the years
      gsap.fromTo(
        '.exp-rail',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-list',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )
      gsap.utils.toArray<HTMLElement>('.exp-entry').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: 36,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={section}
      id="experience"
      className="relative border-t border-brand-border/60 bg-brand-dark/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-14 md:py-40">
        <h2 className="exp-title font-heading text-4xl font-semibold tracking-tight text-brand-white md:text-6xl">
          <span className="line-mask">
            <span className="line-inner block">
              The road <span className="italic text-emerald-brand">here.</span>
            </span>
          </span>
        </h2>

        <div className="exp-list relative mt-16 md:mt-24 md:pl-10">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-brand-border md:block">
            <div className="exp-rail h-full w-px origin-top bg-emerald-brand" />
          </div>

          <ol className="space-y-16 md:space-y-24">
            {experience.map((e) => (
              <li key={e.title} className="exp-entry grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-heading text-sm text-gold">{e.years}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-heading text-2xl font-medium text-brand-white md:text-3xl">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted">{e.org}</p>
                  <p className="mt-4 max-w-[60ch] leading-relaxed text-brand-light/75">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
