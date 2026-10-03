import type { GetServerSideProps } from "next";
import { absoluteUrl, lastmod } from "lib/seo";
import { getPublishedPostsRaw } from "lib/supabase";

/**
 * Dynamic sitemap at `/sitemap.xml`.
 *
 * It is rendered on demand (SSR) instead of written to `public/` so freshly
 * published posts show up immediately — articles are served through ISR, so a
 * static file would only be correct as of the last build. The response is
 * edge-cached for an hour through the Cache-Control header below.
 */

function urlEntry(loc: string, modified?: string): string {
  const last = modified ? `\n    <lastmod>${modified}</lastmod>` : "";
  return `  <url>\n    <loc>${loc}</loc>${last}\n  </url>`;
}

function Sitemap(): null {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
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
    ),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries,
    `</urlset>`,
    ``,
  ].join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default Sitemap;
