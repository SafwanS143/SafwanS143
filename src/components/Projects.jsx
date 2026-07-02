import { motion, useReducedMotion } from 'motion/react'
import SectionHeading from './SectionHeading'
import FleetwrightFeature from './FleetwrightFeature'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { staggerChildren, viewportOnce } from '../lib/motion'

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section id="projects" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          label="Projects"
          title="Built to keep running"
          description="Six systems, from bare-metal firmware to self-healing infrastructure — most of them have real users or real uptime behind them."
        />

        <FleetwrightFeature />

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerChildren(0.05)}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.repo} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
