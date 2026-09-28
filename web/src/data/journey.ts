export type JourneyStage = {
  index: string
  name: string
  title: string
  text: string
  image: string
  alt: string
}

export const journey: JourneyStage[] = [
  {
    index: '01',
    name: 'Origin',
    title: 'The Land',
    text: 'Every cup begins somewhere. We explore Ethiopia’s diverse coffee-growing regions and the distinct character each origin brings to the cup.',
    image: 'origin-highlands',
    alt: 'Terraced green highlands and deep valleys under a bright sky.',
  },
  {
    index: '02',
    name: 'Roast',
    title: 'The Transformation',
    text: 'Heat changes everything. Our roasting approach is designed to reveal the personality already present in the bean.',
    image: 'roast-drum',
    alt: 'Freshly roasted coffee beans tumbling from a drum roaster into the cooling tray.',
  },
  {
    index: '03',
    name: 'Brew',
    title: 'The Craft',
    text: 'Precision meets instinct — espresso, filter, and traditional jebena brewing, each prepared with intention.',
    image: 'brew-pourover',
    alt: 'A barista pours a slow spiral of water over a pour-over dripper on a scale.',
  },
  {
    index: '04',
    name: 'Share',
    title: 'The Table',
    text: 'The final step is never the cup. It is the moment around it.',
    image: 'share-table',
    alt: 'Two people across a wooden café table, hands around their coffee cups mid-conversation.',
  },
]
