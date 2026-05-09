import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useGithubData } from '../hooks/useGithubData'

export default function Projects() {
  const { data } = useGithubData()

  return (
    <section id="projects" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="02" eyebrow="Projects" title="Things I've shipped.">
          A mix of production work, infra experiments, and student projects. Live data pulled from the
          GitHub API — descriptions and last-updated reflect the source of truth.
        </SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.repo} project={p} live={data[p.repo]} index={i} />
          ))}
        </div>

        <div className="mt-12 font-mono text-xs text-fg-dim flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <a
            href="https://github.com/SafwanS143"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-accent transition-colors"
          >
            see all repositories on github →
          </a>
        </div>
      </div>
    </section>
  )
}
