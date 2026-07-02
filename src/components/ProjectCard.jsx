import { motion, useReducedMotion } from 'motion/react'
import { GITHUB_USERNAME } from '../data/projects'
import { fadeRise } from '../lib/motion'

export default function ProjectCard({ project, index }) {
  const reduced = useReducedMotion()
  const accent = project.accent === 'copper' ? 'group-hover:border-copper/50' : 'group-hover:border-signal/50'

  return (
    <motion.article
      variants={fadeRise}
      className={`group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-card transition-[border-color,transform] duration-200 ${accent} ${
        reduced ? '' : 'hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="label-mono text-dim">{String(index + 2).padStart(2, '0')}</p>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-dim transition-colors duration-200 group-hover:text-fg"
        >
          <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h4 className="mt-3 text-lg font-semibold text-fg">
        <a
          href={`https://github.com/${GITHUB_USERNAME}/${project.repo}`}
          target="_blank"
          rel="noreferrer"
          className="after:absolute after:inset-0 after:content-['']"
        >
          {project.name}
        </a>
      </h4>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
