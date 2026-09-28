import type { MenuItem } from '../../../data/menu'
import { LogoMark } from '../../ui/Logo'

/**
 * Typographic stand-in for items we have no true-to-life photograph of —
 * better an honest printed plate than a picture of a different dish.
 */
export function Plate({ item }: { item: MenuItem }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-coffee p-8 text-center text-sand">
      <span aria-hidden className="absolute inset-4 border border-sand/20" />
      <LogoMark className="h-10 w-auto opacity-60" />
      <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ivory italic">{item.name}</p>
      {item.tags && <p className="label text-sand/70">{item.tags.join(' · ')}</p>}
    </div>
  )
}
