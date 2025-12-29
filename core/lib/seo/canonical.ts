import { SITE_URL } from '../config/site';

/**
 * Build a canonical URL from a pathname
 *
 * Normalizes the path by:
 * - Stripping query parameters
 * - Stripping hash fragments
 * - Removing trailing slashes (except for root)
 * - Ensuring leading slash
 * - Returning an absolute URL
 *
 * @param pathname - The pathname to canonicalize (e.g., '/products/my-product/')
 * @returns Absolute canonical URL (e.g., 'https://safetysignhub.co.uk/products/my-product')
 */
export function buildCanonical(pathname: string): string {
  // Dev-only validation
  if (process.env.NODE_ENV === 'development') {
    if (!pathname) {
      console.warn('[SEO] buildCanonical called with empty pathname');
    }
    if (pathname && !pathname.startsWith('/')) {
      console.warn(`[SEO] buildCanonical pathname should start with '/': ${pathname}`);
    }
  }

  // Handle empty or invalid input
  if (!pathname) {
    return SITE_URL;
  }

  let normalizedPath = pathname;

  // Strip query parameters
  const queryIndex = normalizedPath.indexOf('?');
  if (queryIndex !== -1) {
    normalizedPath = normalizedPath.slice(0, queryIndex);
  }

  // Strip hash fragments
  const hashIndex = normalizedPath.indexOf('#');
  if (hashIndex !== -1) {
    normalizedPath = normalizedPath.slice(0, hashIndex);
  }

  // Ensure leading slash
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  // Remove trailing slash (except for root path)
  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  // Build absolute URL
  // Root path returns just the site URL (no trailing slash)
  if (normalizedPath === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${normalizedPath}`;
}
