// Real numbers only, each traceable to the résumé. Every tile names its
// source so a reader can tell job impact from project results at a glance.
export const metrics = [
  {
    id: 'toil',
    source: 'Wolf Advanced Technology',
    value: 10,
    suffix: '+ hrs',
    label: 'Manual toil cut per board, across 15+ engineers.',
    gradient: 'text-gradient-warm',
  },
  {
    id: 'users',
    source: 'InI Labs',
    value: 150,
    suffix: 'K+',
    label: 'Users on a production app I maintained.',
    gradient: 'text-gradient-blue',
  },
  {
    id: 'logins',
    source: 'Fintech startup',
    value: 30,
    suffix: '%',
    label: 'Fewer login failures after hardening auth.',
    gradient: 'text-gradient',
  },
  {
    id: 'mttr',
    source: 'SRE-Monitor · project',
    prefix: '<',
    value: 30,
    suffix: 's',
    label: 'Automated recovery from container failures.',
    gradient: 'text-gradient-green',
  },
]
