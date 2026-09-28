import type { ReactNode } from 'react'
import { AromaFlourish } from './motion/AromaFlourish'
import { MaskLines, Reveal } from './motion/Reveal'

type Props = {
  eyebrow: string
  lines: ReactNode[]
  intro?: string
  tone?: 'dark' | 'light'
}

/** The opening of every inner page: one h1, a short intro and the aroma motif. */
export function PageHeader({ eyebrow, lines, intro, tone = 'dark' }: Props) {
  const light = tone === 'light'
  return (
    <header
      data-nav-theme={light ? 'light' : undefined}
      className={`relative overflow-hidden pt-40 pb-20 lg:pt-52 lg:pb-28 ${light ? 'bg-ivory text-obsidian' : 'bg-obsidian text-ivory'}`}
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <Reveal immediate y={12}>
            <p className={`label flex items-center gap-4 ${light ? 'text-clay-ink' : 'text-sand'}`}>
              <span aria-hidden className="h-px w-10 bg-current opacity-60" />
              {eyebrow}
            </p>
          </Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,1.2rem+6.4vw,7.5rem)] leading-[0.95] font-light tracking-[-0.02em]">
            <MaskLines immediate delay={0.15} lines={lines} />
          </h1>
        </div>
        {intro && (
          <Reveal immediate delay={0.45} className="flex gap-5 lg:col-span-4">
            <AromaFlourish className="h-24 w-7 shrink-0 text-brass" />
            <p className={`leading-relaxed ${light ? 'text-ink/70' : 'text-ivory/65'}`}>{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
