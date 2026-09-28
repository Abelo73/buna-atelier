import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Scroll-linked line: brightens from a ghost to full strength as it
 * travels up through the lower half of the viewport. Reads as the
 * sentence "arriving" at the pace of the reader's scroll.
 */
export function ScrollFade({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'start 0.55'] })
  // Resting at 0.5 keeps even the not-yet-arrived lines (sand italics included) above 3:1 for large text.
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0em' : '0.35em', '0em'])

  return (
    <motion.span ref={ref} style={{ opacity, y }} className={`block will-change-transform ${className ?? ''}`}>
      {children}
    </motion.span>
  )
}
