import { motion, useReducedMotion } from 'motion/react'
import { EASE_OUT_EXPO } from '../lib/motion'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
})

export default function Hero() {
  const reduced = useReducedMotion()
  const anim = (delay) => (reduced ? {} : rise(delay))

  return (
    <section className="relative flex min-h-[92dvh] items-center overflow-hidden pb-20 pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Trace origin — the signal starts at the prompt */}
        <motion.p {...anim(0)} className="label-mono mb-6 flex items-center gap-3 text-muted">
          <span
            data-trace-node
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full border-2 border-copper bg-bg"
          />
          Site reliability · DevOps · Platform engineering
        </motion.p>

        <motion.h1
          {...anim(0.06)}
          className="max-w-3xl text-[clamp(2.75rem,7vw,4.75rem)] font-bold leading-[1.05] tracking-tight text-fg"
        >
          I build systems that{' '}
          <span className="whitespace-nowrap text-signal">
            stay up<span className="cursor-blink text-copper">_</span>
          </span>
        </motion.h1>

        <motion.p {...anim(0.12)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Mechatronics Engineering @ University of Waterloo. I work across the
          hardware/software boundary — bare-metal firmware to cloud
          observability — and I care most about what happens{' '}
          <span className="text-fg">after</span> deploy.
        </motion.p>

        {/* Incoming role — rendered as a scheduled deploy notification */}
        <motion.div
          {...anim(0.18)}
          className="mt-10 max-w-md rounded-lg border border-amber/25 bg-surface shadow-card"
        >
          <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
            <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-amber" />
            <span className="label-mono text-amber">Scheduled deploy · Sep 2026</span>
          </div>
          <div className="px-4 py-3.5">
            <p className="font-semibold text-fg">SRE Co-op — Magnet Forensics</p>
            <p className="mt-1 font-mono text-xs text-muted">
              site reliability engineering · Waterloo, ON · incoming
            </p>
          </div>
        </motion.div>

        <motion.div {...anim(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="flex min-h-11 items-center rounded bg-signal px-5 font-mono text-sm font-semibold text-bg transition-transform duration-200 hover:-translate-y-0.5"
          >
            View work ↓
          </a>
          <a
            href="https://github.com/SafwanS143"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 rounded border border-border px-4 font-mono text-sm text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/safwan-shiblee/"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 rounded border border-border px-4 font-mono text-sm text-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.63 13.63h-2.37V9.92c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.96v3.78H6.22V6h2.28v1.04h.03c.32-.6 1.09-1.24 2.25-1.24 2.4 0 2.85 1.58 2.85 3.64v4.19ZM3.54 4.96a1.38 1.38 0 1 1 0-2.75 1.38 1.38 0 0 1 0 2.75Zm1.19 8.67H2.35V6h2.38v7.63ZM14.82 0H1.18C.53 0 0 .52 0 1.16v13.68C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.16V1.16C16 .52 15.47 0 14.82 0Z" />
    </svg>
  )
}
