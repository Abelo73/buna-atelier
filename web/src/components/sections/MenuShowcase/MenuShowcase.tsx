import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useCallback, useDeferredValue, useMemo, useState, type KeyboardEvent } from 'react'
import { menu, menuCategories, menuConfig, type MenuCategory, type MenuItem } from '../../../data/menu'
import { formatPrice } from '../../../lib/format'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'
import { MenuItemDialog } from './MenuItemDialog'
import { Plate } from './Plate'

type Filter = 'all' | MenuCategory

const roman = ['I', 'II', 'III', 'IV', 'V']

function matches(item: MenuItem, query: string) {
  if (!query) return true
  const haystack = [item.name, item.description, ...(item.tastingNotes ?? []), ...(item.tags ?? [])]
    .join(' ')
    .toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word))
}

/* ------------------------------------------------------------------ */

function MenuRow({ item, onOpen, onPreview }: { item: MenuItem; onOpen: () => void; onPreview: () => void }) {
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.base, ease: ease.cinema }}
      className="border-b border-ivory/10"
    >
      <button
        type="button"
        data-menu-item
        data-cursor="View"
        onClick={onOpen}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        aria-haspopup="dialog"
        className="group grid w-full cursor-pointer grid-cols-[1fr_auto] gap-x-5 py-6 text-left transition-colors duration-(--duration-base) hover:bg-ivory/[0.03] focus-visible:bg-ivory/[0.05] sm:py-7"
      >
        <span className="min-w-0">
          <span className="flex items-baseline gap-4">
            <span className="font-display text-[1.75rem] leading-tight text-ivory transition-transform duration-(--duration-base) ease-(--ease-cinema) group-hover:translate-x-1.5 sm:text-[2rem]">
              {item.name}
            </span>
            <span
              aria-hidden
              className="hidden flex-1 translate-y-[-0.35em] border-b border-dotted border-ivory/25 sm:block"
            />
            <span className="hidden font-sans text-sm text-sand tabular-nums sm:block">{formatPrice(item.price)}</span>
          </span>
          <span className="mt-2 block max-w-xl text-[0.9375rem] leading-relaxed text-ivory/60">{item.description}</span>
          <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            {item.tastingNotes && <span className="label text-brass">{item.tastingNotes.join(' · ')}</span>}
            {item.tags?.map((t) => (
              <span key={t} className="label text-ivory/60">
                {t}
              </span>
            ))}
            <span className="font-sans text-sm text-sand tabular-nums sm:hidden">{formatPrice(item.price)}</span>
          </span>
        </span>

        {/* Mobile thumbnail / desktop affordance */}
        <span className="flex items-start">
          {item.image ? (
            <span className="block h-18 w-18 overflow-hidden bg-obsidian/40 lg:hidden">
              <Img name={item.image} alt="" sizes="72px" className="h-full w-full object-cover" />
            </span>
          ) : null}
          <ArrowUpRight
            aria-hidden
            size={20}
            strokeWidth={1.2}
            className="mt-2.5 hidden -translate-x-1 text-sand opacity-0 transition-[opacity,transform] duration-(--duration-base) group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block"
          />
        </span>
      </button>
    </motion.li>
  )
}

