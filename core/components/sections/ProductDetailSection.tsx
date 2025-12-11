'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    Star,
    Truck,
    CheckCircle2,
    Shield,
    Share2,
    Heart,
    Minus,
    Plus,
    FileText,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface ProductImage {
    src: string;
    alt: string;
}

interface ProductPrice {
    amount: string;
    originalAmount?: string;
    currencyCode?: string;
}

interface ProductAccordion {
    title: string;
    content: React.ReactNode;
}

interface ProductDetailProps {
    product: {
        id: string;
        title: string;
        sku?: string;
        description?: React.ReactNode;
        images?: ProductImage[];
        price?: ProductPrice | null;
        rating?: number;
        reviewCount?: number;
        inStock?: boolean;
        accordions?: ProductAccordion[];
        brand?: string;
    };
    breadcrumbs?: Array<{ label: string; href: string }>;
    onAddToCart?: (quantity: number) => void;
}

export function ProductDetailSection({ product, breadcrumbs, onAddToCart }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const images = product.images?.length
        ? product.images
        : [{ src: 'https://via.placeholder.com/800', alt: product.title }];

    const selectedImage = images[selectedImageIndex] ?? images[0] ?? { src: 'https://via.placeholder.com/800', alt: product.title };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 py-3 text-xs text-slate-500 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                        <Link href="/">
                            <span className="hover:text-orange-600 cursor-pointer">Home</span>
                        </Link>
                        {breadcrumbs.map((crumb, i) => (
                            <React.Fragment key={i}>
                                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                <Link href={crumb.href}>
                                    <span className="hover:text-orange-600 cursor-pointer">{crumb.label}</span>
                                </Link>
                            </React.Fragment>
                        ))}
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span className="font-bold text-slate-900 truncate">{product.title}</span>
                    </div>
                </div>
            )}

            <main className="container mx-auto px-4 py-8 flex-1">
                {/* Product Main Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Image Gallery */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="aspect-square bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-8 relative overflow-hidden group">
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                    {product.inStock !== false && (
                                        <Badge className="bg-green-600 hover:bg-green-700 text-white border-none font-bold uppercase tracking-wider">
                                            In Stock
                                        </Badge>
                                    )}
                                </div>
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt || product.title}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-4 right-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-sm"
                                    >
                                        <Share2 className="w-4 h-4 text-slate-600" />
                                    </Button>
                                </div>
                            </div>
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {images.slice(0, 4).map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImageIndex(i)}
                                            className={`aspect-square rounded border cursor-pointer flex items-center justify-center bg-slate-50 p-2 ${i === selectedImageIndex
                                                    ? 'border-orange-500 ring-1 ring-orange-500'
                                                    : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                                    {product.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                                    {product.sku && (
                                        <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                            SKU: {product.sku}
                                        </span>
                                    )}
                                    {product.rating !== undefined && (
                                        <div className="flex items-center gap-1">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'fill-current' : 'text-slate-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-bold text-slate-700">{product.rating}</span>
                                            {product.reviewCount !== undefined && (
                                                <span className="text-slate-400 underline cursor-pointer hover:text-orange-600">
                                                    ({product.reviewCount} Reviews)
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    {product.inStock !== false && (
                                        <span className="flex items-center gap-1 text-green-600 font-bold">
                                            <CheckCircle2 className="w-4 h-4" /> In Stock for Next Day Delivery
                                        </span>
                                    )}
                                </div>
                                {product.description && (
                                    <div className="text-slate-600 leading-relaxed prose prose-slate">
                                        {product.description}
                                    </div>
                                )}
                            </div>

                            <Separator className="mb-6" />

                            {/* Price & Cart */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col mb-6">
                                <div className="mb-6">
                                    {product.price && (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-4xl font-black text-slate-900">
                                                    {product.price.amount}
                                                </span>
                                                <span className="text-sm text-slate-500 font-medium">ex. VAT</span>
                                            </div>
                                            {product.price.originalAmount && (
                                                <div className="text-sm text-slate-400 line-through">
                                                    {product.price.originalAmount}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-auto space-y-3">
                                    <div className="flex gap-3">
                                        <div className="flex items-center border border-slate-300 bg-white rounded w-32">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <input
                                                type="text"
                                                value={quantity}
                                                readOnly
                                                className="flex-1 w-full text-center font-bold text-slate-900 border-none h-10 focus:ring-0 p-0 bg-transparent"
                                            />
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <Button
                                            onClick={() => onAddToCart?.(quantity)}
                                            className="flex-1 h-10 bg-orange-500 hover:bg-orange-600 font-bold uppercase tracking-wide shadow-lg shadow-orange-500/20"
                                        >
                                            Add to Basket
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-slate-300 text-slate-600 hover:text-orange-600 hover:border-orange-500 h-9 text-xs font-bold uppercase"
                                        >
                                            <Heart className="w-3 h-3 mr-2" /> Save List
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-slate-300 text-slate-600 hover:text-orange-600 hover:border-orange-500 h-9 text-xs font-bold uppercase"
                                        >
                                            <FileText className="w-3 h-3 mr-2" /> Quote
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">ISO 7010</div>
                                        <div className="text-xs text-slate-500">Compliant</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Next Day</div>
                                        <div className="text-xs text-slate-500">Delivery</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">5 Year</div>
                                        <div className="text-xs text-slate-500">Warranty</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                {product.accordions && product.accordions.length > 0 && (
                    <div className="mb-16">
                        <Tabs defaultValue="tab-0" className="w-full">
                            <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent h-auto p-0 rounded-none gap-8">
                                {product.accordions.map((accordion, i) => (
                                    <TabsTrigger
                                        key={i}
                                        value={`tab-${i}`}
                                        className="bg-transparent border-b-4 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none rounded-none h-12 px-0 font-bold text-slate-500 data-[state=active]:text-orange-600 text-base"
                                    >
                                        {accordion.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl p-8 shadow-sm">
                                {product.accordions.map((accordion, i) => (
                                    <TabsContent key={i} value={`tab-${i}`} className="mt-0">
                                        {accordion.content}
                                    </TabsContent>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                )}
            </main>
        </div>
    );
}
