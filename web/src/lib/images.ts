/** Path to a locally served WebP rendition in /public/images. */
export function imgSrc(name: string, width: 800 | 1600 | 2400 = 1600) {
  return `/images/${name}-${width}.webp`
}
