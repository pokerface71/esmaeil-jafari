import { redirect } from "next/navigation";

/**
 * Blog list route: redirects to the default locale (/en/blog).
 * All locale-specific blog content is served from /[locale]/blog.
 */
export default function BlogPage() {
  redirect("/en/blog");
}
