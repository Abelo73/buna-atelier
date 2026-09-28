import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { duration } from '../../../lib/motion'
import { useEffect, useRef } from 'react'
import { pours, poursNote, type Pour } from '../../../data/ceremony'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Cup } from './Cup'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function Heading({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Reveal className="text-clay-ink" y={12}>
        <Eyebrow index="05">Three Pours</Eyebrow>
      </Reveal>
      <h2
        className={`mt-6 font-display font-light text-obsidian ${compact ? 'text-[clamp(2.6rem,6.2vh,4.5rem)] leading-[1]' : 'text-display-lg'}`}
      >
        <MaskLines
          lines={[
            'Three pours.',
            <>
              One <em className="italic text-clay-ink">table.</em>
            </>,
          ]}
        />
      </h2>
    </>
  )
}

function PourText({ pour, t }: { pour: Pour; t?: MotionValue<number> }) {
  const fallback = useMotionValue(1)
  const source = t ?? fallback
  const opacity = useTransform(() => clamp01((source.get() - 0.25) / 0.45))
  const y = useTransform(() => (1 - clamp01((source.get() - 0.25) / 0.45)) * 12)

  return (
    <motion.div style={{ opacity, y }} className="text-center">
      <p className="label text-clay-ink">{pour.ordinal}</p>
      <h3 className="mt-2 font-display text-[clamp(2rem,4.4vh,3rem)] leading-none font-light text-obsidian">
        {pour.name}
      </h3>
      <p lang="am" className="mt-1 text-lg text-coffee/80">
        {pour.amharic}
      </p>
      <p className="mx-auto mt-3 max-w-[17rem] text-[0.9375rem] leading-relaxed text-ink/70">{pour.text}</p>
    </motion.div>
  )
}

/* Desktop: one sticky frame, cups arrive one scroll-beat at a time. */
function PourColumn({ pour, i, progress }: { pour: Pour; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const t = useTransform(() => (reduce ? 1 : clamp01((progress.get() - 0.04 - i * 0.24) / 0.22)))
  return (
    <li className="flex flex-col items-center">
      <Cup t={t} tone={pour.tone} className="w-[clamp(110px,17vh,170px)]" />
      <div className="mt-3">
        <PourText pour={pour} t={t} />
      </div>
    </li>
  )
}

function StickyPours() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const finale = useTransform(() => clamp01((scrollYProgress.get() - 0.78) / 0.14))
  const finaleY = useTransform(() => (1 - finale.get()) * 14)

  return (
    <div ref={trackRef} data-track="pours" className="relative hidden h-[320vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-site pt-20">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-7">
              <Heading compact />
            </div>
            <p className="col-span-4 col-start-9 text-sm leading-relaxed text-ink/70">{poursNote}</p>
          </div>

          <ol className="mt-[clamp(1rem,4vh,3.5rem)] grid grid-cols-3 gap-8">
            {pours.map((p, i) => (
              <PourColumn key={p.name} pour={p} i={i} progress={scrollYProgress} />
            ))}
          </ol>

          <motion.p
            style={{ opacity: finale, y: finaleY }}
            className="mt-[clamp(1rem,3.5vh,3rem)] text-center font-display text-display-sm text-obsidian italic"
          >
            The ritual is the experience.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

/* Mobile & tablet: each cup plays its entrance once, when it scrolls into view. */
function InViewPour({ pour }: { pour: Pour }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduce = useReducedMotion()
  const t = useMotionValue(reduce ? 1 : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(t, 1, { duration: duration.draw, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, reduce, t])

  return (
    <li ref={ref} className="flex flex-col items-center">
      <Cup t={t} tone={pour.tone} className="w-40" />
      <div className="mt-5">
        <PourText pour={pour} t={t} />
      </div>
    </li>
  )
}

function StackedPours() {
  return (
    <div className="container-site py-(--spacing-section) lg:hidden">
      <Heading />
      <ol className="mt-16 grid gap-16 sm:grid-cols-3 sm:gap-6">
        {pours.map((p) => (
          <InViewPour key={p.name} pour={p} />
        ))}
      </ol>
      <Reveal className="mt-16 text-center">
        <p className="font-display text-display-sm text-obsidian italic">The ritual is the experience.</p>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ink/70">{poursNote}</p>
      </Reveal>
    </div>
  )
}

export function ThreeCups() {
  return (
    <section
      id="three-cups"
      data-nav-theme="light"
      aria-label="Three pours — abol, tona and bereka"
      className="relative bg-paper text-obsidian"
    >
      <StickyPours />
      <StackedPours />
    </section>
  )
}
