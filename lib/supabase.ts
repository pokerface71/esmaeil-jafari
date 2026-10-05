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
      auth: { persistSession: false, autoRefreshToken: false }
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
    language: tr.language
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Run a public read query with retries and phase-aware failure handling.
 *
 * A transient network failure (`TypeError: fetch failed` — DNS blip, a hiccup
 * reaching Supabase, a flaky build container) used to be rethrown, which
 * aborted `next build` outright ("Failed to collect page data for
 * /blog/[slug]"). Behaviour now depends on where the query runs:
 *
 *   - build time: retry, then return null so the caller serves its empty
 *     fallback — a network blip can never break a deploy. ISR refills the
 *     page within `revalidate` seconds once connectivity is back.
 *   - runtime: retry, then throw — Next keeps serving the last good ISR
 *     page instead of overwriting it with empty content, and client-side
 *     callers already `.catch()` into an empty state.
 */
const QUERY_ATTEMPTS = 3;
const QUERY_RETRY_DELAY_MS = 400;

function isBuildPhase(): boolean {
  return (
    typeof process !== "undefined" &&
    process.env.NEXT_PHASE === "phase-production-build"
  );
}

/**
 * One raw request to the Supabase REST root, used purely for build-time
 * logging: `TypeError: fetch failed` hides the real reason, while this probe
 * surfaces the underlying cause (ENOTFOUND / ETIMEDOUT / HTTP 503 …) so a
 * failing Netlify build can actually be diagnosed.
 */
async function probeSupabase(): Promise<string> {
  try {
    const res = await fetch(`${SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/`, {
      method: "GET"
    });
    return `probe → HTTP ${res.status} from ${SUPABASE_URL}`;
  } catch (e) {
    const cause = (e as { cause?: { code?: string; message?: string } }).cause;
    const detail = cause ? ` (cause: ${cause.code ?? cause.message})` : "";
    return `probe → ${e instanceof Error ? e.message : String(e)}${detail} from ${SUPABASE_URL}`;
  }
}

async function runPublicQuery<T>(
  label: string,
  run: () => PromiseLike<{ data: T | null; error: { message: string } | null }>
): Promise<T | null> {
  let lastReason = "unknown error";

  for (let attempt = 1; attempt <= QUERY_ATTEMPTS; attempt += 1) {
    try {
      const { data, error } = await run();
      if (error) throw new Error(error.message);
      return data;
    } catch (e) {
      lastReason = e instanceof Error ? e.message : String(e);
      if (attempt < QUERY_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, QUERY_RETRY_DELAY_MS * attempt)
        );
      }
    }
  }

  if (isBuildPhase()) {
    console.warn(
      `[supabase] ${label} failed after ${QUERY_ATTEMPTS} attempts (${lastReason}). ` +
        `Continuing the build with empty data; ISR will refill it.`
    );
    console.warn(`[supabase] ${await probeSupabase()}`);
    return null;
  }

  throw new Error(
    `[supabase] ${label} failed after ${QUERY_ATTEMPTS} attempts: ${lastReason}`
  );
}

/**
 * Published posts for the public site, newest first.
 * Queries Supabase only — for the merged version that also includes local
 * markdown posts, use the same function from `lib/data` (server-only).
 */
export async function getPublishedPosts(
  locale: string,
  limit?: number
): Promise<PostView[]> {
  const raw = await getPublishedPostsRaw(limit);
  return raw
    .map((row) => toPostView(row, locale))
    .filter((p): p is PostView => p !== null);
}

/** Single published post by slug, or null. */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostView | null> {
  const post = await getPostBySlugRaw(slug);
  if (!post) return null;
  return toPostView(post, locale);
}

// ---------------------------------------------------------------------------
// Raw (locale-independent) fetchers — used by getStaticPaths/getStaticProps
// where the visitor's locale is unknown at build time. Pages call
// toPostView() client-side once useI18n() provides the active locale.
// ---------------------------------------------------------------------------

/** All published posts, any locale, newest first (raw rows). */
export async function getPublishedPostsRaw(limit?: number): Promise<Post[]> {
  if (!isSupabaseConfigured) return [];
  const rows = await runPublicQuery<Post[]>("posts (published, raw)", () => {
    let query = getClient()
      .from("posts")
      .select("*, translations:post_translations(*)")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (limit != null) query = query.limit(limit);
    return query;
  });

  return (rows ?? []) as unknown as Post[];
}

/** One published post by slug (raw row), or null. */
export async function getPostBySlugRaw(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured) return null;

  const data = await runPublicQuery<Post>("post by slug (raw)", () =>
    getClient()
      .from("posts")
      .select("*, translations:post_translations(*)")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
  );

  return (data as unknown as Post) ?? null;
}

/** All published slugs (for getStaticPaths). */
export async function getPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const rows = await runPublicQuery<{ slug: string }[]>("slugs (published)", () =>
    getClient()
      .from("posts")
      .select("slug")
      .eq("published", true)
  );

  return (rows ?? []).map((r) => r.slug);
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
    auth: { persistSession: true, autoRefreshToken: true }
  });
}

export type AdminClient = ReturnType<typeof createAdminClient>;

export function getAdminClient(): AdminClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  return createAdminClient();
}
