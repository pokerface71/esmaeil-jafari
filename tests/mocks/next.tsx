import React from "react";
import { vi } from "vitest";

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
