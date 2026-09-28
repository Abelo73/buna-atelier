/*
 * "Cover" box for the 2:3 hero photograph, in pure CSS: the parent is a size
 * container and this box takes whichever of width/height overflows. Anything
 * placed inside it (the aroma SVG) stays pinned to the photo's own coordinates.
 */
export const coverBox =
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100cqw,calc(100cqh*2/3))] h-[max(100cqh,calc(100cqw*3/2))]'

/** Where the cup sits in the hero photo — zooms settle around it. */
export const CUP_ORIGIN = '72% 66%'
