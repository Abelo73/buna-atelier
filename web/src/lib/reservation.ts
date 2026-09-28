import { reservationConfig } from '../data/visit'
import { addDays, addisNow, slotsFor } from './hours'

export type ReservationValues = {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  request: string
}

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>

export const emptyReservation = (request = ''): ReservationValues => ({
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  request,
})

export function bookableRange(now = new Date()) {
  const today = addisNow(now).isoDate
  return { min: today, max: addDays(today, reservationConfig.maxDaysAhead) }
}

export function validateReservation(v: ReservationValues, now = new Date()): ReservationErrors {
  const e: ReservationErrors = {}
  const { min, max } = bookableRange(now)

  if (v.name.trim().length < 2) e.name = 'Please tell us your name.'

  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) e.phone = 'We need a phone number to confirm your table.'
  else if (digits.length < 9 || digits.length > 15 || /[^\d\s+()-]/.test(v.phone))
    e.phone = 'That doesn’t look like a phone number — try +251 9… or 09…'

  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'Please check the email address.'

  if (!v.date) e.date = 'Choose a date.'
  else if (v.date < min) e.date = 'That date has already passed.'
  else if (v.date > max) e.date = `We take requests up to ${reservationConfig.maxDaysAhead} days ahead.`

  if (!e.date) {
    const slots = slotsFor(v.date, now)
    if (!slots.length) e.date = 'No tables left today — please choose another day.'
    else if (!v.time) e.time = 'Choose a time.'
    else if (!slots.includes(v.time)) e.time = 'Please pick one of the available times.'
  }

  if (!v.guests) e.guests = 'How many guests?'

  if (v.request.length > 500) e.request = 'Please keep requests under 500 characters.'

  return e
}
