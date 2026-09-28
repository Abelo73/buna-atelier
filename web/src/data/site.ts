export const site = {
  name: 'Buna Atelier',
  amharic: 'ቡና አትሌየር',
  tagline: ['Ethiopian coffee.', 'Contemporary ritual.'],
  year: 2026,
  conceptNote: 'A concept project — not a real café.',
}

export const footerNav = [
  { label: 'Experience', href: '/experience' },
  { label: 'Coffee', href: '/coffee' },
  { label: 'Menu', href: '/menu' },
  { label: 'Story', href: '/story' },
  { label: 'Events', href: '/events' },
  { label: 'Visit', href: '/visit' },
]

/** Social accounts are listed by the spec but do not exist yet — `href: null` renders them as "at launch". */
export const social: { label: string; href: string | null }[] = [
  { label: 'Instagram', href: null },
  { label: 'Facebook', href: null },
  { label: 'TikTok', href: null },
]
