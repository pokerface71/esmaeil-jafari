import { absoluteUrl } from "lib/seo";
import { getPublishedPosts } from "lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogList from "../BlogList";

const BLOG_DESCRIPTION =
  "Articles on frontend development, React, Next.js and modern web technologies by Esmaeil Jafari.";

const LOCALES = ["en", "fa", "ar", "tr"] as const;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "Blog | Esmaeil Jafari",
    description: BLOG_DESCRIPTION,
    openGraph: {
      type: "website",
      siteName: "Esmaeil Jafari",
      title: "Blog | Esmaeil Jafari",
      description: BLOG_DESCRIPTION,
      url: absoluteUrl(`/${params.locale}/blog`),
      images: [{ url: "https://esmaeiljafari.dev/favicon-512.png" }]
    },
    twitter: {
      card: "summary",
      title: "Blog | Esmaeil Jafari",
      description: BLOG_DESCRIPTION
    },
    alternates: {
      canonical: absoluteUrl(`/${params.locale}/blog`)
    }
  };
}

export const revalidate = 60;

export default async function BlogPage({
  params
}: {
  params: { locale: string };
}) {
  console.log('[BlogPage] params:', params);
  const posts = await getPublishedPosts(params.locale);
  console.log('[BlogPage] posts count:', posts.length);
  if (posts.length > 0) {
    console.log('[BlogPage] first post slug:', posts[0].slug);
  }
  
  if (posts.length === 0) {
    notFound();
  }

  return <BlogList posts={posts} locale={params.locale} />;
}
