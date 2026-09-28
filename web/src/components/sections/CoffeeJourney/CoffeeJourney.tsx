import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, useState } from 'react'
import { journey, type JourneyStage } from '../../../data/journey'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const COUNT = journey.length

function Heading() {
  return (
    <>
      <Reveal className="text-clay-ink" y={12}>
        <Eyebrow index="02">The Journey</Eyebrow>
      </Reveal>
      <h2 className="mt-6 font-display font-light text-display-lg text-obsidian">
        <MaskLines
          lines={[
            'From origin',
            <>
              to <em className="italic text-clay-ink">cup.</em>
            </>,
          ]}
        />
      </h2>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop — sticky, scroll-driven                                    */
/* ------------------------------------------------------------------ */

function FrameLayer({ stage, i, progress }: { stage: JourneyStage; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const start = i / COUNT
  const from = start - 0.07
  const to = start + 0.03
  const wipe = () => (i === 0 ? 1 : Math.min(1, Math.max(0, (progress.get() - from) / (to - from))))

  // Each photograph wipes up over the previous one as its stage begins. Transform-only:
  // the mask slides up while the image slides down by the same amount, so it appears
  // still — composited on the GPU instead of repainting a clip-path every scroll frame.
  const maskY = useTransform(() => `${(1 - wipe()) * 100}%`)
  const imageY = useTransform(() => `${(wipe() - 1) * 100}%`)
  const scale = useTransform(() => {
    if (reduce) return 1
    const t = Math.min(1, Math.max(0, (progress.get() - from) / (start + 1 / COUNT - from)))
    return 1.14 - 0.14 * t
  })

  return (
    <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ y: maskY, zIndex: i }}>
      <motion.div className="h-full w-full will-change-transform" style={{ y: imageY, scale }}>
        <Img
          name={stage.image}
          alt={stage.alt}
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

function StickyJourney() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(p * COUNT)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const distance = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + distance * ((i + 0.35) / COUNT) })
  }

  const stage = journey[active]

  return (
    <div ref={trackRef} className="relative hidden h-[440vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-site grid grid-cols-12 items-center gap-8 pt-16">
          {/* Left: title, stage index, active copy */}
          <div className="col-span-5">
            <Heading />

            <ol className="relative mt-14 pl-8" aria-label="Stages of the journey">
              <span aria-hidden className="absolute inset-y-2 left-0 w-px bg-obsidian/12" />
              <motion.span
                aria-hidden
                className="absolute inset-y-2 left-0 w-px origin-top bg-clay"
                style={{ scaleY: scrollYProgress }}
              />
              {journey.map((s, i) => {
                const isActive = i === active
                return (
                  <li key={s.index} className="relative">
                    <span
                      aria-hidden
                      className={`absolute top-1/2 -left-8 h-[7px] w-[7px] -translate-x-[3px] -translate-y-1/2 rounded-full border transition-colors duration-(--duration-base) ${
                        i <= active ? 'border-clay bg-clay' : 'border-obsidian/25 bg-ivory'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`group flex w-full cursor-pointer items-baseline gap-5 py-2.5 text-left transition-colors duration-(--duration-base) ${
                        isActive ? 'text-obsidian' : 'text-obsidian/65 hover:text-obsidian/60'
                      }`}
                    >
                      <span className="label tabular-nums">{s.index}</span>
                      <span className="font-display text-[2rem] leading-none">{s.name}</span>
                      <span
                        className={`label ml-auto text-clay-ink transition-opacity duration-(--duration-base) ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-10 min-h-[6.5rem] max-w-md" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={stage.index}
                  className="text-[1.0625rem] leading-relaxed text-ink/75"
                  initial={{ opacity: 0, transform: 'translateY(10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-6px)' }}
                  transition={{ duration: duration.base, ease: ease.cinema }}
                >
                  {stage.text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: the photograph stack */}
          <figure className="col-span-6 col-start-7">
            <div className="relative h-[min(72vh,760px)] overflow-hidden bg-coffee">
              {journey.map((s, i) => (
                <FrameLayer key={s.index} stage={s} i={i} progress={scrollYProgress} />
              ))}
            </div>
            <figcaption className="label mt-4 flex justify-between text-ink/70">
              <span>
                Fig. 03 — {stage.name} · {stage.title}
              </span>
              <span className="tabular-nums">
                {stage.index} / {String(COUNT).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile & tablet — a quiet vertical story                            */
/* ------------------------------------------------------------------ */

function StackedJourney() {
  return (
    <div className="container-site py-(--spacing-section) lg:hidden">
      <Heading />
      <ol className="mt-16 flex flex-col gap-20 sm:gap-28">
        {journey.map((s, i) => (
          <li key={s.index} className={`sm:w-4/5 ${i % 2 ? 'sm:self-end' : ''}`}>
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden bg-coffee sm:aspect-[5/4]">
                <Img
                  name={s.image}
                  alt={s.alt}
                  sizes="(min-width: 40rem) 80vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="mt-6" y={16}>
              <p className="flex items-baseline gap-4">
                <span className="label tabular-nums text-clay-ink">{s.index}</span>
                <span className="font-display text-[2.25rem] leading-none text-obsidian">{s.name}</span>
                <span className="label ml-auto text-ink/70">{s.title}</span>
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-ink/75">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function CoffeeJourney() {
  return (
    <section
      id="journey"
      data-nav-theme="light"
      aria-label="The journey — from origin to cup"
      className="relative bg-ivory text-obsidian"
    >
      <StickyJourney />
      <StackedJourney />
    </section>
  )
}
