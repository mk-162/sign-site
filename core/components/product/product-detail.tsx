'use client';

import { ReactNode } from 'react';
import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { ProductDetailForm, ProductDetailFormAction } from './product-detail-form';
import { ProductGallery } from './product-gallery';
import { Field } from '@/vibes/soul/sections/product-detail/schema';
import { Skeleton } from '~/components/ui/skeleton';
import { Badge } from '~/components/ui/badge';
import { Link } from '~/components/link';
import { ChevronRight, Home } from 'lucide-react';

export interface Breadcrumb {
    label: string;
    href: string;
}

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
    breadcrumbs?: Streamable<Breadcrumb[]>;
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
    breadcrumbs: streamableBreadcrumbs,
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
            {/* Breadcrumbs */}
            {streamableBreadcrumbs && (
                <Stream fallback={<Skeleton className="h-6 w-64 mb-6" />} value={streamableBreadcrumbs}>
                    {(breadcrumbs) => breadcrumbs && breadcrumbs.length > 0 && (
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-orange-600 transition-colors">
                                <Home className="h-4 w-4" />
                            </Link>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-slate-300" />
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="text-slate-900 font-medium">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="hover:text-orange-600 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}
                </Stream>
            )}
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
