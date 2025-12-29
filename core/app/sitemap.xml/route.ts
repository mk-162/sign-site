/* eslint-disable check-file/folder-naming-convention */
/*
 * Proxy to the existing BigCommerce sitemap index on the canonical URL
 * Rewrites BigCommerce internal URLs to use the site's canonical domain
 */

import { getChannelIdFromLocale } from '~/channels.config';
import { client } from '~/client';
import { defaultLocale } from '~/i18n/locales';
import { SITE_URL } from '~/lib/config/site';

export const GET = async () => {
  const sitemapIndex = await client.fetchSitemapIndex(getChannelIdFromLocale(defaultLocale));

  // Rewrite BigCommerce internal URLs to use canonical domain
  // e.g., https://store-xyz-123.mybigcommerce.com/xmlsitemap.php?type=products&page=1
  // becomes https://safetysignhub.co.uk/sitemap/products/1.xml
  const rewrittenIndex = sitemapIndex.replace(
    /https:\/\/store-[^/]+\.mybigcommerce\.com\/xmlsitemap\.php\?type=([^&]+)&amp;page=(\d+)/g,
    `${SITE_URL}/sitemap/$1/$2.xml`
  );

  return new Response(rewrittenIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
