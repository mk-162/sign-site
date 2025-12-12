# Migration Plan: Astro Content → Next.js + Contentlayer

## Status: ✅ COMPLETED (December 2024)

## Overview
Move blog and knowledge base content from the separate Astro site into the Next.js core app.

## Benefits
- Single deployment (one Vercel project)
- Shared header with real cart/auth from BigCommerce
- No proxy rewrites needed
- Unified styling and components
- Simpler long-term maintenance

## What We Keep
- All existing markdown content (just moved)
- Same URL structure (`/blog/*`, `/kb/*`)
- Same visual design (can reuse Tailwind styles)

---

## Phase 1: Setup Contentlayer in Next.js ✅
**Risk: Low (additive only)**

1. Install dependencies:
   ```bash
   pnpm add contentlayer next-contentlayer
   ```

2. Create `contentlayer.config.ts` with schemas for:
   - Blog posts (title, description, author, date, image, tags)
   - KB articles (title, category, description, date)

3. Update `next.config.ts` to use Contentlayer plugin

4. Create content directories:
   ```
   core/content/
   ├── blog/
   └── kb/
       ├── getting-started/
       ├── compliance/
       ├── materials/
       └── ...
   ```

---

## Phase 2: Move Content Files ✅
**Risk: Low (just copying files)**

1. Copy markdown files from `content/src/content/blog/` → `core/content/blog/`
2. Copy markdown files from `content/src/content/kb/` → `core/content/kb/`
3. Copy images from `content/public/images/` → `core/public/images/`
4. Adjust frontmatter if needed to match Contentlayer schema

---

## Phase 3: Create Next.js Pages ✅
**Risk: Medium (new routes)**

1. Create blog routes:
   ```
   core/app/[locale]/(default)/blog/
   ├── page.tsx           # Blog listing
   └── [slug]/
       └── page.tsx       # Individual post
   ```

2. Create KB routes:
   ```
   core/app/[locale]/(default)/kb/
   ├── page.tsx           # KB home
   ├── [category]/
   │   └── page.tsx       # Category listing
   └── [...slug]/
       └── page.tsx       # Individual article
   ```

3. Style pages using existing Tailwind classes (port from Astro components)

---

## Phase 4: Update Navigation ✅
**Risk: Low**

1. Add Blog/KB links to main header navigation
2. Remove hardcoded category data (now uses real BigCommerce data)
3. Footer links already point to correct URLs

---

## Phase 5: Remove Astro & Rewrites ✅
**Risk: Medium (removing functionality)**

1. Remove rewrites from `core/next.config.ts`:
   - `/blog/*`
   - `/kb/*`
   - `/about-us`, `/contact-us`, etc.
   - `/images/*`
   - `/_astro/*`

2. Remove `CONTENT_SITE_URL` environment variable from Vercel

3. Delete or archive:
   - `content/` directory
   - Content Vercel project (sign-site-content)

---

## Phase 6: Static Pages ✅
**Risk: Low**

Move these Astro pages to Next.js:
- `/about-us`
- `/contact-us`
- `/trade-enquiries`
- `/delivery-returns`
- `/terms-conditions`
- `/privacy-policy`

These are simple static pages - just create `.tsx` files in the appropriate route folders.

---

## Rollback Plan

If issues arise:
1. Astro site remains deployed at sign-site-content.vercel.app
2. Re-add rewrites to next.config.ts
3. Re-add CONTENT_SITE_URL to Vercel env vars

Keep Astro site running (but not linked) for 2 weeks after migration as safety net.

---

## Estimated Effort

| Phase | Effort | Can Break Live Site? |
|-------|--------|---------------------|
| 1. Setup Contentlayer | 1-2 hours | No |
| 2. Move Content | 30 mins | No |
| 3. Create Pages | 3-4 hours | No (new routes) |
| 4. Update Nav | 30 mins | No |
| 5. Remove Astro | 30 mins | Yes (do last) |
| 6. Static Pages | 1-2 hours | No |

**Total: ~8-10 hours of work**

---

## Decision Point

~~Before starting, confirm:~~
- [x] Current Astro site is working as fallback
- [x] All content is committed to git
- [x] Ready to proceed with migration

**Migration completed December 2024.**

---

## Alternative: Keep Astro, Fix Header

If migration feels like too much, we can instead:
1. Remove fake cart/auth from Astro header
2. Add simple links back to Core site for cart/account
3. Accept the static categories limitation

This is ~30 mins of work vs ~8-10 hours for full migration.
