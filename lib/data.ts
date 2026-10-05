import "server-only";

import {
  getLocalPostBySlug,
  getLocalPosts,
  getLocalSlugs
} from "./posts";
import type { Post, PostView } from "./supabase";
import {
  isSupabaseConfigured,
  toPostView,
  getPublishedPostsRaw as getPublishedPostsSupabaseRaw,
  getPostBySlugRaw as getPostBySlugSupabaseRaw,
  getPublishedSlugs as getPublishedSlugsSupabase
} from "./supabase";

/**
 * Server-only data layer that merges local markdown posts with Supabase rows.
 *
 * Client components must NOT import from this module — use `lib/supabase`
 * instead (which provides only types and pure/client-safe helpers).
 * Server components and route handlers import the merged versions here.
 */

/** All published posts, any locale, newest first (local + Supabase, local wins). */
export async function getPublishedPostsRaw(limit?: number): Promise<Post[]> {
  const [local, supabase] = await Promise.all([
    getLocalPosts(),
    getPublishedPostsSupabaseRaw(limit)
  ]);

  // Dedupe by slug — local posts take priority on collision.
  const bySlug = new Map<string, Post>();
  for (const post of [...local, ...supabase]) {
    if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
  }

  const rows = Array.from(bySlug.values()).sort((a, b) => {
    const ta = a.published_at ? new Date(a.published_at).getTime() : 0;
    const tb = b.published_at ? new Date(b.published_at).getTime() : 0;
    return tb - ta;
  });

  return limit != null ? rows.slice(0, limit) : rows;
}

/** One published post by slug (local first, then Supabase), or null. */
export async function getPostBySlugRaw(slug: string): Promise<Post | null> {
  const local = await getLocalPostBySlug(slug);
  if (local) return local;
  return getPostBySlugSupabaseRaw(slug);
}

/** All published slugs (for getStaticPaths) — local + Supabase, deduplicated. */
export async function getPublishedSlugs(): Promise<string[]> {
  const [local, supabase] = await Promise.all([
    getLocalSlugs(),
    getPublishedSlugsSupabase()
  ]);
  return [...new Set([...local, ...supabase])];
}

/** Published posts resolved to the requested locale, newest first. */
export async function getPublishedPosts(
  locale: string,
  limit?: number
): Promise<PostView[]> {
  const raw = await getPublishedPostsRaw(limit);
  return raw
    .map((row) => toPostView(row, locale))
    .filter((p): p is PostView => p !== null);
}

/** Single published post resolved to the requested locale, or null. */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostView | null> {
  const post = await getPostBySlugRaw(slug);
  if (!post) return null;
  return toPostView(post, locale);
}

/** Whether Supabase is configured (re-exported for server-side callers). */
export { isSupabaseConfigured };
