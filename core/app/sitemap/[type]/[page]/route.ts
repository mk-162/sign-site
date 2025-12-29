/* eslint-disable check-file/folder-naming-convention */
/*
 * Proxy route for BigCommerce sub-sitemaps
 * Handles URLs like /sitemap/products/1.xml
 */

import { getChannelIdFromLocale } from '~/channels.config';
import { defaultLocale } from '~/i18n/locales';

const graphqlApiDomain = process.env.BIGCOMMERCE_GRAPHQL_API_DOMAIN ?? 'mybigcommerce.com';
const storeHash = process.env.BIGCOMMERCE_STORE_HASH ?? '';

interface RouteParams {
  type: string;
  page: string;
}

export const GET = async (_request: Request, { params }: { params: Promise<RouteParams> }) => {
  const { type, page } = await params;

  // Remove .xml extension if present
  const pageNumber = page.replace('.xml', '');
  const channelId = getChannelIdFromLocale(defaultLocale);

  // Construct BigCommerce sitemap URL
  const bcSitemapUrl = `https://store-${storeHash}-${channelId}.${graphqlApiDomain}/xmlsitemap.php?type=${type}&page=${pageNumber}`;

  const response = await fetch(bcSitemapUrl, {
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'application/xml',
    },
  });

  if (!response.ok) {
    return new Response('Sitemap not found', { status: 404 });
  }

  const xml = await response.text();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
