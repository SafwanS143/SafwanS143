import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const COMMANDS = [
  { id: 'experience', label: 'Go to Experience', hint: 'section', action: { jump: 'experience' } },
  { id: 'projects', label: 'Go to Projects', hint: 'section', action: { jump: 'projects' } },
  { id: 'about', label: 'Go to About', hint: 'section', action: { jump: 'about' } },
  { id: 'contact', label: 'Go to Contact', hint: 'section', action: { jump: 'contact' } },
  { id: 'github', label: 'Open GitHub', hint: 'github.com/SafwanS143', action: { href: 'https://github.com/SafwanS143' } },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'linkedin.com/in/safwan-shiblee', action: { href: 'https://www.linkedin.com/in/safwan-shiblee/' } },
  { id: 'resume', label: 'Open Resume', hint: 'pdf', action: { href: '/resume.pdf' } },
  { id: 'email', label: 'Send Email', hint: 'sshiblee@uwaterloo.ca', action: { href: 'mailto:sshiblee@uwaterloo.ca' } },
]

export default function CommandPalette({ open, onClose, onOpen }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const restoreRef = useRef(null)
  // Chrome refires hover events when the DOM re-renders under a resting
  // cursor, which would clobber arrow-key selection — only honor pointer
  // hover when the pointer has actually moved.
  const lastPointer = useRef([-1, -1])
  const reduced = useReducedMotion()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    )
  }, [query])

  // Global shortcut — Ctrl/Cmd+K toggles, Esc closes.
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
      // Focus moves to the target section (focus-follows-navigation);
      // restoring it to the invoker would scroll back and cancel the jump.
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
      if (command.action.href) {
        window.open(command.action.href, '_blank', 'noopener,noreferrer')
      }
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
      // Single-focus dialog: keep focus on the input.
      e.preventDefault()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[18vh] backdrop-blur-sm"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-lg border border-border-strong bg-surface shadow-card"
            initial={reduced ? false : { opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span className="font-mono text-sm text-signal" aria-hidden="true">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-listbox"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-label="Type a command"
                placeholder="Type a command…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKeyDown}
                className="min-h-12 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-dim"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.625rem] text-dim">
                esc
              </kbd>
            </div>

            <ul id="palette-listbox" role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-3 font-mono text-sm text-dim">no matches — 404</li>
              )}
              {results.map((command, i) => (
                <li
                  key={command.id}
                  id={`palette-${command.id}`}
                  role="option"
                  aria-selected={i === active}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 font-mono text-sm ${
                    i === active ? 'bg-raised text-fg' : 'text-muted'
                  }`}
                  onMouseMove={(e) => {
                    if (e.clientX !== lastPointer.current[0] || e.clientY !== lastPointer.current[1]) {
                      lastPointer.current = [e.clientX, e.clientY]
                      setActive(i)
                    }
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => run(command)}
                >
                  <span>{command.label}</span>
                  <span className="truncate text-xs text-dim">{command.hint}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
