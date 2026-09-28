# Buna Atelier — web

Concept website for **BUNA ATELIER — ቡና አትሌየር**, a fictional contemporary Ethiopian coffee house in Addis Ababa.
Built phase by phase from [`../Buna_Atelier_Premium_Coffee_Website_Spec.md`](../Buna_Atelier_Premium_Coffee_Website_Spec.md).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build (also writes sitemap.xml and robots.txt)
npm run preview   # serve the production build
npm run format    # Prettier
```

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion · React Router. Fonts are self-hosted via Fontsource
(Cormorant Garamond, Manrope, Noto Serif Ethiopic).

## Pages

| Route         | Content                                                   |
| ------------- | --------------------------------------------------------- |
| `/`           | The full narrative: origin → roast → ritual → cup → visit |
| `/experience` | Coffee ceremony, three pours, events                      |
| `/coffee`     | Journey, origins map, signature drink                     |
| `/menu`       | Filterable, searchable menu with item dialogs             |
| `/story`      | Brand story, the space, materials, gallery, guests        |
| `/events`     | Events and workshops                                      |
| `/visit`      | Hours, location, reservations                             |
| `*`           | 404                                                       |

## Structure

```text
src/
├── components/
│   ├── hero/          Hero + AromaLine (the recurring SVG motif)
│   ├── sections/      One folder per home-page section
│   ├── navigation/    Navigation, MobileMenu
│   ├── reservation/   Reservation context, provider and dialog
│   ├── footer/        Footer, photo credits dialog
│   ├── cursor/        Desktop cursor companion
│   ├── motion/        Reveal, MaskLines, ScrollFade, AromaFlourish
│   ├── ui/            Logo, Button, Dialog, Eyebrow, Img
│   ├── Deferred.tsx   Proximity mounting for the long home page
│   ├── PageHeader.tsx, AnimatedRoutes.tsx, ScrollManager.tsx
├── data/              All content: menu, origins, events, gallery, visit, pages (SEO)…
├── hooks/             useModal, usePageMeta, useActiveSection, useMountAll
├── lib/               motion tokens, opening-hours logic, reservation validation
├── pages/             One file per route
└── index.css          Design tokens (@theme)
scripts/
└── seo-plugin.ts      OG/Twitter tags, sitemap.xml, robots.txt, font preloads (build time)
```

## Deployment

- Set `VITE_SITE_URL` (see `.env.example`) so canonical URLs, social cards and the sitemap point at the real domain.
- It is a single-page app: deep links need an SPA fallback. `public/_redirects` (Netlify) and `vercel.json` (Vercel)
  are included.
- The social card is `public/og-image.jpg` (1200 × 630).

## Performance & accessibility

- The home page mounts sections as they approach the viewport (`Deferred`), which keeps the first load to the hero and
  opening statement. Everything mounts at once on Tab, find-in-page, print, anchor links, or after 10 s idle, so
  keyboard, screen-reader and deep-link users always get the full page.
- Dialogs (reservation, lightbox, credits) and all non-home pages are code-split and load on demand.
- Images are responsive WebP (800w / 1600w, 2400w for the hero); the hero image and the two first-paint fonts are
  preloaded.
- Text colours follow contrast floors (small text ≥ 4.5:1). The site is audited with axe-core (WCAG 2.2 AA) on every
  page and in open dialogs; motion respects `prefers-reduced-motion`.
- Lighthouse (production build): desktop 98 / 100 / 100 / 100, mobile ~75 / 100 / 100 / 100. Mobile first paint is
  bound by client rendering on simulated slow 4G — prerendering the HTML would be the next step.

## Demo functionality

- **Reservations** (`src/components/reservation/`) are a front-end demo. Validation and time slots are real — slots
  follow the opening hours in `src/data/visit.ts`, computed in Addis Ababa time (`src/lib/hours.ts`) — but submitting
  only simulates a request: nothing is sent or stored. Connect `onSubmit` in `ReservationDialog.tsx` to a booking
  backend before launch.
- **Add to order** (Signature section) is a UI demo with no cart behind it.
- **Call us** stays unavailable until `contact.phone` is set in `src/data/visit.ts`; social links show "at launch" until
  `social` in `src/data/site.ts` has real URLs. The location is the Bole district, not an invented street address.
- No `LocalBusiness` structured data is emitted: per the brand spec, add it only once real business details exist.

## Content notes

- Buna Atelier is a **fictional brand**. Hours, testimonials, events and prices are demo content and must be replaced
  with real data before any production launch.
- Photography is from [Unsplash](https://unsplash.com/license), served locally as WebP. Photographer credits are in
  `src/data/credits.ts` and in the site footer ("Photo credits"). Ethiopia outline: Natural Earth (public domain).
