import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { zones } from '../../../data/space'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'
import { FloorPlan } from './FloorPlan'

/** Desktop: four tall panels; the active one opens wide like a door. */
function ZonePanels({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <ul className="hidden h-[min(78vh,760px)] gap-3 lg:flex" aria-label="Zones of the café">
      {zones.map((z) => {
        const active = z.id === activeId
        return (
          <li
            key={z.id}
            className="relative min-w-0 overflow-hidden bg-coffee transition-[flex-grow] duration-(--duration-image) ease-(--ease-cinema)"
            style={{ flexGrow: active ? 3.4 : 1, flexBasis: 0 }}
          >
            <button
              type="button"
              aria-pressed={active}
              data-cursor={active ? undefined : 'Explore'}
              onClick={() => onSelect(z.id)}
              onMouseEnter={() => onSelect(z.id)}
              onFocus={() => onSelect(z.id)}
              className="group absolute inset-0 cursor-pointer text-left"
            >
              <Img
                name={z.image}
                alt={z.alt}
                sizes="(min-width: 64rem) 60vw, 100vw"
                className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-(--duration-cinema) ease-(--ease-cinema) ${
                  active ? 'scale-100 brightness-100' : 'scale-110 brightness-[0.55] saturate-[0.7]'
                }`}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent"
              />

              {/* Collapsed: the room name runs up the panel like a book spine */}
              <span
                aria-hidden
                className={`absolute bottom-7 left-6 flex rotate-180 items-center gap-4 font-display text-[1.75rem] leading-none whitespace-nowrap text-ivory transition-opacity duration-(--duration-base) [writing-mode:vertical-rl] ${
                  active ? 'opacity-0' : 'opacity-100 delay-300'
                }`}
              >
                {z.name}
                <span className="label text-sand tabular-nums">{z.index}</span>
              </span>

              <span
                className={`absolute inset-x-0 bottom-0 flex flex-col p-7 transition-opacity duration-(--duration-slow) ${
                  active ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'
                }`}
              >
                <span className="label text-sand tabular-nums">{z.index}</span>
                <span className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.8rem)] leading-none whitespace-nowrap text-ivory">
                  {z.name}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-(--duration-slow) ease-(--ease-cinema) ${
                    active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="mt-3 block font-display text-display-sm text-sand italic">{z.purpose}</span>
                    <span className="mt-3 block max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">{z.text}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/** Mobile & tablet: a simple stack of rooms. */
function ZoneStack() {
  return (
    <ol className="grid gap-14 sm:grid-cols-2 sm:gap-x-6 lg:hidden">
      {zones.map((z) => (
        <li key={z.id}>
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-coffee">
              <Img
                name={z.image}
                alt={z.alt}
                sizes="(min-width: 40rem) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="label mt-5 text-clay-ink tabular-nums">{z.index}</p>
            <h3 className="mt-2 font-display text-[2.25rem] leading-none text-obsidian">{z.name}</h3>
            <p className="mt-2 font-display text-[1.35rem] text-clay-ink italic">{z.purpose}</p>
            <p className="mt-3 leading-relaxed text-ink/70">{z.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export function Space() {
  const [activeId, setActiveId] = useState(zones[1].id)
  const introRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: introRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section
      id="space"
      data-nav-theme="light"
      aria-labelledby="space-title"
      className="relative bg-ivory py-(--spacing-section) text-obsidian"
    >
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal className="text-clay-ink" y={12}>
              <Eyebrow index="08">The Space</Eyebrow>
            </Reveal>
            <h2 id="space-title" className="mt-6 font-display font-light text-display-lg">
              <MaskLines
                lines={[
                  'Designed for',
                  <>
                    <em className="italic text-clay-ink">staying.</em>
                  </>,
                ]}
              />
            </h2>
            <Reveal>
              <p className="mt-8 max-w-(--container-prose) leading-relaxed text-ink/70">
                Four rooms for four moods, under one roof in Bole. Clay plaster, dark wood and afternoon light — nothing
                that hurries you out of the door.
              </p>
            </Reveal>
          </div>

          <Reveal className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <figure>
              <FloorPlan zones={zones} activeId={activeId} onSelect={setActiveId} className="w-full" />
              <figcaption className="label mt-4 flex justify-between text-ink/70">
                <span>Plan — concept layout</span>
                <span>Not to scale</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Cinematic establishing shot */}
        <Reveal className="mt-20 lg:mt-28">
          <div ref={introRef} className="relative aspect-[4/3] overflow-hidden bg-coffee sm:aspect-[21/9]">
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}>
              <Img
                name="space-slats"
                alt="A café interior with a wall of warm wooden slats above a row of chairs and small round tables."
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </Reveal>

        <div className="mt-20 lg:mt-28">
          <motion.p
            className="label mb-6 hidden text-ink/70 lg:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: ease.cinema }}
          >
            Hover or tab through the rooms
          </motion.p>
          <ZonePanels activeId={activeId} onSelect={setActiveId} />
          <ZoneStack />
        </div>
      </div>
    </section>
  )
}
