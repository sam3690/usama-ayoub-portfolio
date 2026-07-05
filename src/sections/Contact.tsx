import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { email, socials } from '../data'

interface ContactProps {
  reduced: boolean
}

export default function Contact({ reduced }: ContactProps) {
  const section = useRef<HTMLElement>(null)
  const button = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (reduced || !section.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-line .line-inner', {
        yPercent: 115,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section.current, start: 'top 70%' },
      })
      gsap.from('.contact-cta', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section.current, start: 'top 70%' },
      })
    }, section)

    // Magnetic pull on the CTA
    const btn = button.current
    if (!btn) return () => ctx.revert()
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < 140) {
        xTo(dx * 0.3)
        yTo(dy * 0.3)
      } else {
        xTo(0)
        yTo(0)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [reduced])

  return (
    <section
      ref={section}
      id="contact"
      className="atmosphere relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-28 text-center md:px-14">
        <h2 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-brand-white md:text-8xl">
          <span className="contact-line line-mask">
            <span className="line-inner block">You saw the systems.</span>
          </span>
          <span className="contact-line line-mask">
            <span className="line-inner block">
              Let's build <span className="italic text-emerald-brand">yours.</span>
            </span>
          </span>
        </h2>

        <div className="contact-cta mt-14 flex flex-col items-center gap-8">
          <a
            ref={button}
            href={`mailto:${email}`}
            className="inline-block rounded-full bg-emerald-brand px-10 py-5 text-base font-semibold text-white transition-colors duration-300 hover:bg-emerald-dark active:scale-[0.98]"
          >
            Get in touch
          </a>
          <a
            href={`mailto:${email}`}
            className="font-mono text-sm text-brand-muted transition-colors hover:text-emerald-brand"
          >
            {email}
          </a>
          <ul className="flex gap-8">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-light/70 underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="border-t border-brand-border/50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-14">
          <p className="text-xs text-brand-muted">© 2026 Usama Ayoub</p>
          <p className="font-serif text-sm italic text-brand-muted">Move fast and don't break things.</p>
        </div>
      </footer>
    </section>
  )
}
