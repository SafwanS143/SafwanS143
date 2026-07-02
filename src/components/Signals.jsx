import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { metrics } from '../data/metrics'
import { EASE_OUT_EXPO, fadeRise, staggerChildren } from '../lib/motion'

// Grafana-style stat panels — every number is real and traceable to the
// resume or a repo README. Counters animate once on first view.
export default function Signals() {
  const reduced = useReducedMotion()

  return (
    <section aria-label="Key reliability metrics" className="border-y border-border bg-surface/50">
      <motion.dl
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4"
        variants={staggerChildren(0.06)}
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      >
        {metrics.map((m) => (
          <StatPanel key={m.id} metric={m} />
        ))}
      </motion.dl>
    </section>
  )
}

function StatPanel({ metric }) {
  return (
    <motion.div variants={fadeRise} className="px-5 py-8 md:px-8">
      <dt className="label-mono text-muted">{metric.label}</dt>
      <dd className="mt-2">
        <span className="tabular block font-mono text-4xl font-semibold text-signal md:text-5xl">
          <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
        </span>
        <span className="mt-2 block text-xs leading-relaxed text-dim">{metric.context}</span>
      </dd>
    </motion.div>
  )
}

function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-CA')}
      {suffix}
    </span>
  )
}
