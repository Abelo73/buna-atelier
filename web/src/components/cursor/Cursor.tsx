import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { duration, ease, spring } from '../../lib/motion'

type Mode = 'hidden' | 'dot' | 'link' | 'label'

/**
 * Desktop-only cursor companion. The native cursor always stays visible —
 * this ring simply trails it, grows over links, and shows a short label over
 * anything marked `data-cursor="View"`. Off for touch and reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('hidden')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, spring.follow)
  const sy = useSpring(y, spring.follow)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled || reduce) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as Element | null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) setMode('hidden')
      else if (labelled) {
        setLabel(labelled.dataset.cursor ?? '')
        setMode('label')
      } else if (target?.closest('a, button, [role="button"]')) setMode('link')
      else setMode('dot')
    }
    const onLeave = () => setMode('hidden')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, reduce, x, y])

  if (!enabled || reduce) return null

  const size = mode === 'label' ? 76 : mode === 'link' ? 34 : 10

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        className={`label grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${
          mode === 'label'
            ? 'bg-ivory/90 text-obsidian backdrop-blur-sm'
            : 'border border-ivory bg-ivory/0 mix-blend-difference'
        }`}
        animate={{ width: size, height: size, opacity: mode === 'hidden' ? 0 : 1 }}
        transition={{ duration: duration.quick, ease: ease.cinema }}
      >
        <motion.span
          animate={{ opacity: mode === 'label' ? 1 : 0, scale: mode === 'label' ? 1 : 0.6 }}
          transition={{ duration: duration.quick, ease: ease.cinema }}
          className="text-[0.625rem]"
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
