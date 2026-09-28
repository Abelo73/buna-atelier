<p align="center">
  <img src="docs/screenshots/banner.jpg" alt="Buna Atelier — Where coffee becomes a ritual." width="100%" />
</p>

# Buna Atelier · ቡና አትሌየር

**A cinematic website for a contemporary Ethiopian coffee house in Addis Ababa.**

Buna Atelier is a concept project exploring how Ethiopian coffee heritage can become a modern digital hospitality
experience, using editorial art direction, scroll storytelling, motion design and careful frontend engineering. The site
doesn't stack a hero, an about section and some cards. It tells one story, in order:

> **Origin → Roast → Ritual → Cup → Community → Visit**

A single visual motif runs through the whole site: a thin line of rising **aroma**. It lifts from the coffee cup in the
hero, draws the route from each origin to Addis on the map, rises from the three ceremony cups, and returns at the end
as the page closes the loop.

> [!NOTE]
> Buna Atelier is a **fictional brand** made for this portfolio piece. Prices, hours, events and testimonials are demo
> content, and no real address, phone number, award or supplier is claimed.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · React Router

---

## Screenshots

### The story, top to bottom

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/01-hero.jpg" alt="Hero: Where coffee becomes a ritual, beside a jebena pouring into a cup" /></td>
    <td width="50%"><img src="docs/screenshots/02-statement.jpg" alt="Opening statement: Coffee has never been just coffee here" /></td>
  </tr>
  <tr>
    <td><b>Hero</b>: the photo is revealed from below, the headline rises line by line, and the aroma line lifts from the cup.</td>
    <td><b>Opening statement</b>: each line brightens as you scroll to it.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/03-journey.jpg" alt="From origin to cup: four-stage sticky journey" /></td>
    <td><img src="docs/screenshots/04-origin.jpg" alt="Born in Ethiopian soil: interactive origin map" /></td>
  </tr>
  <tr>
    <td><b>From origin to cup</b>: a sticky scroll sequence where photos wipe in as a progress line fills.</td>
    <td><b>Origins</b>: an Ethiopia map drawn from Natural Earth data. Choosing a region draws its route to Addis and updates the tasting profile.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/05-ceremony.jpg" alt="The coffee ceremony: full-screen step Brew" /></td>
    <td><img src="docs/screenshots/06-three-cups.jpg" alt="Three pours: Abol, Tona, Bereka" /></td>
  </tr>
  <tr>
    <td><b>The ceremony</b>: roast, grind, brew, pour and gather, told as a full-screen documentary sequence.</td>
    <td><b>Three pours</b>: Abol, Tona and Bereka as illustrated cups, each round lighter than the last.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/07-menu.jpg" alt="Magazine-style menu with filters and search" /></td>
    <td><img src="docs/screenshots/16-menu-dialog.jpg" alt="Menu item dialog for Jebena Buna" /></td>
  </tr>
  <tr>
    <td><b>Menu</b>: a printed-menu layout with category filters, search and keyboard navigation.</td>
    <td><b>Item dialog</b>: an accessible modal with tasting notes and (demo) pricing.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/08-signature.jpg" alt="Buna Cloud signature drink showcase" /></td>
    <td><img src="docs/screenshots/09-space.jpg" alt="Designed for staying: four room panels" /></td>
  </tr>
  <tr>
    <td><b>Signature drink</b>: pointer parallax, with ingredients, notes and price revealed on hover or focus.</td>
    <td><b>The space</b>: four rooms linked to an architectural floor plan.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/10-materials.jpg" alt="Material language: Coffee" /></td>
    <td><img src="docs/screenshots/11-story.jpg" alt="Our story: A modern table with an old memory" /></td>
  </tr>
  <tr>
    <td><b>Material language</b>: clay, wood, textile, coffee and light, with horizontal photo wipes.</td>
    <td><b>Story</b>: editorial long-form with a drop cap and pull quote.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/12-events.jpg" alt="Events calendar with hover preview" /></td>
    <td><img src="docs/screenshots/13-gallery.jpg" alt="Asymmetric editorial gallery" /></td>
  </tr>
  <tr>
    <td><b>Events</b>: an editorial calendar where a photo preview follows the pointer.</td>
    <td><b>Gallery</b>: an asymmetric grid with a keyboard- and swipe-friendly lightbox.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/14-visit.jpg" alt="Come sit with us: hours, live open status, location" /></td>
    <td><img src="docs/screenshots/15-closing.jpg" alt="Closing: Take your time. The coffee will wait." /></td>
  </tr>
  <tr>
    <td><b>Visit</b>: a live "Open now" status in Addis Ababa time, whatever the visitor's time zone.</td>
    <td><b>Closing</b>: the hero returns in evening light. <i>Take your time. The coffee will wait.</i></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/17-reservation-form.jpg" alt="Reservation form" /></td>
    <td><img src="docs/screenshots/18-reservation-done.jpg" alt="Your table is requested" /></td>
  </tr>
  <tr>
    <td><b>Reservations</b>: real validation, with time slots that follow opening hours in Addis time.</td>
    <td><b>Confirmation</b>: "Your table is requested" (a front-end demo; nothing is sent).</td>
  </tr>
