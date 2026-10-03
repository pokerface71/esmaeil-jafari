import Head from "next/head";
import HomeTemplate from "components/design-system/templates/HomeTemplate";

/**
 * Page = thin wrapper. All composition lives in the design-system template;
 * this file only owns SEO/head concerns.
 */
export default function HomePage() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://esmaeiljafari.dev/"
          key="canonical-home"
        />
      </Head>
      <HomeTemplate />
    </>
  );
}
