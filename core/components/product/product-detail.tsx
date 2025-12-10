'use client';

import { ReactNode } from 'react';
import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { ProductDetailForm, ProductDetailFormAction } from './product-detail-form';
import { ProductGallery } from './product-gallery';
import { Field } from '@/vibes/soul/sections/product-detail/schema';
import { Skeleton } from '~/components/ui/skeleton';
import { Badge } from '~/components/ui/badge';

// Reusing the interface from Vines to keep compatibility with page props
interface ProductDetailProduct {
    id: string;
    title: string;
    href: string;
    images: Streamable<Array<{ src: string; alt: string }>>;
    price?: Streamable<{ value: number; currencyCode: string } | null>;
    subtitle?: string;
    badge?: string;
    rating?: Streamable<number | null>;
    summary?: Streamable<string>;
    description?: Streamable<string | ReactNode | null>;
    accordions?: Streamable<
        Array<{
            title: string;
            content: ReactNode;
        }>
    >;
    minQuantity?: Streamable<number | null>;
    maxQuantity?: Streamable<number | null>;
    stockLevelMessage?: Streamable<string | null>;
}

export interface ProductDetailProps<F extends Field> {
    product: Streamable<ProductDetailProduct | null>;
    action: ProductDetailFormAction<F>;
    fields: Streamable<F[]>;
    quantityLabel?: string;
    incrementLabel?: string;
    decrementLabel?: string;
    emptySelectPlaceholder?: string;
    ctaLabel?: Streamable<string | null>;
    ctaDisabled?: Streamable<boolean | null>;
    prefetch?: boolean;
    thumbnailLabel?: string;
    additionalInformationTitle?: string;
    additionalActions?: ReactNode;
}

export function ProductDetail<F extends Field>({
    product: streamableProduct,
    action,
    fields: streamableFields,
    quantityLabel,
    emptySelectPlaceholder,
    ctaLabel: streamableCtaLabel,
    ctaDisabled: streamableCtaDisabled,
    prefetch,
    additionalActions,
}: ProductDetailProps<F>) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Stream fallback={<ProductDetailSkeleton />} value={streamableProduct}>
                {(product) =>
                    product && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {/* Left Column: Gallery */}
                            <div>
                                <Stream fallback={<Skeleton className="h-[400px] w-full rounded-lg" />} value={product.images}>
                                    {(images) => <ProductGallery images={images} />}
                                </Stream>
                            </div>

                            {/* Right Column: Details */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    {product.subtitle && (
                                        <h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wide mb-1">
                                            {product.subtitle}
                                        </h2>
                                    )}
                                    <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                                        {product.title}
                                    </h1>
                                    {/* Rating placeholder if needed */}
                                </div>

                                {/* Price */}
                                <div className="text-2xl font-bold text-slate-900">
                                    <Stream fallback={<Skeleton className="h-8 w-32" />} value={product.price}>
                                        {(price) => price && (
                                            <span>
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: price.currencyCode || 'USD',
                                                }).format(price.value)}
                                            </span>
                                        )}
                                    </Stream>
                                </div>

                                {/* Stock Level */}
                                <Stream value={product.stockLevelMessage}>
                                    {msg => msg && <p className="text-sm text-green-600 font-medium">{msg}</p>}
                                </Stream>


                                {/* Form (Options & Add to Cart) */}
                                <div className="border-t border-slate-200 pt-6">
                                    <Stream
                                        fallback={<Skeleton className="h-64 w-full" />}
                                        value={Streamable.all([
                                            streamableFields,
                                            streamableCtaLabel,
                                            streamableCtaDisabled,
                                            product.minQuantity,
                                            product.maxQuantity,
                                        ])}
                                    >
                                        {([fields, ctaLabel, ctaDisabled, minQuantity, maxQuantity]) => (
                                            <ProductDetailForm
                                                action={action}
                                                fields={fields}
                                                productId={product.id}
                                                ctaLabel={ctaLabel ?? undefined}
                                                ctaDisabled={ctaDisabled ?? undefined}
                                                minQuantity={minQuantity ?? undefined}
                                                maxQuantity={maxQuantity ?? undefined}
                                                quantityLabel={quantityLabel}
                                                emptySelectPlaceholder={emptySelectPlaceholder}
                                                prefetch={prefetch}
                                                additionalActions={additionalActions}
                                            />
                                        )}
                                    </Stream>
                                </div>

                                {/* Description */}
                                <div className="mt-8 prose prose-slate max-w-none">
                                    <Stream value={product.description}>
                                        {desc => desc}
                                    </Stream>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Stream>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
}
