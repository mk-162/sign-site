# B2B Homepage Components & Demo Pages

This folder contains custom B2B-focused Makeswift components and associated demo pages designed to showcase a powerful B2B e-commerce experience similar to seton.co.uk.

## Quick Links

| Resource | URL | Description |
|----------|-----|-------------|
| Static Demo | `/b2b-demo` | Hardcoded layout with placeholder data |
| Live Demo | `/b2b-demo-live` | Real BigCommerce data (categories, products, brands) |
| Makeswift Editor | Makeswift Dashboard | Visual editor for creating custom pages |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEMO PAGES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /b2b-demo (Static)           /b2b-demo-live (Dynamic)          │
│  ├─ Hardcoded JSX             ├─ Fetches from BigCommerce API   │
│  ├─ Placeholder images        ├─ Real categories + counts       │
│  ├─ Fake product data         ├─ Real products + prices         │
│  └─ Quick mockup              └─ Real brands                    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                     MAKESWIFT COMPONENTS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  B2B / Hero Section      - Full-width hero with search bar      │
│  B2B / Stats Counter     - Animated number counters             │
│  B2B / Category Grid     - Category cards with images           │
│  B2B / Trust Badges      - Trust indicators strip               │
│  B2B / Industry Sectors  - Industry-specific cards              │
│                                                                  │
│  These components appear in Makeswift's visual editor and       │
│  can be dragged onto any Makeswift-managed page.                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Pages

### 1. `/b2b-demo` - Static Demo

**File:** `core/app/[locale]/(default)/b2b-demo/page.tsx`

**Purpose:** A hardcoded B2B homepage layout showcasing the visual design with placeholder data. Useful for stakeholder presentations and design reviews.

**Features:**
- 3-column layout (sidebar + main + sidebar)
- Search bar in hero
- Category navigation with product counts
- Product grid with placeholder images
- Quick order by SKU widget
- Brand showcase
- Newsletter signup
- Trust badges and feature highlights

**Data Source:** All data is hardcoded in the component:
- Categories: Static array with fake counts
- Products: Hardcoded names, prices, Unsplash images
- Brands: Static list

**When to use:**
- Quick demos without needing real store data
- Design/layout discussions
- Offline presentations

---

### 2. `/b2b-demo-live` - Live Data Demo

**File:** `core/app/[locale]/(default)/b2b-demo-live/page.tsx`

**Purpose:** Same B2B layout but pulling real data from BigCommerce via GraphQL API.

**Features:**
- Same 3-column layout as static demo
- Real category tree with actual product counts
- Real products with actual images and prices
- Real brand list from store
- Store contact info from settings

**Data Source:** BigCommerce GraphQL API
```graphql
query B2BDemoQuery {
  site {
    categoryTree { entityId, name, path, productCount, children {...} }
    newestProducts(first: 6) { edges { node { ...ProductCardFragment } } }
    featuredProducts(first: 6) { edges { node { ...ProductCardFragment } } }
    brands(first: 10) { edges { node { entityId, name, path } } }
    settings { storeName, contact { phone, email } }
  }
}
```

**When to use:**
- Demonstrating the template with real store inventory
- Testing how the layout works with actual product counts
- Client presentations with their own data

---

## Makeswift Components

All B2B Makeswift components are registered in `register.ts` and can be found in Makeswift's component panel under the "B2B /" prefix.

### B2B / Hero Section
**File:** `b2b-hero.tsx`

A full-width hero section with:
- Configurable headline and subheadline
- Optional search bar
- Trust badges row
- Background image with overlay
- CTA button

**Makeswift Controls:**
| Control | Type | Description |
|---------|------|-------------|
| Headline | TextInput | Main headline text |
| Subheadline | TextInput | Supporting text |
| Show search | Checkbox | Toggle search bar visibility |
| Search placeholder | TextInput | Placeholder text for search |
| Background image | Image | Hero background |
| Overlay opacity | Number | 0-100% overlay darkness |
| Trust badges | List | Array of icon + text badges |
| CTA text | TextInput | Button text |
| CTA link | Link | Button destination |

---

### B2B / Stats Counter
**File:** `stats-counter.tsx`

Animated counter section showing key business metrics.

**Makeswift Controls:**
| Control | Type | Description |
|---------|------|-------------|
| Stats | List | Array of value + suffix + label |
| Background color | Color | Section background |
| Text color | Color | Label text color |
| Accent color | Color | Number color |
| Animation duration | Number | Counter animation speed (ms) |

---

### B2B / Category Grid
**File:** `category-grid.tsx`

Grid of category cards with images.

**Makeswift Controls:**
| Control | Type | Description |
|---------|------|-------------|
| Title | TextInput | Section title |
| Subtitle | TextInput | Section subtitle |
| Categories | List | Array of title + image + link + count |
| Columns | Select | 3, 4, or 6 columns |
| Show product count | Checkbox | Display count badge |

