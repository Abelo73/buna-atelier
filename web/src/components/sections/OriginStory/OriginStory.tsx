import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { origins, originsDisclaimer } from '../../../data/origins'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'
import { OriginMap } from './OriginMap'

export function OriginStory() {
  const [activeId, setActiveId] = useState(origins[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = origins.findIndex((o) => o.id === activeId)
  const active = origins[activeIndex]

  // Roving tabindex: arrow keys move between origins, Home/End jump.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = origins.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? activeIndex === last
          ? 0
          : activeIndex + 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? activeIndex === 0
            ? last
            : activeIndex - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    setActiveId(origins[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="coffee"
      aria-labelledby="origin-title"
      className="relative overflow-hidden bg-forest py-(--spacing-section)"
    >
      <div className="container-site">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal className="text-sand" y={12}>
              <Eyebrow index="03">Origin</Eyebrow>
            </Reveal>
            <h2 id="origin-title" className="mt-6 font-display font-light text-display-lg text-ivory">
              <MaskLines
                lines={[
                  'Born in',
                  <>
                    Ethiopian <em className="italic text-sand">soil.</em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-(--container-prose) leading-relaxed text-ivory/65">
              Ethiopia is where the coffee plant first grew wild, and its regions still taste remarkably different from
              one another. Choose an origin to see the character we look for in the cup.
            </p>
          </Reveal>
        </div>

        {/* Map + detail */}
        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-6">
            <Reveal className="mx-auto max-w-[34rem] lg:mx-0">
              <OriginMap origins={origins} activeId={activeId} onSelect={setActiveId} />
            </Reveal>

            <div
              role="tablist"
              aria-label="Coffee origins"
              onKeyDown={onKeyDown}
              className="-mx-(--spacing-gutter) mt-10 flex snap-x scroll-px-(--spacing-gutter) gap-2 overflow-x-auto px-(--spacing-gutter) pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0"
            >
              {origins.map((o, i) => {
                const selected = o.id === activeId
                return (
                  <button
                    key={o.id}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    role="tab"
                    id={`origin-tab-${o.id}`}
                    aria-selected={selected}
                    aria-controls="origin-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(o.id)}
                    className={`label min-h-11 shrink-0 cursor-pointer snap-start border px-4 transition-colors duration-(--duration-base) ${
                      selected
                        ? 'border-sand bg-sand text-forest'
                        : 'border-ivory/20 text-ivory/70 hover:border-ivory/50 hover:text-ivory'
                    }`}
                  >
                    {o.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id="origin-panel"
            role="tabpanel"
            aria-labelledby={`origin-tab-${active.id}`}
            className="min-w-0 lg:col-span-5 lg:col-start-8"
          >
            <figure className="relative aspect-[4/3] overflow-hidden bg-obsidian/30">
              {origins.map((o) => (
                <Img
                  key={o.id}
                  name={o.image}
                  alt={o.id === active.id ? o.alt : ''}
                  aria-hidden={o.id !== active.id}
                  sizes="(min-width: 64rem) 40vw, 100vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-(--duration-image) ease-(--ease-cinema) ${
                    o.id === active.id ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                  }`}
                />
              ))}
              <figcaption className="label absolute bottom-3 left-3 bg-obsidian/50 px-2 py-1.5 text-ivory/70 backdrop-blur-sm">
                Illustrative photograph
              </figcaption>
            </figure>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, transform: 'translateY(12px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-8px)' }}
                transition={{ duration: duration.base, ease: ease.cinema }}
                className="mt-8"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-display-md font-light text-ivory">{active.name}</h3>
                  <span lang="am" className="text-lg text-sand/70">
                    {active.amharic}
                  </span>
                </div>
                <p className="label mt-4 text-brass">{active.notes.join(' · ')}</p>
                <p className="mt-5 max-w-md leading-relaxed text-ivory/70">{active.description}</p>

                <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-ivory/12 pt-6 sm:grid-cols-3 sm:gap-6">
                  {[
                    ['Typical altitude', active.altitude],
                    ['Process', active.process],
                    ['We roast it', active.roast],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="label text-ivory/60">{term}</dt>
                      <dd className="mt-2 text-[0.9375rem] text-ivory/90">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-16 max-w-xl text-xs leading-relaxed text-ivory/60 lg:mt-24">{originsDisclaimer}</p>
      </div>
    </section>
  )
}
