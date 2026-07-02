// Real numbers only — each one traceable to the resume or a repo README.
export const metrics = [
  {
    id: 'mttr',
    prefix: '~',
    value: 30,
    suffix: 's',
    label: 'mean time to recovery',
    context: 'SRE-Monitor self-healing, zero human intervention',
  },
  {
    id: 'uptime',
    value: 2,
    suffix: ' yrs',
    label: 'zero-touch uptime',
    context: 'Al-Falah display — 24/7, offline-first, solo-maintained',
  },
  {
    id: 'tests',
    value: 1100,
    suffix: '+',
    label: 'unit tests shipped',
    context: 'PCB viewer parsing logic @ Wolf Advanced Technology',
  },
  {
    id: 'users',
    value: 700,
    suffix: '+',
    label: 'daily users served',
    context: 'prayer-times display, peak traffic every Friday',
  },
]
