import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Decides when a proximity-mounted page must render in full:
 *  - an anchor link (/#visit) needs its target to exist,
 *  - keyboard users (Tab) must be able to reach every section in order,
 *  - find-in-page (Ctrl/⌘+F) needs the text in the DOM,
 *  - and after a quiet period everything mounts anyway (screen readers, printing).
 */
export function useMountAll(idleAfterMs = 10_000) {
  const { hash } = useLocation()
  const [all, setAll] = useState(false)
  // An anchor latches the full render (adjusting state during render is React's supported pattern here).
  if (hash.length > 1 && !all) setAll(true)

  useEffect(() => {
    if (all) return
    const mount = () => setAll(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f')) mount()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('beforeprint', mount)
    const timer = window.setTimeout(mount, idleAfterMs)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('beforeprint', mount)
      window.clearTimeout(timer)
    }
  }, [all, idleAfterMs])

  return all
}
