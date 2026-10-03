import { describe, expect, it } from "vitest";
import { cn } from "lib/utils";

describe("cn()", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", false && "c", undefined, "d")).toBe("a b d");
  });

  it("deduplicates and resolves tailwind conflicts (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("keeps non-conflicting tailwind classes", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("supports conditional objects and arrays", () => {
    expect(cn({ visible: true, hidden: false }, ["x", "y"])).toBe("visible x y");
  });

  it("returns empty string for no input", () => {
    expect(cn()).toBe("");
  });
});
