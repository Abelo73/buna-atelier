import { useEffect } from 'react'
import { defaultSiteUrl, pages, siteTitle } from '../data/pages'

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? defaultSiteUrl

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const meta = (key: 'name' | 'property', name: string, content: string) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(key, name)
      return m
    },
    'content',
    content,
  )

/** Keeps title, description, canonical and social-card tags in step with the current route. */
export function usePageMeta(path: string, overrides?: { title?: string; description?: string; noindex?: boolean }) {
  useEffect(() => {
    const page = pages.find((p) => p.path === path)
    const title = overrides?.title ?? page?.title ?? siteTitle
    const description = overrides?.description ?? page?.description ?? pages[0].description
    const url = `${siteUrl}${path === '/' ? '/' : path}`

    document.title = title
    meta('name', 'description', description)
    meta('name', 'robots', overrides?.noindex ? 'noindex' : 'index, follow')
    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      },
      'href',
      url,
    )
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', description)
  }, [path, overrides?.title, overrides?.description, overrides?.noindex])
}
