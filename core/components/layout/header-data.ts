import { cache } from 'react';
import {
  Stethoscope,
  HardHat,
  Warehouse,
  Factory,
  Building2,
  GraduationCap,
  Hotel,
  Landmark,
  UtensilsCrossed,
  Anchor,
  LucideIcon,
} from 'lucide-react';

import { auth, getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';
import { getCartId } from '~/lib/cart';
import type { CartSheetItem } from '~/components/cart/cart-sheet';

// Category tree types from BigCommerce
export interface CategoryTreeItem {
  entityId: number;
  name: string;
  path: string;
  children: CategoryTreeItem[];
}

// Grouped navigation types
export interface NavGroup {
  key: string;
  label: string;
  categories: CategoryTreeItem[];
  isIndustry?: boolean;
}

export interface IndustryItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

// Industry icon mapping based on category names
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  'Healthcare & Medical': Stethoscope,
  'Construction Sites': HardHat,
  'Warehouses & Distribution': Warehouse,
  'Manufacturing & Industrial': Factory,
  'Offices & Corporate': Building2,
  'Education & Schools': GraduationCap,
  'Hospitality & Retail': Hotel,
  'Public Buildings': Landmark,
  'Food & Catering': UtensilsCrossed,
  'Marine & Offshore': Anchor,
};

// Navigation group configuration
// Maps BigCommerce category names to navigation groups
const NAV_GROUP_CONFIG = {
  signs: {
    key: 'signs',
    label: 'Signs',
    categoryNames: ['Shop by Sign Type'],
  },
  labelsAndTags: {
    key: 'labelsAndTags',
    label: 'Labels & Tags',
    categoryNames: ['Labels & Stickers', 'Safety Tags'],
  },
  equipment: {
    key: 'equipment',
    label: 'Equipment',
    categoryNames: [
      'Floor Marking & Graphics',
      'Safety Equipment & Kits',
      'Mirrors & Visibility',
      'Barriers & Access Control',
      'Sign Accessories',
      'Notice Boards & Displays',
    ],
  },
  industry: {
    key: 'industry',
    label: 'By Industry',
    categoryNames: ['Shop by Industry'],
    isIndustry: true,
  },
};

/**
 * Groups flat category tree into navigation groups
 * Uses case-insensitive matching with trimming
 */
export function groupCategories(categoryTree: CategoryTreeItem[]): NavGroup[] {
  const groups: NavGroup[] = [];

  // Debug: log category names to console
  console.log('[NavGroups] Available categories:', categoryTree.map(c => c.name));

  for (const config of Object.values(NAV_GROUP_CONFIG)) {
    const matchingCategories = categoryTree.filter((cat) => {
      const catNameLower = cat.name.toLowerCase().trim();
      return config.categoryNames.some(
        (configName) => configName.toLowerCase().trim() === catNameLower
      );
    });

    if (matchingCategories.length > 0) {
      groups.push({
        key: config.key,
        label: config.label,
        categories: matchingCategories,
        isIndustry: 'isIndustry' in config ? config.isIndustry : false,
      });
    }
  }

  console.log('[NavGroups] Created groups:', groups.map(g => g.label));

  // Fallback: if no groups matched, create groups from all top-level categories
  if (groups.length === 0 && categoryTree.length > 0) {
    console.log('[NavGroups] No groups matched, using fallback');
    // Create a group for each top-level category
    categoryTree.forEach((cat) => {
      const isIndustry = cat.name.toLowerCase().includes('industry');
      groups.push({
        key: cat.name.toLowerCase().replace(/\s+/g, '-'),
        label: cat.name,
        categories: [cat],
        isIndustry,
      });
    });
  }

  return groups;
}

/**
 * Gets industry items with their icons from a category
 */
export function getIndustryItems(industryCategory: CategoryTreeItem): IndustryItem[] {
  return industryCategory.children.map((child) => ({
    name: child.name,
    path: child.path,
    icon: INDUSTRY_ICONS[child.name] || Building2,
  }));
}

/**
 * Flattens subcategories from multiple parent categories into a single list
 * Used for mega menu display
 */
export function flattenSubcategories(categories: CategoryTreeItem[]): CategoryTreeItem[] {
  return categories.flatMap((cat) => cat.children);
}

