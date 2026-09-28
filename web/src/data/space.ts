export type Zone = {
  id: string
  index: string
  name: string
  purpose: string
  text: string
  image: string
  alt: string
  /** Area on the floor-plan diagram (viewBox 0 0 300 200). */
  plan: { x: number; y: number; w: number; h: number }
}

export const zones: Zone[] = [
  {
    id: 'bar',
    index: '01',
    name: 'The Bar',
    purpose: 'For the curious.',
    text: 'Pull up a stool and watch the espresso, filter and jebena come together. Ask questions — we like them.',
    image: 'zone-bar',
    alt: 'Close-up of a polished espresso machine with warm lights on the bar behind it.',
    plan: { x: 22, y: 22, w: 118, h: 42 },
  },
  {
    id: 'table',
    index: '02',
    name: 'The Table',
    purpose: 'For conversation.',
    text: 'Long tables and round ones, built for groups that arrive for one coffee and stay for three.',
    image: 'space-bench',
    alt: 'Round wooden tables beside a long leather banquette and a wall of warm wooden slats.',
    plan: { x: 22, y: 78, w: 150, h: 100 },
  },
  {
    id: 'corner',
    index: '03',
    name: 'The Corner',
    purpose: 'For quiet work.',
    text: 'A softer, quieter room with good light, plenty of sockets and nobody asking you to move along.',
    image: 'zone-corner',
    alt: 'A person reads alone at a small table against a warm plastered wall.',
    plan: { x: 152, y: 22, w: 58, h: 42 },
  },
  {
    id: 'courtyard',
    index: '04',
    name: 'The Courtyard',
    purpose: 'For slow afternoons.',
    text: 'Open to the Addis sky, shaded by trees and clay walls — the best seat when the afternoon light turns gold.',
    image: 'zone-courtyard',
    alt: 'Iron chairs and a small table lined up against a sunlit terracotta wall.',
    plan: { x: 222, y: 22, w: 56, h: 156 },
  },
]

export type Material = {
  name: string
  line: string
  image: string
  alt: string
}

export const materials: Material[] = [
  {
    name: 'Clay',
    line: 'The jebena, the cups, the plastered walls — earth, shaped by hand.',
    image: 'material-clay',
    alt: 'Close-up of pale, hand-finished clay vessels.',
  },
  {
    name: 'Wood',
    line: 'Dark timber, worn smooth by elbows and long conversations.',
    image: 'material-wood',
    alt: 'Close-up of dark wood grain.',
  },
  {
    name: 'Textile',
    line: 'Woven cotton with the quiet texture of a netela.',
    image: 'material-textile',
    alt: 'Close-up of woven fibres and loose threads on a loom.',
  },
  {
    name: 'Coffee',
    line: 'Our palette begins in the roast — and in the smoke that rises from it.',
    image: 'ceremony-incense',
    alt: 'Smoke curling up from roasted coffee beans on a brass spoon.',
  },
  {
    name: 'Light',
    line: 'Addis afternoons, slanting through the windows and across the walls.',
    image: 'material-light',
    alt: 'Soft shadows of leaves falling across a pale wall.',
  },
]
