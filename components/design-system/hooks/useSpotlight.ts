"use client";

import { useEffect } from "react";

/**
 * Single delegated `mousemove` listener that drives the cursor-following
 * radial glow (`.spot-card`) of every `[data-spot]` element via the
 * `--mx` / `--my` CSS custom properties.
 */
export function useSpotlight(): void {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-spot]"
      ) as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}
