import {
  absoluteUrl,
  blogPostingJsonLd,
  lastmod,
  ogImage,
  SITE_NAME
} from "lib/seo";
import { getPostBySlugRaw, getPublishedSlugs } from "lib/data";
import { toPostView } from "lib/supabase";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "./BlogPost";

const LOCALES = ["en", "fa", "ar", "tr"] as const;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await getPostBySlugRaw(slug);
  if (!post) notFound();

  const view = toPostView(post, locale);
  if (!view) notFound();

  return {
    title: `${view.title} | Esmaeil Jafari`,
    description:
      view.excerpt ||
      "Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies.",
    openGraph: {
      type: "article",
      siteName: "Esmaeil Jafari",
      title: view.title,
      description: view.excerpt || "",
      url: absoluteUrl(`/${locale}/blog/${view.slug}`),
      images: [
        { url: ogImage(view.cover_image_url), width: 1200, height: 630 }
      ],
      publishedTime: lastmod(view.published_at),
      authors: [SITE_NAME]
    },
    twitter: {
      card: view.cover_image_url?.startsWith("http")
        ? "summary_large_image"
        : "summary",
      title: view.title,
      description: view.excerpt || "",
      images: [ogImage(view.cover_image_url)]
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}/blog/${view.slug}`),
     languages: Object.fromEntries(
        LOCALES.map((l) => [`/${l}/blog/${view.slug}`, l])
      )
    },
    other: {
      "application/ld+json": JSON.stringify(
        blogPostingJsonLd({
          title: view.title,
          excerpt: view.excerpt,
          slug: view.slug,
          cover: view.cover_image_url,
          publishedAt: view.published_at
        })
      )
    }
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  console.log('[BlogPostPage] params:', { locale, slug });
  const post = await getPostBySlugRaw(slug);
  console.log('[BlogPostPage] post:', post ? { slug: post.slug, id: post.id } : null);
  if (!post) {
    console.log('[BlogPostPage] post not found, calling notFound()');
    notFound();
  }

  const view = toPostView(post, locale);
  console.log('[BlogPostPage] view:', view ? { slug: view.slug, title: view.title } : null);
  if (!view) {
    console.log('[BlogPostPage] view is null, calling notFound()');
    notFound();
  }

  return <BlogPost post={view} locale={locale} />;
}
