import { credits } from '../../data/credits'
import { Dialog } from '../ui/Dialog'

export function CreditsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  // One line per photographer, listing how many of their photos appear.
  const byPhotographer = Object.entries(
    credits.reduce<Record<string, { url: string; count: number }>>((acc, c) => {
      acc[c.photographer] ??= { url: c.url, count: 0 }
      acc[c.photographer].count++
      return acc
    }, {}),
  ).sort(([a], [b]) => a.localeCompare(b))

  return (
    <Dialog open={open} onClose={onClose} className="sm:max-w-2xl">
      {({ titleId, descriptionId }) => (
        <div className="p-7 sm:p-10">
          <p className="label text-clay-ink">Colophon</p>
          <h2 id={titleId} className="mt-3 font-display text-display-md font-light">
            Photography
          </h2>
          <p id={descriptionId} className="mt-4 max-w-md text-ink/70">
            All photographs are from Unsplash, used under the Unsplash License. Thank you to:
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {byPhotographer.map(([name, { url, count }]) => (
              <li key={name} className="flex items-baseline justify-between gap-4 border-b border-obsidian/10 py-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-obsidian/20 underline-offset-4 transition-colors hover:decoration-clay"
                >
                  {name}
                </a>
                {count > 1 && <span className="text-xs text-ink/70 tabular-nums">×{count}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-ink/70">
            Type: Cormorant Garamond, Manrope and Noto Serif Ethiopic. Map outline: Natural Earth (public domain).
          </p>
        </div>
      )}
    </Dialog>
  )
}
