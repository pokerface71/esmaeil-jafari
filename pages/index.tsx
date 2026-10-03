import Head from "next/head";
import HomeTemplate from "components/design-system/templates/HomeTemplate";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  personJsonLd,
} from "lib/seo";

/**
 * Page = thin wrapper. All composition lives in the design-system template;
 * this file only owns SEO/head concerns — title, description, canonical,
 * Open Graph/Twitter cards and the Person JSON-LD all live here so crawlers
 * and social scrapers get a complete head on first paint (SSR).
 */
export default function HomePage() {
  return (
    <>
      <Head>
        <title key="title">{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} key="description" />
        <link rel="canonical" href={`${SITE_URL}/`} key="canonical-home" />

        {/* Open Graph */}
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:site_name" content={SITE_NAME} key="og-site" />
        <meta property="og:title" content={DEFAULT_TITLE} key="og-title" />
        <meta
          property="og:description"
          content={DEFAULT_DESCRIPTION}
          key="og-description"
        />
        <meta property="og:url" content={`${SITE_URL}/`} key="og-url" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} key="og-image" />
        <meta property="og:image:width" content="512" key="og-image-w" />
        <meta property="og:image:height" content="512" key="og-image-h" />
        <meta property="og:locale" content="en_US" key="og-locale" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="tw-card" />
        <meta name="twitter:title" content={DEFAULT_TITLE} key="tw-title" />
        <meta
          name="twitter:description"
          content={DEFAULT_DESCRIPTION}
          key="tw-description"
        />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} key="tw-image" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          key="ld-person"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <HomeTemplate withHead={false} />
    </>
  );
}
