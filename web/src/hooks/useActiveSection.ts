import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const observed = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    // Sections can mount after this hook runs (progressive rendering, route changes): keep scanning for them.
    const scan = () => {
      for (const id of key.split('|')) {
        const el = document.getElementById(id)
        if (el && !observed.has(el)) {
          observed.add(el)
          observer.observe(el)
        }
      }
    }
    scan()
    const mutations = new MutationObserver(scan)
    const main = document.getElementById('main')
    if (main) mutations.observe(main, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [key])

  return active
}
