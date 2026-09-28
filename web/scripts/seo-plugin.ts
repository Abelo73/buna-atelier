import type { Plugin } from 'vite'
import { defaultSiteUrl, pages } from '../src/data/pages.ts'

/**
 * Build-time SEO:
 *  - absolute Open Graph / Twitter tags in index.html (crawlers without JS see them)
 *  - sitemap.xml and robots.txt generated from src/data/pages.ts
 *  - <link rel="preload"> for the two fonts the hero needs first (hashed names are only known at build time)
 */
export function seoPlugin(siteUrlFromEnv?: string): Plugin {
  const siteUrl = (siteUrlFromEnv || defaultSiteUrl).replace(/\/$/, '')
  const home = pages[0]

  return {
    name: 'buna-seo',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const tags = [
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` } },
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
          { tag: 'meta', attrs: { property: 'og:site_name', content: 'Buna Atelier' } },
          { tag: 'meta', attrs: { property: 'og:title', content: home.title } },
          { tag: 'meta', attrs: { property: 'og:description', content: home.description } },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` } },
          { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/og-image.jpg` } },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
          {
            tag: 'meta',
            attrs: { property: 'og:image:alt', content: 'Buna Atelier — Where coffee becomes a ritual.' },
          },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
          { tag: 'meta', attrs: { name: 'twitter:title', content: home.title } },
          { tag: 'meta', attrs: { name: 'twitter:description', content: home.description } },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` } },
        ].map((t) => ({ ...t, injectTo: 'head' as const }))

        // Preload the display serif (hero headline) and the UI sans in production builds.
        const fonts = Object.keys(ctx.bundle ?? {}).filter((f) =>
          /(cormorant-garamond-latin-300-normal|manrope-latin-wght-normal)-[\w-]+\.woff2$/.test(f),
        )
        const preloads = fonts.map((href) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${href}`, crossorigin: '' },
          injectTo: 'head-prepend' as const,
        }))

        return { html, tags: [...preloads, ...tags] }
      },
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = pages
        .map(
          (p) =>
            `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}
