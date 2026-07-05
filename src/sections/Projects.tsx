import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { gsap, useMediaQuery } from '../lib/scroll'
import { projects } from '../data'
import type { Project } from '../data'

const STEP = 15 // degrees between cards on the fan
const RADIUS = 'min(135vh, 950px)'

function cardArt(p: Project): CSSProperties {
  return {
    background: [
      `radial-gradient(130% 110% at 18% 0%, ${p.tint}2e 0%, transparent 58%)`,
      `radial-gradient(90% 80% at 90% 110%, ${p.tint}1a 0%, transparent 55%)`,
      'linear-gradient(155deg, #191d22 0%, #0e1114 72%)',
    ].join(', '),
  }
}

function gridPattern(p: Project): CSSProperties {
  return {
    backgroundImage: `linear-gradient(${p.tint}14 1px, transparent 1px), linear-gradient(90deg, ${p.tint}14 1px, transparent 1px)`,
    backgroundSize: '26px 26px',
  }
}

function Card({ p, active }: { p: Project; active: boolean }) {
  return (
    <article
      className={`relative h-[24rem] w-[17rem] overflow-hidden rounded-2xl border transition-all duration-500 md:h-[29rem] md:w-[20.5rem] ${
        active ? 'border-emerald-brand/50 shadow-2xl shadow-emerald-deep/40' : 'border-brand-border brightness-[0.62]'
      }`}
      style={cardArt(p)}
    >
      <div className="absolute inset-0" style={gridPattern(p)} />
      <div className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-light/60">
        {p.role}
      </div>
      <div
        className="absolute h-40 w-40 rounded-full blur-3xl"
        style={{ background: `${p.tint}40`, right: '-2rem', top: '30%' }}
      />
      <div className="absolute inset-x-6 bottom-6">
        <h3 className="font-serif text-3xl font-semibold leading-tight text-brand-white">
          {p.title}
        </h3>
      </div>
    </article>
  )
}

interface ProjectsProps {
  reduced: boolean
}

/** The catalog: cards ride a giant unseen wheel whose hub sits far below the
 *  viewport, sweeping through center focus one at a time. Finite by design,
 *  the pin releases on the last card. */
export default function Projects({ reduced }: ProjectsProps) {
  const section = useRef<HTMLElement>(null)
  const rotor = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const fan = isDesktop && !reduced

  useEffect(() => {
    if (!fan || !section.current || !rotor.current) return
    const total = (projects.length - 1) * STEP
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rotor.current,
        { rotation: 0 },
        {
          rotation: -total,
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: (self) => {
              const idx = Math.round((self.progress * total) / STEP)
              setActive((prev) => (prev === idx ? prev : idx))
            },
          },
        },
      )
    }, section)
    return () => ctx.revert()
  }, [fan])

  const activeProject = projects[active]

  if (!fan) {
    return (
      <section id="work" className="mx-auto max-w-[1400px] px-6 py-28 md:px-14">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-brand-white">
          Selected <span className="italic text-emerald-brand">systems.</span>
        </h2>
        <div className="mt-12 space-y-12">
          {projects.map((p) => (
            <div key={p.title}>
              <Card p={p} active />
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-brand-light/75">
                {p.description}
              </p>
              <p className="mt-2 font-mono text-xs text-brand-muted">{p.stack.join(' / ')}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={section}
      id="work"
      className="relative h-[420vh] border-t border-brand-border/60 bg-brand-dark/40"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute left-14 top-1/2 z-10 w-[24rem] -translate-y-1/2">
          <h2 className="font-serif text-5xl font-semibold leading-tight tracking-tight text-brand-white">
            Selected <span className="italic text-emerald-brand">systems.</span>
          </h2>
          <div key={active} className="meta-swap mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              {activeProject.role}
            </p>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-brand-light/80">
              {activeProject.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {activeProject.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-brand-border px-3 py-1 font-mono text-xs text-brand-light/70"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fan hub far below the viewport; cards sweep across the right side */}
        <div
          className="absolute left-[62%] top-[100dvh]"
          style={{ transform: `translateY(calc(${RADIUS} - 44dvh))` }}
        >
          <div ref={rotor} className="relative h-0 w-0">
            {projects.map((p, i) => (
              <div
                key={p.title}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${i * STEP}deg)` }}
              >
                <div
                  style={{ transform: `translateY(calc(-1 * ${RADIUS})) translateX(-50%)` }}
                >
                  <Card p={p} active={i === active} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
