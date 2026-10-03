import { describe, expect, it } from "vitest";
import { coverArtDataUri } from "lib/coverArt";

describe("coverArtDataUri()", () => {
  it("returns a valid SVG data URI", () => {
    const uri = coverArtDataUri({ seed: "abc", tags: ["react"] });
    expect(uri.startsWith("data:image/svg+xml")).toBe(true);
  });

  it("is deterministic for the same seed", () => {
    const a = coverArtDataUri({ seed: "post-1", tags: ["a"] });
    const b = coverArtDataUri({ seed: "post-1", tags: ["a"] });
    expect(a).toBe(b);
  });

  it("differs across seeds", () => {
    const a = coverArtDataUri({ seed: "post-1", tags: ["a"] });
    const b = coverArtDataUri({ seed: "post-2", tags: ["a"] });
    expect(a).not.toBe(b);
  });

  it("renders the provided label text", () => {
    const uri = coverArtDataUri({ seed: "s", tags: [], label: "Next.js" });
    expect(decodeURIComponent(uri)).toContain("Next.js");
  });
});
