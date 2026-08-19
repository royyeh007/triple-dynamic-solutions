// Runs after `vite build` (see package.json). Turns the single-page dist into
// per-route HTML entries so every page has a real, indexable URL with its own
// title, description, canonical, Open Graph tags, and JSON-LD — and emits
// sitemap.xml. The body stays the same SPA bundle; only the head differs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ORIGIN = 'https://tdsolve.com'
const DIST = new URL('../dist', import.meta.url).pathname

const ORG = {
  '@type': 'Organization',
  name: 'Triple Dynamic Solutions, LLC',
  url: `${ORIGIN}/`,
  email: 'support@tdsolve.com',
}

const ROUTES = [
  {
    path: '/x12-studio/',
    title: 'X12 Translation Engine — Self-Hosted EDI with SNIP L1–L7 | Triple Dynamic Solutions',
    description:
      'A pure, deterministic X12 translation engine that runs inside your network: 33 transaction sets as data, SNIP L1–L7 validation built in, byte-identical output. One Docker container with a visual mapping studio and a one-call API.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '@x12/core — self-hosted X12 translation engine',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Self-hosted (Docker)',
      url: `${ORIGIN}/x12-studio/`,
      description:
        'Self-hosted X12 EDI translation engine: 33 transaction sets, SNIP L1–L7 validation, deterministic byte-identical output, visual mapping studio, and translate API in one container.',
      publisher: ORG,
    },
  },
  {
    path: '/x12-paper/',
    title: 'Why the Engine Is the Product — X12 Engine Technical Brief | Triple Dynamic Solutions',
    description:
      'Technical brief on @x12/core: four design decisions — a pure-function engine, the X12 spec as typed data, in-engine SNIP validation, and immutable mapping revisions — compared with cloud EDI APIs, legacy translators, and DIY parsers.',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Why the engine is the product',
      description:
        'Four design decisions behind @x12/core, a self-hosted X12 translation engine, and why they matter more to an EDI program than any feature list.',
      datePublished: '2026-08-07',
      dateModified: new Date().toISOString().slice(0, 10),
      author: ORG,
      publisher: ORG,
      mainEntityOfPage: `${ORIGIN}/x12-paper/`,
    },
  },
  {
    path: '/x12-license/',
    title: 'Generate Your X12 Engine License | Triple Dynamic Solutions',
    description:
      'Self-service license generation and renewal for X12 Engine customers — enter your company code and instance ID to download your license file.',
    ogType: 'website',
    jsonLd: null,
  },
]

const base = readFileSync(join(DIST, 'index.html'), 'utf8')

const setTag = (html, re, replacement, route) => {
  if (!re.test(html)) throw new Error(`postbuild: pattern ${re} not found for ${route}`)
  return html.replace(re, replacement)
}

for (const r of ROUTES) {
  const url = ORIGIN + r.path
  let html = base
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${r.title}</title>`, r.path)
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${r.description}" />`, r.path)
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, r.path)
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${r.title}" />`, r.path)
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${r.description}" />`, r.path)
  html = setTag(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${r.ogType}" />`, r.path)
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, r.path)
  html = setTag(
    html,
    /<script type="application\/ld\+json">.*?<\/script>/s,
    r.jsonLd ? `<script type="application/ld+json">${JSON.stringify(r.jsonLd)}</script>` : '',
    r.path
  )
  mkdirSync(join(DIST, r.path), { recursive: true })
  writeFileSync(join(DIST, r.path, 'index.html'), html)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [{ path: '/', priority: '1.0' }]
  .concat(ROUTES.map((r) => ({ path: r.path, priority: r.path === '/x12-license/' ? '0.3' : '0.8' })))
  .map(
    (u) => `  <url>\n    <loc>${ORIGIN}${u.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)

console.log(`postbuild: wrote ${ROUTES.length} route entries + sitemap.xml`)
