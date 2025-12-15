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



                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 text-slate-400 text-sm font-medium justify-center lg:justify-start">
                        <div className="flex gap-1 text-orange-500">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                            <span className="text-slate-400 ml-1">4.9/5 Rating</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Cards - 2x2 Category Banners with Images */}
                <div className="hidden lg:grid grid-cols-2 gap-4">
                    {/* Prohibition Signs (Red) */}
                    <Link href="/shop-by-sign-type/prohibition-signs/">
                        <div className="bg-[#DC2626] rounded-lg h-32 shadow-xl shadow-black/20 transform hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex items-center">
                            <div className="relative z-10 pl-5 pr-2 w-3/5">
                                <h3 className="font-bold text-white text-lg leading-none mb-1">Prohibition</h3>
                                <p className="text-white text-[10px] uppercase font-bold tracking-wider mb-1">(Red)</p>
                                <p className="text-white/90 text-[10px] leading-tight">Do Not Enter, No Smoking</p>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full z-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626] to-transparent z-10" style={{ clipPath: 'polygon(0 0, 20% 0, 0 100%, 0% 100%)' }}></div>
                                <img
                                    src="/images/red-signs.png"
                                    alt="Prohibition Sign"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                    style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
                                />
                                <div className="absolute inset-0 bg-[#DC2626]/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                            </div>
                        </div>
                    </Link>

                    {/* Mandatory Signs (Blue) */}
                    <Link href="/shop-by-sign-type/mandatory-signs/">
                        <div className="bg-[#2563EB] rounded-lg h-32 shadow-xl shadow-black/20 transform hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex items-center">
                            <div className="relative z-10 pl-5 pr-2 w-3/5">
                                <h3 className="font-bold text-white text-lg leading-none mb-1">Mandatory</h3>
                                <p className="text-white text-[10px] uppercase font-bold tracking-wider mb-1">(Blue)</p>
                                <p className="text-white/90 text-[10px] leading-tight">Must Do, Keep Clear</p>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full z-0">
                                <img
                                    src="/images/blue-signs.png"
                                    alt="Mandatory Sign"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                    style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
                                />
                                <div className="absolute inset-0 bg-[#2563EB]/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                            </div>
                        </div>
                    </Link>

                    {/* Warning Signs (Yellow) */}
                    <Link href="/shop-by-sign-type/warning-signs/">
                        <div className="bg-[#FACC15] rounded-lg h-32 shadow-xl shadow-black/20 transform hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex items-center">
                            <div className="relative z-10 pl-5 pr-2 w-3/5">
                                <h3 className="font-bold text-black text-lg leading-none mb-1">Warning</h3>
                                <p className="text-black text-[10px] uppercase font-bold tracking-wider mb-1">(Yellow)</p>
                                <p className="text-black/80 text-[10px] leading-tight">Hazard, Danger, Risk</p>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full z-0">
                                <img
                                    src="/images/yellow-signs.png"
                                    alt="Warning Sign"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                    style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
                                />
                                <div className="absolute inset-0 bg-[#FACC15]/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                            </div>
                        </div>
                    </Link>

                    {/* Safe Condition Signs (Green) */}
                    <Link href="/shop-by-sign-type/safe-condition-signs/">
                        <div className="bg-[#16A34A] rounded-lg h-32 shadow-xl shadow-black/20 transform hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden flex items-center">
                            <div className="relative z-10 pl-5 pr-2 w-3/5">
                                <h3 className="font-bold text-white text-lg leading-none mb-1">Safe Condition</h3>
                                <p className="text-white text-[10px] uppercase font-bold tracking-wider mb-1">(Green)</p>
                                <p className="text-white/90 text-[10px] leading-tight">Exit, First Aid, Escape</p>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full z-0">
                                <img
                                    src="/images/green-signs.png"
                                    alt="Safe Condition Sign"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                    style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
                                />
                                <div className="absolute inset-0 bg-[#16A34A]/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
