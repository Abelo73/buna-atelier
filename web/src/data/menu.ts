// Menu content. DEMO DATA: items and prices are illustrative for the concept.

export type MenuCategory = 'coffee' | 'signature' | 'tea' | 'food' | 'pastries'

export type MenuItem = {
  id: string
  name: string
  category: MenuCategory
  description: string
  tastingNotes?: string[]
  /** In `menuConfig.currency`. Omit for "price on request". */
  price?: number
  /** Base name in /public/images. Items without a true-to-life photo get a typographic plate. */
  image?: string
  imageAlt?: string
  featured?: boolean
  tags?: string[]
}

export const menuConfig = {
  currency: 'ETB',
  showPrices: true,
  priceNote: 'Demo prices in Ethiopian birr, for illustration only.',
}

export const menuCategories: { id: MenuCategory; label: string; blurb: string }[] = [
  { id: 'coffee', label: 'Coffee', blurb: 'Ethiopian beans, espresso to jebena.' },
  { id: 'signature', label: 'Signature', blurb: 'Drinks you will only find here.' },
  { id: 'tea', label: 'Tea', blurb: 'Warm, spiced, unhurried.' },
  { id: 'food', label: 'Food', blurb: 'Breakfast through a light lunch.' },
  { id: 'pastries', label: 'Pastries', blurb: 'Baked each morning.' },
]

