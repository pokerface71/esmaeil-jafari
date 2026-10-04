import HomeTemplate from "components/design-system/templates/HomeTemplate";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  absoluteUrl,
  personJsonLd
} from "lib/seo";
import type { Metadata } from "next";

/**
 * Home route: App Router equivalent of pages/index.tsx.
 *
 * The head tags (title, description, canonical, OG/Twitter cards, Person
 * JSON-LD) now live in `generateMetadata` because `<Head>` is no longer
 * available on the server. The template is a pure presentational client
 * component with all scroll/parallax behaviour in the design-system hooks.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: absoluteUrl("/"),
      images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512 }],
      locale: "en_US"
    },
    twitter: {
      card: "summary",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE]
    },
    alternates: {
      canonical: absoluteUrl("/")
    },
    other: {
      "application/ld+json": JSON.stringify(personJsonLd)
    }
  };
}

export default function HomePage() {
  return <HomeTemplate />;
}
