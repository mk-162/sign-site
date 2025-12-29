/* eslint-disable check-file/folder-naming-convention */
/*
 * Robots.txt route
 *
 * This route pulls robots.txt content from the channel settings.
 *
 * If you would like to configure this in code instead, delete this file and follow this guide:
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 *
 */

import { getChannelIdFromLocale } from '~/channels.config';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { defaultLocale } from '~/i18n/locales';
import { SITE_URL } from '~/lib/config/site';

const RobotsTxtQuery = graphql(`
  query RobotsTxtQuery {
    site {
      settings {
        robotsTxt
      }
    }
  }
`);

export const GET = async () => {
  const { data } = await client.fetch({
    document: RobotsTxtQuery,
    channelId: getChannelIdFromLocale(defaultLocale),
    fetchOptions: { cache: 'no-store' }, // disable caching to get the latest robots.txt at build time
  });

  const robotsTxt = `${data.site.settings?.robotsTxt ?? ''}\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
    },
  });
};

export const dynamic = 'force-static';
