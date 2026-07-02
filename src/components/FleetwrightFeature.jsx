import { motion, useReducedMotion } from 'motion/react'
import { fleetwright, GITHUB_USERNAME } from '../data/projects'
import { fadeRise, viewportOnce } from '../lib/motion'

// Flagship project — full-width feature with the hardware→cloud
// architecture rendered as a live diagram. Status is honest: this is an
// ambitious in-flight build, presented architecture-first.
export default function FleetwrightFeature() {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className="rounded-xl border border-border bg-surface shadow-card"
      variants={fadeRise}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-mono text-copper">Featured</span>
          <h3 className="text-2xl font-bold tracking-tight text-fg">Fleetwright</h3>
          <span className="label-mono flex items-center gap-2 rounded-sm border border-amber/40 bg-amber/10 px-2 py-1 text-[0.625rem] text-amber">
            <span aria-hidden="true" className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-amber" />
            {fleetwright.status}
          </span>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}/Fleetwright`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-9 items-center gap-1.5 rounded border border-border px-3 font-mono text-xs text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
        >
          View repo ↗
        </a>
      </div>

      <div className="px-6 py-6 md:px-8 md:py-8">
        <p className="text-lg font-medium text-fg">{fleetwright.tagline}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{fleetwright.description}</p>

        <ArchitectureDiagram reduced={reduced} />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="label-mono mb-3 text-muted">Run like production</p>
            <ul className="flex flex-wrap gap-2">
              {fleetwright.practices.map((p) => (
                <li
                  key={p}
                  className="rounded-sm border border-signal/25 bg-signal/5 px-2.5 py-1 font-mono text-xs text-signal"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono mb-3 text-muted">Stack</p>
            <ul className="flex flex-wrap gap-2">
              {fleetwright.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Edge → Gateway → Cloud, drawn as a PCB. Horizontal on md+, vertical on
// small screens. Packet dots ride the links unless reduced motion is set.
function ArchitectureDiagram({ reduced }) {
  return (
    <figure className="mt-8">
      <div className="rounded-lg border border-border bg-bg p-4 md:p-6">
        <HorizontalDiagram reduced={reduced} className="hidden md:block" />
        <VerticalDiagram reduced={reduced} className="md:hidden" />
      </div>
      <figcaption className="mt-3 font-mono text-xs text-dim">
        fig. 01 — telemetry path: bare-metal STM32 → Pi gateway (UART→MQTT) → cloud observability
      </figcaption>
    </figure>
  )
}

function StageBox({ x, y, w, h, layer, accent }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className="fill-surface stroke-border" strokeWidth="1" />
      <circle cx={x + w - 14} cy={y + 14} r="3" className={accent === 'copper' ? 'fill-copper' : 'fill-signal'} />
      <text x={x + 16} y={y + 26} className={`font-mono text-[0.625rem] font-semibold tracking-[0.14em] ${accent === 'copper' ? 'fill-copper' : 'fill-signal'}`}>
        {layer.label}
      </text>
      <text x={x + 16} y={y + 48} className="fill-fg font-sans text-[0.875rem] font-semibold">
        {layer.title}
      </text>
      <text x={x + 16} y={y + 68} className="fill-muted font-mono text-[0.625rem]">
        {layer.detail}
      </text>
    </g>
  )
}

function Link({ path, label, lx, ly, mid, reduced, dur }) {
  return (
    <g>
      <path d={path} className="stroke-copper" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <text x={lx} y={ly} textAnchor="middle" className="fill-copper font-mono text-[0.625rem] tracking-[0.14em]">
        {label}
      </text>
      {reduced ? (
        <circle cx={mid.x} cy={mid.y} r="3" className="fill-signal" />
      ) : (
        <>
          <circle r="3" className="fill-signal">
            <animateMotion dur={dur} repeatCount="indefinite" path={path} />
          </circle>
          <circle r="2" className="fill-signal" opacity="0.5">
            <animateMotion dur={dur} begin={`${parseFloat(dur) / 2}s`} repeatCount="indefinite" path={path} />
          </circle>
        </>
      )}
    </g>
  )
}

function HorizontalDiagram({ reduced, className }) {
  const [edge, gateway, cloud] = fleetwrightLayers()
  return (
    <svg
      viewBox="0 0 880 120"
      className={`w-full ${className}`}
      role="img"
      aria-label="Fleetwright architecture: STM32 F401RE edge device connects over UART to a Raspberry Pi gateway, which publishes MQTT telemetry into a cloud observability stack of Mosquitto, Prometheus, Grafana, and k3s."
    >
      <StageBox x={0} y={20} w={240} h={84} layer={edge} accent="copper" />
      <StageBox x={320} y={20} w={240} h={84} layer={gateway} accent="copper" />
      <StageBox x={640} y={20} w={240} h={84} layer={cloud} accent="signal" />
      <Link path="M 240 62 L 320 62" label="UART" lx={280} ly={52} mid={{ x: 280, y: 62 }} reduced={reduced} dur="2.4s" />
      <Link path="M 560 62 L 640 62" label="MQTT" lx={600} ly={52} mid={{ x: 600, y: 62 }} reduced={reduced} dur="2.4s" />
    </svg>
  )
}

function VerticalDiagram({ reduced, className }) {
  const [edge, gateway, cloud] = fleetwrightLayers()
  return (
    <svg
      viewBox="0 0 300 400"
      className={`w-full ${className}`}
      role="img"
      aria-label="Fleetwright architecture: STM32 F401RE edge device connects over UART to a Raspberry Pi gateway, which publishes MQTT telemetry into a cloud observability stack of Mosquitto, Prometheus, Grafana, and k3s."
    >
      <StageBox x={10} y={0} w={280} h={84} layer={edge} accent="copper" />
      <StageBox x={10} y={158} w={280} h={84} layer={gateway} accent="copper" />
      <StageBox x={10} y={316} w={280} h={84} layer={cloud} accent="signal" />
      <Link path="M 150 84 L 150 158" label="UART" lx={185} ly={125} mid={{ x: 150, y: 121 }} reduced={reduced} dur="2s" />
      <Link path="M 150 242 L 150 316" label="MQTT" lx={186} ly={283} mid={{ x: 150, y: 279 }} reduced={reduced} dur="2s" />
    </svg>
  )
}

function fleetwrightLayers() {
  return fleetwright.layers
}
