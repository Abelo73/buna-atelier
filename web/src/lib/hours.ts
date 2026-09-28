import { reservationConfig, schedule } from '../data/visit'

const TZ = 'Africa/Addis_Ababa'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const toHHMM = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

/** The current date, weekday and minute of the day in Addis Ababa, whatever the visitor's time zone. */
export function addisNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  return {
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
    weekday: WEEKDAYS.indexOf(parts.weekday),
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  }
}

export function openStatus(now = new Date()) {
  const { weekday, minutes } = addisNow(now)
  const today = schedule[weekday]
  if (minutes >= today.open && minutes < today.close) {
    return { open: true, label: `Open now · until ${toHHMM(today.close)}` }
  }
  if (minutes < today.open) return { open: false, label: `Closed · opens today at ${toHHMM(today.open)}` }
  const tomorrow = schedule[(weekday + 1) % 7]
  return { open: false, label: `Closed · opens tomorrow at ${toHHMM(tomorrow.open)}` }
}

/** Weekday (0 = Sunday) of a YYYY-MM-DD string, independent of the viewer's time zone. */
export function weekdayOf(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export function addDays(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

/** Bookable arrival times for a date; past times are removed when the date is today in Addis. */
export function slotsFor(isoDate: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return []
  const { open, close } = schedule[weekdayOf(isoDate)]
  const last = close - reservationConfig.lastSeatingBeforeClose
  const current = addisNow(now)
  const earliest = isoDate === current.isoDate ? current.minutes + 30 : 0
  const slots: string[] = []
  for (let t = open; t <= last; t += reservationConfig.slotMinutes) {
    if (t >= earliest) slots.push(toHHMM(t))
  }
  return slots
}

export function formatLongDate(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}
