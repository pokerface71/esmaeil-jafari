import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("lang");
  document.documentElement.removeAttribute("dir");
});

// ---- IntersectionObserver (reveal-on-scroll) ----
class MockIntersectionObserver {
  readonly callback: IntersectionObserverCallback;
  readonly elements: Set<Element> = new Set();
  static instances: MockIntersectionObserver[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.elements.add(el);
  }
  unobserve(el: Element) {
    this.elements.delete(el);
  }
  disconnect() {
    this.elements.clear();
  }
  /** Test helper: mark all observed elements as intersecting. */
  triggerAll(isIntersecting = true) {
    const entries = Array.from(this.elements).map((target) => ({
      isIntersecting,
      target,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: Date.now(),
      rootBounds: null,
      boundingClientRect: null,
      intersectionRect: null,
      rootMargin: "",
      entryOrder: 0,
    })) as unknown as IntersectionObserverEntry[];
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}
MockIntersectionObserver.instances = [];

vi.stubGlobal(
  "IntersectionObserver",
  MockIntersectionObserver as unknown as typeof IntersectionObserver
);

export { MockIntersectionObserver };

// ---- matchMedia (tilt / parallax / reduced-motion guards) ----
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// ---- scrolling APIs used by template/hooks ----
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
