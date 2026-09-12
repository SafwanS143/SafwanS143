import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal'

const STATEMENT =
  "I'm a Mechatronics Engineering student at the University of Waterloo. The degree runs from circuits to control systems to software, and the place where those layers meet is where I like to work. In every role, I keep gravitating toward the same problems: what breaks, how you notice, and how the system heals itself."

const FACTS = [
  { value: '3.7', label: 'GPA, Mechatronics Engineering' },
  { value: '2029', label: 'Expected graduation' },
  { value: 'Distinction', label: "President's Scholarship" },
]

// Grouped from the résumé, plus the platform stack Fleetwright ships on.
const SKILLS = [
  {
    group: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'EKS', 'Helm', 'Argo CD', 'Terraform', 'AWS', 'GCP', 'GitHub Actions', 'Jenkins', 'Linux'],
  },
  {
    group: 'Observability & SRE',
    items: ['Prometheus', 'Grafana', 'Alertmanager', 'SLOs & error budgets', 'Anomaly detection', 'Structured logging', 'Self-healing systems'],
  },
  {
    group: 'Languages',
    items: ['Python', 'TypeScript / JavaScript', 'C / C++', 'C#', 'Java', 'Dart', 'PowerShell', 'SQL'],
  },
  {
    group: 'Frameworks & Data',
    items: ['ASP.NET Core', 'FastAPI', 'React / Next.js', 'Flask', 'Flutter', 'PostgreSQL', 'SQLite', 'MQTT'],
  },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="tone-dark scroll-mt-[52px] py-28 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 id="about-title" className="t-eyebrow text-fg-2">
          About
        </h2>
        <ScrollText text={STATEMENT} />

        <Reveal group className="mt-20 grid gap-8 border-t border-hairline pt-10 sm:grid-cols-3 md:mt-28">
          {FACTS.map((f) => (
            <Reveal.Item key={f.label}>
              <p className="text-gradient-blue text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.045em]">
                {f.value}
              </p>
              <p className="mt-3 text-[1rem] text-fg-2">{f.label}</p>
            </Reveal.Item>
          ))}
        </Reveal>

        <div className="mt-28 md:mt-40">
          <Reveal as="h3" className="t-headline text-fg">
            Toolkit.
          </Reveal>
          <Reveal group className="mt-10 grid gap-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {SKILLS.map(({ group, items }) => (
              <Reveal.Item key={group} className="border-t border-hairline pt-6">
                <h4 className="text-[1.0625rem] font-semibold text-fg">{group}</h4>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-fg-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal.Item>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Words brighten one by one as the paragraph scrolls through the viewport.
function ScrollText({ text }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className="mt-6 text-[clamp(1.75rem,4.2vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-fg"
    >
      {reduced
        ? text
        : words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}
