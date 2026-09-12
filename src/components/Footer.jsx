const LINKS = [
  { label: 'GitHub', href: 'https://github.com/SafwanS143' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safwan-shiblee/' },
  { label: 'Résumé', href: '/resume.pdf' },
  { label: 'Email', href: 'mailto:sshiblee@uwaterloo.ca' },
]

export default function Footer() {
  return (
    <footer className="tone-alt text-[0.75rem] leading-[1.35] tracking-[-0.01em] text-fg-2">
      <div className="mx-auto max-w-[1080px] px-6 py-5">
        <p className="border-b border-hairline pb-4">Designed and built by Safwan Shiblee in Waterloo, Ontario.</p>
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Safwan Shiblee. All rights reserved.</p>
          <ul className="flex flex-wrap items-center">
            {LINKS.map(({ label, href }, i) => (
              <li key={label} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-2 h-3 w-px bg-hairline" />}
                <a href={href} target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined} rel="noreferrer" className="inline-flex min-h-11 items-center text-fg hover:underline md:min-h-0">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="dot-live h-1.5 w-1.5 rounded-full bg-ok" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
