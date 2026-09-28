import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { story } from '../../../data/story'
import { AromaFlourish } from '../../motion/AromaFlourish'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

export function Story() {
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])

  return (
    <section
      id="story"
      data-nav-theme="light"
      aria-labelledby="story-title"
      className="relative bg-ivory py-(--spacing-section) text-obsidian"
    >
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* Image column */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <figure>
              <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden bg-coffee">
                <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y }}>
                  <Img
                    name="jebenas-painted"
                    alt="Clay jebenas lined up together, one painted in red and white geometric patterns."
                    sizes="(min-width: 64rem) 40vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <figcaption className="label mt-4 flex justify-between text-ink/70">
                <span>Fig. 10</span>
                <span>An old memory, a new table</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Text column */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal className="text-clay-ink" y={12}>
            <Eyebrow index="10">Our Story</Eyebrow>
          </Reveal>
          <h2
            id="story-title"
            className="mt-6 font-display text-[clamp(2.4rem,1.2rem+4.2vw,5.4rem)] leading-[0.98] font-light"
          >
            <MaskLines
              lines={[
                story.title[0],
                <>
                  with an old <em className="italic text-clay-ink">memory.</em>
                </>,
              ]}
            />
          </h2>

          <Reveal className="mt-14 max-w-xl">
            <p className="text-[1.125rem] leading-[1.75] text-ink/80 first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-display first-letter:text-[6.1rem] first-letter:leading-[0.72] first-letter:text-clay-ink">
              {story.opening}
            </p>
          </Reveal>

          <Reveal className="mt-16 flex gap-6 lg:-ml-16">
            <AromaFlourish className="h-28 w-8 shrink-0 text-brass" />
            <blockquote className="font-display text-display-md font-light text-obsidian italic">
              “{story.pullQuote}”
            </blockquote>
          </Reveal>

          <Reveal className="mt-16 max-w-xl">
            <p className="text-[1.125rem] leading-[1.75] text-ink/80">{story.closing}</p>
            <div className="mt-12 flex items-end justify-between gap-6 border-t border-obsidian/10 pt-6">
              <p lang="am" className="text-2xl text-coffee">
                ቡና አትሌየር
              </p>
              <p className="label text-ink/70">Addis Ababa</p>
            </div>
            <p className="mt-6 text-xs text-ink/70">{story.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
