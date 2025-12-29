/**
 * Robots directive constants for SEO metadata
 * Use these in generateMetadata() for pages that should not be indexed
 */

/**
 * Prevents indexing but allows link following
 * Use for: search results, cart, login, register, account pages
 */
export const NOINDEX_FOLLOW = {
  index: false,
  follow: true,
} as const;

/**
 * Prevents indexing and link following
 * Use for: private/internal pages, error pages
 */
export const NOINDEX_NOFOLLOW = {
  index: false,
  follow: false,
} as const;

/**
 * Allows indexing and following (default behavior)
 * Explicitly set when overriding inherited noindex
 */
export const INDEX_FOLLOW = {
  index: true,
  follow: true,
} as const;
