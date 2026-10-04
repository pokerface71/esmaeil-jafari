"use client";

import { useEffect, useState } from "react";

/**
 * Observes every `[data-animate]` element and returns a map of
 * `id -> isVisible` that flips to true once the element enters the viewport.
 * Elements keep their id from the `id` attribute (falls back to data-animate).
 */
export function useRevealOnScroll(): Record<string, boolean> {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id =
              (entry.target as HTMLElement).dataset.animate || entry.target.id;
            if (id) {
              setVisible((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return visible;
}
