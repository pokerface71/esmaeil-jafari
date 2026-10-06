import { lastmod } from "lib/seo";
import { getPublishedPostsRaw } from "lib/data";
import { NextResponse } from "next/server";

/**
 * Dynamic child sitemap at `/sitemap-posts.xml`, referenced by the static
 * sitemap index at `public/sitemap.xml`.
 *
 * Two reasons for this split:
 * - `public/` files are served BEFORE route handlers in Next.js, so a route
 *   at `/sitemap.xml` would be shadowed by the root-level index file.
 * - Posts stay dynamic so freshly published Supabase articles appear
 *   immediately (the previous `app/sitemap.xml/route.ts` behaviour).
 *
 * URLs use the deployed site address directly: the sitemap must list what
 * crawlers can actually reach (given by the site owner).
 */
const SITE_URL = "https://esmaeil-jafari.netlify.app";

function siteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function urlEntry(loc: string, modified?: string): string {
  const last = modified ? `\n    <lastmod>${modified}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${last}\n  </url>`;
}

export async function GET() {
  // A sitemap must NEVER 500: `runPublicQuery` throws at runtime once its
  // retries are exhausted (Supabase down / env missing / network hiccup), and
  // Search Console reports the whole index as "could not be read" when a
  // child sitemap fails. Fall back to the static pages so we always return
  // valid XML; posts reappear on the next successful fetch.
  let posts: Awaited<ReturnType<typeof getPublishedPostsRaw>> = [];
  try {
    posts = await getPublishedPostsRaw();
  } catch (e) {
    console.warn(
      `[sitemap-posts] falling back to static pages: ${
        e instanceof Error ? e.message : String(e)
      }`
    );
  }
  const now = lastmod(new Date().toISOString());

  const LOCALES = ["en", "fa", "ar", "tr"];
  const entries = [
    urlEntry(siteUrl("/"), now),
    urlEntry(siteUrl("/blog"), now),
    ...posts.flatMap((post) =>
      LOCALES.map((locale) =>
        urlEntry(
          siteUrl(`/${locale}/blog/${post.slug}`),
          lastmod(post.updated_at || post.published_at)
        )
      )
    )
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries,
    `</urlset>`,
    ``
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600"
    }
  });
}
