import type { ComponentType } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { useMountAll } from '../hooks/useMountAll'
import { Deferred, DeferredScope } from '../components/Deferred'
import { Hero } from '../components/hero/Hero'
import { BrandStatement } from '../components/sections/BrandStatement/BrandStatement'
import { CoffeeJourney } from '../components/sections/CoffeeJourney/CoffeeJourney'
import { OriginStory } from '../components/sections/OriginStory/OriginStory'
import { Ceremony } from '../components/sections/Ceremony/Ceremony'
import { ThreeCups } from '../components/sections/ThreeCups/ThreeCups'
import { MenuShowcase } from '../components/sections/MenuShowcase/MenuShowcase'
import { SignatureDrink } from '../components/sections/SignatureDrink/SignatureDrink'
import { Space } from '../components/sections/Space/Space'
import { Materials } from '../components/sections/Materials/Materials'
import { Story } from '../components/sections/Story/Story'
import { Events } from '../components/sections/Events/Events'
import { Gallery } from '../components/sections/Gallery/Gallery'
import { Testimonials } from '../components/sections/Testimonials/Testimonials'
import { Visit } from '../components/sections/Visit/Visit'
import { Closing } from '../components/sections/Closing/Closing'

// Everything below the opening statement mounts as it approaches the viewport (see Deferred).
const deferred: { Section: ComponentType; estimate: string }[] = [
  { Section: CoffeeJourney, estimate: '440svh' },
  { Section: OriginStory, estimate: '180svh' },
  { Section: Ceremony, estimate: '700svh' },
  { Section: ThreeCups, estimate: '320svh' },
  { Section: MenuShowcase, estimate: '400svh' },
  { Section: SignatureDrink, estimate: '140svh' },
  { Section: Space, estimate: '260svh' },
  { Section: Materials, estimate: '480svh' },
  { Section: Story, estimate: '180svh' },
  { Section: Events, estimate: '160svh' },
  { Section: Gallery, estimate: '200svh' },
  { Section: Testimonials, estimate: '120svh' },
  { Section: Visit, estimate: '130svh' },
  { Section: Closing, estimate: '100svh' },
]

export function Home() {
  usePageMeta('/')
  const mountAll = useMountAll()

  return (
    <DeferredScope mountAll={mountAll}>
      <Hero />
      <BrandStatement />
      {deferred.map(({ Section, estimate }) => (
        <Deferred key={Section.name} estimate={estimate}>
          <Section />
        </Deferred>
      ))}
    </DeferredScope>
  )
}
