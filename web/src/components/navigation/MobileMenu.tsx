import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { primaryNav } from '../../data/navigation'
import { hours } from '../../data/visit'
import { duration, ease } from '../../lib/motion'
import { useReservation } from '../reservation/context'
import { Button } from '../ui/Button'

const MotionLink = motion.create(Link)

type Props = { open: boolean; onClose: () => void }

export function MobileMenu({ open, onClose }: Props) {
  const { openReservation } = useReservation()
  const panelRef = useRef<HTMLDivElement>(null)

  // Scroll lock, Escape to close, focus the first link on open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const main = document.getElementById('main')
    main?.setAttribute('inert', '')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('a')?.focus(), 200)
    return () => {
      document.body.style.overflow = prevOverflow
      main?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, onClose])

  // Close automatically if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const onChange = () => mq.matches && onClose()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-obsidian lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: duration.slow, ease: ease.cinema }}
        >
          <div className="container-site flex flex-1 flex-col pt-28 pb-10">
            <ol className="flex flex-col">
              {primaryNav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-ivory/10">
                  <MotionLink
                    to={item.href}
                    onClick={onClose}
                    className="flex items-baseline gap-5 py-4"
                    initial={{ transform: 'translateY(100%)' }}
                    animate={{ transform: 'translateY(0%)' }}
                    transition={{ duration: duration.slow, ease: ease.cinema, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="label tabular-nums text-sand/70">0{i + 1}</span>
                    <span className="font-display text-[2.6rem] leading-none font-light">{item.label}</span>
                  </MotionLink>
                </li>
              ))}
            </ol>

            <motion.div
              className="mt-auto pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.slow, delay: 0.5 }}
            >
              <Button
                arrow
                aria-haspopup="dialog"
                onClick={() => {
                  onClose()
                  openReservation()
                }}
                className="w-full"
              >
                Reserve a Table
              </Button>
              <div className="mt-10 flex items-end justify-between gap-6 text-sm text-ivory/60">
                <dl className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1">
                  {hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt>{h.days}</dt>
                      <dd className="tabular-nums">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p lang="am" className="text-sand/70">
                  ቡና አትሌየር
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
