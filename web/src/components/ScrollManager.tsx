import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Route-level scrolling: new pages start at the top, and links such as
 * "/#story" arriving from another page land on their section once it has rendered.
 * Same-page hash changes glide to their section (instantly under reduced motion).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const previous = lastPath.current
    lastPath.current = pathname
    if (previous === pathname) {
      // Router links to "/#section" on the current page: glide there.
      if (hash) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' })
      }
      return
    }
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return () => {
        lastPath.current = previous
      }
    }
    let tries = 0
    let frame = 0
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
      else if (tries++ < 240) frame = requestAnimationFrame(seek) // allow for the page fade and staged rendering
    }
    frame = requestAnimationFrame(seek)
    return () => {
      cancelAnimationFrame(frame)
      // Undo the bookkeeping if this run is torn down (e.g. StrictMode's double effect run).
      lastPath.current = previous
    }
  }, [pathname, hash])

  return null
}
