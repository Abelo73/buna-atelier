import { motion, useReducedMotion } from 'motion/react'
import { addisPoint, ethiopiaPath, ethiopiaViewBox } from '../../../data/ethiopiaMap'
import type { Origin } from '../../../data/origins'
import { duration, ease } from '../../../lib/motion'

type Props = {
  origins: Origin[]
  activeId: string
  onSelect: (id: string) => void
}

/** A gentle arc from origin to Addis — the aroma line, repurposed as a route. */
function routeTo(p: { x: number; y: number }) {
  const mx = (p.x + addisPoint.x) / 2
  const my = (p.y + addisPoint.y) / 2
  const dx = addisPoint.x - p.x
  const dy = addisPoint.y - p.y
  const bend = 0.28
  return `M${p.x} ${p.y} Q${mx - dy * bend} ${my + dx * bend} ${addisPoint.x} ${addisPoint.y}`
}

/**
 * Decorative + pointer-interactive map. Keyboard and screen-reader users
 * choose origins through the tab list beside it, so the SVG is aria-hidden.
 */
export function OriginMap({ origins, activeId, onSelect }: Props) {
  const reduce = useReducedMotion()
  const active = origins.find((o) => o.id === activeId) ?? origins[0]

  return (
    <svg viewBox={ethiopiaViewBox} className="h-auto w-full overflow-visible" aria-hidden>
      <defs>
        <pattern id="map-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.95" fill="#D8C6A9" opacity="0.3" />
        </pattern>
      </defs>

      <motion.path
        d={ethiopiaPath}
        fill="url(#map-dots)"
        stroke="#D8C6A9"
        strokeOpacity={0.45}
        strokeWidth={1.1}
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{
          pathLength: { duration: duration.draw, ease: ease.silk },
          fillOpacity: { duration: duration.reveal, delay: 1.4 },
        }}
      />

      {/* Route from the active origin to the Addis table */}
      <motion.path
        key={active.id}
        d={routeTo(active.point)}
        fill="none"
        stroke="#B7955B"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: duration.reveal, ease: ease.cinema }}
      />

      {/* Addis Ababa */}
      <g transform={`translate(${addisPoint.x} ${addisPoint.y})`}>
        <rect x={-4} y={-4} width={8} height={8} fill="#F3EEE5" transform="rotate(45)" />
        <text x={-11} y={-4} textAnchor="end" className="fill-ivory font-sans text-[12px] tracking-[0.18em] uppercase">
          Addis Ababa
        </text>
        <text x={-11} y={9} textAnchor="end" className="fill-sand/60 font-sans text-[9px] tracking-[0.2em] uppercase">
          The table
        </text>
      </g>

      {origins.map((o) => {
        const isActive = o.id === activeId
        const left = o.labelSide === 'left'
        return (
          <g
            key={o.id}
            transform={`translate(${o.point.x} ${o.point.y})`}
            className="cursor-pointer"
            onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(o.id)}
            onClick={() => onSelect(o.id)}
          >
            {/* generous invisible hit area */}
            <circle r={16} fill="transparent" />
            <motion.circle
              r={11}
              fill="none"
              stroke="#B7955B"
              strokeWidth={1}
              initial={false}
              animate={{ opacity: isActive ? 0.7 : 0, scale: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.6, ease: ease.cinema }}
            />
            <circle
              r={isActive ? 4.5 : 3.2}
              className={`transition-all duration-(--duration-base) ${isActive ? 'fill-brass' : 'fill-sand'}`}
            />
            <text
              x={left ? -13 : 13}
              y={4 + (o.labelDy ?? 0)}
              textAnchor={left ? 'end' : 'start'}
              className={`font-sans text-[12px] tracking-[0.16em] uppercase transition-colors duration-(--duration-base) ${
                isActive ? 'fill-ivory' : 'fill-sand/55'
              }`}
            >
              {o.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
