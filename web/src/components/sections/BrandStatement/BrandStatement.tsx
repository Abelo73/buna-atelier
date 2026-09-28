import { motion } from 'motion/react'
import { duration, ease } from '../../../lib/motion'
import { MaskLines, Reveal } from '../../motion/Reveal'
import { ScrollFade } from '../../motion/ScrollFade'
import { ButtonLink } from '../../ui/Button'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const truths = [
  <>
    It is <em className="text-sand italic">conversation.</em>
  </>,
  <>
    It is <em className="text-sand italic">welcome.</em>
  </>,
  <>
    It is <em className="text-sand italic">patience.</em>
  </>,
  <>
    It is a moment <em className="text-sand italic">shared.</em>
  </>,
]

export function BrandStatement() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-obsidian pb-(--spacing-section)">
      <div className="container-site">
        {/* The hero's scroll thread continues down into the story */}
        <motion.span
          aria-hidden
          className="block h-[clamp(5rem,12vw,10rem)] w-px origin-top bg-ivory/15"
          initial={{ transform: 'scaleY(0)' }}
          whileInView={{ transform: 'scaleY(1)' }}
          viewport={{ once: true }}
          transition={{ duration: duration.reveal, ease: ease.cinema }}
        />

        <Reveal className="mt-10 text-sand" y={12}>
          <Eyebrow index="01">The Experience</Eyebrow>
        </Reveal>

        <h2
          id="experience-title"
          className="mt-8 font-display font-light text-[min(9.4vw,2.6rem)] leading-[1.02] text-ivory sm:text-display-lg"
        >
          <MaskLines
            lines={[
              'Coffee has never been',
              <>
                just coffee <em className="italic">here.</em>
              </>,
            ]}
          />
        </h2>

        <div className="mt-20 grid gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          {/* Editorial inset */}
          <Reveal className="order-2 lg:order-1 lg:col-span-4 lg:pt-4">
            <figure className="max-w-sm">
              <div className="aspect-[4/5] overflow-hidden bg-coffee">
                <Img
                  name="ceremony-cups"
                  sizes="(min-width: 64rem) 30vw, 90vw"
                  alt="Small handleless coffee cups arranged on a tray, some already filled."
                  className="h-full w-full scale-[1.02] object-cover transition-transform duration-(--duration-cinema) ease-(--ease-cinema) hover:scale-[1.06]"
                />
              </div>
              <figcaption className="label mt-4 flex justify-between text-ivory/60">
                <span>Fig. 02</span>
                <span>Small cups, many rounds</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <p className="font-display font-light text-display-md text-ivory">
              {truths.map((line, i) => (
                <ScrollFade key={i} className="py-[0.06em]">
                  {line}
                </ScrollFade>
              ))}
            </p>

            <Reveal className="mt-14 max-w-(--container-prose) lg:mt-20">
              <p className="text-[1.0625rem] leading-relaxed text-ivory/65">
                At Buna Atelier, we bring the spirit of Ethiopian coffee culture into a contemporary Addis experience —
                respecting the ritual while exploring new ways to enjoy the cup.
              </p>
              <ButtonLink href="#journey" variant="line" className="mt-8">
                Follow the journey
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
