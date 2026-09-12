import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SearchIcon } from './icons'
import { EASE_OUT_QUINT } from '../lib/motion'

const LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'fleetwright', label: 'Fleetwright' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuTop, setMenuTop] = useState(52)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [overLight, setOverLight] = useState(false)
  const barRef = useRef(null)
  const reduced = useReducedMotion()

  // One rAF-throttled pass per scroll: hairline, current section, and the
  // tone of whatever is sliding under the bar (light glass over light
  // sections, dark glass over dark ones).
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 48)

      const mid = window.innerHeight / 2
      let current = null
      for (const { id } of LINKS) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.top <= mid && r.bottom > mid) current = id
      }
      setActive(current)

      const bar = barRef.current
      if (bar) {
        const below = document.elementFromPoint(window.innerWidth / 2, bar.getBoundingClientRect().bottom + 1)
        const toned = below?.closest('.tone-dark, .tone-light, .tone-alt')
        setOverLight(!prefersDark.matches && !!toned && !toned.classList.contains('tone-dark'))
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    prefersDark.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      prefersDark.removeEventListener('change', schedule)
    }
  }, [])

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const toggleMenu = () => {
    // The ribbon may still be on screen, open the sheet right under the bar.
    if (!menuOpen && barRef.current) setMenuTop(barRef.current.getBoundingClientRect().bottom)
    setMenuOpen((v) => !v)
  }

  const light = overLight && !menuOpen

  return (
    <header className={`${light ? 'tone-light' : 'tone-dark'} sticky top-0 z-40 !bg-transparent`}>
      <div
        ref={barRef}
        className={`${light ? 'glass-light' : 'glass'} border-b transition-[background-color,border-color] duration-500 ${
          scrolled || menuOpen ? 'border-hairline' : 'border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[52px] max-w-[1080px] items-center justify-between px-6">
          <a
            href="#top"
            className="flex min-h-11 items-center text-[1.1875rem] font-semibold tracking-[-0.03em] text-fg transition-colors duration-500"
          >
            Safwan Shiblee
          </a>

          <div className="hidden items-center md:flex">
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`flex min-h-11 items-center px-3 text-[0.8125rem] tracking-[-0.01em] transition-colors duration-300 hover:text-fg ${
                  active === id ? 'text-fg' : 'text-fg-2'
                }`}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search (Ctrl K)"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-fg-2 transition-colors duration-200 hover:text-fg"
            >
              <SearchIcon size={15} />
            </button>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="group flex min-h-11 items-center pl-2">
              <span className="rounded-full bg-accent px-3 py-1 text-[0.75rem] font-medium tracking-[-0.01em] text-white transition-colors duration-200 group-hover:bg-accent-hover">
                Résumé
              </span>
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search"
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-fg-2"
            >
              <SearchIcon size={16} />
            </button>
            <button
              type="button"
              className="relative flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-fg"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300 ${
                  menuOpen ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300 ${
                  menuOpen ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="tone-dark glass fixed inset-x-0 bottom-0 overflow-y-auto !bg-black/90 md:hidden"
            style={{ top: menuTop }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="px-10 pt-6"
              initial={reduced ? false : 'hidden'}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {[...LINKS, { id: 'resume', label: 'Résumé', href: '/resume.pdf' }].map((l) => (
                <motion.li
                  key={l.id}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_QUINT } },
                  }}
                >
                  <a
                    href={l.href ?? `#${l.id}`}
                    target={l.href ? '_blank' : undefined}
                    rel={l.href ? 'noreferrer' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-14 items-center text-[1.75rem] font-semibold tracking-[-0.03em] text-fg"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
