import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import { metrics } from '../data/metrics'
import { EASE_OUT_QUINT } from '../lib/motion'

// Four sourced stats: where it's from, the number, one line of context.
export default function Highlights() {
  return (
    <section aria-labelledby="highlights-title" className="tone-dark pb-28 pt-8 md:pb-40">
      <div className="mx-auto max-w-[1080px] px-6">
        <Reveal>
          <h2 id="highlights-title" className="t-headline max-w-[16ch] text-fg">
            Impact, by the numbers.
          </h2>
          <p className="t-lead mt-5 max-w-[34rem] text-fg-2">
            Measured results from co-op terms and shipped projects.
          </p>
        </Reveal>

        <Reveal group className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-4">
          {metrics.map((m) => (
            <Stat key={m.id} metric={m} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Stat({ metric }) {
  return (
    <Reveal.Item className="tile @container flex flex-col p-7 md:p-8">
      <p className="text-[0.8125rem] font-medium text-fg-2">{metric.source}</p>
      {/* Sized to the tile, not the viewport, so narrow tiles never clip. */}
      <p className={`tabular mt-5 pb-1 text-[clamp(2.75rem,21cqi,4.5rem)] font-bold leading-none tracking-[-0.05em] ${metric.gradient}`}>
        <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
      </p>
      <p className="mt-4 text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-fg">{metric.label}</p>
    </Reveal.Item>
  )
}

// Writes straight to the DOM node, so there's no React re-render per frame.
function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const format = (v) => `${prefix}${Math.round(v).toLocaleString('en-CA')}${suffix}`

  useEffect(() => {
    if (!inView || reduced || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT_QUINT,
      onUpdate: (v) => {
        node.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value])

  return (
    <span ref={ref} aria-label={format(value)}>
      {format(value)}
    </span>
  )
}
