import { PageHeader } from '../components/PageHeader'
import { Gallery } from '../components/sections/Gallery/Gallery'
import { Materials } from '../components/sections/Materials/Materials'
import { Space } from '../components/sections/Space/Space'
import { Story } from '../components/sections/Story/Story'
import { Testimonials } from '../components/sections/Testimonials/Testimonials'
import { usePageMeta } from '../hooks/usePageMeta'

export function StoryPage() {
  usePageMeta('/story')
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        lines={[
          'Ethiopian coffee,',
          <>
            thoughtfully <em className="italic text-sand">reimagined.</em>
          </>,
        ]}
        intro="The idea behind Buna Atelier, the rooms we built for staying and the materials that make them feel like Addis."
      />
      <Story />
      <Space />
      <Materials />
      <Gallery />
      <Testimonials />
    </>
  )
}
