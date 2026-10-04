{
  "module": "workbox-build",
  "workboxType": "module",
  "globDirectory": ".next/standalone/",

  // App Router: the built site is co-located with the `public` assets, so the
  // SW is emitted into `public` and serves the whole app shell offline.
  "globPatterns": [
    "**/*.{html,js,css,png,jpg,jpeg,svg,ico,webp,woff2,ttf,woff,json}"
  ],

  "maximumFileSizeToCacheInBytes": 20 * 1024 * 1024,

  // HTML routes: network-first (ISR still revalidates live), falling back to
  // the cached index so `/?offline` and `/blog?offline` render instantly.
  "runtimeCaching": [
    {
      "urlPattern": /^https:\/\/api\.supabase\.co\//,
      "handler": "NetworkFirst",
      "options": {
        "cacheName": "supabase-api",
        "networkTimeoutSeconds": 5,
        "expiration": {
          "maxEntries": 50,
          "maxAgeSeconds": 60 * 60
        },
        "cacheableResponse": {
          "statuses": [0, 200]
        }
      }
    },
    {
      "urlPattern": /^https:\/\/github-readme-stats-eight-theta\.vercel\.app\//,
      "handler": "StaleWhileRevalidate",
      "options": {
        "cacheName": "github-stats",
        "expiration": {
          "maxEntries": 30,
          "maxAgeSeconds": 60 * 60
        }
      }
    },
    {
      "urlPattern": /^https:\/\/fonts\.googleapis\.com\/.*/,
      "handler": "StaleWhileRevalidate",
      "options": {
        "cacheName": "google-fonts-stylesheets",
        "expiration": {
          "maxEntries": 20,
          "maxAgeSeconds": 60 * 60 * 24 * 30
        }
      }
    },
    {
      // Static assets (JS/CSS/font/images) -> cache-first, long-lived cache.
      "urlPattern": /^https:\/\/(.*)\.(js|css|png|jpg|jpeg|svg|ico|webp|woff2|ttf|woff|json)$/,
      "handler": "CacheFirst",
      "options": {
        "cacheName": "static-assets",
        "expiration": {
          "maxEntries": 200,
          "maxAgeSeconds": 60 * 60 * 24 * 365
        },
        "cacheableResponse": {
          "statuses": [0, 200]
        }
      }
    },
    {
      // HTML pages: network-first so ISR revalidation still works, but
      // cache-first fallback for any stale entry.
      "urlPattern": "/*",
      "handler": "NetworkFirst",
      "options": {
        "cacheName": "pages",
        "networkTimeoutSeconds": 5,
        "expiration": {
          "maxEntries": 50,
          "maxAgeSeconds": 60 * 60
        },
        "cacheableResponse": {
          "statuses": [0, 200]
        }
      }
    }
  ],

  // Fallback HTML for navigation requests that the service worker cannot
  // fulfill (offline or 404): serve the cached home page so the app shell
  // always renders.
  "navigateFallback": "/index.html",
  "navigateFallbackWhitelist": [/^\/[^\\?]*$/],

  // Keep the cache fresh and never grow unbounded.
  "cleanUrlList": true,
  "cleanupOutdatedCaches": true,

  // Opt-in to the browser's optional background sync for late-arriving
  // network requests (best-effort online-only).
  "suppressWarnings": true
}
