import { lastmod } from "lib/seo";
import { getPublishedPostsRaw } from "lib/supabase";
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
  const posts = await getPublishedPostsRaw();
  const now = lastmod(new Date().toISOString());

  const entries = [
    urlEntry(siteUrl("/"), now),
    urlEntry(siteUrl("/blog"), now),
    ...posts.map((post) =>
      urlEntry(
        siteUrl(`/blog/${post.slug}`),
        lastmod(post.updated_at || post.published_at)
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
