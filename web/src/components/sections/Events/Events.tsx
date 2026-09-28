import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState, type PointerEvent } from 'react'
import { events, eventsNote, type CafeEvent } from '../../../data/events'
import { duration, ease, spring } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { useReservation } from '../../reservation/context'
import { Button } from '../../ui/Button'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

/** Formats the ISO string's own parts, so the date never shifts with the viewer's time zone. */
function formatWhen(iso: string) {
  const [day, time] = iso.split('T')
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { ...o, timeZone: 'UTC' }).format(date)
  return { day: String(d).padStart(2, '0'), month: fmt({ month: 'short' }), weekday: fmt({ weekday: 'short' }), time }
}

function EventRow({ event, onHover }: { event: CafeEvent; onHover: (id: string | null) => void }) {
  const when = formatWhen(event.date)
  const { openReservation } = useReservation()
  return (
    <li
      className="group relative border-b border-ivory/12"
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(event.id)}
      onFocusCapture={() => onHover(event.id)}
    >
      <article className="grid gap-6 py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-9">
        {/* Mobile image */}
        <div className="aspect-[16/10] overflow-hidden bg-coffee lg:hidden">
          <Img name={event.image} alt={event.alt} sizes="100vw" className="h-full w-full object-cover" />
        </div>

        <div className="flex items-end justify-between gap-6 lg:col-span-2 lg:block">
          <p>
            <time
              dateTime={event.date}
              className="block font-display text-[3.25rem] leading-none text-ivory tabular-nums"
            >
              {when.day}
            </time>
            <span className="label mt-2 block text-sand">
              {when.month} · {when.weekday}
            </span>
          </p>
          <p className="label flex flex-col items-end gap-1.5 text-ivory/60 lg:mt-5 lg:items-start">
            <span className="text-brass">{event.category}</span>
            <span className="tabular-nums">{when.time}</span>
          </p>
        </div>

        {/* Columns 3–4 stay empty on desktop: the hover preview travels down this lane */}
        <div aria-hidden className="hidden lg:col-span-2 lg:block" />

        <div className="lg:col-span-5">
          <h3 className="font-display text-display-sm text-ivory transition-transform duration-(--duration-base) ease-(--ease-cinema) lg:group-hover:translate-x-2">
            {event.title}
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-ivory/60">{event.description}</p>
        </div>

        <div className="lg:col-span-3 lg:text-right">
          <Button
            variant="line"
            arrow
            aria-haspopup="dialog"
            aria-label={`Reserve a place — ${event.title}`}
            onClick={() =>
              openReservation({
                request: `I’d like to join ${event.title} on ${when.weekday} ${when.day} ${when.month}.`,
              })
            }
          >
            Reserve a place
          </Button>
        </div>
      </article>
    </li>
  )
}

export function Events() {
  const [hovered, setHovered] = useState<string | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring.follow)
  const sy = useSpring(y, spring.follow)
  const active = events.find((e) => e.id === hovered)

  // The preview stays in the empty lane (columns 3–4) and only follows the pointer vertically.
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(r.width * (2 / 12) + 12)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="events" aria-labelledby="events-title" className="relative bg-obsidian py-(--spacing-section)">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal className="text-sand" y={12}>
              <Eyebrow index="11">Upcoming</Eyebrow>
            </Reveal>
            <h2 id="events-title" className="mt-6 font-display font-light text-display-lg text-ivory">
              <MaskLines
                lines={[
                  'More than a menu —',
                  <>
                    a <em className="italic text-sand">calendar.</em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-3 lg:col-start-10">
            <p className="leading-relaxed text-ivory/60">
              Tastings, ceremonies, workshops and music. Small groups, long tables.
            </p>
            <p className="mt-3 text-xs text-ivory/60">{eventsNote}</p>
          </Reveal>
        </div>

        <div
          className="relative mt-16 border-t border-ivory/12 lg:mt-24"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHovered(null)}
        >
          <ul>
            {events.map((ev) => (
              <EventRow key={ev.id} event={ev} onHover={setHovered} />
            ))}
          </ul>

          {/* Cursor-following preview (desktop, fine pointers) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.id}
                  className="absolute -top-32 left-0 h-64 w-[clamp(10rem,13vw,13rem)] overflow-hidden bg-coffee shadow-2xl shadow-obsidian/60"
                  initial={{ opacity: 0, transform: 'scale(0.92) rotate(-2deg)' }}
                  animate={{ opacity: 1, transform: 'scale(1) rotate(0deg)' }}
                  exit={{ opacity: 0, transform: 'scale(0.96) rotate(1deg)' }}
                  transition={{ duration: duration.base, ease: ease.cinema }}
                >
                  <Img name={active.image} alt="" sizes="210px" className="h-full w-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
