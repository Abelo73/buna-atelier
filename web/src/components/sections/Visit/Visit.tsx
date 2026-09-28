import { useEffect, useState } from 'react'
import { contact, hours, location } from '../../../data/visit'
import { addisNow, openStatus } from '../../../lib/hours'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { useReservation } from '../../reservation/context'
import { Button, ButtonLink } from '../../ui/Button'
import { Eyebrow } from '../../ui/Eyebrow'
import { LocationMark } from './LocationMark'

/** Re-evaluates the Addis Ababa clock every minute. */
function useAddisClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(t)
  }, [])
  return now
}

export function Visit() {
  const { openReservation } = useReservation()
  const now = useAddisClock()
  const status = openStatus(now)
  const today = addisNow(now).weekday
  const [showCallNote, setShowCallNote] = useState(false)

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-obsidian py-(--spacing-section)">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal className="text-sand" y={12}>
            <Eyebrow index="14">Visit</Eyebrow>
          </Reveal>
          <h2 id="visit-title" className="mt-6 font-display text-display-xl font-light text-ivory">
            <MaskLines
              lines={[
                'Come sit',
                <>
                  with <em className="italic text-sand">us.</em>
                </>,
              ]}
            />
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20">
            <Reveal>
              <p className="label text-ivory/60">Find us</p>
              <p className="mt-4 font-display text-display-sm text-ivory">
                {location.area} · {location.city}
              </p>
              <p className="mt-1 text-ivory/60">{location.country}</p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">{location.note}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="label text-ivory/60">Hours</p>
              <dl className="mt-4 flex flex-col gap-3">
                {hours.map((h) => {
                  const isToday = h.weekdays.includes(today)
                  return (
                    <div
                      key={h.days}
                      className={`flex justify-between gap-6 border-b pb-3 ${isToday ? 'border-sand/40' : 'border-ivory/10'}`}
                    >
                      <dt className={isToday ? 'text-ivory' : 'text-ivory/60'}>
                        {h.days}
                        {isToday && <span className="sr-only"> (today)</span>}
                      </dt>
                      <dd className={`tabular-nums ${isToday ? 'text-ivory' : 'text-ivory/60'}`}>{h.time}</dd>
                    </div>
                  )
                })}
              </dl>
              <p className="mt-4 flex items-center gap-2.5 text-sm text-ivory/75">
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${status.open ? 'bg-[#7fa37a] shadow-[0_0_0_4px_rgba(127,163,122,0.18)]' : 'bg-ivory/35'}`}
                />
                {status.label}
                <span className="text-ivory/60">· Addis time</span>
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center" delay={0.15}>
            <Button arrow aria-haspopup="dialog" onClick={() => openReservation()}>
              Reserve a table
            </Button>
            <ButtonLink href={location.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline">
              Get directions <span className="sr-only">(opens Google Maps in a new tab)</span>
            </ButtonLink>
            {contact.phone ? (
              <ButtonLink href={`tel:${contact.phone.replace(/\s/g, '')}`} variant="line">
                Call us
              </ButtonLink>
            ) : (
              <Button
                variant="line"
                aria-disabled="true"
                aria-describedby="call-note"
                onClick={() => setShowCallNote(true)}
                className="self-start opacity-70 sm:self-auto"
              >
                Call us
              </Button>
            )}
          </Reveal>
          {!contact.phone && (
            <p id="call-note" className={showCallNote ? 'mt-3 text-sm text-ivory/60' : 'sr-only'}>
              {contact.phoneNote}
            </p>
          )}
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <LocationMark className="aspect-square w-full" />
        </Reveal>
      </div>
    </section>
  )
}
