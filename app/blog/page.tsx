import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "lib/seo";
import { getPublishedPostsRaw, toPostView, isSupabaseConfigured } from "lib/supabase";
import BlogList from "./BlogList";

const BLOG_DESCRIPTION =
  "Articles on frontend development, React, Next.js and modern web technologies by Esmaeil Jafari.";

/**
 * Blog list route: App Router equivalent of pages/blog/index.tsx.
 *
 * Data fetching happens at request time (server component) with ISR
 * (revalidate: 60) so freshly published articles appear on the live site.
 * `generateMetadata` moved the next/head block from the original file.
 */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Esmaeil Jafari",
    description: BLOG_DESCRIPTION,
    openGraph: {
      type: "website",
      siteName: "Esmaeil Jafari",
      title: "Blog | Esmaeil Jafari",
      description: BLOG_DESCRIPTION,
      url: absoluteUrl("/blog"),
      images: [{ url: "https://esmaeiljafari.dev/favicon-512.png" }],
    },
    twitter: {
      card: "summary",
      title: "Blog | Esmaeil Jafari",
      description: BLOG_DESCRIPTION,
    },
    alternates: {
      canonical: absoluteUrl("/blog"),
    },
  };
}

export default async function BlogPage() {
  const posts = await getPublishedPostsRaw();
  const views = posts
    .map((p) => toPostView(p, "en"))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (views.length === 0 && !isSupabaseConfigured) {
    notFound();
  }

  return <BlogList posts={posts} />;
}
