// Coffee origins shown in the Origin section.
//
// DEMO DATA: tasting notes, typical altitude ranges and processes are illustrative
// regional descriptions for the concept — not lot, farm or laboratory data. Replace
// with the roaster's own information before any production use.

export type Origin = {
  id: string
  name: string
  amharic: string
  notes: string[]
  description: string
  /** Typical regional range — not a specific lot. */
  altitude: string
  process: string
  roast: string
  image: string
  alt: string
  /** Position on the projected map (see ethiopiaMap.ts). */
  point: { x: number; y: number }
  /** Which side of the dot the map label sits on. */
  labelSide: 'left' | 'right'
  /** Vertical nudge for labels of neighbouring origins. */
  labelDy?: number
}

export const originsDisclaimer =
  'Illustrative regional profiles for this concept. Altitude, process and notes will come from the roaster’s own lots.'

export const origins: Origin[] = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    amharic: 'ይርጋጨፌ',
    notes: ['Floral', 'Citrus', 'Tea-like'],
    description:
      'Perhaps the most recognised name in Ethiopian coffee — delicate, aromatic cups that reward a slow filter brew.',
    altitude: '1,700 – 2,200 m',
    process: 'Washed & natural',
    roast: 'Light — for pour-over',
    image: 'origin-cherries-branch',
    alt: 'Ripe red and green coffee cherries clustered along a branch.',
    point: { x: 211.8, y: 350.8 },
    labelSide: 'left',
    labelDy: 4,
  },
  {
    id: 'guji',
    name: 'Guji',
    amharic: 'ጉጂ',
    notes: ['Stone Fruit', 'Chocolate', 'Floral'],
    description: 'Rounded and generous, with ripe fruit sweetness that holds up to both filter and espresso.',
    altitude: '1,800 – 2,300 m',
    process: 'Natural & washed',
    roast: 'Light-medium — filter or espresso',
    image: 'origin-cherries-hand',
    alt: 'An open palm holding freshly picked red coffee cherries.',
    point: { x: 240.4, y: 370.8 },
    labelSide: 'right',
  },
  {
    id: 'sidama',
    name: 'Sidama',
    amharic: 'ሲዳማ',
    notes: ['Berry', 'Citrus', 'Bright'],
    description: 'Lively and clear — a cup with energy, often our choice for a first morning pour-over.',
    altitude: '1,500 – 2,200 m',
    process: 'Washed & natural',
    roast: 'Light — for filter',
    image: 'origin-cherries-green',
    alt: 'Unripe green coffee cherries growing densely among dark leaves.',
    point: { x: 227.6, y: 327.6 },
    labelSide: 'right',
  },
  {
    id: 'harrar',
    name: 'Harrar',
    amharic: 'ሐረር',
    notes: ['Fruit', 'Spice', 'Deep Body'],
    description: 'From the east — wild, fruit-forward and spiced, with a weight that suits the jebena beautifully.',
    altitude: '1,500 – 2,100 m',
    process: 'Natural',
    roast: 'Medium — jebena & espresso',
    image: 'origin-valley',
    alt: 'A wide green valley of farmland and trees beneath a blue sky.',
    point: { x: 363.2, y: 227.3 },
    labelSide: 'right',
  },
  {
    id: 'limu',
    name: 'Limu',
    amharic: 'ሊሙ',
    notes: ['Balanced', 'Citrus', 'Sweet'],
    description: 'Poised and easy to love — gentle acidity and a clean, sweet finish for any time of day.',
    altitude: '1,400 – 2,100 m',
    process: 'Washed',
    roast: 'Medium — all-day filter',
    image: 'origin-hillside',
    alt: 'A green hillside dotted with trees and shade-grown plants.',
    point: { x: 163.0, y: 275.9 },
    labelSide: 'left',
    labelDy: -5,
  },
  {
    id: 'jimma',
    name: 'Jimma',
    amharic: 'ጅማ',
    notes: ['Earthy', 'Cocoa', 'Full'],
    description: 'Grounded and comforting, with the fuller body many associate with a traditional buna at home.',
    altitude: '1,400 – 2,000 m',
    process: 'Natural',
    roast: 'Medium-dark — jebena buna',
    image: 'origin-highlands',
    alt: 'Terraced green highlands and deep valleys under a bright sky.',
    point: { x: 158.3, y: 291.6 },
    labelSide: 'left',
    labelDy: 6,
  },
]
