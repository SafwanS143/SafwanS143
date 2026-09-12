import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal'
import { experience } from '../data/experience'

export default function Experience() {
  const [current, ...past] = experience

  return (
    <section id="experience" aria-labelledby="experience-title" className="tone-light scroll-mt-[52px] py-28 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6">
        <Reveal>
          <h2 id="experience-title" className="t-headline text-fg">
            Experience.
          </h2>
          <p className="t-lead mt-5 max-w-[38rem] text-fg-2">
            Five teams, one through-line: what breaks, how you notice, and how
            the system heals itself.
          </p>
        </Reveal>

        <NowCard job={current} />

        <ol className="mt-20 md:mt-28">
          {past.map((job) => (
            <Role key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  )
}

// The current role, a dark stage set into the light section, easing up to
// full size as it scrolls in.
function NowCard({ job }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1])

  return (
    <motion.article
      ref={ref}
      style={reduced ? undefined : { scale, opacity }}
      className="tone-dark relative mt-14 overflow-hidden rounded-[32px] px-8 py-12 ring-1 ring-inset ring-hairline md:mt-20 md:px-14 md:py-16"
    >
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -right-48 -top-56 h-[560px] w-[560px] rounded-full opacity-55"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#000_35%,transparent_85%)]" />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-fill px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg">
          <span aria-hidden="true" className="dot-live h-2 w-2 rounded-full bg-ok" />
          Now
        </p>
        <h3 className="t-display mt-6 text-fg">{job.company}</h3>
        <p className="t-eyebrow mt-3 text-gradient-blue">{job.title}</p>
        <p className="mt-2 text-[0.9375rem] text-fg-2">
          <span className="tabular">{job.dates}</span> · {job.location}
        </p>
        {job.points.map((p) => (
          <p key={p} className="mt-7 max-w-[36rem] text-[1.0625rem] leading-relaxed text-fg-2">
            {p}
          </p>
        ))}
        <ul className="mt-8 flex flex-wrap gap-2" aria-label={`Focus areas at ${job.company}`}>
          {job.tech.map((t) => (
            <li key={t} className="rounded-full bg-fill px-3.5 py-1.5 text-[0.8125rem] text-fg">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

function Role({ job }) {
  return (
    <Reveal as="li" className="grid gap-4 border-t border-hairline py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:py-12">
      <div>
        <h3 className="flex flex-wrap items-center gap-2.5 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-fg">
          {job.company}
          {job.nda && (
            <span className="rounded-full bg-fill px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-normal text-fg-2">
              NDA
            </span>
          )}
        </h3>
        <p className="mt-1.5 text-[1.0625rem] text-fg">{job.title}</p>
        <p className="mt-1 text-[0.875rem] text-fg-2">
          <span className="tabular">{job.dates}</span> · {job.location}
        </p>
      </div>
      <div>
        <div className="space-y-3">
          {job.points.map((p) => (
            <p key={p} className="text-[1.0625rem] leading-relaxed text-fg-2">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-5 text-[0.875rem] text-fg-2">
          <span className="sr-only">Technologies: </span>
          {job.tech.join('  ·  ')}
        </p>
      </div>
    </Reveal>
  )
}
