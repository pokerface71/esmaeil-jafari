"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Reader({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onChange(searchParams);
  }, [searchParams, onChange]);
  return null;
}

/**
 * Bridges `?scroll=…` search params into client state without deopting the
 * page to client-side rendering.
 *
 * `useSearchParams()` must sit under a Suspense boundary when the route is
 * statically prerendered — without one, `next build` fails. The boundary
 * renders `null` either way (this component draws nothing), so the static
 * HTML keeps its full content and the real value arrives right after
 * hydration.
 */
export default function SearchParamWatcher({
  onChange,
}: {
  onChange: (params: URLSearchParams) => void;
}) {
  return (
    <Suspense fallback={null}>
      <Reader onChange={onChange} />
    </Suspense>
  );
}
