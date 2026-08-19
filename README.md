# Triple Dynamic Solutions, LLC — Website

Marketing site for Triple Dynamic Solutions, LLC. Built with **React + Vite**, deployed to
**GitHub Pages**, served from the custom domain **[tdsolve.com](https://tdsolve.com)**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) for dev/build
- Plain CSS (custom properties, no framework) — modern dark theme
- GitHub Actions for CI/CD to GitHub Pages

## Local development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build to ./dist
npm run preview  # preview the production build locally
```

## Project structure

```
public/
  CNAME          # custom domain for GitHub Pages (tdsolve.com)
  favicon.svg    # placeholder favicon / mark
  robots.txt     # crawl policy + sitemap pointer
  404.html       # GitHub Pages not-found page
  og.png         # social preview card (og:image)
  count.js       # self-hosted GoatCounter analytics script
src/
  components/    # Navbar, Footer, Logo (placeholder)
  sections/      # Hero, Services, About, WhyUs, Contact
  pages/         # X12Studio, X12Paper, X12License (path-routed)
  App.jsx        # page composition + path routing
  index.css      # global styles + design tokens
scripts/
  postbuild.mjs  # per-route HTML entries (title/meta/JSON-LD) + sitemap.xml
.github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

Page routes (`/x12-studio/`, `/x12-paper/`, `/x12-license/`) are real paths: the
post-build step stamps a per-route `index.html` with its own title, description,
canonical, Open Graph tags, and JSON-LD, so each page is independently indexable.
Old `/#/x12-…` hash links redirect client-side (App.jsx). Analytics is GoatCounter
(cookie-less, script self-hosted in `public/count.js`) reporting to
`tdsolve.goatcounter.com` — register that code at goatcounter.com to activate.

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the site and
publishes it to GitHub Pages. No manual steps required after the initial setup below.

### One-time GitHub Pages setup

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Under **Custom domain**, enter `tdsolve.com` and save (this is also enforced by
   `public/CNAME`).
3. Enable **Enforce HTTPS** once the certificate is provisioned.

### Squarespace DNS (connecting tdsolve.com)

In Squarespace: **Settings → Domains → tdsolve.com → DNS Settings**, add:

| Type  | Host  | Value                       |
| ----- | ----- | --------------------------- |
| A     | @     | 185.199.108.153             |
| A     | @     | 185.199.109.153             |
| A     | @     | 185.199.110.153             |
| A     | @     | 185.199.111.153             |
| CNAME | www   | royyeh007.github.io         |

DNS changes can take up to 24–48 hours to propagate. The `www` CNAME points at the
GitHub Pages host (`<username>.github.io`).

## Customizing

- **Logo:** replace `src/components/Logo.jsx` and `public/favicon.svg` with final brand art.
- **Content:** edit the arrays/text in `src/sections/*`.
- **Colors:** tweak the CSS custom properties at the top of `src/index.css`.
- **Contact form:** currently opens the visitor's email client. For a real backend, wire
  up [Formspree](https://formspree.io/) or similar in `src/sections/Contact.jsx`.
