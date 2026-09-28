import { PageHeader } from '../components/PageHeader'
import { Closing } from '../components/sections/Closing/Closing'
import { Events } from '../components/sections/Events/Events'
import { usePageMeta } from '../hooks/usePageMeta'

export function EventsPage() {
  usePageMeta('/events')
  return (
    <>
      <PageHeader
        eyebrow="Events"
        lines={[
          'Stay for the',
          <>
            <em className="italic text-sand">conversation.</em>
          </>,
        ]}
        intro="Tastings, ceremonies, roasting sessions, creative evenings and live Ethio-jazz. Small groups, long tables."
      />
      <Events />
      <Closing />
    </>
  )
}
