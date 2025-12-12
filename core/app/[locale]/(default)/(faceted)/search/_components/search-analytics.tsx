'use client';

import { Suspense, useEffect, useRef } from 'react';

import { Streamable, useStreamable } from '@/vibes/soul/lib/streamable';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface SearchAnalyticsProps {
  query: Streamable<string>;
  count: Streamable<number>;
}

export function SearchAnalytics(props: SearchAnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <SearchAnalyticsResolved {...props} />
    </Suspense>
  );
}

function SearchAnalyticsResolved({ query, count }: SearchAnalyticsProps) {
  const query_resolved = useStreamable(query);
  const count_resolved = useStreamable(count);
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || !query_resolved) return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'search', {
        search_term: query_resolved,
        results_count: count_resolved,
      });
      tracked.current = true;
    }
  }, [query_resolved, count_resolved]);

  return null;
}
