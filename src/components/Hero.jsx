import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Chevron } from './icons'
import { EASE_OUT_QUINT } from '../lib/motion'

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: EASE_OUT_QUINT },
})

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const anim = (delay) => (reduced ? {} : rise(delay))

  // As the hero leaves, the content recedes, scale + fade on the compositor.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="tone-dark relative flex min-h-[calc(100svh-52px-41px)] items-center overflow-hidden"
    >
      {/* Aurora, soft light behind the headline */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -ml-[min(48vw,520px)] -mt-[min(48vw,520px)] h-[min(96vw,1040px)] w-[min(96vw,1040px)]"
        style={reduced ? undefined : { y: glowY }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 2.4, ease: EASE_OUT_QUINT }}
        >
          <div className="aurora h-full w-full rounded-full" />
        </motion.div>
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_35%,#000_78%)]"
      />

      <motion.div
        className="relative mx-auto w-full max-w-[1080px] px-6 py-24 text-center"
        style={reduced ? undefined : { scale, opacity, y }}
      >
        <motion.p {...anim(0.1)} className="t-eyebrow text-fg">
          Safwan Shiblee
        </motion.p>

        <motion.h1 id="hero-title" {...anim(0.2)} className="t-hero mx-auto mt-4 text-fg">
          Built to <span className="text-gradient whitespace-nowrap pr-[0.04em]">stay up.</span>
        </motion.h1>

        <motion.p {...anim(0.35)} className="t-lead mx-auto mt-6 max-w-[34rem] text-fg-2">
          Site reliability engineer, from bare-metal firmware to cloud
          observability. Mechatronics at the University of Waterloo.
        </motion.p>

        <motion.div {...anim(0.5)} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a href="#experience" className="btn-pill">
            See my work
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link-chevron text-[1.0625rem]">
            View résumé
            <Chevron size={11} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
