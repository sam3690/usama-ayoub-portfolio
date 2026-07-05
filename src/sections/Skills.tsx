import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useMediaQuery } from '../lib/scroll'
import { skills } from '../data'

const STEP = 12 // degrees between words on the wheel
const RADIUS = 'min(40vw, 58vh)'

interface SkillsProps {
  reduced: boolean
}

/** The stack as a whirling wheel: skills ride a great spiral past a fixed
 *  focus point while the section is pinned. Finite: the wheel stops on the
 *  last skill and the page moves on. */
export default function Skills({ reduced }: SkillsProps) {
  const section = useRef<HTMLElement>(null)
  const rotor = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const whirl = isDesktop && !reduced

  useEffect(() => {
    if (!whirl || !section.current || !rotor.current) return
    const total = (skills.length - 1) * STEP
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rotor.current,
        { rotation: 0 },
        {
          rotation: total,
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
  }, [whirl])

  useEffect(() => {
    if (whirl) ScrollTrigger.refresh()
  }, [whirl])

  if (!whirl) {
    return (
      <section id="skills" className="mx-auto max-w-[1400px] px-6 py-28 md:px-14">
        <h2 className="font-serif text-4xl font-semibold tracking-tight text-brand-white">
          Tools I ship <span className="italic text-emerald-brand">with.</span>
        </h2>
        <ul className="mt-10 flex flex-wrap gap-3">
          {skills.map((s) => (
            <li
              key={s.name}
              className="rounded-full border border-brand-border px-4 py-2 text-sm text-brand-light/85"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section ref={section} id="skills" className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-14">
          <div className="max-w-sm">
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-brand-white md:text-6xl">
              Tools I ship <span className="italic text-emerald-brand">with.</span>
            </h2>
            <p className="mt-6 text-brand-light/70">
              Every system is only as good as the stack under it. Mine is chosen for one thing:
              surviving production.
            </p>
            <p key={active} className="meta-swap mt-10 font-mono text-sm text-gold">
              {skills[active]?.cat}
            </p>
          </div>
        </div>

        {/* Wheel pivot sits just off the right edge; words ride the rim */}
        <div className="absolute right-[-6vw] top-1/2" aria-hidden>
          <div
            className="pointer-events-none absolute rounded-full border border-brand-border/50"
            style={{
              width: `calc(2 * ${RADIUS})`,
              height: `calc(2 * ${RADIUS})`,
              left: `calc(-1 * ${RADIUS})`,
              top: `calc(-1 * ${RADIUS})`,
            }}
          />
          <div ref={rotor} className="relative h-0 w-0">
            {skills.map((s, i) => (
              <div
                key={s.name}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${-i * STEP}deg)` }}
              >
                <span
                  className={`block origin-left whitespace-nowrap font-serif text-4xl font-semibold transition-all duration-500 md:text-6xl ${
                    i === active ? 'text-brand-white' : 'text-brand-light/15'
                  }`}
                  style={{
                    transform: `translateX(calc(-1 * (${RADIUS} + ${i * 5}px))) translateY(-50%)`,
                  }}
                >
                  {i === active ? (
                    <span className="italic text-emerald-brand">{s.name}</span>
                  ) : (
                    s.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
