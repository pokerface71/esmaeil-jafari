import { absoluteUrl, lastmod } from "lib/seo";
import { getPublishedPostsRaw } from "lib/supabase";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Dynamic sitemap at `/sitemap.xml`.
 *
 * The old `pages/sitemap.xml.tsx` used `getServerSideProps` to render the
 * sitemap on demand so freshly published articles appear immediately.
 * In the App Router the equivalent is a route handler (plus
 * `revalidate: 60` in the neighboring route segments so a static build
 * stays accurate for up to a minute).
 */
function urlEntry(loc: string, modified?: string): string {
  const last = modified ? `\n    <lastmod>${modified}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${last}\n  </url>`;
}

export async function GET(request: NextRequest) {
  const posts = await getPublishedPostsRaw();
  const now = lastmod(new Date().toISOString());

  const entries = [
    urlEntry(absoluteUrl("/"), now),
    urlEntry(absoluteUrl("/blog"), now),
    ...posts.map((post) =>
      urlEntry(
        absoluteUrl(`/blog/${post.slug}`),
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
