'use client';

import React from 'react';
import Link from 'next/link';
import {
    Shield,
    ShoppingCart,
    Search,
    Menu,
    Package,
    FileText,
    CheckCircle2,
    Truck,
    Clock,
    Settings,
    Phone,
    Mail,
    User,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';

// Define separate interfaces for the Category Tree structure
interface CategoryTreeItem {
    name: string;
    path: string;
    children: CategoryTreeItem[];
}

export function Header({ categories = [] }: { categories?: CategoryTreeItem[] }) {
    return (
        <>
            {/* Top Bar - Dark Navy */}
            <div className="bg-[#0f172a] text-slate-300 text-xs py-2 px-4 border-b border-white/10">
                <div className="container mx-auto flex justify-between items-center font-medium">
                    <div className="flex gap-6 w-full sm:w-auto justify-between sm:justify-start">
                        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                            <Phone className="h-3 w-3 text-orange-500" />
                            <span className="inline">Phone:</span>
                            <span className="text-white font-bold tracking-wide">01246 386 126</span>
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer hidden sm:flex">
                            <Mail className="h-3 w-3 text-orange-500" />
                            sales@safetysignhub.com
                        </span>
                    </div>
                    <div className="hidden sm:flex gap-6">
                        <a href="/trade-enquiries" className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Request Quote
                        </a>
                        <Link href="/trade-enquiries" className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
                            <User className="h-3 w-3" /> Trade Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header - Deep Navy with White Text */}
            <header className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                        {/* Top Row on Mobile: Logo + Actions */}
                        <div className="flex items-center justify-between w-full lg:w-auto">
                            {/* Logo Area */}
                            <div className="flex flex-col shrink-0">
                                <Link href="/">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <div className="bg-orange-500 p-1.5 rounded-sm shadow-lg shadow-orange-500/20">
                                            <Shield className="h-7 w-7 text-white" fill="currentColor" />
                                        </div>
                                        <div className="leading-none">
                                            <h1 className="text-2xl font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-family-inter), Inter, system-ui, sans-serif' }}>
                                                SafetySign<span className="text-orange-500">Hub</span>
                                            </h1>
                                            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-0.5 ml-0.5">
                                                A GTSE Brand
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Mobile Actions: Cart + Menu */}
                            <div className="flex items-center gap-4 lg:hidden">
                                <Link href="/cart">
                                    <div className="relative p-1">
                                        <ShoppingCart className="h-6 w-6 text-white" />
                                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#1e293b]">
                                            3
                                        </span>
                                    </div>
                                </Link>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Search - High Prominence Center */}
                        <div className="flex-1 max-w-full lg:max-w-3xl order-last lg:order-none">
                            <div className="flex w-full shadow-lg shadow-black/20 rounded-md overflow-hidden group focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                                <div className="relative w-full">
                                    <Input
                                        placeholder="Search over 25,000 safety products..."
                                        className="w-full pl-5 pr-10 h-12 border-0 rounded-none focus-visible:ring-0 text-slate-900 bg-white placeholder:text-slate-400 text-base"
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                </div>
                                <div className="bg-orange-500 h-12 px-4 flex items-center justify-center border-l border-orange-600">
                                    <div className="p-1 border-2 border-white/30 rounded">
                                        <Package className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Account & Cart */}
                        <div className="hidden lg:flex items-center gap-6 shrink-0">
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="bg-slate-700/50 p-2 rounded-full group-hover:bg-slate-700 transition-colors">
                                    <User className="h-6 w-6 text-slate-200" />
                                </div>
                                <div className="flex flex-col text-sm hidden xl:flex">
                                    <span className="text-slate-400 text-xs">Welcome</span>
                                    <span className="font-bold text-white">Sign In / Register</span>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/10 hidden lg:block" />

                            <Link href="/cart">
                                <div className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative bg-orange-500 p-2 rounded-full shadow-lg shadow-orange-500/20 group-hover:bg-orange-400 transition-colors">
                                        <ShoppingCart className="h-6 w-6 text-white" />
                                        <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-[#1e293b]">
                                            3
                                        </span>
                                    </div>
                                    <div className="flex flex-col text-sm hidden xl:flex">
                                        <span className="text-slate-400 text-xs">Basket</span>
                                        <span className="font-bold text-white">£124.50</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Bar - Orange High Vis */}
                <div className="bg-orange-500 shadow-md hidden lg:block relative z-40">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center text-sm font-bold text-white">
                            {/* Mega Menu Trigger */}
                            <div className="group relative z-50">
                                <div className="flex items-center gap-2 bg-orange-600 px-6 py-3 mr-4 cursor-pointer hover:bg-orange-700 transition-colors shadow-inner">
                                    <Menu className="h-5 w-5" />
                                    <span className="uppercase tracking-wide">All Departments</span>
                                    <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                                </div>

                                {/* Mega Menu Dropdown */}
                                <div className="absolute top-full left-0 w-[800px] bg-white text-slate-900 shadow-2xl rounded-b-lg border-t-4 border-slate-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 z-[100] flex overflow-hidden">
                                    {categories.slice(0, 4).map((category, index) => (
                                        <div key={category.name} className={`flex-1 p-6 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                            <h3 className="text-lg font-black text-slate-900 mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                                                {index === 0 && <Shield className="w-5 h-5 text-orange-500" />}
                                                {index === 1 && <Package className="w-5 h-5 text-orange-500" />}
                                                {index > 1 && <ChevronRight className="w-5 h-5 text-orange-500" />}
                                                <Link href={category.path} className="hover:text-orange-600">{category.name}</Link>
                                            </h3>
                                            <div className="space-y-2">
                                                {category.children.map((child) => (
                                                    <div key={child.name}>
                                                        <Link href={child.path}>
                                                            <span className="text-sm text-slate-500 hover:text-orange-600 hover:translate-x-1 transition-all cursor-pointer block py-1">
                                                                {child.name}
                                                            </span>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}


                                    {/* Featured / Sale Column */}
                                    <div className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
                                        <div>
                                            <Badge className="bg-orange-500 hover:bg-orange-600 border-none mb-4">Special Offer</Badge>
                                            <h3 className="text-xl font-black leading-tight mb-2">Custom Safety Signage</h3>
                                            <p className="text-slate-400 text-sm mb-4">
                                                Design your own compliant signs with your logo and text.
                                            </p>
                                            <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">
                                                Start Designing
                                            </Button>
                                        </div>
                                        <div className="mt-8 pt-8 border-t border-slate-700">
                                            <h4 className="font-bold text-orange-500 mb-2 text-sm">Most Popular</h4>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
                                                    <ChevronRight className="w-3 h-3" /> Fire Exit Signs
                                                </li>
                                                <li className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
                                                    <ChevronRight className="w-3 h-3" /> No Smoking
                                                </li>
                                                <li className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
                                                    <ChevronRight className="w-3 h-3" /> CCTV Signs
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex overflow-x-auto no-scrollbar">
                                {['Warning Signs', 'Fire Safety', 'First Aid', 'PPE & Workwear', 'Lockout Tagout'].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 first:border-l"
                                    >
                                        {item}
                                    </a>
                                ))}

                                {/* Knowledge Link */}
                                <a href="/kb" className="px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 cursor-pointer flex items-center gap-1 bg-orange-600/20">
                                    <Shield className="h-4 w-4" /> Knowledge
                                </a>

                                <a href="/blog" className="px-5 py-3 hover:bg-orange-400 transition-colors whitespace-nowrap border-r border-orange-400/30 cursor-pointer flex items-center gap-1 bg-orange-600/20">
                                    <FileText className="h-4 w-4" /> Blog
                                </a>
                            </div>

                            <div className="hidden xl:block">
                                <a
                                    href="/trade-enquiries"
                                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 transition-colors whitespace-nowrap flex items-center gap-2 shadow-inner"
                                >
                                    <FileText className="h-4 w-4" /> Quick Quote
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Mobile Category Pills */}
                <div className="lg:hidden bg-orange-500 shadow-md border-t border-orange-600">
                    <nav className="flex items-center text-sm font-bold text-white overflow-x-auto no-scrollbar py-2 px-4 gap-2">
                        <a href="/kb" className="px-3 py-1.5 bg-orange-700 rounded-full whitespace-nowrap text-xs flex items-center gap-1">
                            <Shield className="h-3 w-3" /> Knowledge
                        </a>
                        <a href="/blog" className="px-3 py-1.5 bg-orange-700 rounded-full whitespace-nowrap text-xs flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Blog
                        </a>
                        {['Warning Signs', 'Fire Safety', 'First Aid', 'PPE', 'Custom'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="px-3 py-1.5 bg-orange-400/50 rounded-full whitespace-nowrap text-xs hover:bg-orange-600 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Trust Bar */}
            <div className="bg-white border-b border-slate-200 shadow-sm py-3">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
                    <div className="flex items-center justify-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-500" />
                        <span>OSHA & ANSI Compliant Signs</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 border-l border-slate-100">
                        <Truck className="h-5 w-5 text-orange-500" />
                        <span>Free Delivery when on Orders £75+ (ex. VAT)</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 border-l border-slate-100">
                        <Settings className="h-5 w-5 text-orange-500" />
                        <span>Custom Signs Available</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 border-l border-slate-100">
                        <Clock className="h-5 w-5 text-orange-500" />
                        <span>24/7 Expert Support</span>
                    </div>
                </div>
            </div>
        </>
    );
}
