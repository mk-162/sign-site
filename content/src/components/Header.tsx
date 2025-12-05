import { Search, Phone, User, ShoppingCart, Menu, Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { STORE_URL } from '../consts';

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

interface HeaderProps {
    cartCount?: number;
    links?: NavigationLink[];
    logo?: string | { src: string; alt: string };
    storeName?: string;
    accountHref?: string;
    cartHref?: string;
}

export function Header({
    cartCount: initialCartCount = 0,
    links = [],
    logo,
    storeName = 'SafetySignHub',
    accountHref = `${STORE_URL}/login`,
    cartHref = `${STORE_URL}/cart`,
}: HeaderProps) {
    const [cartCount, setCartCount] = useState(initialCartCount);
    const [fetchedLogo, setFetchedLogo] = useState<string | { src: string; alt: string } | undefined>(logo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Cart Count
                const cartResponse = await fetch(`${STORE_URL}/api/cart/count`);
                if (cartResponse.ok) {
                    const cartData = await cartResponse.json();
                    setCartCount(cartData.count);
                }

                // Fetch Logo if not provided
                if (!logo) {
                    const logoResponse = await fetch(`${STORE_URL}/api/settings/logo`);
                    if (logoResponse.ok) {
                        const logoData = await logoResponse.json();
                        if (logoData.logo) {
                            setFetchedLogo(logoData.logo);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch header data:', error);
            }
        };

        fetchData();
    }, [logo]);

    const displayLogo = fetchedLogo || logo;
    return (
        <header className="sticky top-0 z-50 shadow-md font-sans">
            {/* Top Bar */}
            <div className="bg-[hsl(var(--accent))] text-white">
                <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                    {/* Logo */}
                    <a href={STORE_URL} className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                        {typeof displayLogo === 'string' ? (
                            <img src={displayLogo} alt={storeName} className="h-8 w-auto" />
                        ) : displayLogo ? (
                            <img src={displayLogo.src} alt={displayLogo.alt} className="h-8 w-auto" />
                        ) : (
                            <>
                                <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
                                <span>{storeName}</span>
                            </>
                        )}
                    </a>

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
                        <a href={accountHref} className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                            <User className="h-6 w-6" />
                            <span className="text-xs">Account</span>
                        </a>
                        <a href={cartHref} className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs">Basket</span>
                        </a>
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
                        <a key={item.label} href={`${STORE_URL}${item.href}`} className="hidden hover:text-[hsl(var(--primary))] lg:block">
                            {item.label}
                        </a>
                    ))}
                    <div className="ml-auto flex gap-4 text-[hsl(var(--primary))]">
                        <a href={`${STORE_URL}/new-arrivals`} className="hover:underline">
                            New Arrivals
                        </a>
                        <a href={`${STORE_URL}/trade-account`} className="hover:underline">
                            Trade Account
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
