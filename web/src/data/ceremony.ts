export type CeremonyStep = {
  index: string
  name: string
  line: string
  detail: string
  image: string
  alt: string
}

export const ceremonySteps: CeremonyStep[] = [
  {
    index: '01',
    name: 'Roast',
    line: 'Green coffee meets heat.',
    detail: 'Beans are washed, then roasted in a shallow pan over coals — stirred until they crackle and darken.',
    image: 'ceremony-roast',
    alt: 'A hand stirs dark roasted coffee beans in a shallow pan with a long spoon.',
  },
  {
    index: '02',
    name: 'Grind',
    line: 'The aroma begins before the first sip.',
    detail: 'The roasted beans are often passed around so everyone can take in the smoke, then ground by hand.',
    image: 'ceremony-grind',
    alt: 'A woman in a patterned dress works a wooden mortar and pestle outdoors; a bowl of beans rests beside her.',
  },
  {
    index: '03',
    name: 'Brew',
    line: 'Coffee moves slowly through the jebena.',
    detail: 'The grounds go into the clay jebena with water and are brought gently to the boil, then left to settle.',
    image: 'ceremony-jebena',
    alt: 'A black clay jebena sits on a small stove beside a metal pot, steam rising.',
  },
  {
    index: '04',
    name: 'Pour',
    line: 'Small cups. A shared table.',
    detail: 'Poured from a height in one unbroken stream, so the grounds stay behind in the jebena.',
    image: 'ceremony-table',
    alt: 'Coffee poured from a jebena into rows of small white cups set in a woven wooden box.',
  },
  {
    index: '05',
    name: 'Gather',
    line: 'Stay for the conversation.',
    detail: 'The cups are passed hand to hand. Nobody is in a hurry — that is the point.',
    image: 'ceremony-share',
    alt: 'One hand passes a small cup of coffee to another across the table.',
  },
]

export const ceremonyNote =
  'The coffee ceremony is a ritual of hospitality, practised in many ways across regions, communities and families. We share it here as an invitation to slow down — not as a performance.'

export type Pour = {
  name: string
  amharic: string
  ordinal: string
  text: string
  /** Colour of the coffee in the illustration — each round is lighter. */
  tone: string
}

export const pours: Pour[] = [
  {
    name: 'Abol',
    amharic: 'አቦል',
    ordinal: 'First pour',
    text: 'The strongest and most aromatic of the three — the round that opens the table.',
    tone: '#24160f',
  },
  {
    name: 'Tona',
    amharic: 'ቶና',
    ordinal: 'Second pour',
    text: 'Brewed again from the same grounds. Softer, rounder — made for conversation.',
    tone: '#4a2e1f',
  },
  {
    name: 'Bereka',
    amharic: 'በረካ',
    ordinal: 'Third pour',
    text: 'Often translated as “blessing” — the gentle final round that closes the gathering.',
    tone: '#76513a',
  },
]

export const poursNote =
  'Abol, tona and bereka are commonly documented names for the three rounds. Like the ceremony itself, customs vary between regions, communities and families.'
