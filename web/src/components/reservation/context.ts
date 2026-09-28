import { createContext, useContext } from 'react'

export type ReservationOptions = {
  /** Pre-fills the special-request field, e.g. an event the guest is reserving for. */
  request?: string
}

export const ReservationContext = createContext<{ openReservation: (options?: ReservationOptions) => void } | null>(
  null,
)

export function useReservation() {
  const ctx = useContext(ReservationContext)
  if (!ctx) throw new Error('useReservation must be used inside <ReservationProvider>')
  return ctx
}
