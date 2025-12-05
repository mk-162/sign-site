import { NextResponse } from 'next/server';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { StoreLogoFragment } from '~/components/store-logo/fragment';

const GetLogoQuery = graphql(
    `
    query GetLogoQuery {
      site {
        settings {
          ...StoreLogoFragment
        }
      }
    }
  `,
    [StoreLogoFragment],
);

export const GET = async () => {
    try {
        const response = await client.fetch({
            document: GetLogoQuery,
            fetchOptions: { cache: 'force-cache' },
        });

        const settings = response.data.site.settings;
        const logo = settings ? logoTransformer(settings) : null;

        return NextResponse.json({ logo }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });
    } catch (error) {
        console.error('Error fetching logo:', error);
        return NextResponse.json({ logo: null }, {
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
