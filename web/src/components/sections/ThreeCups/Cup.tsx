import { motion, useTransform, type MotionValue } from 'motion/react'

type Props = {
  /** 0 → 1: cup arrives, coffee settles, aroma rises. */
  t: MotionValue<number>
  tone: string
  className?: string
}

const ink = '#35251C'
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** A small handleless buna cup on its saucer, drawn as a line illustration. */
export function Cup({ t, tone, className }: Props) {
  const cupOpacity = useTransform(() => clamp01(t.get() * 2.2))
  const cupY = useTransform(() => (1 - clamp01(t.get() * 1.6)) * 18)
  const coffee = useTransform(() => clamp01((t.get() - 0.35) / 0.3))
  const steam = useTransform(() => clamp01((t.get() - 0.5) / 0.5))
  const sheen = useTransform(() => coffee.get() * 0.18)

  return (
    <svg viewBox="0 0 160 200" className={className} aria-hidden fill="none">
      {/* aroma */}
      <motion.path
        d="M82 74 C 70 60, 94 50, 82 36 S 70 14, 86 2"
        stroke="#B7955B"
        strokeWidth={1.2}
        strokeLinecap="round"
        style={{ pathLength: steam, opacity: steam }}
      />
      <motion.g style={{ opacity: cupOpacity, y: cupY }}>
        {/* saucer */}
        <ellipse cx="80" cy="162" rx="60" ry="10" fill="#EBE4D8" stroke={ink} strokeWidth={1.1} />
        <ellipse cx="80" cy="160" rx="32" ry="4.5" stroke={ink} strokeOpacity={0.25} strokeWidth={1} />
        {/* body */}
        <path
          d="M38 82 C 40 120, 50 148, 60 153 Q 80 158 100 153 C 110 148, 120 120, 122 82"
          fill="#FBF8F2"
          stroke={ink}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
        {/* painted band */}
        <path d="M41 101 Q 80 110 119 101" stroke="#8B5E3C" strokeWidth={1} />
        <path d="M43 107 Q 80 116 117 107" stroke="#8B5E3C" strokeOpacity={0.55} strokeWidth={0.8} />
        {/* rim + coffee surface */}
        <ellipse cx="80" cy="82" rx="42" ry="8" fill="#FBF8F2" stroke={ink} strokeWidth={1.2} />
        <motion.ellipse cx="80" cy="83" rx="37.5" ry="5.8" fill={tone} style={{ opacity: coffee }} />
        <motion.ellipse cx="72" cy="82" rx="10" ry="1.4" fill="#F3EEE5" style={{ opacity: sheen }} />
      </motion.g>
    </svg>
  )
}
