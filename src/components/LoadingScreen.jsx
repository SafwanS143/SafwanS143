import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const LINES = [
  '> initializing portfolio',
  '> mounting modules',
  '> ready ✓',
]

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [printed, setPrinted] = useState(0)

  useEffect(() => {
    const timers = []
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setPrinted(i + 1), 180 + i * 220))
    })
    timers.push(setTimeout(() => setVisible(false), 180 + LINES.length * 220 + 250))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="font-mono text-sm text-fg-muted">
            {LINES.slice(0, printed).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={i === LINES.length - 1 ? 'text-accent' : ''}
              >
                {line}
              </motion.div>
            ))}
            {printed < LINES.length && (
              <motion.span
                aria-hidden
                className="inline-block w-[8px] h-[14px] -mb-0.5 bg-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: 1, ease: 'linear' }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
