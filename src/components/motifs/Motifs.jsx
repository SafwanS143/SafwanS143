// Auto-generated tech motifs for each pinned project.
// All SVG, monochrome with cyan accents, no infinite animation.

const MotifFrame = ({ children, label }) => (
  <div className="relative h-40 lg:h-44 overflow-hidden bg-surface-2 border-b border-border">
    <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
    <div className="relative h-full flex items-center justify-center">{children}</div>
    <div className="absolute top-2 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim/70">
      {label}
    </div>
  </div>
)

// 1) SRE-Monitor — terminal log lines with status indicators
export function SREMotif() {
  return (
    <MotifFrame label="// monitor.log">
      <pre className="font-mono text-[11px] leading-5 text-fg-muted px-6 w-full max-w-md">
        <Line dim>$ sre-monitor --watch</Line>
        <Line>
          <Status ok /> svc <span className="text-fg">api-gateway</span>{' '}
          <span className="text-fg-dim">200ms p99</span>
        </Line>
        <Line>
          <Status warn /> svc <span className="text-fg">worker-3</span>{' '}
          <span className="text-fg-dim">degraded ↑</span>
        </Line>
        <Line>
          <Status fix /> recover <span className="text-fg">worker-3</span>{' '}
          <span className="text-accent">in 28s</span>
        </Line>
      </pre>
    </MotifFrame>
  )
}

// 2) Generational-Political-Turnout — geo heatmap dots
export function GeoMotif() {
  const cells = []
  const cols = 18
  const rows = 7
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Pseudorandom intensity stable by coords
      const seed = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
      const t = Math.abs(seed)
      const isAccent = t > 0.78
      const opacity = 0.15 + t * 0.7
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * 14 + 12}
          y={y * 14 + 18}
          width={9}
          height={9}
          fill={isAccent ? '#22d3ee' : '#e7eaf3'}
          opacity={isAccent ? 0.9 : opacity}
        />,
      )
    }
  }
  return (
    <MotifFrame label="// turnout.density">
      <svg viewBox="0 0 280 130" className="w-full h-full max-w-md">
        {cells}
      </svg>
    </MotifFrame>
  )
}

// 3) alfalahkitchener — analog prayer-times clock
export function PrayerMotif() {
  // 5 prayer markers at fixed angles
  const markers = [-110, -50, 10, 70, 130] // degrees
  return (
    <MotifFrame label="// salat.times">
      <svg viewBox="0 0 200 200" className="h-32">
        <circle cx="100" cy="100" r="64" fill="none" stroke="#1f2740" strokeWidth="1" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="#2a3556" strokeWidth="1" strokeDasharray="2 4" />
        {markers.map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = 100 + Math.cos(rad) * 64
          const y = 100 + Math.sin(rad) * 64
          return <circle key={i} cx={x} cy={y} r="3" fill={i === 2 ? '#22d3ee' : '#8b93ad'} />
        })}
        {/* Active hand pointing at current prayer */}
        <line
          x1="100"
          y1="100"
          x2={100 + Math.cos((10 * Math.PI) / 180) * 50}
          y2={100 + Math.sin((10 * Math.PI) / 180) * 50}
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="3" fill="#22d3ee" />
        <text
          x="100"
          y="178"
          textAnchor="middle"
          className="font-mono"
          fontSize="9"
          fill="#5b6480"
          letterSpacing="2"
        >
          ASR · 15:42
        </text>
      </svg>
    </MotifFrame>
  )
}