</table>

### Designed for mobile

<img src="docs/screenshots/mobile.jpg" alt="Four mobile screens: hero, origins, ceremony, menu" width="100%" />

Phones get their own layouts rather than a squeezed desktop. Sticky desktop sequences become vertical stories, filters
become swipeable chips, dialogs become bottom sheets, and nothing depends on hover.

---

## Highlights

**Design**

- A restrained palette (obsidian, coffee, clay, sand, ivory and forest) with brass used sparingly, avoiding the
  gold-on-black cliché.
- Cormorant Garamond display type with Manrope for UI, and Amharic set in Noto Serif Ethiopic wherever it adds
  meaning.
- Ethiopian identity comes through story, materials, photography and real ceremony practice rather than decorative
  motifs. Cultural notes are written with care, for example "practised in many ways across regions, communities and
  families."

**Motion**

- One shared set of motion values: cinematic ease-outs, a few named durations and springs, and no bounce.
- Scroll-driven sequences use only GPU-friendly transforms, and the aroma line is plain SVG path drawing.
- `prefers-reduced-motion` is respected everywhere. An optional desktop cursor ring adds "View" and "Explore" labels
  and never replaces the native cursor.

**Engineering**

- All content lives in typed data files (`menu.ts`, `origins.ts`, `events.ts`…), never inside JSX.
- The long home page mounts each section as it approaches the viewport. Tab, find-in-page, anchor links, printing, or
  10 seconds of idle time mount everything, so keyboard and screen-reader users always get the full page.
- One shared modal behaviour covers every dialog: focus trap, Escape to close, background made inert, focus returned
  on close.
- Opening hours and reservation slots are computed in **Addis Ababa time** and unit-tested from other time zones.
- A build-time SEO plugin generates Open Graph and Twitter tags, `sitemap.xml` and `robots.txt`, and preloads the
  hashed font files.

## Quality

| | Result |
| --- | --- |
| Lighthouse, desktop | **98** performance · **100** accessibility · **100** best practices · **100** SEO |
| Lighthouse, mobile | **~75** performance · **100** accessibility · **100** best practices · **100** SEO |
| axe-core (WCAG 2.2 AA) | **0 violations** on every page and in open dialogs |
| Responsive QA | 8 routes × 8 widths (1920 → 375): no overflow, no broken images, no missing alt text, no layout shift, no console errors |

## Run it locally

```bash
cd web
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview
```

Pages: `/` · `/experience` · `/coffee` · `/menu` · `/story` · `/events` · `/visit`. The project structure, deployment
notes (`VITE_SITE_URL`, SPA fallbacks) and the list of demo functionality are in **[web/README.md](web/README.md)**. The
original brief is [Buna_Atelier_Premium_Coffee_Website_Spec.md](Buna_Atelier_Premium_Coffee_Website_Spec.md).

## Credits

- Photography from [Unsplash](https://unsplash.com/license). Every photographer is credited in
  [`web/src/data/credits.ts`](web/src/data/credits.ts) and in the site footer under "Photo credits".
- Ethiopia outline from [Natural Earth](https://www.naturalearthdata.com/) (public domain).
- Type: Cormorant Garamond, Manrope and Noto Serif Ethiopic, via Fontsource.
