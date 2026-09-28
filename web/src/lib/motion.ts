// Motion tokens — one vocabulary for every animation on the site.
// Cinematic, not chaotic: long ease-outs, short distances, no bounce.

export const ease = {
  cinema: [0.22, 1, 0.36, 1],
  silk: [0.65, 0, 0.35, 1],
} as const

export const duration = {
  /** UI feedback: hover, focus, toggles. */
  quick: 0.24,
  base: 0.48,
  slow: 0.9,
  /** Text and block entrances; image crossfades. */
  reveal: 1.2,
  /** Large photographic reveals (clip wipes, frame openings). */
  cinema: 1.6,
  /** SVG line drawing (maps, flourishes, routes). */
  draw: 2.4,
  /** The hero's aroma line — the one deliberately slow gesture. */
  aroma: 3.4,
  settle: 2.4,
} as const

/** Springs for anything that follows the pointer. */
export const spring = {
  /** Tags and previews that trail the cursor. */
  follow: { stiffness: 260, damping: 28, mass: 0.5 },
  /** Slow parallax drift. */
  drift: { stiffness: 80, damping: 20, mass: 0.6 },
} as const

/** Hero choreography (seconds), from the spec's timeline. */
export const heroTimeline = {
  overlay: 0.2,
  eyebrow: 0.35,
  line1: 0.5,
  line2: 0.65,
  copy: 0.8,
  cta: 0.95,
  aroma: 1.1,
  scroll: 1.4,
} as const
