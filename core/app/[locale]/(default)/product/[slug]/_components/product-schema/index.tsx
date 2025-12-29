import { Product as ProductSchemaType, WithContext, BreadcrumbList } from 'schema-dts';

import { PricingFragment } from '~/client/fragments/pricing';
import { FragmentOf } from '~/client/graphql';
import { SITE_URL } from '~/lib/config/site';

import { ProductSchemaFragment } from './fragment';

interface Props {
  product: FragmentOf<typeof ProductSchemaFragment> & FragmentOf<typeof PricingFragment>;
  breadcrumbs: Array<{ label: string; href: string }>;
  images: Array<{ src: string; alt: string }>;
}

export const ProductSchema = ({ product, breadcrumbs, images }: Props) => {
  // Helper to ensure absolute URLs
  const toAbsoluteUrl = (path: string) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${SITE_URL}/${cleanPath}`;
  };

  const productUrl = toAbsoluteUrl(product.path);
  const productId = `${productUrl}#product`;

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

  const sku = product.sku ? { sku: product.sku } : null;
  const gtin = product.gtin ? { gtin: product.gtin } : null;
  const mpn = product.mpn ? { mpn: product.mpn } : null;

  const brand = product.brand
    ? {
      '@type': 'Brand' as const,
      url: product.brand.path,
      name: product.brand.name,
    }
    : null;

  const aggregateRating =
    product.reviewSummary.numberOfReviews > 0
      ? {
        '@type': 'AggregateRating' as const,
        ratingValue: product.reviewSummary.averageRating,
        reviewCount: product.reviewSummary.numberOfReviews,
      }
      : null;

  const priceSpecification = product.prices
    ? {
      '@type': 'PriceSpecification' as const,
      price: product.prices.price.value,
      priceCurrency: product.prices.price.currencyCode,
      ...(product.prices.priceRange.min.value !== product.prices.priceRange.max.value
        ? {
          minPrice: product.prices.priceRange.min.value,
          maxPrice: product.prices.priceRange.max.value,
        }
        : null),
    }
    : null;

  enum ItemCondition {
    NEW = 'https://schema.org/NewCondition',
    USED = 'https://schema.org/UsedCondition',
    REFURBISHED = 'https://schema.org/RefurbishedCondition',
  }

  const itemCondition = ItemCondition[product.condition ?? 'NEW'];

  enum Availability {
    Preorder = 'https://schema.org/PreOrder',
    Unavailable = 'https://schema.org/OutOfStock',
    Available = 'https://schema.org/InStock',
  }

  const availability = Availability[product.availabilityV2.status];

  // Calculate price valid until (1 year from now)
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const productSchema: WithContext<ProductSchemaType> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': productId,
    name: product.name,
    url: productUrl,
    description: product.plainTextDescription,
    image: images.length > 0 ? images.map((img) => img.src) : (product.defaultImage ? [product.defaultImage.url] : []),
    ...(brand && { brand }),
    ...(aggregateRating && { aggregateRating }),
    ...sku,
    ...gtin,
    ...mpn,
    offers: {
      '@type': 'Offer',
      ...(priceSpecification && { priceSpecification }),
      itemCondition,
      availability,
      url: productUrl,
      priceValidUntil: priceValidUntil.toISOString().split('T')[0],
      priceCurrency: product.prices?.price.currencyCode,
      price: product.prices?.price.value,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: product.prices?.price.currencyCode || 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
      }
    },
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        type="application/ld+json"
      />
    </>
  );
};
