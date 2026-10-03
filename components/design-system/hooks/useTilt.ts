"use client";

import { useEffect } from "react";

/**
 * Subtle 3D tilt + glare on `[data-tilt]` elements, following the cursor.
 * Only active on devices with a fine pointer (mouse/trackpad).
 */
export function useTilt(): void {
  useEffect(() => {
    const el = document.querySelector("[data-tilt]") as HTMLElement | null;
    if (
      !el ||
      typeof window.matchMedia !== "function" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let raf = 0;
    let running = false;
    let hovered = false;

    const apply = () => {
      running = false;
      const rx = Number(el.dataset.tx ?? 0);
      const ry = Number(el.dataset.ty ?? 0);
      el.style.transform = `perspective(950px) rotateY(${rx}deg) rotateX(${ry}deg) scale3d(1.035, 1.035, 1)`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const inside = px >= -0.15 && px <= 1.15 && py >= -0.15 && py <= 1.15;

      if (!inside) {
        if (hovered) {
          hovered = false;
          el.classList.remove("is-hover");
          el.dataset.tx = "0";
          el.dataset.ty = "0";
          if (!running) {
            running = true;
            raf = requestAnimationFrame(apply);
          }
        }
        return;
      }

      hovered = true;
      el.classList.add("is-hover");
      el.dataset.tx = String((px - 0.5) * 14);
      el.dataset.ty = String(-(py - 0.5) * 12);
      el.style.setProperty("--tx", `${px * 100}%`);
      el.style.setProperty("--ty", `${py * 100}%`);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
