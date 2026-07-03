const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SafwanS143' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safwan-shiblee/' },
  { label: 'Resume', href: '/resume.pdf' },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="label-mono mb-3 text-muted">
          <span className="text-copper">04</span> / Contact
        </p>
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Open a connection
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Co-op terms, SRE and platform work, or anything across the
          hardware/software boundary — my inbox is monitored 24/7.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:sshiblee@uwaterloo.ca"
            className="flex min-h-11 items-center rounded bg-signal px-5 font-mono text-sm font-semibold text-bg transition-transform duration-200 hover:-translate-y-0.5"
          >
            sshiblee@uwaterloo.ca
          </a>
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center rounded border border-border px-4 font-mono text-sm text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
            >
              {label}
            </a>
          ))}
        </div>

        {/* The trace terminates into ground, staying in the left gutter */}
        <div className="relative mt-16 h-10" aria-hidden="true">
          {/* Column is 28px wide; offsets center its pad on the gutter line
              shared by all trace waypoints (-9px mobile, -43px desktop). */}
          <div className="absolute -left-[23px] top-0 flex w-7 flex-col items-center gap-1.5 md:-left-[57px]">
            <span
              data-trace-node
              className="inline-block h-2.5 w-2.5 rounded-full border-2 border-copper bg-bg"
            />
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" className="text-copper">
              <path d="M14 0v6M4 7h20M8 12h12M11.5 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Terminal status bar */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-5 py-3 font-mono text-xs text-dim md:px-8">
          <span>© 2026 Safwan Shiblee</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="text-muted">all systems nominal</span>
          </span>
          <span>React · Vite · GitHub Pages</span>
        </div>
      </div>
    </footer>
  )
}
