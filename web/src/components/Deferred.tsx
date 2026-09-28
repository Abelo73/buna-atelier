import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Proximity mounting for long pages: a deferred section renders a lightweight
 * placeholder until it comes within ~1.5 viewports, so the first load only pays
 * for what is on screen. `DeferredScope` can force everything to mount at once
 * (keyboard navigation, find-in-page, anchor links, or an idle fallback).
 */
const MountAllContext = createContext(false)

export function DeferredScope({ mountAll, children }: { mountAll: boolean; children: ReactNode }) {
  return <MountAllContext.Provider value={mountAll}>{children}</MountAllContext.Provider>
}

export function Deferred({ children, estimate = '120svh' }: { children: ReactNode; estimate?: string }) {
  const mountAll = useContext(MountAllContext)
  const [near, setNear] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (near || mountAll || !ref.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true)
      },
      { rootMargin: '150% 0px 150% 0px' },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [near, mountAll])

  if (near || mountAll) return <>{children}</>
  return <div ref={ref} aria-hidden className="bg-obsidian" style={{ minHeight: estimate }} />
}
