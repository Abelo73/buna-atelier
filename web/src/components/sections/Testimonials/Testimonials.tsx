import { testimonials, testimonialsNote } from '../../../data/testimonials'
import { Reveal } from '../../motion/Reveal'
import { Eyebrow } from '../../ui/Eyebrow'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative bg-clay py-(--spacing-section) text-ivory"
    >
      <div className="container-site">
        <Reveal className="text-ivory" y={12}>
          <Eyebrow index="13">
            <span id="testimonials-title">Guests</span>
          </Eyebrow>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.quote}
              delay={i * 0.15}
              className={i === 0 ? 'lg:col-span-6' : 'lg:col-span-5 lg:col-start-8 lg:pt-40'}
            >
              <figure>
                <span aria-hidden className="block font-display text-[6rem] leading-[0.5] text-ivory/60">
                  “
                </span>
                <blockquote className="mt-4 font-display text-display-md font-light text-ivory">{t.quote}</blockquote>
                <figcaption className="label mt-8 flex items-center gap-4 text-ivory">
                  <span aria-hidden className="h-px w-8 bg-ivory/50" />
                  {t.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-20 max-w-md text-xs text-ivory lg:mt-28">{testimonialsNote}</p>
      </div>
    </section>
  )
}
