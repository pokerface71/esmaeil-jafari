import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

const { mockGetPublishedPostsRaw } = vi.hoisted(() => ({
  mockGetPublishedPostsRaw: vi.fn(),
}));

vi.mock("lib/data", () => ({
  getPublishedPostsRaw: mockGetPublishedPostsRaw,
}));

import { GET } from "../app/sitemap-posts.xml/route";

const SITE = "https://esmaeil-jafari.netlify.app";

/** Parse XML strictly and return every <loc> value (fails on malformed XML). */
function parseLocs(xml: string): string[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const error = doc.getElementsByTagName("parsererror")[0];
  expect(error, `XML parse error: ${error?.textContent ?? ""}`).toBeUndefined();
  return Array.from(doc.getElementsByTagName("loc")).map(
    (node) => node.textContent ?? ""
  );
}

function readPublic(name: string): string {
  return readFileSync(join(__dirname, "..", "public", name), "utf8");
}

describe("static sitemaps (public/)", () => {
  it("sitemap index is well-formed XML and points at netlify.app children", () => {
    const locs = parseLocs(readPublic("sitemap.xml"));
    expect(locs).toEqual([
      `${SITE}/sitemap-pages.xml`,
      `${SITE}/sitemap-posts.xml`,
    ]);
  });

  it("page sitemap lists / and /blog under netlify.app", () => {
    const locs = parseLocs(readPublic("sitemap-pages.xml"));
    expect(locs).toEqual([`${SITE}/`, `${SITE}/blog`]);
  });

  it("robots.txt advertises the sitemap on netlify.app", () => {
    const robots = readPublic("robots.txt");
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });
});

describe("dynamic posts sitemap (/sitemap-posts.xml)", () => {
  it("stays readable (200 + valid XML) even when Supabase fails", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mockGetPublishedPostsRaw.mockRejectedValueOnce(
      new Error("[supabase] posts failed after 3 attempts: fetch failed")
    );

    const res = await GET();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("application/xml");

    const locs = parseLocs(await res.text());
    // When Supabase fails, only the static pages are included (no posts)
    expect(locs).toEqual([`${SITE}/`, `${SITE}/blog`]);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("includes published post URLs when Supabase responds", async () => {
    mockGetPublishedPostsRaw.mockResolvedValueOnce([
      { slug: "hello-world", published_at: "2026-01-01", updated_at: null },
      { slug: "nextjs-tips", published_at: "2026-02-01", updated_at: "2026-02-02" },
    ]);

    const res = await GET();

    expect(res.status).toBe(200);
    const locs = parseLocs(await res.text());
    const expectedPosts = ["hello-world", "nextjs-tips"];
    const expected = [
      `${SITE}/`,
      `${SITE}/blog`,
      ...expectedPosts.flatMap((slug) =>
        ["en", "fa", "ar", "tr"].map((locale) =>
          `${SITE}/${locale}/blog/${slug}`
        )
      ),
    ];
    expect(locs).toEqual(expected);
    expect(locs.every((loc) => loc.startsWith(SITE))).toBe(true);
  });
});
