import { lazy, Suspense, useCallback, useMemo, useState, type ReactNode } from 'react'
import { ReservationContext, type ReservationOptions } from './context'

// The form (and its validation) loads the first time someone asks for a table.
const ReservationDialog = lazy(() => import('./ReservationDialog').then((m) => ({ default: m.ReservationDialog })))

/** One reservation dialog for the whole site; any CTA can open it, optionally pre-filled. */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [request, setRequest] = useState('')
  const [session, setSession] = useState(0)

  const openReservation = useCallback((options?: ReservationOptions) => {
    setRequest(options?.request ?? '')
    setSession((n) => n + 1)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openReservation }), [openReservation])

  return (
    <ReservationContext.Provider value={value}>
      {children}
      {session > 0 && (
        <Suspense fallback={null}>
          <ReservationDialog open={open} session={session} initialRequest={request} onClose={close} />
        </Suspense>
      )}
    </ReservationContext.Provider>
  )
}
