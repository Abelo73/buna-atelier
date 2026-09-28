import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { lazy, Suspense, useCallback, useState } from 'react'
import { footerNav, site, social } from '../../data/site'
import { hours, location } from '../../data/visit'
import { Logo } from '../ui/Logo'

const CreditsDialog = lazy(() => import('./CreditsDialog').then((m) => ({ default: m.CreditsDialog })))

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [creditsLoaded, setCreditsLoaded] = useState(false)
  const closeCredits = useCallback(() => setCreditsOpen(false), [])

  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-obsidian pt-20 text-ivory lg:pt-28">
      <div className="container-site">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" aria-label="Buna Atelier — home" className="inline-block">
              <Logo withAmharic />
            </Link>
            <p className="mt-10 font-display text-display-sm font-light text-ivory/90">
              {site.tagline[0]}
              <br />
              <em className="text-sand italic">{site.tagline[1]}</em>
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className="label text-ivory/60">Explore</p>
            <ul className="mt-5 flex flex-col">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="label inline-flex min-h-10 items-center text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="label text-ivory/60">Follow</p>
            <ul className="mt-5 flex flex-col">
              {social.map((s) => (
                <li key={s.label} className="min-h-10 flex items-center">
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory/75 hover:text-ivory"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-ivory/60">
                      {s.label} <span className="text-xs text-ivory/60">· at launch</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label text-ivory/60">Find us</p>
            <p className="mt-5 text-ivory/75">
              {location.city}, {location.country}
            </p>
            <dl className="mt-4 flex flex-col gap-1 text-sm text-ivory/60">
              {hours.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt>{h.days}</dt>
                  <dd className="tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/10 py-7 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between lg:mt-28">
          <p>
            © {site.year} {site.name.toUpperCase()} · {site.conceptNote}
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setCreditsLoaded(true)
                setCreditsOpen(true)
              }}
              className="min-h-10 cursor-pointer underline decoration-ivory/20 underline-offset-4 transition-colors hover:text-ivory"
            >
              Photo credits
            </button>
            <a
              href="#main"
              className="group inline-flex min-h-10 items-center gap-2 transition-colors hover:text-ivory"
            >
              Back to top
              <ArrowUp
                size={15}
                strokeWidth={1.4}
                aria-hidden
                className="transition-transform duration-(--duration-base) group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — the last thing you see */}
      {/* Drawn as SVG text: purely graphic, so it never reads as low-contrast body copy. */}
      <svg
        aria-hidden
        viewBox="0 0 1000 150"
        className="pointer-events-none block w-full select-none"
        preserveAspectRatio="xMidYMax meet"
      >
        <text x="500" y="150" textAnchor="middle" className="fill-ivory/[0.045] font-display text-[190px] font-light">
          Buna Atelier
        </text>
      </svg>

      {creditsLoaded && (
        <Suspense fallback={null}>
          <CreditsDialog open={creditsOpen} onClose={closeCredits} />
        </Suspense>
      )}
    </footer>
  )
}
