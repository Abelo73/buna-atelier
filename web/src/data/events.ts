// DEMO DATA: sample events and dates for the concept — not real bookings.
export type CafeEvent = {
  id: string
  title: string
  category: string
  /** ISO date-time, local Addis Ababa time. */
  date: string
  description: string
  image: string
  alt: string
}

export const eventsNote = 'Sample dates — demo content for this concept.'

export const events: CafeEvent[] = [
  {
    id: 'tasting',
    title: 'Coffee Tasting',
    category: 'Tasting',
    date: '2026-10-10T10:00',
    description: 'Six Ethiopian origins, side by side. Learn to taste the difference between Yirgacheffe and Harrar.',
    image: 'cupping',
    alt: 'Cups of coffee laid out for a cupping on a steel counter.',
  },
  {
    id: 'ceremony',
    title: 'Ethiopian Coffee Ceremony',
    category: 'Ceremony',
    date: '2026-10-18T15:00',
    description: 'An unhurried afternoon of roasting, brewing and three rounds of buna, hosted at the long table.',
    image: 'ceremony-cups',
    alt: 'Small coffee cups arranged on a tray, ready to be filled.',
  },
  {
    id: 'roasting',
    title: 'Roasting Session',
    category: 'Workshop',
    date: '2026-10-24T11:00',
    description: 'From green bean to first crack — a hands-on morning with our roaster.',
    image: 'roast-scoop',
    alt: 'A metal scoop stirring freshly roasted coffee beans.',
  },
  {
    id: 'creative',
    title: 'Creative Evening',
    category: 'Community',
    date: '2026-11-05T18:30',
    description: 'Sketchbooks, notebooks and laptops welcome. Coffee until late and good company.',
    image: 'space-bar',
    alt: 'A busy café interior with long wooden tables and warm pendant lights.',
  },
  {
    id: 'jazz',
    title: 'Live Ethio-Jazz Night',
    category: 'Music',
    date: '2026-11-13T20:00',
    description: 'Horns, keys and the grooves of Addis — an evening in the courtyard with live musicians.',
    image: 'event-jazz',
    alt: 'A saxophonist performing under warm stage lights.',
  },
]
