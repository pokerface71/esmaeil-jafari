import type { Metadata } from "next";
import { absoluteUrl } from "lib/seo";
import AdminPanel from "./AdminPanel";

/**
 * Admin route: App Router equivalent of pages/admin.tsx.
 *
 * The `<Head>` block (title + noindex robots) is declared in
 * `generateMetadata` because `<Head>` no longer exists on the server.
 */
export const metadata: Metadata = {
  title: "Blog Admin | Esmaeil Jafari",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Blog Admin | Esmaeil Jafari",
  },
  alternates: {
    canonical: absoluteUrl("/admin"),
  },
};

export default function AdminRoute() {
  return <AdminPanel />;
}
