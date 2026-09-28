import { motion, useReducedMotion } from 'motion/react'
import { location } from '../../../data/visit'
import { duration, ease } from '../../../lib/motion'

/**
 * An abstract location graphic — not a map. Faint street lines, rings around
 * the pin and the site's aroma line arriving at the table. Deliberately
 * non-geographic so it never implies a precise, invented address.
 */
export function LocationMark({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: '0px 0px -15% 0px' },
      }

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={`${location.area}, ${location.city} — concept location`}
    >
      <rect width="400" height="400" fill="#35251C" />
      {/* street lines */}
      <g stroke="#D8C6A9" strokeOpacity={0.09} strokeWidth={1}>
        {[40, 95, 150, 250, 305, 360].map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x - 60} y2={400} />
        ))}
        {[55, 120, 185, 265, 330].map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={400} y2={y + 24} />
        ))}
      </g>
      <path d="M0 214 C 120 190, 260 236, 400 196" stroke="#D8C6A9" strokeOpacity={0.2} strokeWidth={6} fill="none" />

      {/* rings */}
      <g fill="none" stroke="#B7955B">
        {[34, 70, 112, 160].map((r, i) => (
          <motion.circle
            key={r}
            cx={200}
            cy={200}
            r={r}
            strokeOpacity={0.5 - i * 0.1}
            strokeWidth={1}
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: duration.cinema, ease: ease.cinema, delay: 0.2 + i * 0.12 }}
            style={{ transformOrigin: '200px 200px' }}
          />
        ))}
      </g>

      {/* aroma line arriving at the table */}
      <motion.path
        d="M30 380 C 70 330, 40 300, 90 270 S 170 280, 160 240 S 180 205, 200 200"
        fill="none"
        stroke="#D8C6A9"
        strokeWidth={1.4}
        strokeLinecap="round"
        {...draw}
        transition={{ duration: duration.draw, ease: ease.silk, delay: 0.3 }}
      />

      {/* pin */}
      <circle cx={200} cy={200} r={7} fill="#F3EEE5" />
      <circle cx={200} cy={200} r={2.5} fill="#35251C" />

      <text x={216} y={186} className="fill-ivory font-display text-[26px]">
        {location.area}
      </text>
      <text x={217} y={204} className="fill-sand/70 font-sans text-[9px] tracking-[0.24em] uppercase">
        {location.city}
      </text>
      <text x={24} y={36} className="fill-sand/60 font-sans text-[9px] tracking-[0.24em]">
        {location.coords}
      </text>
      <text x={376} y={380} textAnchor="end" className="fill-sand/50 font-sans text-[8px] tracking-[0.24em] uppercase">
        Concept location
      </text>
    </svg>
  )
}
