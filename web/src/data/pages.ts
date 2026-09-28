// Route metadata — used for document titles, social cards and the generated sitemap.
export type PageMeta = { path: string; title: string; description: string }

export const siteTitle = 'Buna Atelier — Ethiopian Coffee, Reimagined'

export const pages: PageMeta[] = [
  {
    path: '/',
    title: siteTitle,
    description:
      'Buna Atelier is a contemporary Ethiopian coffee house concept in Addis Ababa, bringing together Ethiopian coffee heritage, specialty brewing, thoughtful food, and modern hospitality.',
  },
  {
    path: '/experience',
    title: 'The Experience — Buna Atelier',
    description:
      'The Ethiopian coffee ceremony, the three pours of abol, tona and bereka, and tastings at a contemporary Addis coffee house concept.',
  },
  {
    path: '/coffee',
    title: 'Coffee & Origins — Buna Atelier',
    description:
      'From Ethiopian soil to the Addis table: origin, roast, brew and share — Yirgacheffe, Guji, Sidama, Harrar, Limu and Jimma.',
  },
  {
    path: '/menu',
    title: 'Menu — Buna Atelier',
    description:
      'Coffee from espresso to jebena buna, signature drinks, tea, Ethiopian-inspired breakfast and pastries.',
  },
  {
    path: '/story',
    title: 'Our Story — Buna Atelier',
    description:
      'A modern table with an old memory — the story, space and materials behind a contemporary Ethiopian coffee house concept.',
  },
  {
    path: '/events',
    title: 'Events — Buna Atelier',
    description: 'Coffee tastings, coffee ceremonies, roasting sessions, creative evenings and live Ethio-jazz.',
  },
  {
    path: '/visit',
    title: 'Visit — Buna Atelier',
    description: 'Opening hours, location in Bole, Addis Ababa, and table reservations.',
  },
]

/** Public origin for canonical URLs, social cards and the sitemap. Set VITE_SITE_URL when deploying. */
export const defaultSiteUrl = 'https://buna-atelier.example'
