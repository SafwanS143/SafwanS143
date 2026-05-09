import { motion } from 'motion/react'
import { MOTIFS } from './motifs/Motifs'
import { GITHUB_USERNAME } from '../data/projects'

export default function ProjectCard({ project, live, index }) {
  const Motif = MOTIFS[project.motif]
  const url = live?.html_url ?? `https://github.com/${GITHUB_USERNAME}/${project.repo}`
  const stars = live?.stars
  const updated = live?.updatedAt ? formatRelative(live.updatedAt) : null

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col border border-border bg-surface hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_24px_48px_-24px_rgba(34,211,238,0.25)] transition-[border,box-shadow] duration-300"
    >
      {Motif && <Motif />}

      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-fg-dim shrink-0 mt-1 group-hover:text-accent transition-colors">
            ↗
          </span>
        </div>

        <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-4">
          {live?.description || project.blurb}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider text-fg-muted border border-border px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-[11px] text-fg-dim">
          <span className="truncate">{project.repo}</span>
          <span className="flex items-center gap-3">
            {typeof stars === 'number' && stars > 0 && <span>★ {stars}</span>}
            {updated && <span>{updated}</span>}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

function formatRelative(iso) {
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const day = 1000 * 60 * 60 * 24
  if (diff < day) return 'today'
  if (diff < day * 2) return 'yesterday'
  if (diff < day * 30) return `${Math.floor(diff / day)}d ago`
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`
  return `${Math.floor(diff / (day * 365))}y ago`
}
