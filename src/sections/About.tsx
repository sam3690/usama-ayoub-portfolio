import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'

interface AboutProps {
  reduced: boolean
}

const stats = [
  { value: '4 yrs', label: 'Production backends for healthcare orgs' },
  { value: '500+', label: 'AI workflows shipped for agencies' },
  { value: 'Axios', label: 'Contributor. Code in millions of Node apps' },
]

export default function About({ reduced }: AboutProps) {
  const section = useRef<HTMLElement>(null)
  const [portraitMissing, setPortraitMissing] = useState(false)

  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-line .line-inner').forEach((el) => {
        gsap.from(el, {
          yPercent: 115,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.from('.about-body', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 88%' },
      })
      gsap.from('.about-stat', {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 90%' },
      })
      gsap.fromTo(
        '.about-portrait-inner',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.about-portrait', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, section)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={section} id="about" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-14 md:py-40">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <h2 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-brand-white md:text-6xl">
            <span className="about-line line-mask">
              <span className="line-inner block">Automation you can</span>
            </span>
            <span className="about-line line-mask">
              <span className="line-inner block">
                bet the <span className="italic text-emerald-brand">business</span> on.
              </span>
            </span>
          </h2>
          <p className="about-body mt-8 max-w-[58ch] text-base leading-relaxed text-brand-light/75 md:text-lg">
            Four years of healthcare backend work set my standard: a workflow either holds up in
            production or it does not ship. I bring that bar to GTM agents, AI sales systems and
            the websites that sell them.
          </p>
          <p className="about-body mt-6 font-serif text-xl italic text-gold md:text-2xl">
            "Move fast and don't break things."
          </p>

          <dl className="about-stats mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.value} className="about-stat border-t border-brand-border pt-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl font-semibold text-brand-white md:text-4xl">
                  {s.value}
                </dd>
                <dd className="mt-2 text-sm leading-snug text-brand-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5 md:pl-8">
          <figure className="about-portrait relative mt-2 aspect-[4/5] overflow-hidden rounded-2xl border border-brand-border md:-mt-6">
            <div className="about-portrait-inner absolute -inset-y-[10%] inset-x-0">
              {/* Drop portrait.jpg into /public to replace the fallback */}
              {!portraitMissing ? (
                <img
                  src="/portrait.jpg"
                  alt="Portrait of Usama Ayoub"
                  className="h-full w-full object-cover"
                  onError={() => setPortraitMissing(true)}
                />
              ) : (
                <div className="atmosphere flex h-full w-full items-end justify-start p-8">
                  <span className="font-serif text-8xl font-bold text-emerald-brand/60">U.</span>
                </div>
              )}
            </div>
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(11,13,16,0.55), transparent 45%)' }}
            />
            <figcaption className="absolute bottom-5 left-6 font-serif text-lg italic text-brand-white/90">
              Usama Ayoub
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
