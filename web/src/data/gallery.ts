export type GalleryShape = 'portrait-lg' | 'landscape' | 'square' | 'panorama' | 'detail' | 'portrait'

export type GalleryImage = {
  image: string
  title: string
  alt: string
  shape: GalleryShape
}

// Order matters: the editorial grid places shapes in this sequence.
export const gallery: GalleryImage[] = [
  {
    image: 'brew-latte',
    title: 'The morning pour',
    alt: 'A barista in an apron pours steamed milk into a cup, drawing latte art.',
    shape: 'portrait-lg',
  },
  {
    image: 'roast-cooling',
    title: 'Fresh from the roaster',
    alt: 'Roasted beans pour from the drum into the cooling tray.',
    shape: 'portrait',
  },
  {
    image: 'ceramics',
    title: 'Handmade cups',
    alt: 'Stacked handmade ceramic cups with speckled glaze.',
    shape: 'square',
  },
  {
    image: 'ceramic-black',
    title: 'Black glaze',
    alt: 'A handmade cup glazed black and terracotta, on its saucer.',
    shape: 'square',
  },
  {
    image: 'space-garden',
    title: 'Afternoon light',
    alt: 'A café with tall windows looking out onto trees, tables set with lamps.',
    shape: 'landscape',
  },
  {
    image: 'beans-dark',
    title: 'The roast',
    alt: 'A dense field of dark roasted coffee beans.',
    shape: 'detail',
  },
  {
    image: 'smoke',
    title: 'Aroma',
    alt: 'Wisps of smoke curling upward against a dark background.',
    shape: 'panorama',
  },
]
