'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '~/lib/utils';

interface ProductGalleryProps {
    images: Array<{ src: string; alt: string }>;
    className?: string;
}

export function ProductGallery({ images, className }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images.length) return null;

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-white">
                <Image
                    src={images[selectedIndex]?.src ?? ''}
                    alt={images[selectedIndex]?.alt || 'Product image'}
                    fill
                    className="object-contain p-4"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {images.map((image, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={cn(
                                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white",
                                i === selectedIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-contain p-2"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
