'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { ShoppingCart, BarChart2 } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import { useCompareDrawer } from '@/vibes/soul/primitives/compare-drawer';

// Simplified Price type based on usage or string
type Price = string | { type: 'range'; minValue: string; maxValue: string } | { type: 'sale'; previousValue: string; currentValue: string };

export interface Product {
    id: string;
    title: string;
    href: string;
    image?: { src: string; alt: string };
    price?: Price;
    subtitle?: string;
    badge?: string;
    rating?: number;
}

export interface ProductCardProps {
    product: Product;
    className?: string;
    aspectRatio?: '5:6' | '3:4' | '1:1';
    showCompare?: boolean;
    compareLabel?: string;
    compareParamName?: string;
}

export function ProductCard({
    product,
    className,
    aspectRatio = '1:1',
    showCompare = false,
    compareLabel = 'Compare',
}: ProductCardProps) {
    const { id, title, subtitle, badge, price, image, href } = product;

    return (
        <Card className={clsx('group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg', className)}>
            {/* Image Container */}
            <div className={clsx('relative bg-white border border-slate-200 overflow-hidden', {
                'aspect-[5/6]': aspectRatio === '5:6',
                'aspect-[3/4]': aspectRatio === '3:4',
                'aspect-square': aspectRatio === '1:1',
            })}>
                {badge && (
                    <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600">
                        {badge}
                    </Badge>
                )}

                <Link href={href} className="block w-full h-full relative">
                    {image ? (
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                            No Image
                        </div>
                    )}
                </Link>

                {/* Quick Actions Overlay (Optional - Add later or keep simple) */}
            </div>

            {/* Content */}
            <CardContent className="flex-1 p-4 flex flex-col gap-2">
                {subtitle && (
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{subtitle}</p>
                )}
                <Link href={href} className="flex-1">
                    <h3 className="font-bold text-slate-900 line-clamp-2 hover:text-orange-600 transition-colors">
                        {title}
                    </h3>
                </Link>
                {price && (
                    <div className="text-lg font-bold text-slate-900">
                        {typeof price === 'string' ? (
                            price
                        ) : price.type === 'range' ? (
                            <span>{price.minValue} - {price.maxValue}</span>
                        ) : (
                            <div className="flex gap-2 items-baseline">
                                <span className="text-red-600">{price.currentValue}</span>
                                <span className="text-sm text-muted-foreground line-through">{price.previousValue}</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-0 gap-2">
                <Button asChild className="flex-1 bg-slate-900 hover:bg-slate-800 text-white" size="sm">
                    <Link href={href}>
                        View Details
                    </Link>
                </Button>
                {showCompare && (
                    <CompareButton product={product} label={compareLabel} />
                )}
            </CardFooter>
        </Card>
    );
}

function CompareButton({ product, label }: { product: Product, label: string }) {
    // Basic compare integration - this might need to hook deeper into the drawer state
    // For now, using a simplified version that just logs or does a basic action
    // In a real implementation, this would use the CompareDrawer context

    // START: Placeholder logic similar to vibes compare.tsx
    // We need to implement the actual context hook logic here if we want it to work.
    // Reusing the hook from vibes for compatibility for now.

    const { optimisticItems, setOptimisticItems, maxItems } = useCompareDrawer();
    const isSelected = !!optimisticItems.find((item) => item.id === product.id);

    return (
        <Button
            variant="outline"
            size="icon"
            className={clsx("shrink-0", isSelected && "bg-slate-100 border-slate-400")}
            onClick={(e) => {
                e.preventDefault(); // Prevent navigating if inside link
                setOptimisticItems({
                    type: isSelected ? 'remove' : 'add',
                    item: {
                        id: product.id,
                        title: product.title,
                        href: product.href,
                        image: product.image
                    }
                });
            }}
            title={label}
        >
            <BarChart2 className="h-4 w-4" />
        </Button>
    )
}
