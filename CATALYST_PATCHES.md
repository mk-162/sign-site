# Catalyst Patch Log: Next.js 15 & React 19 Upgrade

This document tracks manual changes made to the BigCommerce Catalyst storefront to support the upgrade to Next.js `15.6.0-canary.58` (for PPR) and React 19.

> **Why were these changes needed?**
> The upgrade was crucial to patch a critical RCE vulnerability. The required Next.js Canary version enforces React 19 strictness, breaking several legacy component patterns.

## 1. Type Casts (Hacks)

*To be reverted once `catalyst` and `makeswift` packages are updated for React 19.*

### `core/components/link/index.tsx`

- **Issue**: React 19 `CSSProperties` incompatibility and Next-Intl `locale` prop mismatch (`false` vs `string`).
- **Fix**: Cast `NavLink` props to `any` and destructured `locale` to strictly pass `string | undefined`.

### `core/lib/makeswift/components/vibe/register.ts`

- **Issue**: Makeswift runtime type checks failed against `HeaderClient` props.
- **Fix**: Cast `HeaderClient` to `any` during registration.

### `core/app/[locale]/(default)/account/wishlists/_components/wishlist-actions-menu.tsx`

- **Issue**: `DropdownMenu` items expect `ReactNode`, but `EllipsisIcon` returned a `ReactElement` type that React 19 deemed incompatible (missing `children` on `ReactPortal` union).
- **Fix**: Cast `EllipsisIcon` JSX to `any`.

## 2. API Updates (Permanent Fixes)

*These changes align with the future Next.js API and should be kept.*

### `revalidateTag` Signature

- **Files**: All actions in `core/app/**/_actions/*.ts` and `revalidate-cart.ts`.
- **Change**: Added required `'default'` profile argument: `revalidateTag(tag, 'default')`.

### `unstable_expirePath` Deprecation

- **Files**: `core/app/[locale]/(default)/cart/_actions/update-quantity.ts`.
- **Change**: Replaced `unstable_expirePath` with `revalidatePath`.

### `next.config.ts` Types

- **Issue**: Plugin versions (NextIntl, Makeswift) expected legacy `NextConfig` types.
- **Fix**: Cast `nextConfig` to `any` when wrapping with plugins.

## 3. Configuration Overrides

### `package.json`

- **Change**: Added `pnpm.overrides` to force strictly one version of React types to minimize conflicts.

```json
"overrides": {
  "@types/react": "19.2.7",
  "@types/react-dom": "19.0.4"
}
```
