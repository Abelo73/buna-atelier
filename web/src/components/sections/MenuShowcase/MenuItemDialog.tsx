import { menuCategories, menuConfig, type MenuItem } from '../../../data/menu'
import { formatPrice } from '../../../lib/format'
import { Dialog } from '../../ui/Dialog'
import { Img } from '../../ui/Img'
import { Plate } from './Plate'

type Props = { item: MenuItem | null; onClose: () => void }

export function MenuItemDialog({ item, onClose }: Props) {
  return (
    <Dialog open={item !== null} onClose={onClose}>
      {({ titleId, descriptionId }) =>
        item && (
          <div className="grid sm:grid-cols-2">
            <div className="relative aspect-[4/3] bg-coffee sm:aspect-auto sm:min-h-[30rem]">
              {item.image ? (
                <Img
                  name={item.image}
                  alt={item.imageAlt ?? ''}
                  sizes="(min-width: 40rem) 450px, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Plate item={item} />
              )}
            </div>

            <div className="flex flex-col p-7 sm:p-10">
              <p className="label text-clay-ink">{menuCategories.find((c) => c.id === item.category)?.label}</p>
              <h3 id={titleId} className="mt-4 font-display text-display-md font-light">
                {item.name}
              </h3>
              <p id={descriptionId} className="mt-5 leading-relaxed text-ink/75">
                {item.description}
              </p>

              {item.tastingNotes && (
                <div className="mt-8">
                  <p className="label text-ink/70">Tasting notes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.tastingNotes.map((n) => (
                      <li key={n} className="border border-obsidian/15 px-3 py-1.5 text-sm">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.tags && <p className="label mt-6 text-ink/70">{item.tags.join(' · ')}</p>}

              <div className="mt-10 flex items-end justify-between gap-6 border-t border-obsidian/10 pt-6 sm:mt-auto">
                <p className="font-display text-[2rem] leading-none whitespace-nowrap tabular-nums">
                  {formatPrice(item.price)}
                </p>
                {menuConfig.showPrices && <p className="text-right text-xs text-ink/70">{menuConfig.priceNote}</p>}
              </div>
            </div>
          </div>
        )
      }
    </Dialog>
  )
}
