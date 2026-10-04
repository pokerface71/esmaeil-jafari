/**
 * Loading UI for /blog/[slug] (App Router).
 *
 * Replaces the `router.isFallback` branch of the old pages/blog/[slug].tsx,
 * which showed a skeleton while a new post was being rendered on first
 * visit (`fallback: "blocking"`). `generateStaticParams` in the route
 * already throws `notFound()` for unknown slugs, so this only covers the
 * blocking-fallback case during static generation.
 */
export default function BlogPostLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Loading article…
    </div>
  );
}
