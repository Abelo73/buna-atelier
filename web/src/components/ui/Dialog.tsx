import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../../hooks/useModal'
import { duration, ease } from '../../lib/motion'

type Props = {
  open: boolean
  onClose: () => void
  /** Accessible name; rendered by the caller inside the dialog via `titleId`. */
  children: (ids: { titleId: string; descriptionId: string }) => ReactNode
  className?: string
}

/**
 * Accessible modal: portals to <body>, makes the app inert behind it,
 * traps Tab, closes on Escape or backdrop click and restores focus.
 */
export function Dialog({ open, onClose, children, className = '' }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useModal(open, panelRef, onClose)

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-obsidian/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={`relative max-h-[92svh] w-full overflow-y-auto bg-ivory text-obsidian sm:max-w-4xl ${className}`}
            initial={{ opacity: 0, transform: 'translateY(32px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(20px)' }}
            transition={{ duration: duration.slow, ease: ease.cinema }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid h-11 w-11 cursor-pointer place-items-center bg-ivory/80 text-obsidian backdrop-blur transition-colors hover:bg-sand"
            >
              <X size={18} strokeWidth={1.4} />
            </button>
            {children({ titleId, descriptionId })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
