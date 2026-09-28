import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Shared modal behaviour: makes the app inert behind the panel, locks scroll,
 * moves focus in (preferring [data-autofocus]), traps Tab, closes on Escape
 * and returns focus to whatever opened it.
 */
export function useModal(open: boolean, panelRef: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const returnTo = document.activeElement as HTMLElement | null
    const root = document.getElementById('root')
    const prevOverflow = document.body.style.overflow
    root?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'

    const focusFirst = window.setTimeout(() => {
      const panel = panelRef.current
      const target =
        panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE)
      target?.focus()
    }, 30)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(focusFirst)
      document.removeEventListener('keydown', onKey)
      root?.removeAttribute('inert')
      document.body.style.overflow = prevOverflow
      returnTo?.focus({ preventScroll: true })
    }
  }, [open, onClose, panelRef])
}
