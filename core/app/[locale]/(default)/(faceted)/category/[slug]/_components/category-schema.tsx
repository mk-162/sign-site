import { BreadcrumbList, ItemList, WithContext } from 'schema-dts';

interface Product {
    entityId: number;
    name: string;
    path: string;
    defaultImage: { url: string } | null;
    prices: { price: { value: number; currencyCode: string } } | null;
}

interface Props {
    categoryName: string;
    breadcrumbs: Array<{ label: string; href: string }>;
    products: Product[];
}

export const CategorySchema = ({ categoryName, breadcrumbs, products }: Props) => {
    // Helper to ensure absolute URLs
    const toAbsoluteUrl = (path: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://safetysignhub.co.uk';
        // Remove leading slash if present to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${baseUrl}/${cleanPath}`;
    };

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: toAbsoluteUrl(crumb.href),
        })),
    };

    const itemListSchema: WithContext<ItemList> = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: product.name,
                url: toAbsoluteUrl(product.path),
                image: product.defaultImage?.url, // These usually come as absolute URLs from BigCommerce
                offers: product.prices
                    ? {
                        '@type': 'Offer',
                        price: product.prices.price.value,
                        priceCurrency: product.prices.price.currencyCode,
                    }
                    : undefined,
            },
        })),
    };

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                type="application/ld+json"
            />
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                type="application/ld+json"
            />
        </>
    );
};
