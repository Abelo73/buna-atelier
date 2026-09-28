import { PageHeader } from '../components/PageHeader'
import { ButtonLink } from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('/404', {
    title: 'Page not found — Buna Atelier',
    description: 'This page does not exist.',
    noindex: true,
  })
  return (
    // Fills the screen, matching the route's loading placeholder, so the footer never jumps up.
    <div className="flex min-h-svh flex-col bg-obsidian">
      <PageHeader
        eyebrow="404"
        lines={[
          'This cup',
          <>
            is <em className="italic text-sand">empty.</em>
          </>,
        ]}
        intro="The page you were looking for isn’t here — but the coffee is."
      />
      <div className="container-site flex flex-wrap gap-4 bg-obsidian pb-(--spacing-section)">
        <ButtonLink to="/">Back to the beginning</ButtonLink>
        <ButtonLink to="/menu" variant="outline">
          See the menu
        </ButtonLink>
      </div>
    </div>
  )
}
