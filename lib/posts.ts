import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { type Post, type PostTranslation } from "./supabase";

/**
 * Local markdown content layer — Next.js' own backend (the file system).
 *
 * Posts live in `content/posts/*.md` as markdown with JSON frontmatter.
 * This is the source of truth for posts that must always be available even
 * when Supabase is unreachable, and for content the admin authored locally.
 *
 * Frontmatter fields (JSON, between `---` fences):
 *   slug           string
 *   title           string
 *   excerpt         string
 *   tags?           string[]
 *   published       boolean
 *   published_at?   string (ISO)
 *   cover_image_url? string
 *   translations?   { language, title, excerpt }[]
 *
 * The markdown body becomes the **en** translation's `content`.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

interface LocalFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  tags?: string[];
  categories?: string[];
  published: boolean;
  published_at?: string | null;
  cover_image_url?: string | null;
  translations?: Array<{
    language: PostTranslation["language"];
    title: string;
    excerpt: string;
    content?: string;
  }>;
}

/** Parse `---\n{json}\n---\n<markdown body>` into frontmatter + body. */
function parseFrontmatter(file: string): { frontmatter: LocalFrontmatter; content: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/.exec(file);
  if (!match) {
    throw new Error("Missing frontmatter in markdown file");
  }
  const frontmatter: LocalFrontmatter = JSON.parse(match[1]);
  const content = match[2].trim();
  return { frontmatter, content };
}

/** Convert a single markdown file into the `Post` shape used everywhere. */
export function localPostFromFile(
  file: string,
  filename: string
): Post | null {
  const { frontmatter, content } = parseFrontmatter(file);
  if (!frontmatter.published) return null;

  // Coerce frontmatter translations into the full PostTranslation shape;
  // frontmatter only carries metadata (no body content) so we seed empty
  // strings and backfill below.
  const translations: PostTranslation[] = (frontmatter.translations ?? []).map(
    (tr): PostTranslation => ({
      language: tr.language,
      title: tr.title,
      excerpt: tr.excerpt,
      content: tr.content ?? ""
    })
  );

  // Ensure an English translation exists from the file metadata + body.
  if (!translations.some((tr) => tr.language === "en")) {
    translations.push({
      language: "en",
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      content: ""
    });
  }

  // Attach the markdown body to the English translation, then backfill
  // every translation that still has no content with the English body so
  // non-English visitors always see *some* article content rather than an
  // empty page (the title and excerpt are already translated per locale).
  const enIndex = translations.findIndex((tr) => tr.language === "en");
  if (enIndex >= 0) {
    translations[enIndex].content = content;
  } else if (translations[0]) {
    translations[0].content = content;
  }
  const englishContent = translations[enIndex]?.content ?? content;
  for (const tr of translations) {
    if (!tr.content) tr.content = englishContent;
  }

  // Derive a deterministic UUID v5-style id from the filename.
  // Using filename-based id avoids collisions with Supabase UUIDs.
  const id = `local:${filename.replace(/\.md$/, "")}`;

  return {
    id,
    slug: frontmatter.slug,
    cover_image_url: frontmatter.cover_image_url ?? null,
    published: frontmatter.published,
    published_at: frontmatter.published_at ?? null,
    created_at: frontmatter.published_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: frontmatter.tags ?? [],
    categories: frontmatter.categories ?? null,
    translations,
  };
}

/** Read all published local posts from `content/posts/`. */
export async function getLocalPosts(): Promise<Post[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(CONTENT_DIR);
  } catch {
    // No content directory — graceful empty.
    return [];
  }

  const posts: Post[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    try {
      const file = await fs.readFile(path.join(CONTENT_DIR, entry), "utf-8");
      const post = localPostFromFile(file, entry);
      if (post && post.published) posts.push(post);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`[posts] failed to parse ${entry}:`, (e as Error).message);
    }
  }
  return posts;
}

/** Find a single published local post by slug. */
export async function getLocalPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getLocalPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Return all slugs that exist locally. */
export async function getLocalSlugs(): Promise<string[]> {
  const posts = await getLocalPosts();
  return posts.map((p) => p.slug);
}
