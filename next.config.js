/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  // Emit the generated sw.js + manifest.webmanifest (and workbox precache
  // manifest) into `public` so they are served at the root next to .next.
  // Netlify builds with `npm run build` and publishes `.next` + `public/`
  // untouched, so /sw.js and /manifest.webmanifest are reachable.
  dest: 'public',

  // Never auto-register in development: browsers refuse SWs on non-localhost.
  disable: process.env.NODE_ENV === 'development',

  // Register the SW as soon as the page loads (workbox-window runtime).
  register: true,

  // Bypass the waiting SW the moment a new one is ready: the very first
  // visit already gets the full offline experience (no "New content
  // available" prompt). Required for a zero-friction install/offline UX.
  skipWaiting: true,

  // Runtime caching strategy.
  // - /_next/static/: immutable cache (JS/CSS/font) for a year.
  // - Everything else: short HTTP-cache on HTML so ISR revalidation stays
  //   effective while static assets stay fast offline.
  headers: [
    // Self-hosted fonts (next/font): immutable, cache forever so mobile
    // doesn't re-download them on every visit.
    {
      source: '/_next/static/media/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    // Next.js server chunks: immutable, cache forever.
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    // Next.js server chunks: immutable, cache forever.
    {
      source: '/_next/chunks/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    // HTML pages: short HTTP-cache so ISR revalidation stays effective.
    {
      source: '/(.*)',
      has: [
        { key: 'accept', value: '(text/html|application/xhtml\+xml)' }
      ],
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }
      ]
    }
  ],

  // Auto-generate the full offline manifest from the built pages/assets
  // (including /blog + /blog/[slug]) instead of only caching the home route.
  // Coupled with a workbox-config.js (below) next-pwa emits sw.js with:
  //   - precache for all app shell + static assets
  //   - runtime caching for API/static assets
  //   - a fetch handler: network-first for HTML (ISR), cache-first for
  //     everything else, with a generic offline fallback for HTML pages.
  // Provide the full Workbox workbox-config.js for max optimization.
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats-eight-theta.vercel.app",
        pathname: "/api/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  turbopack: {
    resolveAlias: {
      "@styles": "./styles",
    },
  },
};
module.exports = withPWA(nextConfig);