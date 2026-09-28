import type { ReactNode } from 'react'

/** Small uppercase section label with an optional index, e.g. "01 — THE EXPERIENCE". */
export function Eyebrow({
  index,
  children,
  className = '',
}: {
  index?: string
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`label flex items-center gap-4 ${className}`}>
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
        </>
      )}
      <span>{children}</span>
    </p>
  )
}
