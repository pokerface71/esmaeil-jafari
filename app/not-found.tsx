import NotFoundTemplate from "components/design-system/templates/NotFoundTemplate";

/**
 * Global not-found page (App Router).
 *
 * Replaces Next's bare default 404 with the design-system template, so
 * unmatched URLs and every `notFound()` call (unknown blog slug, unpublished
 * post, …) render the same Header/aurora/Footer shell as the rest of the site.
 */
export default function NotFound() {
  return <NotFoundTemplate />;
}
