'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, LogOut, ArrowRight, Star } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';

export function HeroSection() {
    return (
        <section className="relative bg-[#0f172a] min-h-[500px] flex items-center overflow-hidden py-12 lg:py-0">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent z-10" />
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                    <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-none rounded-sm px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-lg shadow-orange-500/20">
                        UK&apos;s most Helpful Safety Supplier
                    </Badge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl">
                        Maximum Safety.
                        <br />
                        <span className="text-orange-500">Zero Compromise.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                        Equip your facility with industrial-grade signage and safety equipment. Fully compliant
                        with OSHA/ANSI standards. Same-day shipping on stock items.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                        <Button className="h-14 px-8 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg rounded shadow-xl shadow-orange-900/20 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wide w-full sm:w-auto">
                            Get Instant Quote
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 px-8 border-2 border-white/20 text-white hover:bg-white/10 hover:text-white font-bold text-lg rounded backdrop-blur-sm w-full sm:w-auto"
                        >
                            View Catalog
                        </Button>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 text-slate-400 text-sm font-medium justify-center lg:justify-start">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0f172a] flex items-center justify-center text-[10px] text-white font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span>Trusted by 50,000+ Companies</span>
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden sm:block" />
                        <div className="flex gap-1 text-orange-500">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                            <span className="text-slate-400 ml-1">4.9/5 Rating</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Cards - Category Quick Links */}
                <div className="hidden lg:grid grid-cols-2 gap-4">
                    {[
                        {
                            title: 'Warning Signs',
                            icon: AlertTriangle,
                            color: 'text-yellow-500',
                            img: 'https://images.unsplash.com/photo-1626125345510-4603468eedfb?auto=format&fit=crop&w=500&q=80',
                        },
                        {
                            title: 'Exit Signs',
                            icon: LogOut,
                            color: 'text-red-500',
                            img: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=500&q=80',
                        },
                    ].map((cat, i) => (
                        <Link href="/category" key={i}>
                            <div className="bg-white rounded-lg p-4 shadow-2xl shadow-black/30 transform hover:-translate-y-1 transition-all cursor-pointer group">
                                <div className="h-32 bg-slate-100 rounded mb-4 overflow-hidden relative">
                                    <img
                                        src={cat.img}
                                        alt={cat.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
                                        <cat.icon className={`w-12 h-12 ${cat.color} drop-shadow-sm`} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-orange-600 transition-colors">
                                    {cat.title}
                                </h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs font-semibold text-slate-500">Shop Now</span>
                                    <div className="bg-orange-100 text-orange-600 p-1 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Expert Widget Placeholder */}
                    <div className="col-span-2 bg-white rounded-lg p-6 shadow-2xl shadow-black/30">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👷</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Need Expert Advice?</h4>
                                <p className="text-sm text-slate-500">
                                    Call us now: <span className="font-bold text-orange-500">01246 386 126</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
