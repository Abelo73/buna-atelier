import { PageHeader } from '../components/PageHeader'
import { Visit } from '../components/sections/Visit/Visit'
import { usePageMeta } from '../hooks/usePageMeta'

export function VisitPage() {
  usePageMeta('/visit')
  return (
    <>
      <PageHeader
        eyebrow="Visit"
        lines={[
          'Bole,',
          <>
            Addis <em className="italic text-sand">Ababa.</em>
          </>,
        ]}
        intro="Opening hours, how to find us and table reservations. Walk-ins are always welcome."
      />
      <Visit />
    </>
  )
}
