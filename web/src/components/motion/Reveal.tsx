import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { duration, ease } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance in px travelled while fading in. */
  y?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
  as?: 'div' | 'p' | 'span' | 'li'
}

/** Fade + short rise. The default entrance for anything that isn't a headline. */
export function Reveal({ children, className, delay = 0, y = 24, immediate, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const target = { opacity: 1, transform: 'translateY(0px)' }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, transform: `translateY(${reduce ? 0 : y}px)` }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: '0px 0px -12% 0px' } })}
      transition={{ duration: duration.reveal, ease: ease.cinema, delay }}
    >
      {children}
    </Tag>
  )
}

type MaskLinesProps = {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  immediate?: boolean
}

/**
 * Masked line reveal: each line rises out of its own clipping box.
 * Visibility is observed on the unclipped wrapper (a fully masked line
 * never counts as "in view"), then propagated to the lines via variants.
 */
export function MaskLines({
  lines,
  className,
  lineClassName = '',
  delay = 0,
  stagger = 0.15,
  immediate,
}: MaskLinesProps) {
  const reduce = useReducedMotion()
  const line = {
    hidden: { transform: reduce ? 'translateY(0%)' : 'translateY(105%)', opacity: reduce ? 0 : 1 },
    visible: (i: number) => ({
      transform: 'translateY(0%)',
      opacity: 1,
      transition: { duration: duration.reveal, ease: ease.cinema, delay: delay + i * stagger },
    }),
  }

  return (
    <motion.span
      className={`block ${className ?? ''}`}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, margin: '0px 0px -10% 0px' } })}
    >
      {lines.map((content, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={`block ${lineClassName}`} variants={line} custom={i}>
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
