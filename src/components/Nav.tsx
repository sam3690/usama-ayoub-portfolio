import { useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
]

export default function Nav() {
  const [logoMissing, setLogoMissing] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-14">
        <a href="#top" className="flex items-center gap-3" aria-label="Usama Ayoub, back to top">
          {/* Drop portrait.png into /public to replace the fallback mark */}
          {!logoMissing ? (
            <span className="relative h-9 w-9 overflow-hidden rounded-[10px] border-2 border-emerald-brand">
              <img
                src="/portrait.png"
                alt=""
                className="h-full w-full object-cover"
                onError={() => setLogoMissing(true)}
              />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[2px] bg-gold" />
            </span>
          ) : (
            <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-emerald-brand font-heading text-lg font-bold text-brand-white">
              U
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[2px] bg-gold" />
            </span>
          )}
          <span className="hidden font-heading text-lg font-semibold tracking-tight text-brand-white sm:block">
            Usama Ayoub
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-brand-light/75 transition-colors hover:text-brand-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald-dark active:scale-[0.98]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
