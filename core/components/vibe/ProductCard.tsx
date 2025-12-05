'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    id: number | string;
    title: string;
    price: string;
    rating: number;
    image?: string;
    badge?: string;
}

export function ProductCard({ id, title, price, rating, image, badge }: ProductCardProps) {
    return (
        <div className="group flex flex-col">
            <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-50">
                {badge && (
                    <span className="absolute left-0 top-0 z-10 bg-[hsl(var(--primary))] px-2 py-1 text-[10px] font-bold uppercase text-white">
                        {badge}
                    </span>
                )}
                {/* Handle Makeswift Image object or string */}
                {image && (typeof image === 'string' ? (
                    <img src={image} alt={title} className="h-full w-full object-contain p-2 mix-blend-multiply" />
                ) : (
                    // @ts-ignore - Makeswift image object might have url or src
                    <img src={image.url || image.src} alt={title} className="h-full w-full object-contain p-2 mix-blend-multiply" />
                ))}
            </div>
            <Link href="#" className="mb-1 line-clamp-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]">
                {title}
            </Link>
            <div className="mb-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={clsx('h-3 w-3', i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
                    />
                ))}
                <span className="text-xs text-gray-400">(120)</span>
            </div>
            <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-[hsl(var(--foreground))]">{price}</span>
                <button className="rounded-md bg-gray-100 p-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-white">
                    <ShoppingCart className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
