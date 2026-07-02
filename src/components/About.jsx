import { motion, useReducedMotion } from 'motion/react'
import SectionHeading from './SectionHeading'
import { fadeRise, staggerChildren, viewportOnce } from '../lib/motion'

// Grouped like silkscreen labels on a board — sourced from the resume.
const SKILLS = [
  {
    group: 'DevOps & Cloud',
    items: ['Docker', 'Terraform', 'AWS', 'GCP', 'GitHub Actions', 'Jenkins', 'nginx', 'Linux'],
  },
  {
    group: 'Observability & SRE',
    items: ['Prometheus', 'Grafana', 'SonarQube', 'anomaly detection', 'structured logging', 'self-healing systems'],
  },
  {
    group: 'Languages',
    items: ['Python', 'TypeScript / JS', 'C / C++', 'C#', 'Dart', 'PowerShell', 'SQL'],
  },
  {
    group: 'Frameworks & Data',
    items: ['ASP.NET Core', 'FastAPI', 'React / Next.js', 'Flask', 'Flutter', 'PostgreSQL', 'SQLite'],
  },
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          label="About"
          title="The boundary is the interesting part"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="space-y-5 leading-relaxed text-muted"
            variants={fadeRise}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p>
              I'm a Mechatronics Engineering student at the University of
              Waterloo (GPA 3.7, President's Scholarship of Distinction). The
              degree spans circuits to control systems to software — and the
              place where those layers meet is where I like to work.
            </p>
            <p>
              Across four co-ops I've written bare-metal firmware, hardened
              cross-platform auth flows, operated election-data infrastructure,
              and built notification platforms with retry budgets and
              structured logging. The through-line: I keep gravitating toward
              the <span className="text-fg">reliability</span> problems — what
              breaks, how you notice, and how the system heals itself.
            </p>
            <p>
              That's the direction I'm heading deliberately: site reliability
              and platform engineering, next at{' '}
              <span className="text-fg">Magnet Forensics</span> as an SRE co-op
              in September 2026. This site follows the same philosophy —
              static, fast, no runtime dependencies, nothing to page anyone
              about.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2"
            variants={staggerChildren(0.05)}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SKILLS.map(({ group, items }) => (
              <motion.div key={group} variants={fadeRise}>
                <h3 className="label-mono mb-3 text-copper">{group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
