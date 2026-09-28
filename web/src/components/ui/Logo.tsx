type MarkProps = { className?: string; title?: string }

/**
 * The seed mark: a coffee seed whose centre crease doubles as a
 * thread of rising aroma. Works from favicon to signage.
 */
export function LogoMark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <ellipse cx="12" cy="16" rx="10" ry="14.5" />
      <path d="M12 1.8C6.6 9.4 17.4 21.6 12 30.2" strokeLinecap="round" />
    </svg>
  )
}

type LogoProps = { className?: string; withAmharic?: boolean }

export function Logo({ className = '', withAmharic = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-7 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.8125rem] font-semibold tracking-[0.32em]">BUNA ATELIER</span>
        {withAmharic && (
          <span lang="am" className="mt-1.5 text-[0.6875rem] text-sand/70">
            ቡና አትሌየር
          </span>
        )}
      </span>
    </span>
  )
}
