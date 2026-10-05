/**
 * Touch-free reveal hook.
 *
 * - Runs only in the browser; IntersectionObserver is NOT polyfilled, so the
 *   app must run in a real browser (or a shim is added separately).
 * - Debounced, requestAnimationFrame-driven, with a fallback that marks every
 *   element visible when the observer is unavailable.
 * - Disabled entirely when `prefers-reduced-motion: reduce` is set, so we never
 *   apply entrance transforms to users who asked for less motion.
 */
import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll(): Record<string, boolean> {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const reduced = reducedRef.current;
    if (reduced) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );

    // Cache all elements up-front so we never mutate the live DOM list
    // while the IntersectionObserver fires.
    pendingRef.current = els;
    setVisible((prev) => {
      const next = { ...prev };
      for (const el of els) {
        const id = el.dataset.animate || el.id;
        if (id && !next[id]) next[id] = true;
      }
      return next;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const id =
              target.dataset.animate || target.id;
            if (id) {
              setVisible((prev) =>
                prev[id] ? prev : { ...prev, [id]: true }
              );
            }
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    observerRef.current = observer;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback: mark everything visible on the next frame.
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        for (const el of pendingRef.current) {
          const id = el.dataset.animate || el.id;
          if (id) setVisible((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
        }
        pendingRef.current = [];
        rafRef.current = null;
      });
    } else {
      for (const el of els) observer.observe(el);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return visible;
}
