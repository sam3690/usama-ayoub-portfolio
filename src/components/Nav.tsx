const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-14">
        <a href="#top" className="flex items-center gap-3" aria-label="Usama Ayoub, back to top">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-emerald-brand font-serif text-lg font-bold text-brand-white">
            U
            <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[2px] bg-gold" />
          </span>
          <span className="hidden font-serif text-lg font-semibold tracking-tight text-brand-white sm:block">
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
