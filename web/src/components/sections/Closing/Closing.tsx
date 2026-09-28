import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { duration, ease } from '../../../lib/motion'
import { AromaLine } from '../../hero/AromaLine'
import { CUP_ORIGIN, coverBox } from '../../hero/photo'
import { MaskLines } from '../../motion/Reveal'
import { ButtonLink } from '../../ui/Button'
import { Img } from '../../ui/Img'

/**
 * The bookend: the hero's composition returns at the end of the day —
 * same pour, same rising aroma, warmer and dimmer, closing the loop.
 */
export function Closing() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1])

  return (
    <section
      ref={ref}
      id="closing"
      aria-labelledby="closing-title"
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden bg-obsidian lg:min-h-[720px]"
    >
      {/* Visibility is observed on this unclipped wrapper — a fully clipped element never counts as "in view". */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[58%] [container-type:size] sm:h-[64%] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[47%]"
        initial={reduce ? 'shown' : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          variants={{ hidden: { clipPath: 'inset(0 0 100% 0)' }, shown: { clipPath: 'inset(0 0 0% 0)' } }}
          transition={{ duration: duration.cinema, ease: ease.cinema }}
        >
          <div className={coverBox}>
            <motion.div className="h-full w-full" style={{ scale, transformOrigin: CUP_ORIGIN }}>
              <Img
                name="hero-jebena"
                sizes="(min-width: 64rem) 47vw, 100vw"
                alt="Coffee poured from a clay jebena into a small white cup, in low evening light."
                className="h-full w-full object-cover brightness-[0.72] sepia-[0.25]"
              />
            </motion.div>
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-obsidian from-4% via-obsidian/30 via-45% to-obsidian/40 lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-obsidian to-transparent lg:block"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 -bottom-1 h-2 bg-obsidian lg:hidden" />
        <div className="pointer-events-none absolute inset-0 max-lg:[mask-image:linear-gradient(to_bottom,transparent_64px,black_150px)]">
          <div className={coverBox}>
            <AromaLine inView delay={0.8} />
          </div>
        </div>
      </motion.div>

      <div className="container-site relative z-10 flex flex-1 flex-col justify-end pb-14 sm:pb-20 lg:justify-center lg:pb-0">
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <p className="label flex items-center gap-4 text-sand">
            <span aria-hidden className="h-px w-10 bg-sand/60" />
            Until next time
          </p>
          <h2
            id="closing-title"
            className="mt-6 font-display text-[clamp(2.75rem,11.6vw,4.75rem)] leading-[0.98] font-light tracking-[-0.02em] text-ivory lg:mt-8 lg:text-[min(6vw,6rem)]"
          >
            <MaskLines
              stagger={0.18}
              lines={[
                'Take your time.',
                <>
                  The coffee will <em className="font-normal text-sand italic">wait.</em>
                </>,
              ]}
            />
          </h2>
          {/* Sits near the bottom edge on phones, so it triggers on any visibility rather than the usual inset. */}
          <motion.div
            className="mt-10 lg:mt-12"
            initial={reduce ? false : { opacity: 0, transform: 'translateY(16px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: duration.reveal, ease: ease.cinema, delay: 0.5 }}
          >
            <ButtonLink to="/visit">Plan your visit</ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
