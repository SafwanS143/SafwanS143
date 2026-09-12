import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, DocIcon, GitHubIcon, LinkedInIcon, MailIcon, SearchIcon } from './icons'

const Hash = () => <span className="text-[0.9375rem] font-semibold leading-none">#</span>

const COMMANDS = [
  { id: 'experience', label: 'Experience', hint: 'Section', icon: Hash, action: { jump: 'experience' } },
  { id: 'fleetwright', label: 'Fleetwright', hint: 'Featured project', icon: Hash, action: { jump: 'fleetwright' } },
  { id: 'projects', label: 'Projects', hint: 'Section', icon: Hash, action: { jump: 'projects' } },
  { id: 'about', label: 'About', hint: 'Section', icon: Hash, action: { jump: 'about' } },
  { id: 'contact', label: 'Contact', hint: 'Section', icon: Hash, action: { jump: 'contact' } },
  { id: 'fw-repo', label: 'Fleetwright on GitHub', hint: 'github.com', icon: GitHubIcon, action: { href: 'https://github.com/SafwanS143/Fleetwright' } },
  { id: 'github', label: 'GitHub', hint: 'SafwanS143', icon: GitHubIcon, action: { href: 'https://github.com/SafwanS143' } },
  { id: 'linkedin', label: 'LinkedIn', hint: 'safwan-shiblee', icon: LinkedInIcon, action: { href: 'https://www.linkedin.com/in/safwan-shiblee/' } },
  { id: 'resume', label: 'Résumé', hint: 'PDF', icon: DocIcon, action: { href: '/resume.pdf' } },
  { id: 'email', label: 'Send an email', hint: 'sshiblee@uwaterloo.ca', icon: MailIcon, action: { href: 'mailto:sshiblee@uwaterloo.ca' } },
]

// Spotlight-style quick navigation. Ctrl/⌘ K toggles, Esc closes.
export default function CommandPalette({ open, onClose, onOpen }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const restoreRef = useRef(null)
  // Chrome refires hover events when the DOM re-renders under a resting
  // cursor, which would clobber arrow-key selection, only honor pointer
  // hover when the pointer has actually moved.
  const lastPointer = useRef([-1, -1])
  const reduced = useReducedMotion()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) onClose()
        else onOpen()
      } else if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, onOpen])

  // Focus management: capture the invoker, focus the input, restore on close.
  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (restoreRef.current) {
      restoreRef.current.focus?.()
      restoreRef.current = null
    }
  }, [open])

  const run = (command) => {
    if (command.action.jump) {
      // Focus follows navigation; restoring it to the invoker would scroll
      // back and cancel the jump.
      restoreRef.current = null
      onClose()
      const el = document.getElementById(command.action.jump)
      if (el) {
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
    } else {
      onClose()
      window.open(command.action.href, '_blank', 'noopener,noreferrer')
    }
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="tone-dark fixed inset-0 z-50 flex items-start justify-center !bg-black/45 px-4 pt-[16vh]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="glass w-full max-w-[640px] overflow-hidden rounded-[22px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)]"
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.8 }}
          >
            <div className="flex items-center gap-3 px-5">
              <SearchIcon size={22} className="shrink-0 text-fg-2" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-listbox"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-label="Search this site"
                placeholder="Search this site"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKeyDown}
                className="min-h-16 w-full bg-transparent text-[1.375rem] font-normal tracking-[-0.02em] text-fg outline-none placeholder:text-fg-3 focus-visible:outline-none"
              />
              <kbd className="rounded-md bg-fill px-2 py-1 font-sans text-[0.6875rem] font-medium text-fg-2">esc</kbd>
            </div>

            <ul
              id="palette-listbox"
              role="listbox"
              aria-label="Results"
              className="max-h-[22rem] overflow-y-auto border-t border-hairline p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-4 text-[0.9375rem] text-fg-2">No results for “{query}”.</li>
              )}
              {results.map((command, i) => {
                const Icon = command.icon
                const on = i === active
                return (
                  <li
                    key={command.id}
                    id={`palette-${command.id}`}
                    role="option"
                    aria-selected={on}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${on ? 'bg-accent text-white' : 'text-fg'}`}
                    onMouseMove={(e) => {
                      if (e.clientX !== lastPointer.current[0] || e.clientY !== lastPointer.current[1]) {
                        lastPointer.current = [e.clientX, e.clientY]
                        setActive(i)
                      }
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => run(command)}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${on ? 'bg-white/20' : 'bg-fill text-fg-2'}`}
                    >
                      <Icon size={14} />
                    </span>
                    <span className="text-[0.9375rem] font-medium">{command.label}</span>
                    <span className={`ml-auto truncate text-[0.8125rem] ${on ? 'text-white/80' : 'text-fg-2'}`}>
                      {command.hint}
                    </span>
                    {command.action.href && <ArrowUpRight size={11} className={on ? 'text-white/80' : 'text-fg-3'} />}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
