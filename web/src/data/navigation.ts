export type NavItem = {
  label: string
  href: string
  /** Home-page section ids that light up this item's indicator. */
  sections: string[]
}

// Section anchors on the home page. Dedicated routes arrive in later phases.
export const primaryNav: NavItem[] = [
  { label: 'Experience', href: '/#experience', sections: ['experience', 'journey'] },
  { label: 'Coffee', href: '/#coffee', sections: ['coffee', 'ceremony', 'three-cups'] },
  { label: 'Menu', href: '/#menu', sections: ['menu', 'signature'] },
  {
    label: 'Our Story',
    href: '/#story',
    sections: ['space', 'materials', 'story', 'events', 'gallery', 'testimonials'],
  },
  { label: 'Visit', href: '/#visit', sections: ['visit', 'closing'] },
]
