import { motion } from 'motion/react'

const TAGLINE = 'Engineering systems that hold up under pressure.'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-fg-dim flex items-center gap-3"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <span>Online · Waterloo, ON</span>
          </motion.div>

          <h1 className="mt-6 font-extrabold tracking-[-0.04em] leading-[0.92] text-[14vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[8vw] xl:text-[8.5rem]">
            <Reveal delay={0.5}>SAFWAN</Reveal>
            <br />
            <Reveal delay={0.6}>
              SHIBLEE<span className="text-accent">.</span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
            className="mt-8 font-mono text-sm md:text-base text-fg-muted"
          >
            <span className="text-accent">→</span> Mechatronics Engineering @ University of Waterloo
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
            className="mt-3 text-xl md:text-2xl text-fg max-w-2xl"
          >
            {TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-wider px-5 py-3 hover:bg-fg transition-colors"
            >
              View my work
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#resume"
              className="group inline-flex items-center gap-3 border border-border-strong text-fg font-mono text-sm uppercase tracking-wider px-5 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              View resume
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
          className="lg:col-span-4 hidden lg:block"
        >
          <div className="border border-border bg-surface/50 backdrop-blur-sm">
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between font-mono text-xs text-fg-dim">
              <span>~/system.info</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
                <span className="w-2 h-2 rounded-full bg-fg-dim/40" />
                <span className="w-2 h-2 rounded-full bg-accent" />
              </span>
            </div>
            <dl className="px-4 py-4 font-mono text-sm space-y-2">
              <Row k="program" v="2B Mechatronics Eng" />
              <Row k="school" v="UWaterloo" />
              <Row k="gpa" v="3.7 / 4.0" />
              <Row k="focus" v="SRE · DevOps · SWE" />
              <Row k="status" v={<span className="text-accent">available</span>} />
            </dl>
          </div>
        </motion.aside>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4, ease: 'easeOut' }}
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <span
          aria-hidden
          className="absolute -inset-x-14 -inset-y-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.32),transparent_70%)] blur-md opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
        <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-accent/50 bg-bg/40 backdrop-blur-sm group-hover:border-accent group-hover:bg-accent/10 transition-colors">
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
            animate={{ y: [0, 4, 0, 4, 0] }}
            transition={{ duration: 1.8, ease: 'easeInOut', delay: 1.8 }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </span>
        <span className="relative font-mono text-[10px] tracking-[0.3em] text-fg-muted group-hover:text-accent transition-colors">
          SCROLL
        </span>
      </motion.a>
    </section>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-fg-dim w-20 shrink-0">{k}</dt>
      <dd className="text-fg flex-1 truncate">{v}</dd>
    </div>
  )
}

function Reveal({ children, delay = 0 }) {
  return (
    <span className="inline-block overflow-hidden align-baseline">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}
