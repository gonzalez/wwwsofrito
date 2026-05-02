# AGENTS.md

Static site (HTML/CSS/JS), no build step. Open `index.html` directly in a browser to test.

## Structure
- `app.js` — product data, filter state, and cart toast logic (all inline, no modules)
- `styles.css` — mobile-first, breakpoints at 480px and 768px (`max-width` media queries)
- `index.html` — entrypoint; scripts loaded at end of body

## Deployment
- GitHub Pages, serves from repo root on `main` branch
- Enable in repo Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`
- No env vars, no build command, no `node_modules`

## Conventions
- CSS classes / IDs: kebab-case
- JS functions/vars: camelCase
- Product data hardcoded in `app.js` top-level `products` array (id, type, title, author, description, price, icon)

## Verification
- No automated tests or linters configured — manual browser testing only
- Check filter buttons (All/Books/Posters) and cart toast notifications
