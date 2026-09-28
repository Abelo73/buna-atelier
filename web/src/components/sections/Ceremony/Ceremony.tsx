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
import { ceremonyNote, ceremonySteps } from '../../../data/ceremony'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const COUNT = ceremonySteps.length
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/* ------------------------------------------------------------------ */
/*  Opening — the image widens to full bleed as it arrives             */
/* ------------------------------------------------------------------ */

function Opening() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.1'] })
  const clipPath = useTransform(() => {
    if (reduce) return 'inset(0% 0% 0% 0%)'
    const t = 1 - clamp01(scrollYProgress.get())
    return `inset(${t * 10}% ${t * 16}% ${t * 10}% ${t * 16}%)`
  })
  const scale = useTransform(() => (reduce ? 1 : 1.18 - 0.18 * clamp01(scrollYProgress.get())))

  return (
    <>
      <div className="container-site pt-(--spacing-section)">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="text-sand" y={12}>
              <Eyebrow index="04">The Ceremony</Eyebrow>
            </Reveal>
            <h2 id="ceremony-title" className="mt-6 font-display font-light text-display-lg text-ivory">
              <MaskLines
                lines={[
                  'A ritual worth',
                  <>
                    slowing down <em className="italic text-sand">for.</em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-3 lg:col-start-10">
            <p className="leading-relaxed text-ivory/60">
              Roasted, ground, brewed and poured in front of you — the buna ceremony turns a cup of coffee into an
              afternoon.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="relative mt-16 h-[62svh] sm:h-[78svh] lg:mt-24">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
          <motion.div className="h-full w-full" style={{ scale }}>
            <Img
              name="ceremony-pour"
              sizes="100vw"
              alt="A woman in a white embroidered dress pours coffee from a jebena into rows of small cups set in a woven wooden box."
              className="h-full w-full object-cover object-[50%_60%]"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian/60 to-transparent"
          />
        </motion.div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop — a sticky, full-bleed sequence                            */
/* ------------------------------------------------------------------ */

function Segment({
  i,
  progress,
  label,
  active,
}: {
  i: number
  progress: MotionValue<number>
  label: string
  active: boolean
}) {
  const scaleX = useTransform(() => clamp01(progress.get() * COUNT - i))
  return (
    <li className="flex-1">
      <span aria-hidden className="relative block h-px overflow-hidden bg-ivory/20">
        <motion.span className="absolute inset-0 origin-left bg-sand" style={{ scaleX }} />
      </span>
      <span
        className={`label mt-4 flex gap-3 transition-colors duration-(--duration-base) ${active ? 'text-ivory' : 'text-ivory/60'}`}
      >
        <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
        {label}
      </span>
    </li>
  )
}

function StickySequence() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(p * COUNT)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const step = ceremonySteps[active]

  return (
    <div ref={trackRef} data-track="ceremony" className="relative hidden h-[520vh] lg:block">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Photographs crossfade underneath */}
        {ceremonySteps.map((s, i) => (
          <div
            key={s.index}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-[opacity,transform] duration-(--duration-cinema) ease-(--ease-cinema) ${
              i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
            }`}
          >
            <Img name={s.image} alt={i === active ? s.alt : ''} sizes="100vw" className="h-full w-full object-cover" />
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/35 to-obsidian/10"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian/90 to-transparent"
        />

        <div className="container-site relative flex h-full flex-col justify-end pb-14">
          <div className="max-w-2xl" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.quick }}
              >
                <p className="label text-sand">Step {step.index}</p>
                <h3 className="mt-3 overflow-hidden font-display text-display-xl font-light text-ivory">
                  <motion.span
                    className="block"
                    initial={{ transform: 'translateY(100%)' }}
                    animate={{ transform: 'translateY(0%)' }}
                    transition={{ duration: duration.slow, ease: ease.cinema }}
                  >
                    {step.name}
                  </motion.span>
                </h3>
                <motion.p
                  className="mt-5 font-display text-display-sm text-ivory/90 italic"
                  initial={{ opacity: 0, transform: 'translateY(10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: duration.slow, ease: ease.cinema, delay: 0.12 }}
                >
                  {step.line}
                </motion.p>
                <motion.p
                  className="mt-4 max-w-md leading-relaxed text-ivory/65"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: duration.slow, delay: 0.25 }}
                >
                  {step.detail}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ol className="mt-14 flex gap-4" aria-label="Ceremony progress">
            {ceremonySteps.map((s, i) => (
              <Segment key={s.index} i={i} progress={scrollYProgress} label={s.name} active={i === active} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile & tablet — a vertical story                                 */
/* ------------------------------------------------------------------ */

function VerticalSequence() {
  return (
    <ol className="container-site mt-20 flex flex-col gap-20 lg:hidden">
      {ceremonySteps.map((s) => (
        <li key={s.index} className="relative border-l border-ivory/15 pl-6 sm:pl-10">
          <span aria-hidden className="absolute top-0 -left-[3px] h-[5px] w-[5px] rounded-full bg-sand" />
          <Reveal y={16}>
            <p className="label text-sand">Step {s.index}</p>
            <h3 className="mt-2 font-display text-[3.25rem] leading-none font-light text-ivory">{s.name}</h3>
            <p className="mt-3 font-display text-[1.5rem] leading-snug text-ivory/90 italic">{s.line}</p>
          </Reveal>
          <Reveal className="mt-6">
            <div className="aspect-[4/5] overflow-hidden bg-coffee sm:aspect-[3/2]">
              <Img
                name={s.image}
                alt={s.alt}
                sizes="(min-width: 40rem) 85vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-5 max-w-md leading-relaxed text-ivory/65">{s.detail}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export function Ceremony() {
  return (
    <section id="ceremony" aria-labelledby="ceremony-title" className="relative bg-obsidian pb-(--spacing-section)">
      <Opening />
      <StickySequence />
      <VerticalSequence />

      <div className="container-site mt-(--spacing-section)">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label text-sand/80">A note on the ritual</p>
          <p className="mt-6 font-display text-display-sm font-light text-ivory/85">{ceremonyNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
