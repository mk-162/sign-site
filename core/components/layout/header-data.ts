import { cache } from 'react';

import { auth, getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';
import { getCartId } from '~/lib/cart';
import type { CartSheetItem } from '~/components/cart/cart-sheet';

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
