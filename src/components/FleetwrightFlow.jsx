import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Reveal from './Reveal'
import { fleetwright } from '../data/projects'
import { EASE_OUT_QUINT } from '../lib/motion'

const STEPS = fleetwright.flow
const VH_PER_STEP = 85

// The telemetry path told as a pinned scroll story (lg+): the diagram holds
// still while each hop lights up in turn, then the control loop closes.
// Small screens get the same four beats as a plain stacked list.
export default function FleetwrightFlow() {
  return (
    <>
      <PinnedFlow />
      <StackedFlow />
    </>
  )
}

function PinnedFlow() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const s = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))
    setStep(s)
  })

  const goTo = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + travel * ((i + 0.5) / STEPS.length), behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${STEPS.length * VH_PER_STEP + 100}vh` }}>
      <div className="sticky top-[52px] flex h-[calc(100svh-52px)] flex-col items-center justify-center px-6">
        <Diagram step={step} reduced={reduced} />

        {/* All captions share one grid cell and crossfade on `step`, no
            presence queue, so fast scrolling can never strand a stale one. */}
        <div className="mt-10 grid w-full max-w-[40rem] text-center" aria-live="polite">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.id}
              className="[grid-area:1/1]"
              aria-hidden={i !== step}
              initial={false}
              animate={{ opacity: i === step ? 1 : 0, y: i === step ? 0 : i < step ? -10 : 14 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT_QUINT }}
            >
              <h3 className="t-title text-fg">{s.title}</h3>
              <p className="mt-4 text-[1.1875rem] leading-relaxed text-fg-2">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1" role="group" aria-label="Telemetry path steps">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Step ${i + 1}: ${s.node}`}
              aria-current={i === step ? 'step' : undefined}
              className="group flex h-11 cursor-pointer items-center px-1.5"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  i === step ? 'w-7 bg-fg' : 'w-2 bg-fg-3/50 group-hover:bg-fg-3'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const NODE_W = 240
const NODE_H = 124
const NODE_Y = 70
const NODES = [
  { x: 40, icon: ChipGlyph },
  { x: 360, icon: RadioGlyph },
  { x: 680, icon: CloudGlyph },
]
const RETURN_PATH = 'M800 194 V256 Q800 280 776 280 H184 Q160 280 160 256 V194'

