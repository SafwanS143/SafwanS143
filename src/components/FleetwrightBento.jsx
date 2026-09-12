import { motion } from 'motion/react'
import Reveal from './Reveal'
import { fleetwright } from '../data/projects'
import { EASE_OUT_QUINT } from '../lib/motion'

// Feature tiles: each one is a production practice, with its evidence.
export default function FleetwrightBento() {
  return (
    <div className="mt-28 md:mt-40">
      <Reveal>
        <h3 className="t-headline text-fg">Built like production.</h3>
        <p className="t-lead mt-5 max-w-[36rem] text-fg-2">
          The practices you'd expect around a paid, paged service, applied end
          to end with the evidence written down.
        </p>
      </Reveal>

      <Reveal group className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-3">
        <SloTile />
        <DetectorTile />
      </Reveal>
    </div>
  )
}

function Tile({ className = '', children }) {
  return <Reveal.Item className={`tile flex flex-col p-8 md:p-10 ${className}`}>{children}</Reveal.Item>
}

function SloTile() {
  return (
    <Tile className="lg:col-span-2">
      <h4 className="t-title text-fg">
        Three SLOs.
        <br />
        <span className="text-fg-2">Real error budgets.</span>
      </h4>
      <dl className="mt-8 divide-y divide-hairline">
        {fleetwright.slos.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-6 py-4">
            <dt>
              <span className="block text-[1.0625rem] font-semibold text-fg">{s.name}</span>
              <span className="block text-[0.875rem] text-fg-2">{s.detail}</span>
            </dt>
            <dd className="tabular text-gradient-green shrink-0 text-[clamp(1.75rem,3.2vw,2.25rem)] font-bold tracking-[-0.04em]">
              {s.target}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-2">
        A 99% freshness target leaves about 7.2 hours of staleness per device,
        per month: room for reconnects and deploys before reliability work
        outranks features.
      </p>
    </Tile>
  )
}

// Bars grow with the tile's own reveal (variants inherited from the grid).
const growX = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, delay: 0.35, ease: EASE_OUT_QUINT } },
}

function DetectorTile() {
  const max = 0.06
  return (
    <Tile>
      <p className="tabular text-gradient-green text-[clamp(3.75rem,7vw,5rem)] font-bold leading-none tracking-[-0.05em]">
        0.000
      </p>
      <h4 className="mt-4 text-[1.1875rem] font-semibold tracking-[-0.02em] text-fg">
        False-positive rate on the paging path.
      </h4>
      <div className="mt-7 space-y-3.5" aria-label="Mean false-positive rate by detector">
        {fleetwright.detectors.map((d) => (
          <div key={d.name}>
            <div className="flex justify-between text-[0.8125rem]">
              <span className={d.chosen ? 'font-semibold text-fg' : 'text-fg-2'}>
                {d.name}
                {d.chosen && ' (shipped)'}
              </span>
              <span className="tabular text-fg-2">{d.fp.toFixed(3)}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-fill">
              <motion.div
                className={`h-full origin-left rounded-full ${d.chosen ? 'bg-ok' : 'bg-pink'}`}
                style={{ width: `${Math.max(d.fp / max, 0.02) * 100}%` }}
                variants={growX}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-7 text-[0.9375rem] leading-relaxed text-fg-2">
        Benchmarked both detectors on labelled faults, then shipped the one
        that doesn't cry wolf.
      </p>
    </Tile>
  )
}
