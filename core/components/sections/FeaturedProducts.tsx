'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';

const products = [
    {
        id: 1,
        name: 'Fire Exit Keep Clear 76mm Diameter Pre-Drilled with Fixings',
        category: 'Fire Signs',
        price: 9.95,
        originalPrice: null,
        inStock: true,
        rating: 5,
        reviews: 12,
        image: '/stock_images/imgi_56_evacuation.jpg',
    },
    {
        id: 2,
        name: 'Fire Exit Right Floor Graphic - 600 x 200mm (External Grade)',
        category: 'Floor Graphics',
        price: 24.95,
        originalPrice: 29.95,
        inStock: true,
        rating: 5,
        reviews: 8,
        discount: 15,
        image: '/stock_images/imgi_56_evacuation.jpg',
    },
    {
        id: 3,
        name: 'Fire Exit Left Floor Graphic 600x200mm (External Grade)',
        category: 'Floor Graphics',
        price: 24.95,
        originalPrice: null,
        inStock: true,
        rating: 4,
        reviews: 6,
        image: '/stock_images/imgi_56_evacuation.jpg',
    },
    {
        id: 4,
        name: 'Fire Exit Keep Clear Floor Graphic 600 x 200mm (External Grade)',
        category: 'Floor Graphics',
        price: 22.50,
        originalPrice: null,
        inStock: true,
        rating: 5,
        reviews: 15,
        image: '/stock_images/imgi_54_danger.jpg',
    },
];

export function FeaturedProducts() {
    return (
        <section className="bg-slate-50 py-16 border-y border-slate-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Best Selling Essentials</h2>
                        <p className="text-slate-500 mt-1">Most popular items this week</p>
                    </div>
                    <Button
                        variant="outline"
                        className="hidden sm:flex border-slate-300 text-slate-700 hover:text-orange-600 hover:border-orange-500 font-bold"
                    >
                        View All Bestsellers
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white"
                        >
                            <div className="relative aspect-square p-8 flex items-center justify-center bg-white overflow-hidden border-b border-slate-100">
                                <div className="absolute top-3 left-3 z-10">
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 font-bold text-[10px] px-2"
                                    >
                                        IN STOCK
                                    </Badge>
                                </div>
                                {product.discount && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <Badge className="bg-red-500 hover:bg-red-600 border-none font-bold text-[10px] px-2">
                                            -{product.discount}%
                                        </Badge>
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                                    <Button
                                        size="sm"
                                        className="w-full bg-orange-500 hover:bg-orange-600 font-bold text-xs uppercase tracking-wide"
                                    >
                                        Quick Add
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">
                                    {product.category}
                                </div>
                                <h3 className="font-bold text-slate-900 leading-tight mb-2 h-10 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            className={`w-3 h-3 ${s <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                                        />
                                    ))}
                                    <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-lg font-black text-slate-900">
                                        £{product.price.toFixed(2)}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-slate-400 line-through mb-1">
                                            £{product.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
