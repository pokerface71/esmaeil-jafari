import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlugRaw,
  getPublishedSlugs,
  toPostView,
  type Post,
} from "lib/supabase";
import { blogPostingJsonLd, absoluteUrl, ogImage, lastmod, SITE_NAME } from "lib/seo";
import BlogPost from "./BlogPost";

/**
 * Slug route: App Router equivalent of pages/blog/[slug].tsx.
 *
 * - `generateStaticParams` enumerates all published slugs (replacement for
 *   getStaticPaths with fallback: blocking — the loading state was deleted).
 * - `generateMetadata` moved the next/head block (title/description/OG/Twitter
 *   + BlogPosting JSON-LD).
 * - `revalidate: 60` keeps ISR for newly published articles.
 */
export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlugRaw(params.slug);
  if (!post) notFound();

  const view = toPostView(post, "en");
  if (!view) notFound();

  return {
    title: `${view.title} | Esmaeil Jafari`,
    description: view.excerpt || "Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies.",
    openGraph: {
      type: "article",
      siteName: "Esmaeil Jafari",
      title: view.title,
      description: view.excerpt || "",
      url: absoluteUrl(`/blog/${view.slug}`),
      images: [{ url: ogImage(view.cover_image_url), width: 1200, height: 630 }],
      publishedTime: lastmod(view.published_at),
      authors: [SITE_NAME],
    },
    twitter: {
      card: view.cover_image_url?.startsWith("http")
        ? "summary_large_image"
        : "summary",
      title: view.title,
      description: view.excerpt || "",
      images: [ogImage(view.cover_image_url)],
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${view.slug}`),
    },
    other: {
      "application/ld+json": JSON.stringify(
        blogPostingJsonLd({
          title: view.title,
          excerpt: view.excerpt,
          slug: view.slug,
          cover: view.cover_image_url,
          publishedAt: view.published_at,
        })
      ),
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlugRaw(params.slug);
  if (!post) notFound();

  // Resolve the best translation per post for the active locale. The
  // client renders it; the slug route is the data source.
  const view = toPostView(post, "en");
  if (!view) notFound();

  return <BlogPost post={post} />;
}
