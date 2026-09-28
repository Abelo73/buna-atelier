import { motion, useReducedMotion } from 'motion/react'
import { duration, ease } from '../../lib/motion'

/** A short thread of rising aroma — the site's motif, drawn when it scrolls into view. */
export function AromaFlourish({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 40 120" fill="none" aria-hidden className={className}>
      <motion.path
        d="M20 118 C 8 100, 32 88, 20 70 S 8 40, 22 24 S 30 6, 18 2"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ pathLength: { duration: duration.draw, ease: ease.silk }, opacity: { duration: 0.4 } }}
      />
    </svg>
  )
}
