import { motion, useReducedMotion } from 'motion/react'
import { viewportOnce } from '../lib/motion'

// Decorative, token-driven illustrations, one per project. They inherit
// the section tone, so they render in light and dark alike.
export default function ProjectArt({ kind }) {
  const Art = ARTS[kind]
  return Art ? <Art /> : null
}

const labelStyle = { font: '600 11px var(--font-sans)', letterSpacing: '-0.01em' }

function Draw({ d, stroke, width = 2.5, duration = 1.8, delay = 0.2 }) {
  const reduced = useReducedMotion()
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduced ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: [0.45, 0, 0.2, 1] }}
    />
  )
}

function Heartbeat() {
  const beat = (x) => `H${x} L${x + 10} 60 L${x + 22} 124 L${x + 34} 30 L${x + 46} 106 L${x + 56} 92`
  const d = `M0 92 ${beat(60)} ${beat(190)} ${beat(320)} H460`
  return (
    <svg viewBox="0 0 460 180" className="h-full w-full max-w-[520px]" aria-hidden="true">
      <defs>
        <linearGradient id="hb" x1="0" x2="1">
          <stop offset="0" stopColor="#30d158" stopOpacity="0.2" />
          <stop offset="0.6" stopColor="#30d158" />
          <stop offset="1" stopColor="#1fb5a0" />
        </linearGradient>
      </defs>
      {[40, 92, 144].map((y) => (
        <path key={y} d={`M0 ${y} H460`} stroke="var(--hairline)" strokeDasharray="2 6" />
      ))}
      <Draw d={d} stroke="url(#hb)" width={3} duration={2.2} />
      <g transform="translate(336 0)">
        <rect width="112" height="28" rx="14" fill="rgba(48,209,88,0.14)" />
        <circle cx="16" cy="14" r="4" fill="#30d158" />
        <text x="28" y="18" fill="#30d158" style={labelStyle}>
          healthy · 30s
        </text>
      </g>
    </svg>
  )
}

function MapDots() {
  const cols = 22
  const rows = 9
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Soft blob mask, a loose, map-like silhouette.
      const nx = (c - cols / 2) / (cols / 2)
      const ny = (r - rows / 2) / (rows / 2)
      const inside = nx * nx * 0.9 + ny * ny * 1.3 + Math.sin(c * 0.9) * 0.12 < 1
      if (inside) dots.push({ x: 20 + c * 20, y: 18 + r * 19, key: `${r}-${c}` })
    }
  }
  const pins = [
    { x: 140, y: 113, c: '#2997ff' },
    { x: 260, y: 94, c: '#a45cff' },
    { x: 340, y: 132, c: '#ff4f8b' },
  ]
  return (
    <svg viewBox="0 0 460 190" className="h-full w-full max-w-[520px]" aria-hidden="true">
      {dots.map((d) => (
        <circle key={d.key} cx={d.x} cy={d.y} r="3" className="fill-fg-3" opacity="0.35" />
      ))}
      {pins.map((p) => (
        <g key={p.x}>
          <circle cx={p.x} cy={p.y} r="16" fill={p.c} opacity="0.16" />
          <circle cx={p.x} cy={p.y} r="6" fill={p.c} />
        </g>
      ))}
    </svg>
  )
}

function Display() {
  const rows = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
  return (
    <svg viewBox="0 0 300 170" className="h-full w-full max-w-[330px]" aria-hidden="true">
      <rect x="20" y="8" width="260" height="146" rx="14" fill="#0b0b0c" />
      <rect x="20.5" y="8.5" width="259" height="145" rx="13.5" fill="none" stroke="var(--hairline)" />
      <path d="M130 154 h40 l6 16 h-52z" className="fill-fg-3" opacity="0.3" />
      <g transform="translate(46 30)">
        <circle cx="12" cy="12" r="11" fill="#ff9f0a" />
        <circle cx="17" cy="8" r="10" fill="#0b0b0c" />
      </g>
      {rows.map((r, i) => {
        const next = i === 2
        const y = 34 + i * 23
        return (
          <g key={r}>
            {next && <rect x="96" y={y - 14} width="164" height="21" rx="7" fill="rgba(41,151,255,0.2)" />}
            <text x="106" y={y} fill={next ? '#6cb8ff' : '#a1a1a6'} style={labelStyle}>
              {r}
            </text>
            <rect x="196" y={y - 8} width="52" height="6" rx="3" fill={next ? '#2997ff' : '#3a3a3c'} />
          </g>
        )
      })}
    </svg>
  )
}

function Ledger() {
  const reduced = useReducedMotion()
  const rows = [
    { label: 'Municipal', w: 0.72, c: '#2997ff' },
    { label: 'Education', w: 0.4, c: '#a45cff' },
  ]
  return (
    <svg viewBox="0 0 300 170" className="h-full w-full max-w-[330px]" aria-hidden="true">
      <rect x="30" y="14" width="240" height="160" rx="18" className="fill-canvas" />
      <rect x="30.5" y="14.5" width="239" height="159" rx="17.5" fill="none" stroke="var(--hairline)" />
      {rows.map((r, i) => (
        <g key={r.label} transform={`translate(52 ${48 + i * 38})`}>
          <text y="0" className="fill-fg-2" style={labelStyle}>
            {r.label}
          </text>
          <rect y="9" width="196" height="8" rx="4" fill="var(--fill)" />
          <motion.rect
            y="9"
            width={196 * r.w}
            height="8"
            rx="4"
            fill={r.c}
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            style={{ originX: 0 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
      ))}
      <path d="M52 132 H248" stroke="var(--hairline)" />
      <text x="52" y="156" className="fill-fg" style={{ ...labelStyle, font: '700 13px var(--font-sans)' }}>
        Total
      </text>
      <rect x="176" y="146" width="72" height="12" rx="6" fill="#30d158" opacity="0.85" />
    </svg>
  )
}

function Arc() {
  const reduced = useReducedMotion()
  const d = 'M34 150 Q170 -20 300 132'
  return (
    <svg viewBox="0 0 340 170" className="h-full w-full max-w-[360px]" aria-hidden="true">
      <path d="M10 156 H330" stroke="var(--hairline)" strokeWidth="2" />
      <path d={d} fill="none" className="stroke-fg-3" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" opacity="0.7" />
      <path d="M34 150 L66 110" stroke="#ff9f0a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 106 L66 110 L65 119" fill="none" stroke="#ff9f0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(300 140)">
        <circle r="16" fill="rgba(255,79,139,0.14)" />
        <circle r="9" fill="none" stroke="#ff4f8b" strokeWidth="2" />
        <circle r="3" fill="#ff4f8b" />
      </g>
      {reduced ? (
        <circle cx="170" cy="65" r="7" fill="#2997ff" />
      ) : (
        <circle r="7" fill="#2997ff">
          <animateMotion dur="2.8s" repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.3 0 0.7 1" />
        </circle>
      )}
    </svg>
  )
}

const ARTS = { heartbeat: Heartbeat, map: MapDots, display: Display, ledger: Ledger, arc: Arc }
