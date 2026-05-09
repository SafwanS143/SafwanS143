import { motion } from 'motion/react'
import SectionHeading from './SectionHeading'

export default function Resume() {
  return (
    <section id="resume" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="03" eyebrow="Resume" title="The one-page version." />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="border border-border bg-surface/50"
        >
          <div className="p-8 lg:p-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim flex items-center gap-2">
                <span className="text-accent">$</span>
                <span>cat resume.pdf</span>
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Education, experience, and project highlights — in one PDF.
              </h3>
              <p className="mt-3 text-fg-muted max-w-xl">
                Updated periodically. The page version of everything you've seen above, with full work
                history, coursework, and stack details.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href="./resume.pdf"
                download
                className="group inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-wider px-5 py-3 hover:bg-fg transition-colors"
              >
                Download resume
                <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
