import DOMPurify from 'isomorphic-dompurify';
import { useFormatter } from 'next-intl';
import { Product as ProductSchemaType, WithContext } from 'schema-dts';

import { FragmentOf } from '~/client/graphql';

import { ProductReviewSchemaFragment } from './fragment';

interface Props {
  productId: number;
  productPath: string;
  reviews: Array<FragmentOf<typeof ProductReviewSchemaFragment>>;
}

export const ProductReviewSchema = ({ reviews, productId, productPath }: Props) => {
  const format = useFormatter();

  // Helper to ensure absolute URLs
  const toAbsoluteUrl = (path: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://safetysignhub.co.uk';
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}/${cleanPath}`;
  };

  const productUrl = toAbsoluteUrl(productPath);
  const productCanonicalId = `${productUrl}#product`;

  const productReviewSchema: WithContext<ProductSchemaType> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': productCanonicalId,
    review: reviews.map((review) => {
      return {
        '@type': 'Review' as const,
        datePublished: format.dateTime(new Date(review.createdAt.utc)),
        name: review.title,
        reviewBody: review.text,
        author: {
          '@type': 'Person' as const,
          name: review.author.name,
        },
        reviewRating: {
          '@type': 'Rating' as const,
          bestRating: 5,
          ratingValue: review.rating,
          worstRating: 1,
        },
      };
    }),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(JSON.stringify(productReviewSchema)) }}
      type="application/ld+json"
    />
  );
};

