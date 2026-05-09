import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const LINKS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' },
  { id: 'resume', label: 'Resume', index: '03' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'resume']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-bg/75 border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 font-mono text-sm tracking-wide"
          aria-label="Home"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
          <span className="text-fg group-hover:text-accent transition-colors">
            safwan<span className="text-accent">.</span>shiblee
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`group relative px-3 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
                active === link.id ? 'text-fg' : 'text-fg-muted hover:text-fg'
              }`}
            >
              <span className="text-accent mr-2">{link.index}</span>
              {link.label}
              <span
                className={`absolute left-3 right-3 -bottom-px h-px origin-left transition-transform duration-300 bg-accent ${
                  active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </nav>

        <a
          href="#resume"
          className="md:hidden font-mono text-xs uppercase tracking-wider text-accent border border-accent/40 px-3 py-1.5 hover:bg-accent hover:text-bg transition-colors"
        >
          Resume
        </a>
      </div>
    </motion.header>
  )
}
