// Visit details for the concept. DEMO DATA: no real address or phone number
// is published — the brand spec forbids inventing them.

export const location = {
  area: 'Bole',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  coords: '8°59′N · 38°47′E',
  note: 'Concept location — the exact address will be announced at opening.',
  /** Directions to the neighbourhood, not to an invented street address. */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bole%2C%20Addis%20Ababa',
}

export const contact = {
  /** Set when a real number exists; until then the "Call us" action explains why it is unavailable. */
  phone: null as string | null,
  phoneNote: 'Phone line opens at launch — reserve online in the meantime.',
}

/** Opening hours by weekday (0 = Sunday), as minutes after midnight, Addis Ababa time. */
export const schedule: Record<number, { open: number; close: number }> = {
  0: { open: 8 * 60, close: 22 * 60 },
  1: { open: 7 * 60, close: 21 * 60 },
  2: { open: 7 * 60, close: 21 * 60 },
  3: { open: 7 * 60, close: 21 * 60 },
  4: { open: 7 * 60, close: 21 * 60 },
  5: { open: 7 * 60, close: 21 * 60 },
  6: { open: 8 * 60, close: 22 * 60 },
}

/** Display rows (demo hours from the brand spec). */
export const hours = [
  { days: 'Mon — Fri', time: '07:00 — 21:00', weekdays: [1, 2, 3, 4, 5] },
  { days: 'Sat — Sun', time: '08:00 — 22:00', weekdays: [0, 6] },
]

export const reservationConfig = {
  /** Last seating is this many minutes before closing. */
  lastSeatingBeforeClose: 60,
  slotMinutes: 30,
  maxDaysAhead: 60,
  maxGuestsOnline: 8,
  demoNote: 'Demo only — requests are not sent anywhere on this concept site.',
}
