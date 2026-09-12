import { Chevron } from './icons'

// Apple-style announcement ribbon, scrolls away above the sticky nav.
export default function Ribbon() {
  return (
    <div className="tone-dark border-b border-hairline bg-card">
      <p className="mx-auto max-w-[1080px] px-6 py-2.5 text-center text-[0.875rem] leading-snug text-fg">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-ok align-middle dot-live" aria-hidden="true" />
        Now an SRE Co-op at Magnet Forensics.{' '}
        <a href="#experience" className="inline-flex items-center gap-0.5 text-link hover:underline">
          See experience
          <Chevron size={10} />
        </a>
      </p>
    </div>
  )
}
