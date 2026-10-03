# Esmaeil Jafari — Portfolio

**Live site: [https://esmaeil-jafari.netlify.app/](https://esmaeil-jafari.netlify.app/)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/35d3e182-bd2a-4f58-bfb4-56810770ce0c/deploy-status)](https://app.netlify.com/projects/esmaeil-jafari/deploys)
[![Repository](https://img.shields.io/badge/GitHub-pokerface71%2Fesmaeil--jafari-181717?logo=github)](https://github.com/pokerface71/esmaeil-jafari)

Personal portfolio and blog of **Esmaeil Jafari**, a frontend developer. Built with Next.js (pages router), styled with Tailwind CSS, and backed by Supabase for blog content and the admin panel.

- **Website:** [esmaeil-jafari.netlify.app](https://esmaeil-jafari.netlify.app/)
- **Source code:** [github.com/pokerface71/esmaeil-jafari](https://github.com/pokerface71/esmaeil-jafari)
- **Issues:** [github.com/pokerface71/esmaeil-jafari/issues](https://github.com/pokerface71/esmaeil-jafari/issues)

## Tech stack

- [Next.js 16](https://nextjs.org/) (pages router, Turbopack builds) + [React 19](https://react.dev/) + [TypeScript 7](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) with a design-system layer under `components/design-system`
- [Supabase](https://supabase.com/) — blog posts (4 locales: en/fa/ar/tr) and admin auth
- [Storybook 10](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/) + Testing Library for tests
- Deployed on [Netlify](https://www.netlify.com/) via `netlify.toml` + `@netlify/plugin-nextjs`

## Getting started

```bash
git clone https://github.com/pokerface71/esmaeil-jafari.git
cd esmaeil-jafari
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [`.env.example`](.env.example):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (blog + admin) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

The site still builds and renders empty blog sections when these are missing.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (Turbopack) |
| `npm run typecheck` | Type-check app + test tsconfigs |
| `npm test` | Run Vitest suite |
| `npm run test:coverage` | Tests with coverage |
| `npm run storybook` | Storybook on port 6006 |
| `npm run build-storybook` | Static Storybook build |

## SEO & performance

- Per-page meta, Open Graph/Twitter cards and JSON-LD (`lib/seo.ts`, applied in `pages/`)
- Dynamic [`sitemap.xml`](pages/sitemap.xml.tsx) and [`robots.txt`](public/robots.txt) (admin disallowed)
- Self-hosted fonts via `next/font` (no Google Fonts requests at runtime)
- Long-cache headers for hashed assets in `netlify.toml`
- Blog pages are SSG/ISR with graceful build-time fallback if Supabase is unreachable

## License

Private project — all rights reserved.
