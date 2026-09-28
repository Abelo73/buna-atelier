import type { Zone } from '../../../data/space'

type Props = {
  zones: Zone[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}

const ink = '#35251C'

/**
 * A quiet architectural diagram of the (concept) café. Pointer users can
 * pick a zone here; everyone else uses the zone panels, so it is aria-hidden.
 */
export function FloorPlan({ zones, activeId, onSelect, className }: Props) {
  return (
    <svg viewBox="0 0 300 200" className={className} aria-hidden fill="none">
      {/* zone fills sit under the linework */}
      {zones.map((z) => {
        const active = z.id === activeId
        return (
          <g key={z.id} className="cursor-pointer" onMouseEnter={() => onSelect(z.id)} onClick={() => onSelect(z.id)}>
            <rect
              x={z.plan.x}
              y={z.plan.y}
              width={z.plan.w}
              height={z.plan.h}
              className={`transition-[fill,stroke] duration-(--duration-base) ${active ? 'fill-clay/15 stroke-clay' : 'fill-transparent stroke-transparent'}`}
              strokeWidth={0.8}
            />
            <text
              x={z.plan.x + 4}
              y={z.plan.y + z.plan.h - 4}
              className={`font-sans text-[7px] tracking-[0.2em] transition-colors duration-(--duration-base) ${active ? 'fill-clay' : 'fill-ink/40'}`}
            >
              {z.index}
            </text>
          </g>
        )
      })}

      <g stroke={ink} strokeLinecap="square" pointerEvents="none">
        {/* outer walls, entrance gap at the bottom */}
        <path d="M130 190 H10 V10 H290 V190 H170" strokeWidth={2.2} />
        {/* partition between bar and corner */}
        <path d="M146 10 V70" strokeWidth={1.2} />
        {/* courtyard is open to the sky */}
        <path d="M216 10 V190" strokeWidth={0.8} strokeDasharray="3 3" />

        {/* bar counter + stools */}
        <rect x={30} y={30} width={100} height={10} strokeWidth={1} />
        {[40, 60, 80, 100, 120].map((x) => (
          <circle key={x} cx={x} cy={50} r={3} strokeWidth={0.8} />
        ))}

        {/* tables: one long communal table, rounds either side */}
        <rect x={60} y={120} width={70} height={14} strokeWidth={1} />
        {[
          [38, 98],
          [80, 98],
          [122, 98],
          [38, 160],
          [150, 160],
          [150, 118],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={7} strokeWidth={0.9} />
        ))}

        {/* corner: two small desks and an armchair */}
        <rect x={160} y={32} width={14} height={10} strokeWidth={0.9} />
        <rect x={184} y={32} width={14} height={10} strokeWidth={0.9} />
        <rect x={172} y={52} width={16} height={10} rx={3} strokeWidth={0.9} />

        {/* courtyard: trees and a few chairs */}
        {[
          [250, 48, 14],
          [262, 150, 12],
        ].map(([cx, cy, r]) => (
          <circle key={cx} cx={cx} cy={cy} r={r} strokeWidth={0.8} strokeDasharray="2 2" />
        ))}
        {[92, 104, 116].map((y) => (
          <rect key={y} x={236} y={y} width={7} height={7} strokeWidth={0.8} />
        ))}
      </g>

      <text x={134} y={198} className="fill-ink/45 font-sans text-[6px] tracking-[0.25em]" pointerEvents="none">
        ENTRANCE
      </text>
    </svg>
  )
}
