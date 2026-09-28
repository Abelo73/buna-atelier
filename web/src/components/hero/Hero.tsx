import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { duration, ease, heroTimeline } from '../../lib/motion'
import { MaskLines, Reveal } from '../motion/Reveal'
import { ButtonLink } from '../ui/Button'
import { Img } from '../ui/Img'
import { AromaLine } from './AromaLine'
import { CUP_ORIGIN, coverBox } from './photo'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Welcome"
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden bg-obsidian lg:min-h-[720px]"
    >
      {/* ---------- Photograph ---------- */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-x-0 top-0 h-[60%] [container-type:size] sm:h-[66%] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[47%]"
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: reduce ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: duration.cinema, ease: ease.cinema }}
        >
          <div className={coverBox}>
            <motion.div
              className="h-full w-full"
              style={{ transformOrigin: CUP_ORIGIN }}
              initial={{ transform: reduce ? 'scale(1)' : 'scale(1.14)' }}
              animate={{ transform: 'scale(1)' }}
              transition={{ duration: duration.settle + 0.8, ease: ease.cinema }}
            >
              <Img
                name="hero-jebena"
                xl
                priority
                sizes="(min-width: 64rem) 47vw, 100vw"
                alt="A hand pours coffee from a clay jebena into a small white cup on a round wooden tray, coffee beans scattered on the table."
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          {/* Settling dark overlay (spec: 200ms) + permanent grading */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-obsidian"
            initial={{ opacity: reduce ? 0 : 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ duration: duration.cinema, delay: heroTimeline.overlay, ease: ease.silk }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-obsidian from-4% via-obsidian/25 via-40% to-obsidian/25 lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-obsidian to-transparent lg:block"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-obsidian/70 to-transparent lg:block"
          />
        </motion.div>

        {/* Covers the sub-pixel seam where the photo is clipped on small screens */}
        <div aria-hidden className="absolute inset-x-0 -bottom-1 h-2 bg-obsidian lg:hidden" />

        {/* Aroma rises from the cup, un-clipped so it can drift toward the headline */}
        <div className="pointer-events-none absolute inset-0 max-lg:[mask-image:linear-gradient(to_bottom,transparent_64px,black_150px)]">
          <div className={coverBox}>
            <AromaLine />
          </div>
        </div>

        <Reveal
          immediate
          delay={heroTimeline.scroll}
          y={0}
          className="label absolute inset-x-0 bottom-8 hidden items-center justify-between px-8 text-ivory/60 lg:flex"
        >
          <span>
            Fig. 01 —{' '}
            <span lang="am" className="text-[0.8125rem] tracking-[0.06em]">
              ጀበና
            </span>{' '}
            · Jebena buna
          </span>
          <span className="tabular-nums">9°02′N · 38°44′E</span>
        </Reveal>
      </motion.div>

      {/* ---------- Words ---------- */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-site relative z-10 flex flex-1 flex-col justify-end pb-10 sm:pb-28 lg:justify-center lg:pb-0 lg:pt-24"
      >
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <Reveal immediate delay={heroTimeline.eyebrow} y={12}>
            <p className="label flex items-center gap-4 text-sand">
              <span aria-hidden className="h-px w-10 bg-sand/60" />
              Addis Ababa · Ethiopia
            </p>
          </Reveal>

          <h1 className="mt-6 font-display font-light text-ivory text-[clamp(2.75rem,11.6vw,4.75rem)] leading-[0.94] tracking-[-0.02em] lg:mt-8 lg:text-[min(6.3vw,6.25rem)]">
            <MaskLines
              immediate
              delay={heroTimeline.line1}
              stagger={heroTimeline.line2 - heroTimeline.line1}
              lines={[
                'Where coffee',
                <>
                  becomes a <em className="font-normal text-sand italic">ritual.</em>
                </>,
              ]}
            />
          </h1>

          <Reveal immediate delay={heroTimeline.copy} y={16}>
            <p className="mt-6 max-w-[27rem] text-[0.975rem] leading-relaxed text-ivory/72 lg:mt-9 lg:text-[1.0625rem]">
              A contemporary coffee house rooted in Ethiopia’s extraordinary coffee culture — from the first roast to
              the final pour.
            </p>
          </Reveal>

          <Reveal
            immediate
            delay={heroTimeline.cta}
            y={16}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 lg:mt-12"
          >
            <ButtonLink href="#experience">Explore the experience</ButtonLink>
            <ButtonLink href="#menu" variant="line" className="self-start sm:self-auto">
              View menu
            </ButtonLink>
          </Reveal>
        </div>
      </motion.div>

      {/* ---------- Scroll cue: a thread that runs into the next section ---------- */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-site pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden sm:block"
      >
        <Reveal immediate delay={heroTimeline.scroll} y={0} className="flex items-end gap-5">
          <span aria-hidden className="relative block h-20 w-px overflow-hidden bg-ivory/15 lg:h-24">
            <span className="absolute inset-x-0 top-0 h-1/3 animate-scroll-cue bg-sand" />
          </span>
          <a
            href="#experience"
            className="label pointer-events-auto mb-3 py-3 text-ivory/60 transition-colors hover:text-ivory"
          >
            Scroll to experience
          </a>
        </Reveal>
      </motion.div>
    </section>
  )
}
