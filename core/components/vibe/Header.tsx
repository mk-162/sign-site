import { getLocale, getTranslations } from 'next-intl/server';
import { cache } from 'react';

import { Streamable } from '@/vibes/soul/lib/streamable';
import { GetLinksAndSectionsQuery, LayoutQuery } from '~/app/[locale]/(default)/page-data';
import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql, readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { TAGS } from '~/client/tags';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { routing } from '~/i18n/routing';
import { getCartId } from '~/lib/cart';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { HeaderClient } from './HeaderClient';
import { CurrencyCode, HeaderFragment, HeaderLinksFragment } from '../header/fragment';

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

const getCartCount = cache(async (cartId: string, customerAccessToken?: string) => {
    const response = await client.fetch({
        document: GetCartCountQuery,
        variables: { cartId },
        customerAccessToken,
        fetchOptions: {
            cache: 'no-store',
            next: {
                tags: [TAGS.cart],
            },
        },
    });

    return response.data.site.cart?.lineItems.totalQuantity ?? null;
});

const getHeaderLinks = cache(async (customerAccessToken?: string, currencyCode?: CurrencyCode) => {
    const { data: response } = await client.fetch({
        document: GetLinksAndSectionsQuery,
        customerAccessToken,
        variables: { currencyCode },
        validateCustomerAccessToken: false,
        fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
    });

    return readFragment(HeaderLinksFragment, response).site;
});

const getHeaderData = cache(async () => {
    const { data: response } = await client.fetch({
        document: LayoutQuery,
        fetchOptions: { next: { revalidate } },
    });

    return readFragment(HeaderFragment, response).site;
});

export const Header = async () => {
    const t = await getTranslations('Components.Header');
    const locale = await getLocale();

    const data = await getHeaderData();
    const logo = data.settings ? logoTransformer(data.settings) : '';

    const [customerAccessToken, currencyCode] = await Promise.all([
        getSessionCustomerAccessToken(),
        getPreferredCurrencyCode(),
    ]);

    const categoryTree = (await getHeaderLinks(customerAccessToken, currencyCode)).categoryTree;

    // Transform category tree to Vibe link format
    const links = categoryTree.map(({ name, path, children }) => ({
        label: name,
        href: path,
        groups: children.map((firstChild) => ({
            label: firstChild.name,
            href: firstChild.path,
            links: firstChild.children.map((secondChild) => ({
                label: secondChild.name,
                href: secondChild.path,
            })),
        })),
    }));

    // Add Blog Link (Pointing to Astro)
    links.push({
        label: 'Blog',
        href: 'http://localhost:4321/blog',
        groups: [],
    });

    const cartId = await getCartId();
    const cartCount = cartId ? await getCartCount(cartId, customerAccessToken) : null;

    return (
        <HeaderClient
            cartCount={cartCount}
            links={links}
            logo={logo}
            storeName={data.settings?.storeName ?? 'SafetySignHub'}
            accountHref="/login"
            cartHref="/cart"
            activeLocaleId={locale}
        />
    );
};
