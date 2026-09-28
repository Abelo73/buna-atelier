import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { GalleryImage } from '../../../data/gallery'
import { useModal } from '../../../hooks/useModal'
import { duration, ease } from '../../../lib/motion'
import { Img } from '../../ui/Img'

type Props = {
  images: GalleryImage[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

export function Lightbox({ images, index, onChange, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [dir, setDir] = useState(1)
  const open = index !== null
  useModal(open, panelRef, onClose)

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      setDir(delta)
      onChange((index + delta + images.length) % images.length)
    },
    [index, images.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, step])

  const img = index !== null ? images[index] : null

  return createPortal(
    <AnimatePresence>
      {img && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery"
          className="fixed inset-0 z-[80] flex flex-col bg-obsidian/97 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base }}
        >
          <div className="container-site flex h-20 shrink-0 items-center justify-between">
            <p className="label text-ivory/60 tabular-nums" aria-live="polite">
              {String(index! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              data-autofocus
              className="-mr-3 grid h-11 w-11 cursor-pointer place-items-center text-ivory/80 hover:text-ivory"
            >
              <X size={22} strokeWidth={1.3} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.figure
                key={img.image}
                custom={dir}
                className="flex h-full w-full flex-col items-center justify-center"
                variants={{
                  enter: (d: number) => ({ opacity: 0, transform: `translateX(${d * 6}%)` }),
                  center: { opacity: 1, transform: 'translateX(0%)' },
                  exit: (d: number) => ({ opacity: 0, transform: `translateX(${d * -6}%)` }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: duration.slow, ease: ease.cinema }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1)
                  else if (info.offset.x > 60) step(-1)
                }}
              >
                <Img
                  name={img.image}
                  alt={img.alt}
                  sizes="90vw"
                  priority
                  className="max-h-[calc(100svh-12rem)] w-auto max-w-full object-contain"
                />
                <figcaption className="mt-5 text-center">
                  <span className="font-display text-display-sm text-ivory">{img.title}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 hidden h-14 w-14 cursor-pointer place-items-center border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory sm:grid lg:left-8"
            >
              <ChevronLeft size={22} strokeWidth={1.2} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 hidden h-14 w-14 cursor-pointer place-items-center border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory sm:grid lg:right-8"
            >
              <ChevronRight size={22} strokeWidth={1.2} />
            </button>
          </div>

          <p className="label shrink-0 py-6 text-center text-ivory/60">
            <span className="hidden sm:inline">← → to browse · Esc to close</span>
            <span className="sm:hidden">Swipe to browse</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
