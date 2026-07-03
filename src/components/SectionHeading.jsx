import { motion, useReducedMotion } from 'motion/react'
import { fadeRise, viewportOnce } from '../lib/motion'

// Runbook-style section header: `01 / EXPERIENCE` + display title.
// The small pad next to the index is a waypoint for the scroll trace.
export default function SectionHeading({ index, label, title, description }) {
  const reduced = useReducedMotion()

  return (
    <motion.header
      className="mb-12 md:mb-16"
      variants={fadeRise}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <p className="label-mono relative mb-3 text-muted">
        {/* Solder pad hangs in the left gutter so the trace clears the text */}
        <span
          data-trace-node
          aria-hidden="true"
          className="absolute -left-3.5 top-1/2 inline-block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-copper bg-bg md:-left-12"
        />
        <span>
          <span className="text-copper">{index}</span> / {label}
        </span>
      </p>
      <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl leading-relaxed text-muted">{description}</p>
      )}
    </motion.header>
  )
}
