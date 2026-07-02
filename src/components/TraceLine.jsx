import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

// The signature interaction: one continuous PCB-style trace that draws
// itself as you scroll, threading every [data-trace-node] on the page
// (hero prompt → section pads → experience timeline → footer ground).
//
// Geometry is measured once per layout change (fonts ready, resize) —
// never during scroll. Scroll → stroke-dash updates run entirely through
// Motion's rAF-batched MotionValues, so no React re-renders per frame.

const HEAD_LEN = 26 // px of glowing "signal head" at the leading edge

export default function TraceLine() {
  const [geo, setGeo] = useState(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const markers = document.querySelectorAll('[data-trace-node]')
      if (markers.length < 2) return

      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const pts = [...markers].map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY }
      })
      pts.sort((a, b) => a.y - b.y)

      const { d, total, nodeLengths } = buildPath(pts)
      setGeo({
        d,
        total,
        nodeLengths,
        pts,
        width: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
        stamp: `${document.documentElement.clientWidth}x${document.documentElement.scrollHeight}`,
      })
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    // Fonts shift layout; measure after they settle, then track any resize.
    document.fonts?.ready.then(schedule)
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [])

  if (!geo) return null
  return <TraceSvg key={geo.stamp} geo={geo} reduced={reduced} />
}

function TraceSvg({ geo, reduced }) {
  const { scrollY } = useScroll()

  // Map document scroll → drawn path length so the signal head tracks the
  // content passing the viewport's focal line (~45% down the screen).
  const focal = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 400
  const { inputs, outputs } = mapScrollToLength(geo, focal)

  const drawnRaw = useTransform(scrollY, inputs, outputs)
  const drawn = useSpring(drawnRaw, { stiffness: 120, damping: 28, mass: 0.4 })
  const baseOffset = useTransform(drawn, (v) => Math.max(geo.total - v, 0))
  const headOffset = useTransform(drawn, (v) => HEAD_LEN - v)
  const headOpacity = useTransform(drawn, (v) =>
    v <= 1 || v >= geo.total - 2 ? 0 : 1
  )

  const shared = {
    d: geo.d,
    fill: 'none',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
  }

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0"
      width={geo.width}
      height={geo.height}
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      aria-hidden="true"
    >
      {/* Unenergized track — always visible so the route reads as a PCB */}
      <path {...shared} stroke="var(--color-copper-dim)" strokeOpacity="0.45" strokeWidth="1.5" />

      {reduced ? (
        <path {...shared} stroke="var(--color-copper)" strokeOpacity="0.8" strokeWidth="1.5" />
      ) : (
        <>
          {/* Energized portion */}
          <motion.path
            {...shared}
            stroke="var(--color-copper)"
            strokeOpacity="0.85"
            strokeWidth="1.5"
            strokeDasharray={geo.total}
            style={{ strokeDashoffset: baseOffset }}
          />
          {/* Signal head — wide soft pass, then bright core */}
          <motion.path
            {...shared}
            stroke="var(--color-signal)"
            strokeOpacity="0.25"
            strokeWidth="7"
            strokeDasharray={`${HEAD_LEN} ${geo.total}`}
            style={{ strokeDashoffset: headOffset, opacity: headOpacity }}
          />
          <motion.path
            {...shared}
            stroke="var(--color-signal)"
            strokeWidth="2"
            strokeDasharray={`${HEAD_LEN} ${geo.total}`}
            style={{ strokeDashoffset: headOffset, opacity: headOpacity }}
          />
        </>
      )}
    </svg>
  )
}

// Orthogonal routing with 45° chamfered bends between consecutive nodes —
// vertical run first, then a diagonal into the next node's x position.
// Returns the path string, its exact length, and length at each node.
function buildPath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  let total = 0
  const nodeLengths = [0]

  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const dx = b.x - a.x
    const dy = b.y - a.y

    if (Math.abs(dx) < 1) {
      d += ` L ${b.x} ${b.y}`
      total += Math.abs(dy)
    } else if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical, then 45° diagonal landing exactly on b.
      const vy = b.y - Math.abs(dx)
      d += ` L ${a.x} ${vy} L ${b.x} ${b.y}`
      total += Math.abs(vy - a.y) + Math.abs(dx) * Math.SQRT2
    } else {
      // Wide jog: 45° diagonal, then horizontal.
      const mx = a.x + Math.sign(dx) * Math.abs(dy)
      d += ` L ${mx} ${b.y} L ${b.x} ${b.y}`
      total += Math.abs(dy) * Math.SQRT2 + Math.abs(b.x - mx)
    }
    nodeLengths.push(total)
  }

  return { d, total, nodeLengths }
}

// Piecewise-linear mapping: when node i sits at the viewport focal line,
// the drawn length equals that node's position along the path.
function mapScrollToLength(geo, focal) {
  const inputs = []
  const outputs = []
  let lastScroll = -Infinity

  geo.pts.forEach((p, i) => {
    const s = p.y - focal
    if (s > lastScroll) {
      inputs.push(s)
      outputs.push(geo.nodeLengths[i])
      lastScroll = s
    }
  })

  // Ensure sane behavior above the first node and below the last.
  if (inputs.length < 2) {
    return { inputs: [0, 1], outputs: [0, geo.total] }
  }
  return { inputs, outputs }
}
