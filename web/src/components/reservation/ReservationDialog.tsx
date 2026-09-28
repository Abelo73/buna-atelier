import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { hours, reservationConfig } from '../../data/visit'
import { formatLongDate, slotsFor } from '../../lib/hours'
import { duration, ease } from '../../lib/motion'
import {
  bookableRange,
  emptyReservation,
  validateReservation,
  type ReservationErrors,
  type ReservationValues,
} from '../../lib/reservation'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Img } from '../ui/Img'

type Props = { open: boolean; session: number; initialRequest: string; onClose: () => void }
type BodyProps = { initialRequest: string; onClose: () => void; titleId: string; descriptionId: string }
type Field = keyof ReservationValues

const inputBase =
  'mt-2 h-12 w-full border-b bg-transparent text-[1rem] text-obsidian transition-colors placeholder:text-ink/35 focus:outline-none'

function FieldShell({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className = '',
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label flex justify-between text-ink/70">
        {label}
        {optional && <span className="tracking-[0.12em] normal-case text-ink/70">Optional</span>}
      </label>
      {children}
      {/* The message line is always reserved, so errors never shift the layout under the pointer. */}
      <p
        id={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`mt-2 min-h-[1.25rem] text-[0.8125rem] leading-5 ${error ? 'text-rust' : 'text-ink/70'}`}
      >
        {error ?? hint}
      </p>
    </div>
  )
}

