import Reveal from './Reveal'
import ProjectArt from './ProjectArt'
import { Chevron } from './icons'
import { projects, repoUrl } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="tone-alt scroll-mt-[52px] py-28 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6">
        <Reveal>
          <h2 id="projects-title" className="t-headline text-fg">
            More projects.
          </h2>
          <p className="t-lead mt-5 max-w-[34rem] text-fg-2">
            Most of them have real users or real uptime behind them.
          </p>
        </Reveal>

        <Reveal group className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {projects.map((p, i) => (
            <Card key={p.repo} project={p} wideOnTablet={i === projects.length - 1} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Card({ project, wideOnTablet }) {
  const lg = project.size === 'lg'
  return (
    <Reveal.Item
      as="article"
      className={`tile group flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.28,0.11,0.32,1)] hover:scale-[1.012] ${
        lg ? 'lg:col-span-3' : 'lg:col-span-2'
      } ${wideOnTablet ? 'md:col-span-2' : ''}`}
    >
      <div className="p-8 pb-0 md:p-9 md:pb-0">
        <p className="text-[0.875rem] font-semibold text-fg-2">{project.kicker}</p>
        <h3 className={`mt-2 font-semibold tracking-[-0.03em] text-fg ${lg ? 'text-[1.875rem] leading-[1.1]' : 'text-[1.5rem] leading-tight'}`}>
          <a
            href={repoUrl(project.repo)}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:rounded-[28px] after:content-['']"
          >
            {project.name}
          </a>
        </h3>
        <p className="mt-3 text-[1rem] leading-relaxed text-fg-2">{project.blurb}</p>
        <p className="mt-4 text-[0.8125rem] text-fg-2">
          <span className="sr-only">Built with: </span>
          {project.tags.join('  ·  ')}
        </p>
        <span className="link-chevron mt-1 text-[1rem] group-hover:underline" aria-hidden="true">
          View on GitHub
          <Chevron size={10} />
        </span>
      </div>
      <div className={`relative mt-auto flex items-end justify-center overflow-hidden px-6 ${lg ? 'h-60' : 'h-48'}`}>
        <ProjectArt kind={project.art} />
      </div>
    </Reveal.Item>
  )
}
