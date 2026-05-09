// The 6 pinned repos from github.com/SafwanS143.
// Live data (description, stars, last update) is hydrated from the GitHub
// public API at runtime in `useGithubData`. Everything below is the static
// scaffold + curated tech-stack tags + which motif to render.

export const GITHUB_USERNAME = 'SafwanS143'

export const projects = [
  {
    repo: 'SRE-Monitor',
    name: 'SRE-Monitor',
    blurb:
      'Production-style SRE monitor that detects, diagnoses, and recovers from container failures unattended. ~30s mean recovery, ML-flagged degradation before health checks trip.',
    tags: ['Python', 'Docker', 'Prometheus', 'ML', 'SRE'],
    motif: 'sre',
    accent: 'cyan',
  },
  {
    repo: 'Generational-Political-Turnout',
    name: 'Generational Political Turnout',
    blurb:
      'Interactive data platform analyzing generational political turnout trends using real election datasets — geospatial visualizations and full-stack deployment.',
    tags: ['Data Viz', 'Geospatial', 'Full-stack', 'HTML/JS'],
    motif: 'geo',
    accent: 'cyan',
  },
  {
    repo: 'alfalahkitchener',
    name: 'Al-Falah Kitchener',
    blurb:
      'Real-time prayer times display app built in Flutter, deployed via GitHub Pages and running on a mosque TV in Kitchener from 2022–2024.',
    tags: ['Flutter', 'Dart', 'GitHub Pages', 'Production'],
    motif: 'prayer',
    accent: 'cyan',
  },
  {
    repo: 'ScientificCalculator',
    name: 'Scientific Calculator',
    blurb:
      'Feature-rich scientific calculator built in Flutter for the iStudy app — shipped on Google Play and the App Store with 150K+ downloads.',
    tags: ['Flutter', 'Mobile', 'iOS', 'Android', '150K+ DLs'],
    motif: 'calc',
    accent: 'cyan',
  },
  {
    repo: 'Property-Tax-Calculator',
    name: 'Property Tax Calculator',
    blurb:
      'Full-stack web app to view, add, edit, and delete property records while dynamically calculating annual property tax. Flask + SQLite backend, React + TS frontend.',
    tags: ['Python', 'Flask', 'SQLite', 'React', 'TypeScript'],
    motif: 'tax',
    accent: 'cyan',
  },
  {
    repo: 'Projectile-Motion-Simulator',
    name: 'Projectile Motion Simulator',
    blurb:
      'Fully interactive 2D projectile motion simulator with a real-time GUI, two distinct simulation modes, and live kinematic readouts.',
    tags: ['Processing', 'Physics', 'GUI', 'Real-time'],
    motif: 'projectile',
    accent: 'cyan',
  },
]
