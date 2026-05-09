import { motion } from 'motion/react'

export default function SectionHeading({ index, eyebrow, title, children }) {
  return (
    <div className="mb-12 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim flex items-center gap-3"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span>{eyebrow}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight"
      >
        {title}
      </motion.h2>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-4 text-fg-muted max-w-2xl"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
