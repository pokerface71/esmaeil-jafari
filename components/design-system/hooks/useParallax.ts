"use client";

import { useEffect } from "react";

/**
 * Subtle scroll parallax: elements with `data-parallax="<speed>"` drift as the
 * page scrolls. Positive speed lags behind scroll, negative leads it. Layers
 * chase their target with a damped spring so they glide and settle.
 * Disabled when `prefers-reduced-motion: reduce` is set.
 */
export function useParallax(): void {
  useEffect(() => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!els.length) return;

    const speeds = els.map((el) => Number(el.dataset.parallax ?? 0));
    const measure = () =>
      els.map((el) => el.getBoundingClientRect().top + window.scrollY);
    let bases = measure();

    const clampTarget = (v: number) => Math.max(-140, Math.min(140, v));
    const pos = new Array<number>(els.length).fill(0);
    const vel = new Array<number>(els.length).fill(0);
    const stiffness = 85;
    const damping = 2 * Math.sqrt(stiffness) * 0.92;

    let raf = 0;
    let running = false;
    let last = performance.now();

    const tick = (now: number) => {
      raf = 0;
      running = false;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const sy = window.scrollY;
      let active = false;

      els.forEach((el, i) => {
        const target = clampTarget((sy - bases[i]) * speeds[i]);
        const accel = (target - pos[i]) * stiffness - vel[i] * damping;
        vel[i] += accel * dt;
        pos[i] += vel[i] * dt;

        if (Math.abs(target - pos[i]) > 0.05 || Math.abs(vel[i]) > 0.05) {
          active = true;
        }
        el.style.setProperty("--py", `${pos[i].toFixed(2)}px`);
      });

      if (active) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      last = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => start();
    const onResize = () => {
      bases = measure();
      start();
    };

    start();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
