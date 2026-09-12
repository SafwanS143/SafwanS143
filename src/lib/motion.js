// Shared motion vocabulary, one rhythm across the whole site.
// Transform/opacity only; every consumer gates on useReducedMotion.

export const EASE_APPLE = [0.28, 0.11, 0.32, 1]
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT_QUINT },
  },
}

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

// Animate once, a little before the element is fully in view.
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }
