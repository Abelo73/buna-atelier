import { lazy, Suspense, useCallback, useState } from 'react'
import { gallery, type GalleryShape } from '../../../data/gallery'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const Lightbox = lazy(() => import('./Lightbox').then((m) => ({ default: m.Lightbox })))

/*
 * Editorial placement on a 12-column desktop grid (rows are a fixed rhythm).
 * On small screens every tile falls back to a two-column, dense flow.
 */
const placement: Record<number, string> = {
  0: 'lg:col-[1/6] lg:row-[1/8]',
  1: 'lg:col-[6/10] lg:row-[1/6]',
  2: 'lg:col-[10/13] lg:row-[1/5]',
  3: 'lg:col-[10/13] lg:row-[5/9]',
  4: 'lg:col-[6/10] lg:row-[6/9]',
  5: 'lg:col-[1/4] lg:row-[8/11]',
  6: 'lg:col-[4/13] lg:row-[9/12]',
}

const mobileShape: Record<GalleryShape, string> = {
  'portrait-lg': 'col-span-2 aspect-[4/5]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'col-span-2 aspect-[16/10]',
  detail: 'aspect-square',
  panorama: 'col-span-2 aspect-[21/9]',
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const [everOpened, setEverOpened] = useState(false)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section
      id="gallery"
      data-nav-theme="light"
      aria-labelledby="gallery-title"
      className="relative bg-paper py-(--spacing-section) text-obsidian"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="text-clay-ink" y={12}>
              <Eyebrow index="12">Gallery</Eyebrow>
            </Reveal>
            <h2 id="gallery-title" className="mt-6 font-display font-light text-display-lg">
              <MaskLines
                lines={[
                  'Small moments,',
                  <>
                    kept <em className="italic text-clay-ink">close.</em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-3 lg:col-start-10">
            <p className="leading-relaxed text-ink/70">Select any photograph to view it full screen.</p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-12 lg:auto-rows-[clamp(48px,5vw,92px)] lg:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={g.image} className={`${mobileShape[g.shape]} lg:aspect-auto ${placement[i]}`} y={30}>
              <button
                type="button"
                onClick={() => {
                  setEverOpened(true)
                  setOpen(i)
                }}
                data-cursor="View"
                aria-label={`View photograph: ${g.title}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden bg-coffee"
              >
                <Img
                  name={g.image}
                  alt={g.alt}
                  sizes="(min-width: 64rem) 40vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-(--duration-image) ease-(--ease-cinema) group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="absolute bottom-4 left-4 translate-y-2 font-display text-[1.35rem] text-ivory opacity-0 transition-[opacity,transform] duration-(--duration-base) ease-(--ease-cinema) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {g.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {everOpened && (
        <Suspense fallback={null}>
          <Lightbox images={gallery} index={open} onChange={setOpen} onClose={close} />
        </Suspense>
      )}
    </section>
  )
}
