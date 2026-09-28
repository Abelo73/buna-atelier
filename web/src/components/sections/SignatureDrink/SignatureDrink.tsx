import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Check } from 'lucide-react'
import { useEffect, useState, type PointerEvent } from 'react'
import { menu, signatureDrink } from '../../../data/menu'
import { formatPrice } from '../../../lib/format'
import { duration, ease, spring } from '../../../lib/motion'
import { Reveal } from '../../motion/Reveal'
import { Button } from '../../ui/Button'
import { Eyebrow } from '../../ui/Eyebrow'
import { Img } from '../../ui/Img'

const drink = menu.find((m) => m.id === signatureDrink.itemId)!

/** Devices without hover (touch) see everything revealed by default. */
function useCanHover() {
  const [canHover, setCanHover] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return canHover
}

export function SignatureDrink() {
  const reduce = useReducedMotion()
  const canHover = useCanHover()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [added, setAdded] = useState(false)
  const engaged = hovered || focused || !canHover

  // Pointer parallax: image drifts with the cursor, the halo drifts against it.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, spring.drift)
  const sy = useSpring(py, spring.drift)
  const imageX = useTransform(sx, [-1, 1], [-16, 16])
  const imageY = useTransform(sy, [-1, 1], [-12, 12])
  const haloX = useTransform(sx, [-1, 1], [22, -22])
  const haloY = useTransform(sy, [-1, 1], [18, -18])

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    setHovered(false)
    px.set(0)
    py.set(0)
  }

  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(false), 3200)
    return () => window.clearTimeout(t)
  }, [added])

  const show = { opacity: engaged ? 1 : 0, transform: engaged ? 'translateY(0px)' : 'translateY(10px)' }

  return (
    <section
      id="signature"
      aria-labelledby="signature-title"
      className="relative overflow-hidden bg-obsidian py-(--spacing-section)"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-8"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      >
        {/* Words */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Reveal className="text-sand" y={12}>
            <Eyebrow index="07">Signature</Eyebrow>
          </Reveal>
          <Reveal y={20}>
            <h2 id="signature-title" className="mt-6 font-display text-display-xl font-light text-ivory">
              Buna <em className="italic text-sand">Cloud</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ivory/65">{signatureDrink.story}</p>
          </Reveal>

          <ol className="mt-12 flex flex-col" aria-label="Ingredients">
            {signatureDrink.ingredients.map((ing, i) => (
              <li key={ing} className="flex items-center gap-5 py-3">
                <span className="label w-6 text-sand/70 tabular-nums">0{i + 1}</span>
                <motion.span
                  className="label text-ivory"
                  animate={{ letterSpacing: engaged ? '0.34em' : '0.24em' }}
                  transition={{ duration: duration.slow, ease: ease.cinema, delay: i * 0.08 }}
                >
                  {ing}
                </motion.span>
                <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-ivory/10">
                  <motion.span
                    className="absolute inset-0 origin-left bg-sand/70"
                    initial={false}
                    animate={{ transform: `scaleX(${engaged ? 1 : 0})` }}
                    transition={{ duration: duration.reveal, ease: ease.cinema, delay: 0.1 + i * 0.12 }}
                  />
                </span>
              </li>
            ))}
          </ol>

          <motion.p
            className="mt-8 font-display text-display-sm text-sand italic"
            initial={false}
            animate={show}
            transition={{ duration: duration.slow, ease: ease.cinema, delay: 0.35 }}
          >
            {drink.tastingNotes?.join(' · ')}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-6"
            initial={false}
            animate={show}
            transition={{ duration: duration.slow, ease: ease.cinema, delay: 0.5 }}
          >
            <p className="font-display text-[2.25rem] leading-none text-ivory tabular-nums">
              {formatPrice(drink.price)}
            </p>
            <Button onClick={() => setAdded(true)} arrow={!added} aria-describedby="signature-order-status">
              {added ? (
                <span className="flex items-center gap-2">
                  <Check size={15} strokeWidth={1.6} aria-hidden /> Added
                </span>
              ) : (
                'Add to order'
              )}
            </Button>
          </motion.div>
          <p id="signature-order-status" aria-live="polite" className="mt-4 min-h-5 text-xs text-ivory/60">
            {added ? 'Added — ordering is a demo on this concept site.' : ''}
          </p>
        </div>

        {/* Product image */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto max-w-[36rem]">
            <motion.span
              aria-hidden
              style={{ x: haloX, y: haloY }}
              className="absolute -inset-6 rounded-full border border-brass/25 sm:-inset-10"
            />
            <motion.span
              aria-hidden
              style={{ x: haloX, y: haloY }}
              className="absolute top-[8%] -right-4 hidden font-display text-[9rem] leading-none text-ivory/60 italic select-none sm:block"
            >
              07
            </motion.span>
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-coffee">
              <motion.div className="absolute -inset-6" style={{ x: imageX, y: imageY }}>
                <Img
                  name={drink.image!}
                  alt={drink.imageAlt ?? ''}
                  sizes="(min-width: 64rem) 40vw, 90vw"
                  className={`h-full w-full object-cover transition-transform duration-(--duration-cinema) ease-(--ease-cinema) ${
                    engaged && canHover ? 'scale-[1.06]' : 'scale-100'
                  }`}
                />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