function Preview({ item }: { item: MenuItem | undefined }) {
  return (
    <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden bg-obsidian/40 lg:block">
      <AnimatePresence initial={false}>
        {item && (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.slow, ease: ease.cinema }}
          >
            {item.image ? (
              <Img name={item.image} alt="" sizes="30vw" className="h-full w-full object-cover" />
            ) : (
              <Plate item={item} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuGroup({
  category,
  items,
  index,
  onOpen,
  headingLevel,
}: {
  /** h3 under the home page's h2; h2 on the standalone /menu page (under its h1). */
  headingLevel: 'h2' | 'h3'
  category: (typeof menuCategories)[number]
  items: MenuItem[]
  index: number
  onOpen: (item: MenuItem) => void
}) {
  const Heading = headingLevel
  const initial = items.find((i) => i.featured && i.image) ?? items.find((i) => i.image) ?? items[0]
  const [previewId, setPreviewId] = useState(initial?.id)
  const preview = items.find((i) => i.id === previewId) ?? initial

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.base }}
      className="grid gap-6 border-t border-ivory/12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="label text-sand/70">{roman[index]}</p>
          <Heading className="mt-3 font-display text-display-md font-light text-ivory">{category.label}</Heading>
          <p className="mt-2 text-ivory/60">{category.blurb}</p>
          <Preview item={preview} />
        </div>
      </div>
      <ul className="lg:col-span-7 lg:col-start-6">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <MenuRow key={item.id} item={item} onOpen={() => onOpen(item)} onPreview={() => setPreviewId(item.id)} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */

export function MenuShowcase({ standalone = false }: { standalone?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim())
  const [openItem, setOpenItem] = useState<MenuItem | null>(null)
  const close = useCallback(() => setOpenItem(null), [])

  const groups = useMemo(
    () =>
      menuCategories
        .map((c, i) => ({
          category: c,
          index: i,
          items: menu.filter(
            (m) => m.category === c.id && (filter === 'all' || filter === c.id) && matches(m, deferredQuery),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [filter, deferredQuery],
  )
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  const counts = useMemo(() => {
    const byCat = Object.fromEntries(menuCategories.map((c) => [c.id, menu.filter((m) => m.category === c.id).length]))
    return { all: menu.length, ...byCat } as Record<Filter, number>
  }, [])

  // Arrow keys move between items, like a printed list you can run a finger down.
  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[data-menu-item]')]
    const at = items.indexOf(document.activeElement as HTMLElement)
    if (at === -1) return
    e.preventDefault()
    items[Math.min(items.length - 1, Math.max(0, at + (e.key === 'ArrowDown' ? 1 : -1)))]?.focus()
  }

  const Title = standalone ? 'h1' : 'h2'
  const filters: { id: Filter; label: string }[] = [{ id: 'all', label: 'All' }, ...menuCategories]

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className={`relative bg-coffee pb-(--spacing-section) ${standalone ? 'pt-36 lg:pt-48' : 'pt-(--spacing-section)'}`}
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal className="text-sand" y={12}>
              <Eyebrow index={standalone ? undefined : '06'}>The Menu</Eyebrow>
            </Reveal>
            <Title
              id="menu-title"
              className="mt-6 font-display font-light text-[min(8.6vw,2.6rem)] leading-[1.02] text-ivory sm:text-display-lg"
            >
              <MaskLines
                immediate={standalone}
                lines={[
                  'Made for slow mornings',
                  <>
                    and long <em className="italic text-sand">conversations.</em>
                  </>,
                ]}
              />
            </Title>
          </div>
          {menuConfig.showPrices && (
            <Reveal className="lg:col-span-3 lg:col-start-10">
              <p className="text-sm leading-relaxed text-ivory/60">{menuConfig.priceNote}</p>
            </Reveal>
          )}
        </div>

        {/* Controls */}
        <div className="mt-14 flex flex-col gap-5 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-(--spacing-gutter) flex snap-x scroll-px-(--spacing-gutter) gap-2 overflow-x-auto px-(--spacing-gutter) pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0"
          >
            {filters.map((f) => {
              const on = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`label flex min-h-11 shrink-0 cursor-pointer snap-start items-center gap-2.5 border px-4 transition-colors duration-(--duration-base) ${
                    on
                      ? 'border-sand bg-sand text-coffee'
                      : 'border-ivory/20 text-ivory/75 hover:border-ivory/50 hover:text-ivory'
                  }`}
                >
                  {f.label}
                  <span className={`tabular-nums ${on ? 'text-coffee/80' : 'text-ivory/60'}`}>{counts[f.id]}</span>
                </button>
              )
            })}
          </div>

          <div className="relative lg:w-80">
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <Search
              aria-hidden
              size={17}
              strokeWidth={1.4}
              className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-ivory/60"
            />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — honey, jebena, vegan…"
              autoComplete="off"
              className="h-12 w-full border-b border-ivory/25 bg-transparent pr-10 pl-8 text-ivory placeholder:text-ivory/35 focus:border-sand focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-0 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center text-ivory/60 hover:text-ivory"
              >
                <X size={16} strokeWidth={1.4} />
              </button>
            )}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {total} {total === 1 ? 'item' : 'items'} shown
        </p>

        {/* Groups */}
        <div className="mt-10 flex flex-col gap-16 lg:mt-14 lg:gap-24" onKeyDown={onListKeyDown}>
          <AnimatePresence initial={false} mode="popLayout">
            {groups.map((g) => (
              <MenuGroup
                key={g.category.id}
                headingLevel={standalone ? 'h2' : 'h3'}
                category={g.category}
                items={g.items}
                index={g.index}
                onOpen={setOpenItem}
              />
            ))}
          </AnimatePresence>

          {total === 0 && (
            <div className="border-t border-ivory/12 py-16 text-center">
              <p className="font-display text-display-sm text-ivory">Nothing matches “{deferredQuery}”.</p>
              <p className="mt-3 text-ivory/60">Try “honey”, “jebena” or “breakfast” — or clear the search.</p>
            </div>
          )}
        </div>
      </div>

      <MenuItemDialog item={openItem} onClose={close} />
    </section>
  )
}