// 4) ScientificCalculator — keypad
export function CalcMotif() {
  const keys = [
    'sin', 'cos', 'tan', '√',
    '7',   '8',   '9',   '÷',
    '4',   '5',   '6',   '×',
    '1',   '2',   '3',   '-',
  ]
  return (
    <MotifFrame label="// scientific.kbd">
      <div className="grid grid-cols-4 gap-1.5 px-6 w-full max-w-[260px]">
        {keys.map((k, i) => {
          const isOp = ['÷', '×', '-'].includes(k)
          const isFn = ['sin', 'cos', 'tan', '√'].includes(k)
          return (
            <div
              key={i}
              className={`h-6 flex items-center justify-center font-mono text-[10px] border ${
                isOp
                  ? 'border-accent/50 text-accent'
                  : isFn
                    ? 'border-border text-fg-muted'
                    : 'border-border text-fg'
              }`}
            >
              {k}
            </div>
          )
        })}
      </div>
    </MotifFrame>
  )
}

// 5) Property-Tax-Calculator — table rows with $
export function TaxMotif() {
  const rows = [
    { id: '#1042', addr: '12 Beverly St', amt: '$4,820' },
    { id: '#1043', addr: '88 Erb Ave',    amt: '$5,612', accent: true },
    { id: '#1044', addr: '24 King N',     amt: '$3,140' },
    { id: '#1045', addr: '7 Albert Pl',   amt: '$6,275' },
  ]
  return (
    <MotifFrame label="// records.tbl">
      <div className="px-6 w-full max-w-md font-mono text-[11px]">
        <div className="grid grid-cols-[60px_1fr_72px] gap-3 pb-1.5 border-b border-border text-fg-dim text-[9px] uppercase tracking-wider">
          <span>id</span><span>address</span><span className="text-right">tax</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.id}
            className={`grid grid-cols-[60px_1fr_72px] gap-3 py-1 border-b border-border/40 ${
              r.accent ? 'text-accent' : 'text-fg-muted'
            }`}
          >
            <span className="text-fg-dim">{r.id}</span>
            <span className="truncate">{r.addr}</span>
            <span className="text-right">{r.amt}</span>
          </div>
        ))}
      </div>
    </MotifFrame>
  )
}

// 6) Projectile-Motion-Simulator — parabolic trajectory
export function ProjectileMotif() {
  // Generate parabola points
  const points = []
  for (let t = 0; t <= 1; t += 0.05) {
    const x = 30 + t * 240
    const y = 110 - Math.sin(t * Math.PI) * 70
    points.push([x, y])
  }
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
  return (
    <MotifFrame label="// trajectory.sim">
      <svg viewBox="0 0 300 130" className="w-full h-full max-w-md">
        {/* ground */}
        <line x1="20" y1="115" x2="290" y2="115" stroke="#2a3556" strokeWidth="1" strokeDasharray="3 3" />
        {/* path */}
        <path d={path} stroke="#22d3ee" strokeWidth="1.5" fill="none" opacity="0.9" />
        {/* sample dots along path */}
        {points.filter((_, i) => i % 4 === 0).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#22d3ee" opacity={0.4 + i * 0.1} />
        ))}
        {/* launch + landing */}
        <circle cx={points[0][0]} cy={points[0][1]} r="3" fill="#e7eaf3" />
        <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="3" fill="#e7eaf3" />
        <text x="34" y="108" fontSize="8" fill="#5b6480" className="font-mono">v₀=24m/s</text>
        <text x="240" y="108" fontSize="8" fill="#5b6480" className="font-mono">θ=45°</text>
      </svg>
    </MotifFrame>
  )
}

// helpers
function Line({ children, dim = false }) {
  return <div className={dim ? 'text-fg-dim' : 'text-fg-muted'}>{children}</div>
}
function Status({ ok, warn, fix }) {
  if (ok) return <span className="text-accent">[✓]</span>
  if (warn) return <span className="text-yellow-300">[!]</span>
  if (fix) return <span className="text-accent">[↻]</span>
  return <span>[ ]</span>
}

export const MOTIFS = {
  sre: SREMotif,
  geo: GeoMotif,
  prayer: PrayerMotif,
  calc: CalcMotif,
  tax: TaxMotif,
  projectile: ProjectileMotif,
}
