'use client';

import { ComponentPropsWithRef, ComponentRef, forwardRef, ReactNode, useReducer } from 'react';
import { LinkProps as NextJsLinkProps } from 'next/link';

import { Link as NavLink, useRouter } from '../../i18n/routing';

// Use NextJsLinkProps to ensure href and other standard props are present.
// We omit prefetch because we redefine it in PrefetchOptions.
type NextLinkProps = Omit<NextJsLinkProps, 'prefetch'> & Omit<ComponentPropsWithRef<'a'>, keyof NextJsLinkProps>;

interface PrefetchOptions {
  prefetch?: 'hover' | 'viewport' | 'none';
  prefetchKind?: 'auto' | 'full';
}

type Props = NextLinkProps &
  PrefetchOptions & {
    children?: ReactNode;
    className?: string;
  };

/**
 * This custom `Link` is based on  Next-Intl's `Link` component
 * https://next-intl-docs.vercel.app/docs/routing/navigation#link
 * which adds automatically prefixes for the href with the current locale as necessary
 * and extends with additional prefetching controls, making navigation
 * prefetching more adaptable to different use cases. By offering `prefetch` and `prefetchKind`
 * props, it grants explicit management over when and how prefetching occurs, defaulting to 'hover' for
 * prefetch behavior and 'auto' for prefetch kind. This approach provides a balance between optimizing
 * page load performance and resource usage. https://nextjs.org/docs/app/api-reference/components/link#prefetch
 */
export const Link = forwardRef<ComponentRef<'a'>, Props>(
  ({ href, prefetch = 'hover', prefetchKind = 'auto', children, className, locale, ...rest }, ref) => {
    const router = useRouter();
    const [prefetched, setPrefetched] = useReducer(() => true, false);
    const computedPrefetch = computePrefetchProp({ prefetch, prefetchKind });

    const triggerPrefetch = () => {
      if (prefetched) {
        return;
      }

      if (typeof href === 'string') {
        // PrefetchKind enum is not exported
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.prefetch(href, { kind: prefetchKind });
      } else {
        // PrefetchKind enum is not exported
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.prefetch(href.href, { kind: prefetchKind });
      }

      setPrefetched();
    };

    return (
      <NavLink
        {...(rest as any)}
        className={className}
        href={href}
        locale={locale as string | undefined}
        onMouseEnter={prefetch === 'hover' ? triggerPrefetch : undefined}
        onTouchStart={prefetch === 'hover' ? triggerPrefetch : undefined}
        prefetch={computedPrefetch}
        ref={ref}
      >
        {children}
      </NavLink>
    );
  },
);

function computePrefetchProp({
  prefetch,
  prefetchKind,
}: Required<PrefetchOptions>): boolean | undefined {
  if (prefetch !== 'viewport') {
    return false;
  }

  if (prefetchKind === 'auto') {
    return undefined;
  }

  return true;
}