function ReservationBody({ initialRequest, onClose, titleId, descriptionId }: BodyProps) {
  const [values, setValues] = useState<ReservationValues>(() => emptyReservation(initialRequest))
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const errors: ReservationErrors = useMemo(() => validateReservation(values), [values])
  const visibleError = (f: Field) => (submitted || touched[f] ? errors[f] : undefined)
  const slots = useMemo(() => slotsFor(values.date), [values.date])
  const range = bookableRange()

  const set = (f: Field) => (e: { target: { value: string } }) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [f]: value, ...(f === 'date' ? { time: '' } : {}) }))
  }
  // Leaving an empty field is not an error yet — only fields with content are checked on blur.
  const blur = (f: Field) => () => values[f].trim() && setTouched((t) => ({ ...t, [f]: true }))

  const aria = (f: Field, hasHint = false) => {
    const err = visibleError(f)
    return {
      id: `res-${f}`,
      name: f,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? `res-${f}-error` : hasHint ? `res-${f}-hint` : undefined,
      onBlur: blur(f),
      className: `${inputBase} ${err ? 'border-rust' : 'border-obsidian/25 focus:border-clay'}`,
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setSubmitted(true)
    if (Object.keys(errors).length) {
      // Move focus to the first field that needs attention.
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('sending')
    // Demo submission: nothing leaves the browser.
    window.setTimeout(() => setStatus('done'), 900)
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="grid md:grid-cols-[2fr_3fr]">
      {/* Side panel */}
      <aside className="relative hidden overflow-hidden bg-coffee text-ivory md:block">
        <Img
          name="ceremony-cups"
          alt=""
          sizes="400px"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/60 to-coffee/20" />
        <div className="relative flex h-full flex-col justify-end p-9">
          <p lang="am" className="text-sand/80">
            ቡና አትሌየር
          </p>
          <p className="mt-3 font-display text-[2rem] leading-tight">Tables for two, or for the whole family.</p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-sm text-ivory/75">
            {hours.map((h) => (
              <div key={h.days} className="contents">
                <dt>{h.days}</dt>
                <dd className="tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <div className="relative p-7 sm:p-9">
        <AnimatePresence mode="wait" initial={false}>
          {status !== 'done' ? (
            <motion.div
              key="form"
              exit={{ opacity: 0, transform: 'translateY(-8px)' }}
              transition={{ duration: duration.base, ease: ease.cinema }}
            >
              <p className="label text-clay-ink">Reservations</p>
              <h2
                id={titleId}
                className="mt-2 font-display text-[clamp(2rem,1.4rem+1.6vw,2.75rem)] leading-none font-light"
              >
                Reserve a table
              </h2>
              <p id={descriptionId} className="mt-3 max-w-md text-ink/70">
                Send us a request and we will confirm by phone. {reservationConfig.demoNote}
              </p>

              <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-6">
                <FieldShell id="res-name" label="Name" error={visibleError('name')} className="sm:col-span-6">
                  <input
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={set('name')}
                    {...aria('name')}
                    data-autofocus
                  />
                </FieldShell>

                <FieldShell id="res-phone" label="Phone" error={visibleError('phone')} className="sm:col-span-3">
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+251 9…"
                    value={values.phone}
                    onChange={set('phone')}
                    {...aria('phone')}
                  />
                </FieldShell>

                <FieldShell
                  id="res-email"
                  label="Email"
                  optional
                  error={visibleError('email')}
                  className="sm:col-span-3"
                >
                  <input
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set('email')}
                    {...aria('email')}
                  />
                </FieldShell>

                <FieldShell id="res-date" label="Date" error={visibleError('date')} className="sm:col-span-2">
                  <input
                    type="date"
                    min={range.min}
                    max={range.max}
                    value={values.date}
                    onChange={set('date')}
                    {...aria('date')}
                  />
                </FieldShell>

                <FieldShell
                  id="res-time"
                  label="Time"
                  className="sm:col-span-2"
                  error={visibleError('time')}
                  hint={values.date ? undefined : 'Pick a date first.'}
                >
                  <select
                    value={values.time}
                    onChange={set('time')}
                    disabled={!values.date || !slots.length}
                    {...aria('time', !values.date)}
                  >
                    <option value="">{values.date ? 'Select a time' : '—'}</option>
                    {slots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </FieldShell>

                <FieldShell
                  id="res-guests"
                  label="Guests"
                  className="sm:col-span-2"
                  error={visibleError('guests')}
                  hint={
                    values.guests === 'more'
                      ? `For more than ${reservationConfig.maxGuestsOnline}, we will call to plan the table.`
                      : undefined
                  }
                >
                  <select value={values.guests} onChange={set('guests')} {...aria('guests', values.guests === 'more')}>
                    {Array.from({ length: reservationConfig.maxGuestsOnline }, (_, i) => String(i + 1)).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === '1' ? 'guest' : 'guests'}
                      </option>
                    ))}
                    <option value="more">More than {reservationConfig.maxGuestsOnline}</option>
                  </select>
                </FieldShell>

                <FieldShell
                  id="res-request"
                  label="Special request"
                  optional
                  error={visibleError('request')}
                  className="sm:col-span-6"
                >
                  <textarea
                    rows={2}
                    value={values.request}
                    onChange={set('request')}
                    placeholder="A quiet corner, a birthday, a highchair…"
                    {...aria('request')}
                    className={`${aria('request').className} h-auto resize-none py-3`}
                  />
                </FieldShell>

                <div className="flex flex-col gap-4 pt-1 sm:col-span-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.8125rem] text-rust" aria-live="polite">
                    {submitted && errorCount > 0
                      ? `Please check ${errorCount === 1 ? 'one field' : `${errorCount} fields`} above.`
                      : ''}
                  </p>
                  <Button
                    type="submit"
                    tone="dark"
                    arrow={status === 'idle'}
                    aria-disabled={status === 'sending' || undefined}
                    className="aria-disabled:cursor-wait aria-disabled:opacity-70"
                  >
                    {status === 'sending' ? 'Sending request…' : 'Request table'}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              role="status"
              // Mounts only after the form has exited, so focusing here always finds "Done".
              onAnimationStart={() => successRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()}
              ref={successRef}
              initial={{ opacity: 0, transform: 'translateY(12px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: duration.slow, ease: ease.cinema }}
              className="flex min-h-[28rem] flex-col"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-clay text-clay-ink">
                <Check size={20} strokeWidth={1.4} aria-hidden />
              </span>
              <h2 id={titleId} className="mt-8 font-display text-display-md font-light uppercase tracking-[0.04em]">
                Your table is requested
              </h2>
              <p id={descriptionId} className="mt-4 text-[1.0625rem] text-ink/75">
                We will confirm your reservation shortly.
              </p>

              <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-obsidian/10 pt-6 text-[0.9375rem]">
                <dt className="label pt-1 text-ink/70">Name</dt>
                <dd>{values.name}</dd>
                <dt className="label pt-1 text-ink/70">When</dt>
                <dd>
                  {formatLongDate(values.date)} · {values.time}
                </dd>
                <dt className="label pt-1 text-ink/70">Guests</dt>
                <dd>{values.guests === 'more' ? `More than ${reservationConfig.maxGuestsOnline}` : values.guests}</dd>
                {values.request.trim() && (
                  <>
                    <dt className="label pt-1 text-ink/70">Request</dt>
                    <dd className="text-ink/75">{values.request}</dd>
                  </>
                )}
              </dl>

              <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink/70">{reservationConfig.demoNote}</p>
                <Button tone="dark" onClick={onClose} data-autofocus>
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function ReservationDialog({ open, session, initialRequest, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="sm:max-w-5xl">
      {({ titleId, descriptionId }) => (
        // Keyed by session: every opening starts with a fresh form.
        <ReservationBody
          key={session}
          initialRequest={initialRequest}
          onClose={onClose}
          titleId={titleId}
          descriptionId={descriptionId}
        />
      )}
    </Dialog>
  )
}
