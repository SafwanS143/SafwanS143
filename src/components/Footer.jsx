const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SafwanS143' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safwan-shiblee/' },
  { label: 'Email', href: 'mailto:sshiblee@uwaterloo.ca' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid sm:grid-cols-2 gap-8 items-start">
        <div>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 font-mono text-sm group"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="text-fg group-hover:text-accent transition-colors">
              safwan<span className="text-accent">.</span>shiblee
            </span>
          </a>
          <p className="mt-4 text-sm text-fg-muted max-w-sm">
            Built with React, Vite, Tailwind v4, and Motion. Designed and shipped from Waterloo, ON.
          </p>
        </div>

        <div className="sm:text-right">
          <ul className="flex flex-wrap sm:justify-end gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  className="text-fg-muted hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
            © {new Date().getFullYear()} Safwan Shiblee · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
