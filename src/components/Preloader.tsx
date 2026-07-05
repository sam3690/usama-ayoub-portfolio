import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap } from '../lib/scroll'

const MESSAGES = ['Booting systems', 'Loading agents', 'Compiling automations', 'Ready']
/** Long enough for the hero camera's settle-in lerp (and any residual z-fight
 *  flicker on the CLI screen) to finish behind the curtain. */
const MIN_DURATION = 4400

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { progress } = useProgress()
  const [display, setDisplay] = useState(0)
  const [portraitMissing, setPortraitMissing] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const startRef = useRef(performance.now())
  const doneRef = useRef(false)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const timeBased = Math.min(100, (elapsed / MIN_DURATION) * 100)
      const combined = Math.min(100, Math.max(timeBased, progress))
      setDisplay(Math.round(combined))

      if (combined >= 100 && elapsed >= MIN_DURATION && !doneRef.current) {
        doneRef.current = true
        const tl = gsap.timeline({ onComplete })
        tl.to('.preloader-content', { opacity: 0, y: -16, duration: 0.4, ease: 'power2.in' })
        tl.to(root.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')
        tl.set(root.current, { display: 'none' })
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress, onComplete])

  const messageIndex = Math.min(MESSAGES.length - 1, Math.floor((display / 100) * MESSAGES.length))

  return (
    <div
      ref={root}
      className="atmosphere fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <div className="preloader-content flex flex-col items-center">
        {!portraitMissing ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-emerald-brand">
            <img
              src="/portrait.png"
              alt=""
              className="h-full w-full object-cover"
              onError={() => setPortraitMissing(true)}
            />
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-[3px] bg-gold" />
          </div>
        ) : (
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-brand">
            <span className="font-heading text-2xl font-bold text-brand-white">U</span>
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-[3px] bg-gold" />
          </div>
        )}

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-emerald-brand">
          {MESSAGES[messageIndex]}
          <span className="cli-caret ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-emerald-brand" />
        </p>

        <div className="mt-7 h-px w-56 overflow-hidden bg-brand-border">
          <div
            className="h-full bg-emerald-brand transition-[width] duration-150 ease-out"
            style={{ width: `${display}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] tabular-nums text-brand-muted">{display}%</p>
      </div>
    </div>
  )
}
