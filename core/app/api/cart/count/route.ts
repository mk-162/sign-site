import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCartId } from '~/lib/cart';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';

const GetCartCountQuery = graphql(`
  query GetCartCountQuery($cartId: String) {
    site {
      cart(entityId: $cartId) {
        entityId
        lineItems {
          totalQuantity
        }
      }
    }
  }
`);

export const GET = async (request: NextRequest) => {
    const cartId = await getCartId();

    if (!cartId) {
        return NextResponse.json({ count: 0 }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });
    }

    try {
        const response = await client.fetch({
            document: GetCartCountQuery,
            variables: { cartId },
            fetchOptions: {
                cache: 'no-store',
                next: {
                    tags: [TAGS.cart],
                },
            },
        });

        const count = response.data.site.cart?.lineItems.totalQuantity ?? 0;

        return NextResponse.json({ count }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });
    } catch (error) {
        console.error('Error fetching cart count:', error);
        return NextResponse.json({ count: 0 }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });
    }
};

export const OPTIONS = async () => {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        }
    });
};