export const menu: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'coffee',
    description: 'A double shot of our house Ethiopian espresso — dense, sweet and quick to disappear.',
    tastingNotes: ['Cocoa', 'Stone fruit'],
    price: 120,
    image: 'menu-espresso',
    imageAlt: 'A double espresso pouring from the machine into two small glasses.',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    category: 'coffee',
    description: 'The Addis way: espresso and silky steamed milk, layered in a glass.',
    tastingNotes: ['Caramel', 'Silky'],
    price: 140,
    image: 'menu-macchiato',
    imageAlt: 'A hand holding a glass macchiato topped with latte art.',
    featured: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    description: 'Espresso with a thick, velvety cap of foam.',
    tastingNotes: ['Chocolate', 'Round'],
    price: 180,
    image: 'cup-flat-white',
    imageAlt: 'Two cups of milky coffee with latte art on a dark tray.',
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'coffee',
    description: 'Espresso lengthened with hot water — clean and quietly bold.',
    tastingNotes: ['Dark sugar', 'Clean'],
    price: 150,
    image: 'menu-americano',
    imageAlt: 'An overhead view of a cup of coffee with golden crema on a black surface.',
  },
  {
    id: 'pour-over',
    name: 'Pour Over',
    category: 'coffee',
    description: 'A rotating single origin, brewed by hand to order. Ask what is on the bar today.',
    tastingNotes: ['Floral', 'Bright'],
    price: 260,
    image: 'brew-pourover',
    imageAlt: 'A barista pours water over a pour-over dripper on a scale.',
  },
  {
    id: 'jebena-buna',
    name: 'Jebena Buna',
    category: 'coffee',
    description:
      'Traditional coffee brewed in a clay jebena and poured into small cups — three rounds, served with kolo.',
    tastingNotes: ['Full', 'Spiced', 'Smoky'],
    price: 300,
    image: 'hero-jebena',
    imageAlt: 'Coffee poured from a clay jebena into a small white cup.',
    featured: true,
    tags: ['For the table'],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    category: 'coffee',
    description: 'Steeped slowly overnight, served over ice.',
    tastingNotes: ['Cocoa', 'Smooth'],
    price: 220,
    image: 'cold-brew',
    imageAlt: 'A glass of iced cold brew with a layer of cream on a wooden table.',
  },

  // Signature
  {
    id: 'buna-cloud',
    name: 'Buna Cloud',
    category: 'signature',
    description: 'Espresso, wild honey and steamed milk — soft as its name.',
    tastingNotes: ['Warm', 'Silky', 'Floral'],
    price: 240,
    image: 'cup-black',
    imageAlt: 'A black cup of milky coffee with latte art on a wooden table.',
    featured: true,
  },
  {
    id: 'abyssinian-tonic',
    name: 'Abyssinian Tonic',
    category: 'signature',
    description: 'Cold brew over tonic with a twist of citrus.',
    tastingNotes: ['Citrus', 'Bitter-sweet', 'Sparkling'],
    price: 260,
    image: 'cold-tonic',
    imageAlt: 'A dark iced coffee drink with a dried orange slice.',
  },
  {
    id: 'highland-pour',
    name: 'Highland Pour',
    category: 'signature',
    description: 'Single-origin Ethiopian filter coffee, served with a card of tasting notes.',
    tastingNotes: ['Jasmine', 'Citrus', 'Tea-like'],
    price: 320,
    image: 'cupping',
    imageAlt: 'Several cups of coffee laid out for tasting on a steel counter.',
  },
  {
    id: 'tena-adam',
    name: 'Buna with Tena Adam',
    category: 'signature',
    description: 'Jebena coffee served with a sprig of tena adam (rue), the way many Addis homes take it.',
    tastingNotes: ['Herbal', 'Bold'],
    price: 260,
    image: 'ceremony-table',
    imageAlt: 'Coffee poured from a jebena into rows of small white cups.',
  },

  // Tea
  {
    id: 'spiced-shai',
    name: 'Spiced Shai',
    category: 'tea',
    description: 'Black tea simmered with cinnamon, cardamom and clove.',
    tastingNotes: ['Warm spice'],
    price: 90,
    image: 'menu-tea',
    imageAlt: 'A tall glass of dark tea in a sunlit room.',
  },
  {
    id: 'ginger-honey',
    name: 'Ginger & Honey',
    category: 'tea',
    description: 'Fresh ginger, lemon and local honey.',
    price: 110,
  },
  {
    id: 'mint-green',
    name: 'Mint Green Tea',
    category: 'tea',
    description: 'Green tea with a handful of fresh mint.',
    price: 100,
  },

  // Food
  {
    id: 'chechebsa',
    name: 'Chechebsa',
    category: 'food',
    description: 'Torn flatbread tossed in spiced butter and berbere, with honey and yogurt.',
    price: 320,
    tags: ['Breakfast'],
    featured: true,
  },
  {
    id: 'ful',
    name: 'Ful',
    category: 'food',
    description: 'Slow-cooked fava beans with tomato, green chilli, a soft egg and warm bread.',
    price: 280,
    tags: ['Breakfast', 'Vegetarian'],
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'food',
    description: 'Sourdough, crushed avocado, soft cheese, tomato and a little mitmita.',
    price: 300,
    image: 'menu-avocado',
    imageAlt: 'Avocado toast topped with crumbled cheese and tomatoes.',
    tags: ['Vegetarian'],
  },
  {
    id: 'shiro',
    name: 'Shiro & Injera',
    category: 'food',
    description: 'Silky chickpea stew with seasonal greens and fresh injera — our light lunch.',
    price: 340,
    tags: ['Lunch', 'Vegan'],
  },

  // Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    category: 'pastries',
    description: 'Laminated by hand, baked every morning.',
    price: 130,
    image: 'croissant',
    imageAlt: 'Two golden croissants dusted with flour on a dark board.',
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    category: 'pastries',
    description: 'Twice-baked with almond cream.',
    price: 160,
    image: 'croissants-tray',
    imageAlt: 'A tray of freshly baked croissants.',
  },
  {
    id: 'cardamom-bun',
    name: 'Cardamom Bun',
    category: 'pastries',
    description: 'A soft knot of dough with cardamom sugar — perfect beside a macchiato.',
    price: 140,
    image: 'menu-bun',
    imageAlt: 'A twisted cardamom bun on a white plate beside a glass of coffee.',
  },
  {
    id: 'ambasha',
    name: 'Ambasha & Honey',
    category: 'pastries',
    description: 'A slice of lightly spiced celebration bread with butter and local honey.',
    price: 120,
  },
]

/** The hero drink in the Signature showcase. */
export const signatureDrink = {
  itemId: 'buna-cloud',
  ingredients: ['Espresso', 'Honey', 'Milk'],
  story:
    'Our house espresso, softened with wild honey and poured under a cloud of steamed milk. Gentle enough for the first cup of the day, interesting enough for the third.',
}
