import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { materials } from '../../../data/space'
import { duration, ease } from '../../../lib/motion'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const COUNT = materials.length
const pad = (n: number) => String(n).padStart(2, '0')

export function Materials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const activeRef = useRef(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(p * COUNT)))
    if (next === activeRef.current) return
    setDirection(next > activeRef.current ? 1 : -1)
    activeRef.current = next
    setActive(next)
  })

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((i + 0.4) / COUNT) })
  }

  const m = materials[active]

  return (
    <section id="materials" aria-labelledby="materials-title" className="relative bg-obsidian">
      <div ref={trackRef} data-track="materials" className="relative h-[400vh] lg:h-[480vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* Photographs wipe in from the right; scrolling back retracts them */}
          {materials.map((mat, i) => (
            <div
              key={mat.name}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-[clip-path] duration-(--duration-image) ease-(--ease-cinema)"
              style={{ clipPath: i <= active ? 'inset(0 0 0 0%)' : 'inset(0 0 0 100%)', zIndex: i }}
            >
              <Img
                name={mat.image}
                alt={i === active ? mat.alt : ''}
                sizes="100vw"
                className={`h-full w-full object-cover transition-transform duration-(--duration-cinema) ease-(--ease-cinema) ${
                  i === active ? 'scale-100' : 'scale-110'
                }`}
              />
            </div>
          ))}
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-obsidian/50"
          />

          <div className="container-site relative z-20 flex h-full flex-col justify-between pt-28 pb-10 lg:pt-32 lg:pb-14">
            <div className="flex items-start justify-between gap-8">
              <div>
                <div className="text-sand">
                  <Eyebrow index="09">Material Language</Eyebrow>
                </div>
                <h2 id="materials-title" className="mt-5 max-w-md font-display text-display-sm font-light text-ivory">
                  Made of the place — materials before motifs.
                </h2>
              </div>
              <p className="label hidden text-ivory/60 tabular-nums sm:block" aria-hidden>
                {pad(active + 1)} / {pad(COUNT)}
              </p>
            </div>

            <div>
              <div className="overflow-hidden" aria-live="polite">
                {/* "wait": the old word leaves quickly before the new one enters, so they never overlap. */}
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={m.name}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, transform: `translateX(${d * 12}%)` }),
                      center: { opacity: 1, transform: 'translateX(0%)' },
                      exit: (d: number) => ({
                        opacity: 0,
                        transform: `translateX(${d * -6}%)`,
                        transition: { duration: duration.quick, ease: ease.silk },
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: duration.slow, ease: ease.cinema }}
                  >
                    <p className="font-display text-[clamp(4.5rem,15vw,13rem)] leading-[0.85] font-light tracking-[-0.03em] text-ivory">
                      {m.name}
                    </p>
                    <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ivory/75">{m.line}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/15 pt-5 lg:gap-x-10">
                {materials.map((mat, i) => (
                  <li key={mat.name}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? 'step' : undefined}
                      className={`label flex min-h-11 cursor-pointer items-center gap-2 transition-colors duration-(--duration-base) ${
                        i === active ? 'text-ivory' : 'text-ivory/60 hover:text-ivory/75'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-1 w-1 rounded-full bg-brass transition-transform duration-(--duration-base) ${
                          i === active ? 'scale-100' : 'scale-0'
                        }`}
                      />
                      {mat.name}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
