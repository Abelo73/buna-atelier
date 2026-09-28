import type { ImgHTMLAttributes } from 'react'
import { imgSrc } from '../../lib/images'

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  /** Base name in /public/images, e.g. "hero-jebena". */
  name: string
  alt: string
  /** Include the 2400w source (hero-scale images only). */
  xl?: boolean
  priority?: boolean
}

/** Responsive WebP with sensible lazy-loading defaults. */
export function Img({ name, alt, xl, priority, sizes = '100vw', ...rest }: ImgProps) {
  const srcSet = [`${imgSrc(name, 800)} 800w`, `${imgSrc(name, 1600)} 1600w`, xl && `${imgSrc(name, 2400)} 2400w`]
    .filter(Boolean)
    .join(', ')

  return (
    <img
      src={imgSrc(name, 1600)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      draggable={false}
      {...rest}
    />
  )
}
