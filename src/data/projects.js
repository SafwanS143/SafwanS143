// Curated static data: no runtime API calls, no layout shift, no rate
// limits. Every claim is grounded in the repo's README/docs or the résumé.

export const GITHUB_USERNAME = 'SafwanS143'
export const repoUrl = (repo) => `https://github.com/${GITHUB_USERNAME}/${repo}`

// Flagship, rendered as its own product page.
export const fleetwright = {
  repo: 'Fleetwright',
  tagline: 'Fleet reliability, from bare metal to cloud.',

  // Scroll story: the telemetry path, then the loop back down.
  flow: [
    {
      id: 'edge',
      node: 'Edge',
      chip: 'STM32 F401RE',
      title: 'It starts on bare metal.',
      body: 'An STM32 Nucleo with no network stack samples an MPU-6500 IMU and a BME280 over I²C, framing every reading as newline-delimited JSON with a sequence number.',
    },
    {
      id: 'gateway',
      node: 'Gateway',
      chip: 'Raspberry Pi',
      title: 'A gateway owns the network.',
      body: "A Raspberry Pi reads UART, buffers in a bounded store-and-forward ring, and publishes over MQTT. It's the same ECU → telematics-unit split a real vehicle uses.",
    },
    {
      id: 'cloud',
      node: 'Cloud',
      chip: 'Prometheus · Grafana',
      title: 'The cloud runs it like production.',
      body: 'Mosquitto feeds a bridge into Prometheus, where recording rules enforce SLOs. Alertmanager routes, an incident store tracks MTTR, and Grafana shows all of it.',
    },
    {
      id: 'loop',
      node: 'Loop',
      chip: 'Remediator',
      title: 'Then it heals itself.',
      body: 'Every 15 seconds a remediator observes, diffs, and acts, sending a reboot down the MQTT downlink with a cooldown, a three-attempt budget, and escalation to a human.',
    },
  ],

  slos: [
    { name: 'Telemetry freshness', target: '≥ 99%', detail: 'fresh within 10s, per device' },
    { name: 'Fleet availability', target: '≥ 95%', detail: 'of devices fresh at once' },
    { name: 'Ingest error rate', target: '< 0.1%', detail: 'malformed frames, 5m window' },
  ],

  detectors: [
    { name: 'z-score / MAD', fp: 0.0, chosen: true },
    { name: 'Isolation Forest', fp: 0.056 },
  ],

  specs: [
    { label: 'Edge', value: ['STM32 Nucleo F401RE (Arm Cortex-M4), bare-metal C', 'MPU-6500 6-axis IMU · BME280 over I²C'] },
    { label: 'Transport', value: ['UART @ 115200 → Raspberry Pi gateway', 'MQTT over TCP · QoS, retained status, LWT'] },
    { label: 'Observability', value: ['Prometheus recording rules · 3 SLOs · 8 alert rules', 'Alertmanager · Grafana · Slack paging · 6 runbooks'] },
    { label: 'Detection', value: ['z-score / MAD baseline on the paging path', 'Isolation Forest, evaluated and benched'] },
    { label: 'Platform', value: ['Docker Compose → k3s with Helm', 'Argo CD GitOps · Terraform-provisioned'] },
    { label: 'Delivery', value: ['GitHub Actions: build → test → publish', 'Manual approval gate · promotion commit'] },
  ],
}

export const projects = [
  {
    repo: 'SRE-Monitor',
    name: 'SRE-Monitor',
    kicker: 'Self-healing infrastructure',
    blurb:
      'A five-container SRE stack on AWS that detects, diagnoses, and recovers from failures unattended in under 30 seconds, while per-metric Isolation Forest models flag degradation before an SLO breaches.',
    tags: ['FastAPI', 'Prometheus', 'Terraform', 'AWS', 'GitHub Actions'],
    art: 'heartbeat',
    size: 'lg',
  },
  {
    repo: 'Generational-Political-Turnout',
    name: 'Generational Turnout',
    kicker: 'Geospatial data platform',
    blurb:
      'Quantifies generational voter-turnout gaps in Canadian federal elections with a PostGIS-backed REST API and Leaflet dashboards, embedded on the GLOCAL Foundation site.',
    tags: ['Next.js', 'FastAPI', 'PostGIS', 'Leaflet'],
    art: 'map',
    size: 'lg',
  },
  {
    repo: 'alfalahkitchener',
    name: 'Al-Falah Display',
    kicker: '24/7 production',
    blurb:
      "A mosque's sole prayer-times screen for two years: 700+ daily worshippers, a fully offline schedule, and zero-touch operation through every outage.",
    tags: ['Flutter', 'Orange Pi'],
    art: 'display',
    size: 'sm',
  },
  {
    repo: 'Property-Tax-Calculator',
    name: 'Property Tax Calculator',
    kicker: 'Full-stack web app',
    blurb:
      'Live CRUD over municipality-linked records with dynamic municipal and education tax calculation, plus 25% faster loads from memoization and batching.',
    tags: ['Flask', 'SQLite', 'React'],
    art: 'ledger',
    size: 'sm',
  },
  {
    repo: 'Projectile-Motion-Simulator',
    name: 'Projectile Simulator',
    kicker: 'Real-time physics',
    blurb:
      'Verify a shot, or analytically solve the launch speed that hits the target, with a live HUD of velocity components and flight time.',
    tags: ['Processing', 'Physics'],
    art: 'arc',
    size: 'sm',
  },
]
