'use client';

import { CreditCard, Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="mt-auto bg-[hsl(var(--foreground))] pt-12 text-gray-400 font-sans">
            <div className="container mx-auto grid gap-8 px-4 pb-12 md:grid-cols-4">
                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase text-white">Customer Service</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-white">Returns & Refunds</Link></li>
                        <li><Link href="#" className="hover:text-white">Delivery Information</Link></li>
                        <li><Link href="#" className="hover:text-white">Track Order</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase text-white">Products</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white">Fire Safety</Link></li>
                        <li><Link href="#" className="hover:text-white">Construction</Link></li>
                        <li><Link href="#" className="hover:text-white">Custom Signs</Link></li>
                        <li><Link href="#" className="hover:text-white">New Arrivals</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase text-white">Business Accounts</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white">Apply for Trade Account</Link></li>
                        <li><Link href="#" className="hover:text-white">Bulk Ordering</Link></li>
                        <li><Link href="#" className="hover:text-white">Request a Quote</Link></li>
                        <li><Link href="#" className="hover:text-white">Payment Options</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase text-white">About SafetySignHub</h4>
                    <p className="mb-4 text-sm">
                        A GTSE Brand. We provide compliant safety signage to thousands of UK businesses.
                    </p>
                    <div className="flex gap-4">
                        <CreditCard className="h-6 w-6" />
                        <Shield className="h-6 w-6" />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 bg-gray-950 py-4">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-xs md:flex-row">
                    <span>&copy; 2025 Safety Sign Hub - A GTSE Brand. All rights reserved. Operated by Caledonia Signs Limited | Company No. SC163223</span>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