---

### B2B / Trust Badges
**File:** `trust-badges.tsx`

Horizontal strip of trust indicators.

**Makeswift Controls:**
| Control | Type | Description |
|---------|------|-------------|
| Badges | List | Array of icon + title + description |
| Background color | Color | Section background |
| Layout | Select | Horizontal or Grid |

**Available icons:** credit-card, truck, phone, shield-check, clock, refresh, star, certificate

---

### B2B / Industry Sectors
**File:** `industry-sectors.tsx`

Cards showing industries served.

**Makeswift Controls:**
| Control | Type | Description |
|---------|------|-------------|
| Title | TextInput | Section title |
| Subtitle | TextInput | Section subtitle |
| Industries | List | Array of title + description + image + link + icon |
| Columns | Select | 2, 3, or 4 columns |

**Available icons:** building, factory, bolt, heart, academic-cap, truck, home, shopping-cart

---

## Using Components in Makeswift

### Creating a New B2B Page

1. **Open Makeswift Dashboard** for your site
2. **Create a new page** (e.g., `/b2b-homepage`)
3. **Find B2B components** in the left panel (search "B2B")
4. **Drag components** onto the canvas:
   - Start with B2B / Hero Section
   - Add B2B / Stats Counter
   - Add B2B / Category Grid
   - Add B2B / Trust Badges
   - Add B2B / Industry Sectors
5. **Configure each component** using the right panel controls
6. **Publish** when ready

### Recommended Page Structure

```
┌─────────────────────────────────────────────┐
│              B2B / Hero Section              │
│  (headline, search, trust badges)           │
├─────────────────────────────────────────────┤
│            B2B / Stats Counter              │
│  (products, years, customers, orders)       │
├─────────────────────────────────────────────┤
│            B2B / Category Grid              │
│  (6-8 main categories with images)          │
├─────────────────────────────────────────────┤
│         Products Carousel (existing)        │
│  (featured or newest products)              │
├─────────────────────────────────────────────┤
│            B2B / Trust Badges               │
│  (payment, delivery, support, quality)      │
├─────────────────────────────────────────────┤
│          B2B / Industry Sectors             │
│  (construction, manufacturing, etc.)        │
├─────────────────────────────────────────────┤
│         Newsletter (existing component)     │
└─────────────────────────────────────────────┘
```

---

## File Structure

```
core/
├── app/[locale]/(default)/
│   ├── b2b-demo/
│   │   └── page.tsx              # Static demo page
│   └── b2b-demo-live/
│       └── page.tsx              # Live BigCommerce data demo
│
└── lib/makeswift/components/
    ├── components.ts             # Main registration (imports b2b-homepage)
    └── b2b-homepage/
        ├── README.md             # This file
        ├── index.ts              # Exports all components
        ├── register.ts           # Makeswift component registration
        ├── b2b-hero.tsx          # Hero section component
        ├── stats-counter.tsx     # Stats counter component
        ├── category-grid.tsx     # Category grid component
        ├── trust-badges.tsx      # Trust badges component
        └── industry-sectors.tsx  # Industry sectors component
```

---

## Rollback Instructions

To completely remove all B2B homepage functionality:

### 1. Remove Demo Pages
```bash
# Delete static demo
rm -rf core/app/[locale]/(default)/b2b-demo/

# Delete live demo
rm -rf core/app/[locale]/(default)/b2b-demo-live/
```

### 2. Remove Makeswift Components
```bash
# Delete the entire b2b-homepage folder
rm -rf core/lib/makeswift/components/b2b-homepage/
```

### 3. Update Registration
Edit `core/lib/makeswift/components.ts` and remove this line:
```typescript
// Remove this line:
import './components/b2b-homepage/register';
```

### 4. Remove Image Domain (Optional)
If you don't need Unsplash images elsewhere, edit `core/next.config.ts` and remove:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
},
```

---

## Customization Tips

### Adding More Categories to Live Demo
Edit `b2b-demo-live/page.tsx` and change:
```typescript
const categories = siteData.categoryTree.slice(0, 8); // Change 8 to desired count
```

### Adding More Products
Change the GraphQL query:
```graphql
newestProducts(first: 12)  # Change from 6 to 12
```

### Adding Custom Icons
Edit the icon Select options in `register.ts` to add more Heroicons.

### Changing Default Values
Edit the `defaultValue` properties in `register.ts` for each component.

---

## Dependencies

- `@makeswift/runtime` - For component registration
- BigCommerce GraphQL API - For live data
- Tailwind CSS - For styling
- Heroicons - For icon system (via inline SVG)

---

## Support

For issues or questions about these components, check:
- BigCommerce Catalyst documentation
- Makeswift component documentation
- The main project README
