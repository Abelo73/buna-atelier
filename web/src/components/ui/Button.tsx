import { Link } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'line'
type Tone = 'light' | 'dark'

const base =
  'group relative inline-flex items-center justify-center gap-3 label transition-colors duration-(--duration-base) ease-(--ease-cinema) select-none'

const variants: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: 'min-h-13 px-7 bg-ivory text-obsidian hover:bg-sand',
    dark: 'min-h-13 px-7 bg-obsidian text-ivory hover:bg-coffee',
  },
  outline: {
    light: 'min-h-13 px-7 border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory/5',
    dark: 'min-h-13 px-7 border border-obsidian/30 text-obsidian hover:border-obsidian',
  },
  line: {
    light: 'min-h-11 text-ivory',
    dark: 'min-h-11 text-obsidian',
  },
}

/** → at rest, ↗ on hover/focus. The glyph swap is a pure CSS crossfade. */
function Arrow() {
  return (
    <span aria-hidden className="relative inline-block h-3 w-3.5 overflow-hidden">
      <svg
        viewBox="0 0 14 12"
        className="absolute inset-0 h-3 w-3.5 transition-[transform,opacity] duration-(--duration-base) ease-(--ease-cinema) group-hover:translate-x-2 group-hover:opacity-0 group-focus-visible:translate-x-2 group-focus-visible:opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 6h13M8 1l5 5-5 5" />
      </svg>
      <svg
        viewBox="0 0 14 12"
        className="absolute inset-0 h-3 w-3.5 -translate-x-2 translate-y-2 opacity-0 transition-[transform,opacity] duration-(--duration-base) ease-(--ease-cinema) group-hover:translate-0 group-hover:opacity-100 group-focus-visible:translate-0 group-focus-visible:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M2.5 10.5l9-9M4 1.5h7.5V9" />
      </svg>
    </span>
  )
}

function Underline() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-[0.35] bg-current transition-transform duration-(--duration-slow) ease-(--ease-cinema) group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  )
}

type Common = { variant?: Variant; tone?: Tone; arrow?: boolean; children: ReactNode; className?: string }

export function ButtonLink({
  variant = 'solid',
  tone = 'light',
  arrow = true,
  children,
  className = '',
  to,
  ...rest
}: Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { /** In-app route — rendered as a router Link. */ to?: string }) {
  const classes = `${base} ${variants[variant][tone]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
      {variant === 'line' && <Underline />}
    </>
  )
  return to ? (
    <Link to={to} className={classes} {...rest}>
      {content}
    </Link>
  ) : (
    <a className={classes} {...rest}>
      {content}
    </a>
  )
}

export function Button({
  variant = 'solid',
  tone = 'light',
  arrow = false,
  children,
  className = '',
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant][tone]} cursor-pointer ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
      {variant === 'line' && <Underline />}
    </button>
  )
}
