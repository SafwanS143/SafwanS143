import { motion, useReducedMotion } from 'motion/react'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

// Fade-and-rise on first view. `group` staggers direct <Reveal.Item> children.
export default function Reveal({ as = 'div', group = false, delay = 0.08, className, children, ...rest }) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={group ? stagger(delay) : fadeUp}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Item({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={fadeUp} {...rest}>
      {children}
    </Tag>
  )
}

Reveal.Item = Item
