/**
 * Single source of truth for crawlable metadata: canonical origin, default
 * title/description, Open Graph image and JSON-LD shapes. Every page imports
 * from here so tags can never drift apart between routes.
 */

export const SITE_URL = "https://esmaeiljafari.dev";
export const SITE_NAME = "Esmaeil Jafari";
export const DEFAULT_TITLE = "Esmaeil Jafari — Frontend Developer";
export const DEFAULT_DESCRIPTION =
  "Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon-512.png`;

/** Resolve a site-relative path against the canonical origin. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Normalize any cover image into a URL that social crawlers accept.
 * `data:` URIs (locally generated cover art) are not valid `og:image` values,
 * so they fall back to the site image.
 */
export function ogImage(cover?: string | null): string {
  if (!cover) return DEFAULT_OG_IMAGE;
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  if (cover.startsWith("/")) return absoluteUrl(cover);
  return DEFAULT_OG_IMAGE;
}

/** Last modification date, safely formatted (invalid/missing → undefined). */
export function lastmod(value?: string | null): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

/** schema.org Person — connects the site with its author for search engines. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  jobTitle: "Frontend Developer",
  sameAs: [
    "https://github.com/pokerface71",
    "https://www.linkedin.com/in/esmaeil-jafari1992/",
    "https://instagram.com/esmaeil_jafari_official",
  ],
};

/** schema.org BlogPosting for a single article. */
export function blogPostingJsonLd(post: {
  title: string;
  excerpt?: string | null;
  slug: string;
  cover?: string | null;
  publishedAt?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || DEFAULT_DESCRIPTION,
    image: ogImage(post.cover),
    datePublished: post.publishedAt ?? undefined,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };
}
