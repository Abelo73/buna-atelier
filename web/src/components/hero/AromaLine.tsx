import { motion, useReducedMotion } from 'motion/react'
import { duration, heroTimeline } from '../../lib/motion'

/*
 * The site's recurring motif: a thread of aroma rising from the cup.
 * Drawn in the hero photo's own coordinate space (800 × 1200), so it
 * starts at the cup at any viewport size, then drifts up and left out
 * of the frame toward the headline.
 */
const PATH =
  'M640 790 C 672 742, 636 702, 668 652 S 724 560, 692 500 S 636 404, 690 336 S 590 252, 420 262 S 110 302, -120 272 S -380 232, -500 250'

type Props = {
  /** Draw when scrolled into view instead of on page load (used by the closing section). */
  inView?: boolean
  delay?: number
}

export function AromaLine({ inView = false, delay = heroTimeline.aroma }: Props) {
  const reduce = useReducedMotion()
  const shown = { pathLength: 1, opacity: 1 }
  const draw = reduce
    ? { initial: shown, animate: shown }
    : {
        initial: { pathLength: 0, opacity: 0 },
        ...(inView ? { whileInView: shown, viewport: { once: true, amount: 0.4 } } : { animate: shown }),
        transition: {
          pathLength: { duration: duration.aroma, ease: [0.45, 0, 0.2, 1] as const, delay },
          opacity: { duration: 0.6, delay },
        },
      }

  return (
    <svg
      aria-hidden
      viewBox="0 0 800 1200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      fill="none"
    >
      <defs>
        <linearGradient id="aroma-fade" gradientUnits="userSpaceOnUse" x1="640" y1="790" x2="-500" y2="250">
          <stop offset="0" stopColor="#D8C6A9" stopOpacity="0" />
          <stop offset="0.08" stopColor="#D8C6A9" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#B7955B" stopOpacity="0.75" />
          <stop offset="1" stopColor="#B7955B" stopOpacity="0" />
        </linearGradient>
        <filter id="aroma-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      {/* soft steam body */}
      <g opacity={0.35} filter="url(#aroma-blur)">
        <motion.path d={PATH} stroke="url(#aroma-fade)" strokeWidth={14} strokeLinecap="round" {...draw} />
      </g>
      {/* the hairline */}
      <motion.path d={PATH} stroke="url(#aroma-fade)" strokeWidth={1.4} strokeLinecap="round" {...draw} />
    </svg>
  )
}
