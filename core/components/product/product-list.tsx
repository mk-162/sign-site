'use client';

import { clsx } from 'clsx';
import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { Product, ProductCard } from './product-card';
import { Skeleton } from '~/components/ui/skeleton';

interface ProductListProps {
    products: Streamable<Product[]>;
    showCompare?: boolean;
    className?: string;
    emptyStateTitle?: string;
    emptyStateSubtitle?: string;
}

export function ProductList({
    products: streamableProducts,
    showCompare = false,
    className,
    emptyStateTitle = 'No products found',
    emptyStateSubtitle = 'Try changing your filters.',
}: ProductListProps) {
    return (
        <Stream fallback={<ProductListSkeleton />} value={streamableProducts}>
            {(products) => {
                if (products.length === 0) {
                    return (
                        <div className="py-12 text-center">
                            <h3 className="text-xl font-bold">{emptyStateTitle}</h3>
                            <p className="text-muted-foreground">{emptyStateSubtitle}</p>
                        </div>
                    );
                }

                return (
                    <div className={clsx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showCompare={showCompare}
                            />
                        ))}
                    </div>
                );
            }}
        </Stream>
    );
}

export function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
