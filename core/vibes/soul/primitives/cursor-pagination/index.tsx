'use client';

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { createSerializer, parseAsString } from 'nuqs';
import { Suspense } from 'react';

import { Streamable, useStreamable } from '@/vibes/soul/lib/streamable';
import { Link } from '~/components/link';

export interface CursorPaginationInfo {
  startCursorParamName?: string;
  startCursor?: string | null;
  endCursorParamName?: string;
  endCursor?: string | null;
}

interface Props {
  label?: Streamable<string | null>;
  info: Streamable<CursorPaginationInfo>;
  previousLabel?: Streamable<string | null>;
  nextLabel?: Streamable<string | null>;
  scroll?: boolean;
}

export function CursorPagination(props: Props) {
  return (
    <Suspense fallback={<CursorPaginationSkeleton />}>
      <CursorPaginationResolved {...props} />
    </Suspense>
  );
}

function CursorPaginationResolved({
  label: streamableLabel,
  info,
  previousLabel: streamablePreviousLabel,
  nextLabel: streamableNextLabel,
  scroll,
}: Props) {
  const label = useStreamable(streamableLabel) ?? 'pagination';
  const {
    startCursorParamName = 'before',
    endCursorParamName = 'after',
    startCursor,
    endCursor,
  } = useStreamable(info);
  const searchParams = useSearchParams();
  const serialize = createSerializer({
    [startCursorParamName]: parseAsString,
    [endCursorParamName]: parseAsString,
  });
  const previousLabel = useStreamable(streamablePreviousLabel) ?? 'Previous';
  const nextLabel = useStreamable(streamableNextLabel) ?? 'Next';

  return (
    <nav aria-label={label} className="py-10" role="navigation">
      <ul className="flex items-center justify-center gap-4">
        <li>
          {startCursor != null ? (
            <Link
              aria-label="Go to previous page"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-md"
              href={serialize(searchParams, {
                [startCursorParamName]: startCursor,
                [endCursorParamName]: null,
              })}
              scroll={scroll}
            >
              <ArrowLeft size={20} strokeWidth={2} />
              {previousLabel}
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 text-slate-400 font-bold cursor-not-allowed">
              <ArrowLeft size={20} strokeWidth={2} />
              {previousLabel}
            </div>
          )}
        </li>
        <li>
          {endCursor != null ? (
            <Link
              aria-label="Go to next page"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-md"
              href={serialize(searchParams, {
                [endCursorParamName]: endCursor,
                [startCursorParamName]: null,
              })}
              scroll={scroll}
            >
              {nextLabel}
              <ArrowRight size={20} strokeWidth={2} />
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 text-slate-400 font-bold cursor-not-allowed">
              {nextLabel}
              <ArrowRight size={20} strokeWidth={2} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

function PaginationLink({
  href,
  children,
  scroll,
  'aria-label': ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  scroll?: boolean;
  ['aria-label']?: string;
}) {
  return (
    <Link
      aria-label={ariaLabel}
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full border border-contrast-100 text-foreground ring-primary transition-colors duration-300 hover:border-contrast-200 hover:bg-contrast-100 focus-visible:outline-0 focus-visible:ring-2',
      )}
      href={href}
      scroll={scroll}
    >
      {children}
    </Link>
  );
}

function SkeletonLink({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-contrast-100 text-foreground opacity-50 duration-300">
      {children}
    </div>
  );
}

export function CursorPaginationSkeleton() {
  return (
    <div className="flex w-full justify-center bg-background py-10 text-xs">
      <div className="flex gap-2">
        <SkeletonLink>
          <ArrowLeft />
        </SkeletonLink>
        <SkeletonLink>
          <ArrowRight />
        </SkeletonLink>
      </div>
    </div>
  );
}
