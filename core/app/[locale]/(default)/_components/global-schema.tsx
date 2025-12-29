import { Organization, WebSite, WithContext } from 'schema-dts';

import { SITE_URL } from '~/lib/config/site';

export const GlobalSchema = () => {
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Safety Sign Hub';
    const storeUrl = SITE_URL;

    const organizationSchema: WithContext<Organization> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${storeUrl}/#organization`,
        name: storeName,
        url: storeUrl,
        logo: {
            '@type': 'ImageObject',
            url: `${storeUrl}/logo.png`, // Placeholder, update if real logo URL is known
        },
        // sameAs: [social links]
    };

    const websiteSchema: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${storeUrl}/#website`,
        name: storeName,
        url: storeUrl,
        publisher: {
            '@id': `${storeUrl}/#organization`,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${storeUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        } as unknown as WebSite['potentialAction'],
    };

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                type="application/ld+json"
            />
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                type="application/ld+json"
            />
        </>
    );
};
