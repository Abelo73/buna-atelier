import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { primaryNav } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { duration, ease } from '../../lib/motion'
import { useReservation } from '../reservation/context'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

// 'top' (the hero) belongs to no item, so returning to it clears the indicator.
const sectionIds = ['top', ...primaryNav.flatMap((item) => item.sections)]

export function Navigation() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { openReservation } = useReservation()

  // Tuck the header away while reading down the page; bring it back on any upward scroll.
  const [tucked, setTucked] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - (scrollY.getPrevious() ?? y)
    if (y < 600 || delta < -6) setTucked(false)
    else if (delta > 6) setTucked(true)
    setScrolled(y > 32)
    // Match the section currently under the header: sections opt in with data-nav-theme="light".
    const under = document.elementsFromPoint(window.innerWidth / 2, 40)
    const themed = under.find((el) => el.closest('[data-nav-theme]'))?.closest('[data-nav-theme]')
    setLight(themed?.getAttribute('data-nav-theme') === 'light')
  })

  const onLight = light && !open
  const hidden = tucked && !open && !focusWithin

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, ease: ease.cinema, delay: 0.2 }}
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocusWithin(false)}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,translate] duration-(--duration-slow) ease-(--ease-cinema) ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !open
            ? onLight
              ? 'border-obsidian/10 bg-ivory/80 text-obsidian backdrop-blur-xl backdrop-saturate-150'
              : 'border-ivory/10 bg-obsidian/72 text-ivory backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent text-ivory'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-site flex items-center justify-between transition-[height] duration-(--duration-slow) ease-(--ease-cinema) ${
            scrolled ? 'h-16 lg:h-18' : 'h-20 lg:h-24'
          }`}
        >
          <Link
            to="/"
            aria-label="Buna Atelier — home"
            className={`relative z-10 transition-opacity duration-(--duration-base) ${scrolled ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {primaryNav.map((item) => {
              const isActive = active !== null && item.sections.includes(active)
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative flex h-11 items-center text-[0.8125rem] tracking-[0.04em] opacity-70 transition-opacity duration-(--duration-base) hover:opacity-100 aria-[current]:opacity-100"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brass transition-[opacity,transform] duration-(--duration-base) ease-(--ease-cinema) ${
                        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <Button
              onClick={() => openReservation()}
              aria-haspopup="dialog"
              variant="outline"
              tone={onLight ? 'dark' : 'light'}
              className="!min-h-11 !px-5"
            >
              Reserve a Table
            </Button>
          </div>

          <button
            type="button"
            className="label relative z-10 -mr-3 flex h-11 cursor-pointer items-center gap-3 px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-(--duration-base) ease-(--ease-cinema) ${open ? 'translate-y-[5px] rotate-45' : ''}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px bg-current transition-[transform,width] duration-(--duration-base) ease-(--ease-cinema) ${open ? 'w-full -translate-y-[4px] -rotate-45' : 'w-3/5'}`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
