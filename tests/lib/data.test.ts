import { describe, it, expect, vi } from "vitest";

// Mock server-only so vitest (which doesn't set the react-server condition) can import it
vi.mock("server-only", () => ({}));

import { getPostBySlugRaw, getPublishedSlugs, getPublishedPostsRaw } from "lib/data";

describe("lib/data — local posts integration", () => {
  it("getPublishedSlugs returns factory-pattern", async () => {
    const slugs = await getPublishedSlugs();
    console.log("Slugs from data layer:", slugs);
    expect(slugs).toContain("factory-pattern");
  }, 15000);

  it("getPostBySlugRaw finds factory-pattern", async () => {
    const post = await getPostBySlugRaw("factory-pattern");
    console.log("Post from data layer:", post ? {
      id: post.id,
      slug: post.slug,
      title: post.translations?.[0]?.title,
      translations: post.translations?.length
    } : "null");
    expect(post).not.toBeNull();
    expect(post?.slug).toBe("factory-pattern");
  }, 15000);

  it("getPublishedPostsRaw includes factory-pattern", async () => {
    const posts = await getPublishedPostsRaw(10);
    console.log("Posts from data layer:", posts.map((p) => p.slug));
    expect(posts.some((p) => p.slug === "factory-pattern")).toBe(true);
  }, 15000);
});
