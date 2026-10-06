import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fa", "ar", "tr"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy /blog/[slug] to /en/blog/[slug]
  // Pattern: /blog/<something> but NOT /blog/<locale>/...
  const blogSlugMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogSlugMatch) {
    const slug = blogSlugMatch[1];
    // Only redirect if it's not already a locale-prefixed path
    const url = request.nextUrl.clone();
    url.pathname = `/en/blog/${slug}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:slug"]
};
