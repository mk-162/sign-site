import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { getProductsBySkus, GetProductsResponse } from '~/client/queries/get-products';

// Specific products to display on homepage
const FEATURED_SKUS = [
    'GTSE-SN19',        // Fire Door Keep Shut Symbol
    'GTSE-SNCTHM36',    // Caution Trip Hazard (Free-Standing Floor Sign)
    'GTSE-SN1101',      // Highly Flammable
    'GTSE-SN414',       // No Dog Fouling It Is An Offence Not To Clean Up After Your Dog
    'GTSE-SN25',        // No Smoking Vertical
];

function formatPrice(value: number, currencyCode: string = 'GBP'): string {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currencyCode,
    }).format(value);
}

function ProductCard({ product }: { product: GetProductsResponse[number] }) {
    const { name, path, defaultImage, reviewSummary, prices, categories } = product;

    const price = prices?.price?.value;
    const salePrice = prices?.salePrice?.value;
    const basePrice = prices?.basePrice?.value;
    const currencyCode = prices?.price?.currencyCode || 'GBP';

    const hasDiscount = salePrice && basePrice && salePrice < basePrice;
    const discountPercent = hasDiscount
        ? Math.round(((basePrice - salePrice) / basePrice) * 100)
        : null;

    const displayPrice = salePrice || price || 0;
    const originalPrice = hasDiscount ? basePrice : null;

    const rating = reviewSummary?.averageRating || 0;
    const reviewCount = reviewSummary?.numberOfReviews || 0;

    const categoryName = categories?.edges?.[0]?.node?.name || 'Safety Signs';

    return (
        <Card className="border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white">
            <div className="relative aspect-square p-8 flex items-center justify-center bg-white overflow-hidden border-b border-slate-100">
                <div className="absolute top-3 left-3 z-10">
                    <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 font-bold text-[10px] px-2"
                    >
                        IN STOCK
                    </Badge>
                </div>
                {discountPercent && (
                    <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-red-500 hover:bg-red-600 border-none font-bold text-[10px] px-2">
                            -{discountPercent}%
                        </Badge>
                    </div>
                )}
                <Link href={path || '#'} className="w-full h-full relative">
                    {defaultImage?.url ? (
                        <Image
                            src={defaultImage.url.replace('{:size}', '500x500')}
                            alt={defaultImage.altText || name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            No Image
                        </div>
                    )}
                </Link>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <Button
                        asChild
                        size="sm"
                        className="w-full bg-orange-500 hover:bg-orange-600 font-bold text-xs uppercase tracking-wide"
                    >
                        <Link href={path || '#'}>View Product</Link>
                    </Button>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">
                    {categoryName}
                </div>
                <Link href={path || '#'}>
                    <h3 className="font-bold text-slate-900 leading-tight mb-2 h-10 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {name}
                    </h3>
                </Link>
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                            key={s}
                            className={`w-3 h-3 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                        />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({reviewCount})</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-lg font-black text-slate-900">
                        {formatPrice(displayPrice, currencyCode)}
                    </span>
                    {originalPrice && (
                        <span className="text-sm text-slate-400 line-through mb-1">
                            {formatPrice(originalPrice, currencyCode)}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export async function FeaturedProducts() {
    // Try specific products first
    let result = await getProductsBySkus({ skus: FEATURED_SKUS });
    let products = result.status === 'success' && result.products ? result.products : [];

    // Fallback to best sellers if no specific products found
    if (products.length === 0) {
        const { getBestSellingProducts } = await import('~/client/queries/get-products');
        const fallbackResult = await getBestSellingProducts({});
        products = fallbackResult.status === 'success' && fallbackResult.products
            ? fallbackResult.products.slice(0, 4)
            : [];
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="bg-slate-50 py-16 border-y border-slate-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Best Selling Essentials</h2>
                        <p className="text-slate-500 mt-1">Most popular items this week</p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="hidden sm:flex border-slate-300 text-slate-700 hover:text-orange-600 hover:border-orange-500 font-bold"
                    >
                        <Link href="/safety-signs">View All Bestsellers</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.entityId} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
