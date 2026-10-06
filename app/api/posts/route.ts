import { getPublishedPosts, getPublishedPostsRaw, isSupabaseConfigured } from "lib/data";
import { NextResponse } from "next/server";

/**
 * `/api/posts?locale=en&limit=9` — returns the public blog post list
 * (local markdown + Supabase, local wins), resolved to the requested locale.
 *
 * BlogSection.tsx (a client component) calls this so it never has to import
 * `lib/data` (which is `server-only` and would pull `node:fs` into the
 * client bundle).
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";
  const limit = searchParams.get("limit");

  // Debug: also return raw posts and slugs
  const rawPosts = await getPublishedPostsRaw();
  console.log(`[API] locale=${locale}, rawPosts=${rawPosts.length}, slugs=${rawPosts.map(p => p.slug)}`);

  const posts = await getPublishedPosts(
    locale,
    limit ? Number(limit) : undefined
  );

  console.log(`[API] resolved ${posts.length} posts for locale ${locale}`);

  return NextResponse.json({ posts, isSupabaseConfigured, rawSlugs: rawPosts.map(p => p.slug) });
}
