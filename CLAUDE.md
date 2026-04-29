# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # Type-check (tsc -b) + production build to dist/
npm run lint      # ESLint over the repo
npm run preview   # Serve the built dist/ locally
```

There is no test runner configured. `npm run build` is the gating check — it runs `tsc -b` first, so a passing build means types are clean.

## Architecture

This is a **multilingual (Hebrew/English/Arabic) marketing site** for the עשור (Asor) accounting firm, deployed as a static SPA to GitHub Pages on the custom domain `za-cpa.com`. There is also a dedicated landing page for "Orit Group" (`/orit-group`), a women's coaching group run by one of the principals.

### Stack

- **React 19** + **TypeScript** (strict, with `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`)
- **Vite 8** with `@vitejs/plugin-react` and `@tailwindcss/vite`
- **Tailwind CSS v4** — configured entirely in CSS (`src/index.css` `@theme {}` block); there is no `tailwind.config.js`. Adding design tokens means adding CSS variables to the `@theme` block.
- **React Router 7** (`BrowserRouter`, routes declared in `src/App.tsx`)
- **react-i18next** with `i18next-browser-languagedetector` (locale persisted in localStorage as `za-cpa-lang`)
- **lucide-react** for icons

### Content flow: i18n is the CMS

Almost all user-facing content lives in `src/i18n/locales/{he,en,ar}.json`. The pattern in `src/data/content.ts` is the spine of the site:

- A typed `const` array of slugs (e.g. `serviceSlugs`, `sectorSlugs`) declares the canonical entities.
- Hooks like `useServices()` / `useSectors()` map each slug to a translated record by calling `t(\`services.items.${slug}.title\`)` etc., including arrays via `t(..., { returnObjects: true })`.
- Routes like `/services/:slug` and `/sectors/:slug` resolve against these slug arrays; an unknown slug redirects with `<Navigate to="/services" replace />`.

**Adding a service or sector** requires three coordinated edits:
1. Add the slug to `serviceSlugs` / `sectorSlugs` in `src/data/content.ts`.
2. Add a matching `services.items.<slug>` (or `sectors.items.<slug>`) block to **all three** locale JSONs (he, en, ar). The shape (title, shortTitle, summary, bullets[]) must match what the hook reads.
3. If the slug needs an icon, extend the `iconMap` in `src/pages/ServiceDetailPage.tsx` (and equivalents) — the `ServiceIcon` / `SectorIcon` types are aliases of the slug union, so TS will flag missing entries.

### Layout, RTL, and accessibility

- `src/components/Layout.tsx` is the shell for every route. On language change it sets `document.documentElement.lang` and `dir` (`rtl` for `he`/`ar`, `ltr` for `en`). It also resets scroll on route change.
- Use **CSS logical properties** (`ms-`, `me-`, `start-`, `end-`) rather than `ml`/`mr`/`left`/`right` so layouts flip correctly between RTL and LTR. Existing components consistently follow this.
- Hebrew is the fallback language (`fallbackLng: 'he'` in `src/i18n/index.ts`) and `index.html` ships with `dir="rtl" lang="he"`.
- `AccessibilityMenu` (always mounted via `Layout`) toggles classes on `<html>` (`a11y-text-large`, `a11y-high-contrast`, `a11y-no-motion`, etc.); the styling for those classes lives at the bottom of `src/index.css`. Settings persist in localStorage under `za-cpa-a11y`.
- `CookieConsent` persists under `za-cpa-consent` and exposes an `openConsentSettings()` helper plus an `OPEN_CONSENT_EVENT` window event that other components can dispatch to reopen the modal.

### Forms → Google Apps Script email backend

The site has no custom server. Lead/contact forms call `sendLead()` in `src/lib/notify.ts`, which `POST`s JSON (with `Content-Type: text/plain` to skip CORS preflight, plus `keepalive: true` so the request survives navigation away — important on the Orit page which can redirect to a SUMIT payment URL).

The endpoint is the Apps Script web app in `apps-script/Code.gs`. It routes by `payload.target`:
- `'office'` → `office@za-cpa.com` (general site contact form)
- `'orit'` → `orit@za-cpa.com` (Orit Group signup)

`NOTIFY_ENDPOINT` in `src/lib/notify.ts` is a placeholder (`REPLACE_WITH_YOUR_DEPLOYMENT_ID`). When it is unset, `sendLead` warns and no-ops — UI flows still complete. The header comment in `apps-script/Code.gs` documents the deploy steps; if you change the script, the deployment URL must be re-pasted into `notify.ts`.

### Deployment & SPA routing on GitHub Pages

- `.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` to GitHub Pages.
- `public/CNAME` pins the custom domain to `za-cpa.com`.
- GitHub Pages doesn't natively support SPA deep links. The repo uses the well-known `spa-github-pages` trick:
  - `public/404.html` rewrites unknown paths to `/?/<encoded-path>`.
  - The inline script in `index.html` (top of `<head>`) decodes that back into a real path via `history.replaceState` before React mounts.
  - **Do not** remove either of those scripts without replacing the SPA-routing strategy.

### Design system

Custom palette (blush, rose-gold, cream, ink, navy) is defined as CSS variables in the `@theme` block of `src/index.css`. Tailwind picks them up automatically as utility colors (`bg-rose-gold-500`, `text-ink-800`, etc.). The hero animation classes (`hero-orb*`, `hero-stars`, `@keyframes orb-drift-*`) are also defined there.

### Routing map (kept in sync with `src/App.tsx`)

Top-level routes: `/`, `/about`, `/team`, `/services`, `/services/:slug`, `/sectors`, `/sectors/:slug`, `/articles`, `/contact`, `/accessibility`, `/privacy`, `/orit-group`, plus a `*` 404. All sit inside the shared `Layout` route.
