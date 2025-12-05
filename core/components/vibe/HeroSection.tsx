'use client';

import { Button } from '@/vibes/soul/primitives/button';

export function HeroSection() {
    return (
        <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white lg:col-span-3 lg:row-span-2 h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent))] to-transparent opacity-90"></div>
            <div className="relative z-10 flex h-full flex-col justify-center p-8 lg:p-12">
                <span className="mb-2 font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
                    Regulation Updates 2025
                </span>
                <h1 className="mb-4 font-heading text-4xl font-bold leading-tight lg:text-5xl">
                    Is Your Site Fully <br /> Compliant?
                </h1>
                <p className="mb-8 max-w-md text-lg text-gray-200">
                    Ensure you meet the latest UK safety standards with our complete range of ISO 7010 signs.
                </p>
                <Button size="large" className="w-fit bg-[hsl(var(--primary))] border-none text-white hover:bg-[hsl(var(--primary))/90]">
                    Shop Compliance Packs
                </Button>
            </div>
            {/* Background Image Placeholder */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/stock_images/imgi_14_traffic_management.webp')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
        </div>
    );
}