function Diagram({ step, reduced }) {
  const loop = step === STEPS.length - 1
  return (
    <svg
      viewBox="0 0 960 316"
      className="w-full max-w-[960px]"
      role="img"
      aria-label="Fleetwright architecture: an STM32 edge device sends telemetry over UART to a Raspberry Pi gateway, which publishes over MQTT to a cloud observability stack. A remediator closes the loop by sending reboot commands back down to the device."
    >
      <defs>
        <linearGradient id="fw-lit" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2997ff" />
          <stop offset="1" stopColor="#a45cff" />
        </linearGradient>
        <linearGradient id="fw-loop" x1="1" x2="0">
          <stop offset="0" stopColor="#ff4f8b" />
          <stop offset="1" stopColor="#ff9f0a" />
        </linearGradient>
        <filter id="fw-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Links between nodes */}
      {[0, 1].map((i) => {
        const x1 = NODES[i].x + NODE_W
        const x2 = NODES[i + 1].x
        const lit = step > i
        const path = `M${x1} ${NODE_Y + NODE_H / 2} H${x2}`
        return (
          <g key={i}>
            <path d={path} stroke="var(--hairline)" strokeWidth="2" />
            <motion.path
              d={path}
              stroke="url(#fw-lit)"
              strokeWidth="2"
              initial={false}
              animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT_QUINT }}
            />
            <text
              x={(x1 + x2) / 2}
              y={NODE_Y + NODE_H / 2 - 16}
              textAnchor="middle"
              className={lit ? 'fill-fg' : 'fill-fg-3'}
              style={{ font: '600 13px var(--font-sans)', transition: 'fill .4s' }}
            >
              {i === 0 ? 'UART' : 'MQTT'}
            </text>
            {lit && !reduced && <Packets path={path} dur="1.6s" color="#6cb8ff" />}
          </g>
        )
      })}

      {/* Control loop, cloud back down to the device */}
      <path d={RETURN_PATH} fill="none" stroke="var(--hairline)" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
      <motion.path
        d={RETURN_PATH}
        fill="none"
        stroke="url(#fw-loop)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: loop ? 1 : 0, opacity: loop ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 1.1, ease: EASE_OUT_QUINT }}
      />
      <text
        x="480"
        y="306"
        textAnchor="middle"
        className={loop ? 'fill-fg' : 'fill-fg-3'}
        style={{ font: '600 13px var(--font-sans)', transition: 'fill .4s' }}
      >
        reboot · OTA downlink
      </text>
      {loop && !reduced && <Packets path={RETURN_PATH} dur="2.6s" color="#ff8a6b" />}

      {/* Nodes */}
      {NODES.map((n, i) => {
        const lit = i <= step
        const focus = i === step || loop
        const s = STEPS[i]
        const Icon = n.icon
        return (
          <g key={s.id}>
            <motion.rect
              x={n.x}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx="24"
              fill={i === 2 ? '#a45cff' : '#2997ff'}
              filter="url(#fw-glow)"
              initial={false}
              animate={{ opacity: focus ? 0.35 : 0 }}
              transition={{ duration: 0.6 }}
            />
            <rect x={n.x} y={NODE_Y} width={NODE_W} height={NODE_H} rx="24" fill="#161617" />
            <motion.rect
              x={n.x + 0.75}
              y={NODE_Y + 0.75}
              width={NODE_W - 1.5}
              height={NODE_H - 1.5}
              rx="23.5"
              fill="none"
              strokeWidth="1.5"
              initial={false}
              animate={{ stroke: lit ? 'rgba(41,151,255,0.9)' : 'rgba(255,255,255,0.14)' }}
              transition={{ duration: 0.5 }}
            />
            <motion.g initial={false} animate={{ opacity: lit ? 1 : 0.4 }} transition={{ duration: 0.5 }}>
              <Icon x={n.x + 24} y={NODE_Y + 24} />
              <text x={n.x + 24} y={NODE_Y + 82} className="fill-fg-2" style={{ font: '500 14px var(--font-sans)' }}>
                {s.node}
              </text>
              <text x={n.x + 24} y={NODE_Y + 104} className="fill-fg" style={{ font: '650 19px var(--font-sans)', letterSpacing: '-0.02em' }}>
                {s.chip}
              </text>
            </motion.g>
          </g>
        )
      })}
    </svg>
  )
}

function Packets({ path, dur, color }) {
  const half = `${parseFloat(dur) / 2}s`
  return (
    <>
      <circle r="4" fill={color}>
        <animateMotion dur={dur} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="3" fill={color} opacity="0.55">
        <animateMotion dur={dur} begin={half} repeatCount="indefinite" path={path} />
      </circle>
    </>
  )
}

function ChipGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#f5f5f7" strokeWidth="1.6" strokeLinecap="round">
      <rect x="5" y="5" width="18" height="18" rx="3.5" />
      <rect x="10" y="10" width="8" height="8" rx="1.5" />
      <path d="M10 1v4M14 1v4M18 1v4M10 23v4M14 23v4M18 23v4M1 10h4M1 14h4M1 18h4M23 10h4M23 14h4M23 18h4" />
    </g>
  )
}

function RadioGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#f5f5f7" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="14" cy="16" r="2.2" fill="#f5f5f7" stroke="none" />
      <path d="M9 11a7 7 0 0 0 0 10M19 11a7 7 0 0 1 0 10M5 7a12.5 12.5 0 0 0 0 18M23 7a12.5 12.5 0 0 1 0 18" />
    </g>
  )
}

function CloudGlyph({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#f5f5f7" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M8.5 22h12a5.5 5.5 0 0 0 .6-10.97A7.5 7.5 0 0 0 6.6 12.6 4.75 4.75 0 0 0 8.5 22Z" />
    </g>
  )
}

function StackedFlow() {
  return (
    <Reveal as="ol" group className="relative space-y-4 lg:hidden">
      {STEPS.map((s, i) => (
        <Reveal.Item as="li" key={s.id} className="tile p-7 sm:p-9">
          <p className="text-[0.875rem] font-medium text-fg-2">
            <span className={i === STEPS.length - 1 ? 'text-gradient-warm' : 'text-gradient-blue'}>
              {String(i + 1).padStart(2, '0')}
            </span>{' '}
            · {s.node} · {s.chip}
          </p>
          <h3 className="t-title mt-3 text-fg">{s.title}</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg-2">{s.body}</p>
        </Reveal.Item>
      ))}
    </Reveal>
  )
}
