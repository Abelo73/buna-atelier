import { PageHeader } from '../components/PageHeader'
import { Closing } from '../components/sections/Closing/Closing'
import { CoffeeJourney } from '../components/sections/CoffeeJourney/CoffeeJourney'
import { OriginStory } from '../components/sections/OriginStory/OriginStory'
import { SignatureDrink } from '../components/sections/SignatureDrink/SignatureDrink'
import { usePageMeta } from '../hooks/usePageMeta'

export function CoffeePage() {
  usePageMeta('/coffee')
  return (
    <>
      <PageHeader
        eyebrow="Coffee"
        lines={[
          'From Ethiopian soil',
          <>
            to the Addis <em className="italic text-sand">table.</em>
          </>,
        ]}
        intro="Where our coffee comes from, how we roast it and how we brew it — origin to cup."
      />
      <CoffeeJourney />
      <OriginStory />
      <SignatureDrink />
      <Closing />
    </>
  )
}
