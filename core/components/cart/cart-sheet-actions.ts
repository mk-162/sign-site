'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql, VariablesOf } from '~/client/graphql';
import { TAGS } from '~/client/tags';
import { clearCartId, getCartId } from '~/lib/cart';

const UpdateCartLineItemMutation = graphql(`
  mutation UpdateCartLineItemSimple($input: UpdateCartLineItemInput!) {
    cart {
      updateCartLineItem(input: $input) {
        cart {
          entityId
        }
      }
    }
  }
`);

const DeleteCartLineItemMutation = graphql(`
  mutation DeleteCartLineItemSimple($input: DeleteCartLineItemInput!) {
    cart {
      deleteCartLineItem(input: $input) {
        cart {
          entityId
        }
      }
    }
  }
`);

export async function updateCartItemQuantity(
  lineItemEntityId: string,
  productEntityId: number,
  quantity: number,
  variantEntityId?: number
): Promise<void> {
  const t = await getTranslations('Cart.Errors');
  const customerAccessToken = await getSessionCustomerAccessToken();
  const cartId = await getCartId();

  if (!cartId) {
    throw new Error(t('cartNotFound'));
  }

  if (!lineItemEntityId) {
    throw new Error(t('lineItemNotFound'));
  }

  // If quantity is 0, remove the item
  if (quantity <= 0) {
    await removeCartItem(lineItemEntityId);
    return;
  }

  // Build cart line item data with required productEntityId
  const cartLineItemData = Object.assign(
    { quantity, productEntityId },
    variantEntityId && { variantEntityId },
  );

  await client.fetch({
    document: UpdateCartLineItemMutation,
    variables: {
      input: {
        cartEntityId: cartId,
        lineItemEntityId,
        data: {
          lineItem: cartLineItemData,
        },
      },
    },
    customerAccessToken,
    fetchOptions: { cache: 'no-store' },
  });

  revalidateTag(TAGS.cart, 'default');
}

export async function removeCartItem(lineItemEntityId: string): Promise<void> {
  const t = await getTranslations('Cart.Errors');
  const customerAccessToken = await getSessionCustomerAccessToken();
  const cartId = await getCartId();

  if (!cartId) {
    throw new Error(t('cartNotFound'));
  }

  if (!lineItemEntityId) {
    throw new Error(t('lineItemNotFound'));
  }

  const response = await client.fetch({
    document: DeleteCartLineItemMutation,
    variables: {
      input: {
        cartEntityId: cartId,
        lineItemEntityId,
      },
    },
    customerAccessToken,
    fetchOptions: { cache: 'no-store' },
  });

  const cart = response.data.cart.deleteCartLineItem?.cart;

  // If we remove the last item in a cart the cart is deleted
  if (!cart) {
    await clearCartId();
  }

  revalidateTag(TAGS.cart, 'default');
}
