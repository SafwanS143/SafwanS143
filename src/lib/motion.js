// Shared motion vocabulary — one rhythm across the whole site.
// Transform/opacity only; every consumer gates on useReducedMotion.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

export const fadeRise = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
}

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

export const staggerChildren = (delay = 0.04) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

// Standard viewport config: animate once, slightly before fully in view.
export const viewportOnce = { once: true, margin: '0px 0px -80px 0px' }
