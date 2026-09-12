import Reveal from './Reveal'
import FleetwrightFlow from './FleetwrightFlow'
import FleetwrightBento from './FleetwrightBento'
import { CheckCircle, Chevron, GitHubIcon } from './icons'
import { fleetwright, repoUrl } from '../data/projects'

// The flagship, presented as its own product page: name, story, features,
// tech specs.
export default function Fleetwright() {
  const repo = repoUrl(fleetwright.repo)

  return (
    <section id="fleetwright" aria-labelledby="fw-title" className="tone-dark scroll-mt-[52px] pb-28 pt-28 md:pb-40 md:pt-40">
      <div className="mx-auto max-w-[1080px] px-6">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg-2">
            <CheckCircle size={16} className="text-ok" />
            Featured project · Complete
          </p>
          <h2
            id="fw-title"
            className="mt-5 bg-linear-to-b from-white from-35% to-[#8e8e93] bg-clip-text pb-2 text-[clamp(3.75rem,13vw,9.5rem)] font-bold leading-[0.95] tracking-[-0.055em] text-transparent"
          >
            Fleetwright
          </h2>
          <p className="mx-auto mt-4 max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-fg">
            {fleetwright.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href={repo} target="_blank" rel="noreferrer" className="btn-pill">
              <GitHubIcon size={17} />
              View on GitHub
            </a>
            <a href={`${repo}/blob/main/docs/architecture.md`} target="_blank" rel="noreferrer" className="link-chevron text-[1.0625rem]">
              Read the architecture
              <Chevron size={11} />
            </a>
          </div>
        </Reveal>

        <Reveal as="p" className="t-lead mx-auto mt-20 max-w-[44rem] text-center text-fg-2 md:mt-28">
          Fleetwright instruments a fleet of edge devices, streams their
          telemetry through a connectivity gateway into a cloud observability
          stack, and <span className="text-fg">runs the whole thing like a production service</span>:
          SLOs, anomaly detection, incident tracking, and automated self-healing.
          The point isn't any one component. It's{' '}
          <span className="text-fg">reliability across the hardware/software boundary.</span>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-[1080px] px-6 md:mt-24 lg:mt-10 lg:max-w-none lg:px-0">
        <FleetwrightFlow />
      </div>

      <div className="mx-auto max-w-[1080px] px-6">
        <FleetwrightBento />
        <Specs repo={repo} />
      </div>
    </section>
  )
}

function Specs({ repo }) {
  return (
    <div className="mt-28 md:mt-40">
      <Reveal as="h3" className="t-headline text-fg">
        Tech specs.
      </Reveal>
      <dl className="mt-10 md:mt-14">
        {fleetwright.specs.map((row) => (
          <Reveal
            key={row.label}
            className="grid gap-2 border-t border-hairline py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          >
            <dt className="text-[1.3125rem] font-semibold tracking-[-0.025em] text-fg">{row.label}</dt>
            <dd className="space-y-1 text-[1.0625rem] leading-relaxed text-fg-2">
              {row.value.map((v) => (
                <p key={v}>{v}</p>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
      <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-10">
        <a href={repo} target="_blank" rel="noreferrer" className="btn-pill">
          Explore the repo
        </a>
        <a href={`${repo}/blob/main/docs/detector-evaluation.md`} target="_blank" rel="noreferrer" className="link-chevron">
          Read the detector evaluation
          <Chevron size={11} />
        </a>
        <a href={`${repo}/tree/main/docs/runbooks`} target="_blank" rel="noreferrer" className="link-chevron">
          Browse the runbooks
          <Chevron size={11} />
        </a>
      </Reveal>
    </div>
  )
}
