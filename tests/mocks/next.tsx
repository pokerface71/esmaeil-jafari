import React from "react";
import { vi } from "vitest";

/**
 * Mock router for the App Router (`next/navigation`).
 *
 * `useSearchParams()` is not available in the jsdom test environment and
 * would break statically rendered routes, so we return a stable
 * `URLSearchParams` instance that mirrors the current `?scroll=…` query.
 */
export const mockSearchParams = new URLSearchParams();

export const mockRouter = {
  route: "/",
  pathname: "/",
  query: {} as Record<string, string | string[] | undefined>,
  asPath: "/",
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  reload: vi.fn(),
  isFallback: false,
  isReady: true,
  events: { on: vi.fn(), off: vi.fn() },
};

export const useRouter = () => mockRouter;

/** Mock for `next/head` that simply renders children (test-readable). */
export const HeadMock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

/**
 * Mock for `next/navigation` so the statically rendered routes (`/blog`,
 * `/blog/[slug]`, `/admin`) can be rendered in jsdom without booting a
 * browser: `useSearchParams` is unsupported in jsdom and `generateMetadata`
 * must not throw. The mock is a no-op — the route data is still fetched by
 * the real server components in the app tree.
 */
vi.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: () => {
    // Return a stable object that behaves like a URLSearchParams
    // (has .get, .has, .size, .entries, .forEach, .keys, .values, and
    // iterable [Symbol.iterator]).
    return {
      get: (key: string) => mockSearchParams.get(key),
      has: (key: string) => mockSearchParams.has(key),
      size: mockSearchParams.size,
      entries: () => mockSearchParams.entries(),
      keys: () => mockSearchParams.keys(),
      values: () => mockSearchParams.values(),
      forEach: (fn: (value: string, key: string, parent: URLSearchParams) => void) =>
        mockSearchParams.forEach(fn),
      [Symbol.iterator]: () => mockSearchParams[Symbol.iterator](),
    } as unknown as import("next/navigation").URLSearchParams;
  },
  useParams: () => ({ slug: "" }),
  notFound: () => {
    throw new Error("not_found");
  },
  redirect: (url: string) => {
    throw new Error(`redirect to ${url}`);
  },
}));
