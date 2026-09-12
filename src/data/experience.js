// Work history only, sourced from public/resume.pdf. Reverse chronological;
// `current` marks the role rendered as the featured "Now" card.

export const experience = [
  {
    id: 'magnet',
    company: 'Magnet Forensics',
    title: 'Site Reliability Engineering Co-op',
    dates: 'Sep 2026 – Present',
    location: 'Waterloo, ON',
    current: true,
    points: [
      'On the site reliability engineering team behind the digital-forensics platforms that public-safety agencies and enterprises rely on worldwide, keeping production healthy, observable, and fast to recover.',
    ],
    tech: ['SRE', 'Observability', 'Incident response', 'Platform'],
  },
  {
    id: 'wolf',
    company: 'Wolf Advanced Technology',
    title: 'Software Engineer',
    dates: 'Jan – Apr 2026',
    location: 'Aurora, ON',
    points: [
      'Built a Notifications-as-a-Service platform in ASP.NET Core (.NET 10) with async Email/Teams routing, fault-tolerant delivery (3 retries, exponential backoff), and full unit + integration coverage.',
      'Automated PCB engineering workflows with PowerShell/TCL/SKILL pipelines, eliminating 10+ hours of manual toil per board across 15+ engineers; containerized a PCB viewer backed by 1,100+ unit tests.',
    ],
    tech: ['ASP.NET Core', 'Docker', 'Microsoft Graph', 'PowerShell / TCL'],
  },
  {
    id: 'glocal',
    company: 'GLOCAL Foundation of Canada',
    title: 'Data Analyst',
    dates: 'May – Aug 2025',
    location: 'Waterloo, ON',
    points: [
      'Deployed and operated a full-stack election data platform end-to-end (Docker, React/Leaflet, FastAPI, Supabase/PostgreSQL) serving 2.4k+ records.',
      'Shipped a Jenkins CI/CD pipeline with pytest coverage reporting and SonarQube quality gates; built the Python ETL and cleaning pipeline.',
    ],
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins'],
  },
  {
    id: 'fintech',
    company: 'Fintech Startup',
    title: 'Frontend Developer',
    dates: 'Jan – Dec 2025',
    location: 'Waterloo, ON',
    nda: true,
    points: [
      'Applied TDD to 70% test coverage, cutting regression bugs by 40%; integrated Firebase Auth and GCP backend services into the Flutter client.',
      'Hardened the auth flow and 20+ shared components, cutting login failures by 30% and stabilizing iOS/Android release consistency.',
    ],
    tech: ['Flutter', 'Firebase', 'GCP', 'TDD'],
  },
  {
    id: 'inilabs',
    company: 'InI Labs Inc.',
    title: 'Full Stack Developer',
    dates: 'Jul – Aug 2023',
    location: 'Waterloo, ON',
    points: [
      'Maintained a scientific calculator inside a 150,000+ user production app; resolved 30+ critical bugs and automated backend regression testing.',
    ],
    tech: ['Flutter', 'Regression Testing'],
  },
]
