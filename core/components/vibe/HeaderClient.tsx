'use client';

import { Search, Phone, User, ShoppingCart, Menu, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { clsx } from 'clsx';

interface LinkGroup {
    label: string;
    href: string;
    links?: { label: string; href: string }[];
}

interface NavigationLink {
    label: string;
    href: string;
    groups?: LinkGroup[];
}

interface HeaderClientProps {
    cartCount?: number | null;
    links?: NavigationLink[];
    logo?: string | { src: string; alt: string };
    storeName?: string;
    accountHref?: string;
    cartHref?: string;
    activeLocaleId?: string;
}

export function HeaderClient({
    cartCount = 0,
    links = [],
    logo,
    storeName = 'SafetySignHub',
    accountHref = '/login',
    cartHref = '/cart',
}: HeaderClientProps) {
    return (
        <header className="sticky top-0 z-50 shadow-md font-sans">
            {/* Top Bar */}
            <div className="bg-[hsl(var(--accent))] text-white">
                <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                        {typeof logo === 'string' ? (
                            <img src={logo} alt={storeName} className="h-8 w-auto" />
                        ) : logo ? (
                            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
                        ) : (
                            <>
                                <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
                                <span>{storeName}</span>
                            </>
                        )}
                    </Link>

                    {/* Search Bar (Central, Large) */}
                    <div className="flex max-w-2xl flex-1">
                        <div className="flex w-full overflow-hidden rounded-md bg-white">
                            <button className="flex items-center gap-1 bg-gray-100 px-3 text-sm font-medium text-gray-700 hover:bg-gray-200">
                                All <span className="ml-1">▼</span>
                            </button>
                            <input
                                type="text"
                                placeholder="Search 20,000+ signs..."
                                className="flex-1 border-none px-4 py-2 text-gray-900 focus:ring-0 outline-none"
                            />
                            <button className="bg-[hsl(var(--primary))] px-6 text-white hover:bg-[hsl(var(--primary))/90]">
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <div className="hidden flex-col items-end lg:flex">
                            <span className="text-xs text-gray-300">Need help?</span>
                            <span className="flex items-center gap-1 font-bold">
                                <Phone className="h-3 w-3" /> 0800 123 4567
                            </span>
                        </div>
                        <Link href={accountHref} className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                            <User className="h-6 w-6" />
                            <span className="text-xs">Account</span>
                        </Link>
                        <Link href={cartHref} className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount ? (
                                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] font-bold">
                                        {cartCount}
                                    </span>
                                ) : null}
                            </div>
                            <span className="text-xs">Basket</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Secondary Nav Bar */}
            <div className="bg-[hsl(var(--foreground))] text-white">
                <div className="container mx-auto flex h-10 items-center gap-6 px-4 text-sm font-medium">
                    <div className="flex cursor-pointer items-center gap-2 hover:text-[hsl(var(--primary))]">
                        <Menu className="h-4 w-4" /> All Categories
                    </div>
                    {links.slice(0, 8).map((item) => (
                        <Link key={item.label} href={item.href} className="hidden hover:text-[hsl(var(--primary))] lg:block">
                            {item.label}
                        </Link>
                    ))}
                    <div className="ml-auto flex gap-4 text-[hsl(var(--primary))]">
                        <Link href="#" className="hover:underline">
                            New Arrivals
                        </Link>
                        <Link href="#" className="hover:underline">
                            Trade Account
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
