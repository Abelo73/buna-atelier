import { PageHeader } from '../components/PageHeader'
import { Ceremony } from '../components/sections/Ceremony/Ceremony'
import { Closing } from '../components/sections/Closing/Closing'
import { Events } from '../components/sections/Events/Events'
import { ThreeCups } from '../components/sections/ThreeCups/ThreeCups'
import { usePageMeta } from '../hooks/usePageMeta'

export function ExperiencePage() {
  usePageMeta('/experience')
  return (
    <>
      <PageHeader
        eyebrow="The Experience"
        lines={[
          'Buna is a moment,',
          <>
            not just a <em className="italic text-sand">drink.</em>
          </>,
        ]}
        intro="The coffee ceremony, the three pours and the gatherings that grow around them — hosted at a contemporary Addis table."
      />
      <Ceremony />
      <ThreeCups />
      <Events />
      <Closing />
    </>
  )
}
