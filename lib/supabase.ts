import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Blog post types
// ---------------------------------------------------------------------------

export interface PostTranslation {
  language: "en" | "fa" | "ar" | "tr";
  title: string;
  excerpt: string;
  content: string;
}

export interface Post {
  id: string;
  slug: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  translations: PostTranslation[];
}

/** Flat shape the admin panel edits and pages display (resolved per locale). */
export interface PostView {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
  /** The locale the content was actually returned in. */
  language: PostTranslation["language"];
}

// ---------------------------------------------------------------------------
// Environment handling — the site must keep building when Supabase is not
// configured yet (e.g. fresh clone before setup), so expose an `isConfigured`
// flag the UI can use to render an empty state instead of crashing.
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

/**
 * The client is created lazily: `createClient` throws when the URL is empty,
 * and the site must keep building/running before Supabase is configured.
 * Every query calls this first and no-ops when env vars are missing.
 */
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return supabaseInstance;
}

// ---------------------------------------------------------------------------
// Localization helpers
// ---------------------------------------------------------------------------

const LOCALES = ["en", "fa", "ar", "tr"] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Pick the best translation for the requested locale, falling back to English
 * and then to whatever translation exists. `fa`/`ar`/`tr` fall back to `fa`
 * before English since those languages share script/audience more closely.
 */
export function resolveTranslation(
  post: Post,
  locale: string
): PostTranslation | null {
  const translations = post.translations ?? [];
  if (translations.length === 0) return null;

  const l = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";

  const exact = translations.find((tr) => tr.language === l);
  if (exact) return exact;

  const secondary = l === "en" ? "fa" : "en";
  return (
    translations.find((tr) => tr.language === secondary) ??
    translations[0] ??
    null
  );
}

/** Flatten a Post row into the display shape for a given locale. */
export function toPostView(post: Post, locale: string): PostView | null {
  const tr = resolveTranslation(post, locale);
  if (!tr) return null;
  return {
    id: post.id,
    slug: post.slug,
    title: tr.title,
    excerpt: tr.excerpt,
    content: tr.content,
    cover_image_url: post.cover_image_url,
    tags: post.tags,
    published: post.published,
    published_at: post.published_at,
    updated_at: post.updated_at,
    language: tr.language,
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

function mapError(error: { message: string }): never {
  throw new Error(error.message);
}

/** Published posts for the public site, newest first. */
export async function getPublishedPosts(
  locale: string,
  limit?: number
): Promise<PostView[]> {
  if (!isSupabaseConfigured) return [];

  let query = getClient()
    .from("posts")
    .select("*, translations:post_translations(*)")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (limit != null) query = query.limit(limit);

  const { data, error } = await query;
  if (error) mapError(error);

  return (data ?? [])
    .map((row) => toPostView(row as unknown as Post, locale))
    .filter((p): p is PostView => p !== null);
}

/** Single published post by slug, or null. */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostView | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getClient()
    .from("posts")
    .select("*, translations:post_translations(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) mapError(error);
  if (!data) return null;
  return toPostView(data as unknown as Post, locale);
}

// ---------------------------------------------------------------------------
// Raw (locale-independent) fetchers — used by getStaticPaths/getStaticProps
// where the visitor's locale is unknown at build time. Pages call
// toPostView() client-side once useI18n() provides the active locale.
// ---------------------------------------------------------------------------

/** All published posts, any locale, newest first (raw rows). */
export async function getPublishedPostsRaw(limit?: number): Promise<Post[]> {
  if (!isSupabaseConfigured) return [];

  let query = getClient()
    .from("posts")
    .select("*, translations:post_translations(*)")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (limit != null) query = query.limit(limit);

  const { data, error } = await query;
  if (error) mapError(error);

  return (data ?? []) as unknown as Post[];
}

/** One published post by slug (raw row), or null. */
export async function getPostBySlugRaw(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getClient()
    .from("posts")
    .select("*, translations:post_translations(*)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) mapError(error);
  return (data as unknown as Post) ?? null;
}

/** All published slugs (for getStaticPaths). */
export async function getPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await getClient()
    .from("posts")
    .select("slug")
    .eq("published", true);

  if (error) mapError(error);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

// ---------------------------------------------------------------------------
// Admin (client-side, uses the logged-in user's session for RLS)
// ---------------------------------------------------------------------------

/**
 * A separate client for the admin panel: it keeps the session so that
 * authenticated requests pass the RLS policies for admin writes.
 * Reading the envs lazily keeps import order irrelevant in the bundle.
 */
function createAdminClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

export type AdminClient = ReturnType<typeof createAdminClient>;

export function getAdminClient(): AdminClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  return createAdminClient();
}
