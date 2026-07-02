// Exactly six projects, curated static data — no runtime API calls, no
// layout shift, no rate limits. Blurbs are grounded in each repo's README.

export const GITHUB_USERNAME = 'SafwanS143'

// Flagship — rendered as the full-width feature with the architecture diagram.
export const fleetwright = {
  repo: 'Fleetwright',
  name: 'Fleetwright',
  status: 'IN ACTIVE DEVELOPMENT',
  tagline: 'Fleet reliability, from bare metal to cloud.',
  description:
    'An end-to-end fleet reliability platform spanning the hardware/software boundary: bare-metal STM32 telemetry flows through a Raspberry Pi MQTT gateway into a cloud observability stack — run like a production service, with SLOs, error budgets, and an incident lifecycle. The gateway architecture intentionally mirrors real vehicle design, where constrained ECUs sit behind telematics control units.',
  practices: [
    'SLOs + error budgets',
    'Isolation Forest anomaly detection',
    'Symptom-based alerting',
    'Incident lifecycle · runbooks · postmortems',
    'OTA self-healing',
    'Docker Compose → k3s / Helm / ArgoCD GitOps',
  ],
  tech: ['C', 'Python', 'MQTT', 'Prometheus', 'Grafana', 'k3s'],
  layers: [
    {
      id: 'edge',
      label: 'EDGE',
      title: 'STM32 F401RE',
      detail: 'bare-metal C · MPU-6050 + BME280 over I²C',
      link: 'UART',
    },
    {
      id: 'gateway',
      label: 'GATEWAY',
      title: 'Raspberry Pi',
      detail: 'protocol translation + buffering · Python',
      link: 'MQTT',
    },
    {
      id: 'cloud',
      label: 'CLOUD',
      title: 'Observability stack',
      detail: 'Mosquitto · Prometheus · Grafana · k3s',
      link: null,
    },
  ],
}

export const projects = [
  {
    repo: 'SRE-Monitor',
    name: 'SRE-Monitor',
    blurb:
      'Self-healing container monitoring that detects, diagnoses, and recovers from failures unattended — ~30s mean recovery — while per-metric Isolation Forest models flag degradation before health checks trip.',
    tags: ['FastAPI', 'Prometheus', 'Isolation Forest', 'Terraform', 'GitHub Actions'],
    accent: 'signal',
  },
  {
    repo: 'Generational-Political-Turnout',
    name: 'Generational Political Turnout',
    blurb:
      'Full-stack data platform quantifying generational voter-turnout gaps in Canadian federal elections — a PostGIS-backed REST API with Leaflet geospatial dashboards, embedded on the GLOCAL Foundation site.',
    tags: ['Next.js', 'FastAPI', 'PostGIS', 'Leaflet', 'Docker'],
    accent: 'signal',
  },
  {
    repo: 'alfalahkitchener',
    name: 'Al-Falah Prayer Display',
    blurb:
      "Real-time Flutter prayer-times display that ran as a mosque's sole TV display for two years — 700+ daily worshippers, fully offline schedule, zero-touch operation through network outages.",
    tags: ['Flutter', 'Dart', 'Orange Pi', '24/7 ops'],
    accent: 'copper',
  },
  {
    repo: 'Property-Tax-Calculator',
    name: 'Property Tax Calculator',
    blurb:
      'Full-stack property-tax web app with live CRUD over municipality-linked records and dynamic municipal + education tax calculation.',
    tags: ['Flask', 'SQLite', 'React', 'TypeScript'],
    accent: 'signal',
  },
  {
    repo: 'Projectile-Motion-Simulator',
    name: 'Projectile Motion Simulator',
    blurb:
      'Interactive 2D projectile-motion simulator with two modes — verify a shot, or analytically solve the launch speed that hits the target — with a live HUD of velocity components and flight time.',
    tags: ['Processing', 'G4P', 'Physics', 'Real-time GUI'],
    accent: 'copper',
  },
]
