import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu after any in-page navigation.
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden="true"
            className="status-dot inline-block h-2 w-2 rounded-full bg-signal"
          />
          safwan.shiblee
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex min-h-11 items-center rounded px-3 font-mono text-[0.8125rem] text-muted transition-colors duration-200 hover:text-fg"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenPalette}
            className="ml-2 flex min-h-9 cursor-pointer items-center gap-1.5 rounded border border-border px-2.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
            aria-label="Open command palette"
          >
            <kbd className="text-[0.6875rem]">Ctrl</kbd>
            <kbd className="text-[0.6875rem]">K</kbd>
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="ml-2 flex min-h-9 items-center rounded border border-signal/40 px-3.5 font-mono text-[0.8125rem] font-medium text-signal transition-colors duration-200 hover:border-signal hover:bg-signal-glow"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded text-muted transition-colors hover:text-fg md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-border bg-bg/95 px-5 py-3 backdrop-blur-md md:hidden">
          <ul>
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center font-mono text-sm text-muted transition-colors hover:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center font-mono text-sm font-medium text-signal"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
