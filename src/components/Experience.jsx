import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/experience'
import { fadeRise, viewportOnce } from '../lib/motion'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="01"
          label="Experience"
          title="Where I've shipped"
          description="Work history, newest first — the next deploy is already scheduled."
        />
        <ol className="max-w-3xl">
          {experience.map((job) => (
            <TimelineItem key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineItem({ job }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // A node "lights up" once the signal head has reached it — approximated
  // by the entry crossing the viewport focal band. Stays lit after.
  const lit = useInView(ref, { once: true, margin: '-45% 0px -45% 0px' })
  const on = lit || reduced

  const incoming = job.status === 'incoming'
  const litColor = incoming ? 'border-amber bg-amber shadow-[0_0_12px_rgba(251,191,36,0.5)]' : 'border-signal bg-signal shadow-[0_0_12px_rgba(74,222,128,0.5)]'

  return (
    <motion.li
      ref={ref}
      className="relative"
      variants={fadeRise}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Solder-pad marker — a trace waypoint, hanging in the left gutter */}
      <span
        data-trace-node
        aria-hidden="true"
        className={`absolute -left-3.5 top-2 inline-block h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500 md:-left-12 ${
          on ? litColor : 'border-copper bg-bg'
        }`}
      />

      <div className="pb-14">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-fg">{job.company}</h3>
          {job.nda && (
            <span className="label-mono rounded-sm border border-border px-1.5 py-0.5 text-[0.625rem] text-muted">
              NDA
            </span>
          )}
          {incoming && (
            <span className="label-mono rounded-sm border border-amber/40 bg-amber/10 px-1.5 py-0.5 text-[0.625rem] text-amber">
              Incoming
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-[0.8125rem] text-muted">
          {job.title} · <span className="tabular">{job.dates}</span> · {job.location}
        </p>
        <ul className="mt-3 space-y-2">
          {job.points.map((point, i) => (
            <li key={i} className="max-w-xl text-[0.9375rem] leading-relaxed text-muted">
              {point}
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies at ${job.company}`}>
          {job.tech.map((t) => (
            <li
              key={t}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}