const HeaderCartQuery = graphql(`
  query HeaderCartQuery($cartId: String) {
    site {
      cart(entityId: $cartId) {
        entityId
        lineItems {
          physicalItems {
            entityId
            name
            quantity
            url
            image {
              url: urlTemplate(lossy: true)
            }
            extendedSalePrice {
              currencyCode
              value
            }
            brand
            selectedOptions {
              name
              ... on CartSelectedMultipleChoiceOption {
                value
              }
            }
          }
          digitalItems {
            entityId
            name
            quantity
            url
            image {
              url: urlTemplate(lossy: true)
            }
            extendedSalePrice {
              currencyCode
              value
            }
            brand
            selectedOptions {
              name
              ... on CartSelectedMultipleChoiceOption {
                value
              }
            }
          }
          totalQuantity
        }
      }
      checkout(entityId: $cartId) {
        subtotal {
          currencyCode
          value
        }
        grandTotal {
          currencyCode
          value
        }
      }
    }
  }
`);

export interface HeaderAuthData {
  isLoggedIn: boolean;
  customerName?: string;
  customerEmail?: string;
}

export interface HeaderCartData {
  items: CartSheetItem[];
  itemCount: number;
  subtotal: string;
}

const formatPrice = (value: number, currencyCode: string = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
};

export const getHeaderAuthData = cache(async (): Promise<HeaderAuthData> => {
  try {
    const session = await auth();
    const customerAccessToken = session?.user?.customerAccessToken;

    if (!customerAccessToken) {
      return { isLoggedIn: false };
    }

    return {
      isLoggedIn: true,
      customerName: session?.user?.name ?? undefined,
      customerEmail: session?.user?.email ?? undefined,
    };
  } catch {
    return { isLoggedIn: false };
  }
});

export const getHeaderCartData = cache(async (): Promise<HeaderCartData> => {
  const emptyCart: HeaderCartData = {
    items: [],
    itemCount: 0,
    subtotal: '£0.00',
  };

  try {
    const cartId = await getCartId();

    if (!cartId) {
      return emptyCart;
    }

    const customerAccessToken = await getSessionCustomerAccessToken();

    const { data } = await client.fetch({
      document: HeaderCartQuery,
      variables: { cartId },
      customerAccessToken,
      fetchOptions: {
        cache: 'no-store',
        next: {
          tags: [TAGS.cart],
        },
      },
    });

    const cart = data.site.cart;
    const checkout = data.site.checkout;

    if (!cart) {
      return emptyCart;
    }

    const physicalItems = cart.lineItems.physicalItems.map((item) => ({
      id: item.entityId,
      name: item.name,
      quantity: item.quantity,
      href: item.url,
      image: item.image
        ? {
            src: item.image.url.replace('{:size}', '80x80'),
            alt: item.name,
          }
        : undefined,
      price: formatPrice(item.extendedSalePrice.value / item.quantity, item.extendedSalePrice.currencyCode),
      priceValue: item.extendedSalePrice.value / item.quantity,
      subtitle: [
        item.brand,
        ...item.selectedOptions.map((opt) => `${opt.name}: ${'value' in opt ? opt.value : ''}`),
      ]
        .filter(Boolean)
        .join(' • '),
    }));

    const digitalItems = cart.lineItems.digitalItems.map((item) => ({
      id: item.entityId,
      name: item.name,
      quantity: item.quantity,
      href: item.url,
      image: item.image
        ? {
            src: item.image.url.replace('{:size}', '80x80'),
            alt: item.name,
          }
        : undefined,
      price: formatPrice(item.extendedSalePrice.value / item.quantity, item.extendedSalePrice.currencyCode),
      priceValue: item.extendedSalePrice.value / item.quantity,
      subtitle: [
        item.brand,
        ...item.selectedOptions.map((opt) => `${opt.name}: ${'value' in opt ? opt.value : ''}`),
      ]
        .filter(Boolean)
        .join(' • '),
    }));

    const items: CartSheetItem[] = [...physicalItems, ...digitalItems];
    const subtotalValue = checkout?.subtotal?.value ?? 0;
    const subtotalCurrency = checkout?.subtotal?.currencyCode ?? 'GBP';

    return {
      items,
      itemCount: cart.lineItems.totalQuantity,
      subtotal: formatPrice(subtotalValue, subtotalCurrency),
    };
  } catch (error) {
    console.error('Error fetching header cart data:', error);
    return emptyCart;
  }
});
