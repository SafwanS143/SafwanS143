import { motion } from 'motion/react'
import SectionHeading from './SectionHeading'

const FACTS = [
  { k: 'program', v: '2B Mechatronics Engineering' },
  { k: 'school', v: 'University of Waterloo' },
  { k: 'gpa', v: '3.7 / 4.0' },
  { k: 'interests', v: 'SRE · DevOps · Software Eng' },
  { k: 'status', v: 'Open to co-op / SWE roles' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="01" eyebrow="About" title="A short introduction." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-5 text-lg text-fg-muted leading-relaxed"
          >
            <p>
              I'm a <span className="text-fg">2B Mechatronics Engineering</span> student at the{' '}
              <span className="text-fg">University of Waterloo</span>, currently sitting at a{' '}
              <span className="text-fg">3.7 GPA</span>. My background is hardware-shaped, but my obsession is
              what runs <em>around</em> the hardware — the systems that keep services up, the pipelines that
              move code to production, and the tooling that makes outages boring instead of catastrophic.
            </p>
            <p>
              I'm most at home in{' '}
              <span className="text-fg">Site Reliability Engineering, DevOps, and software engineering</span>.
              I like building things that get used: a prayer-times display that ran on a mosque TV for two
              years, a calculator shipped to 100K+ phones, and most recently an SRE monitor that detects
              container failures and recovers them on its own.
            </p>
            <p>
              When I write code, I'm trying to answer one question:{' '}
              <span className="text-accent font-medium">does it hold up when nobody is watching?</span>
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="border border-border bg-surface/40">
              <div className="px-5 py-3 border-b border-border font-mono text-xs uppercase tracking-[0.2em] text-fg-dim flex items-center justify-between">
                <span>fast facts</span>
                <span className="text-accent">$</span>
              </div>
              <dl className="p-5 font-mono text-sm space-y-3">
                {FACTS.map((f) => (
                  <div key={f.k} className="flex items-baseline gap-4">
                    <dt className="text-fg-dim uppercase tracking-wider text-xs w-24 shrink-0">{f.k}</dt>
                    <dd className="text-fg">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
