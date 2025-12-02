
'use client';

import { useState } from 'react';
import { Button } from '@/vibes/soul/primitives/button';
import {
    AlertTriangle,
    ArrowRight,
    Bell,
    Check,
    CheckCircle,
    ChevronDown,
    Clock,
    CreditCard,
    FileText,
    Filter,
    HelpCircle,
    Info,
    Menu,
    Phone,
    Search,
    Shield,
    ShoppingCart,
    Star,
    Truck,
    User,
    Users,
    X
} from 'lucide-react';
import Link from 'next/link';
import { complianceUpdates, Industry, Urgency, upcomingDeadlines, topProducts } from './mock-data';
import { clsx } from 'clsx';

const industries: Industry[] = ['Construction', 'Warehousing', 'Office', 'Hospitality', 'Healthcare', 'Education', 'Retail', 'Transport'];

export default function ComplianceFeedPage() {
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'All'>('All');
    const [showUrgentOnly, setShowUrgentOnly] = useState(false);

    const filteredUpdates = complianceUpdates.filter(update => {
        const matchesIndustry = selectedIndustry === 'All' || update.industries.includes(selectedIndustry);
        const matchesUrgency = showUrgentOnly ? (update.urgency === 'Critical' || update.urgency === 'Mandatory') : true;
        return matchesIndustry && matchesUrgency;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-[hsl(var(--foreground))]">
            {/* 1. TOP NAVIGATION (Reused from Vibe Check) */}
            <header className="sticky top-0 z-50 shadow-md">
                {/* Top Bar */}
                <div className="bg-[#0A1D33] text-white">
                    <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Shield className="h-8 w-8 text-[#F36F21]" />
                            <span>SafetySignHub</span>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl flex-1 hidden md:flex">
                            <div className="flex w-full overflow-hidden rounded-md bg-white">
                                <button className="flex items-center gap-1 bg-gray-100 px-3 text-sm font-medium text-gray-700 hover:bg-gray-200">
                                    All <ChevronDown className="h-4 w-4" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search 20,000+ signs..."
                                    className="flex-1 border-none px-4 py-2 text-gray-900 focus:ring-0"
                                />
                                <button className="bg-[#F36F21] px-6 text-white hover:bg-[#d85a10]">
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
                            <div className="flex cursor-pointer flex-col items-center hover:text-[#F36F21]">
                                <User className="h-6 w-6" />
                                <span className="text-xs">Account</span>
                            </div>
                            <div className="flex cursor-pointer flex-col items-center hover:text-[#F36F21]">
                                <div className="relative">
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F36F21] text-[10px] font-bold">
                                        3
                                    </span>
                                </div>
                                <span className="text-xs">Basket</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Nav Bar */}
                <div className="bg-white border-b border-gray-200 text-gray-700">
                    <div className="container mx-auto flex h-10 items-center gap-6 px-4 text-sm font-medium">
                        <div className="flex cursor-pointer items-center gap-2 text-[#F36F21]">
                            <Menu className="h-4 w-4" /> All Categories
                        </div>
                        {['Fire Safety', 'Warning', 'Prohibition', 'Mandatory', 'Construction', 'First Aid'].map(
                            (item) => (
                                <a key={item} href="#" className="hidden hover:text-[#F36F21] lg:block">
                                    {item}
                                </a>
                            )
                        )}
                        <div className="ml-auto flex gap-4 text-[#F36F21]">
                            <a href="#" className="hover:underline font-bold">
                                Compliance Hub
                            </a>
                        </div>
                    </div>
                </div>

                {/* TRUST BAR (New Request) */}
                <div className="border-t-4 border-[#F36F21] bg-white py-3 shadow-sm hidden lg:block">
                    <div className="container mx-auto flex items-center justify-between px-4 text-xs text-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-1 border-2 border-gray-300 rounded">
                                <CheckCircle className="h-5 w-5 text-gray-600" />
                            </div>
                            <span>Over <strong>20,000</strong> Products</span>
                        </div>
                        <div className="h-8 w-px bg-orange-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="p-1 border-2 border-gray-300 rounded">
                                <FileText className="h-5 w-5 text-gray-600" />
                            </div>
                            <span><strong>Rapid</strong> Quotes</span>
                        </div>
                        <div className="h-8 w-px bg-orange-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="p-1 border-2 border-gray-300 rounded">
                                <CreditCard className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <strong>Business Accounts</strong><br />Available
                            </div>
                        </div>
                        <div className="h-8 w-px bg-orange-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="p-1 border-2 border-gray-300 rounded">
                                <Info className="h-5 w-5 text-gray-600" />
                            </div>
                            <span><strong>Customised</strong> Solutions</span>
                        </div>
                        <div className="h-8 w-px bg-orange-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="p-1 border-2 border-gray-300 rounded">
                                <Truck className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <strong>Next day delivery</strong><br />Available
                            </div>
                        </div>
                        <div className="h-8 w-px bg-orange-200"></div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-green-500 text-green-500" />
                            </div>
                            <span>See our <strong>1,253</strong> reviews on <strong>Trustpilot</strong></span>
                        </div>
                    </div>
                </div>
            </header>

            {/* HERO HEADER */}
            <div className="bg-[#0A1D33] text-white py-12 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[#F36F21] text-xs font-bold uppercase tracking-wider">
                                <Shield className="h-4 w-4" />
                                <span>Regulatory Intelligence</span>
                            </div>
                            <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
                                Compliance News & Updates
                            </h1>
                            <p className="text-gray-300 max-w-xl text-lg">
                                Actionable regulatory updates tailored to your industry. Stay compliant without the jargon.
                            </p>
                        </div>
                        {/* Quick Stats */}
                        <div className="gap-8 text-sm border-l border-gray-700 pl-8 hidden md:flex">
                            <div>
                                <span className="block text-2xl font-bold text-white">{complianceUpdates.length}</span>
                                <span className="text-gray-400">New Updates</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-[#F36F21]">3</span>
                                <span className="text-gray-400">Deadlines This Month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STICKY FILTER BAR */}
            <div className="sticky top-[104px] z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative group w-full sm:w-64">
                            <select
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value as Industry | 'All')}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#F36F21] focus:border-[#F36F21] block p-2.5 pr-8 font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <option value="All">All Industries</option>
                                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-gray-700 hover:text-[#F36F21]">
                            <input
                                type="checkbox"
                                checked={showUrgentOnly}
                                onChange={(e) => setShowUrgentOnly(e.target.checked)}
                                className="w-4 h-4 text-[#F36F21] bg-gray-100 border-gray-300 rounded focus:ring-[#F36F21]"
                            />
                            Critical Updates Only
                        </label>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                <main className="space-y-6">
                    {/* FEED HEADER */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {selectedIndustry === 'All' ? 'Latest Updates' : `${selectedIndustry} Updates`}
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                {filteredUpdates.length}
                            </span>
                        </h2>
                    </div>

                    {/* FEED ITEMS */}
                    <div className="grid gap-6">
                        {filteredUpdates.map((update, index) => (
                            <div key={update.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                                <div className="p-6">
                                    {/* Header Row */}
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <UrgencyTag urgency={update.urgency} />
                                            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {update.date}
                                            </span>
                                        </div>
                                        {update.deadline && (
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded border border-red-100">
                                                <AlertTriangle className="h-3 w-3" />
                                                Deadline: {update.deadline}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#F36F21] transition-colors">
                                        {update.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{update.summary}</p>

                                    {/* Action Box */}
                                    <div className="bg-gray-50 rounded border border-gray-200 p-4 mb-6">
                                        <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-[#F36F21]" />
                                            Action Required
                                        </h4>
                                        <ul className="space-y-2">
                                            {update.actionItems.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Commercial Integration */}
                                    {update.relatedProducts.length > 0 && (
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-bold text-gray-900 uppercase">Recommended Solutions</span>
                                                <a href="#" className="text-xs font-bold text-[#F36F21] hover:underline">View All &rarr;</a>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {update.relatedProducts.map((product, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded p-2 hover:border-[#F36F21] transition-colors group/product">
                                                        <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden shrink-0">
                                                            <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply p-1" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs font-bold text-gray-900 truncate group-hover/product:text-[#F36F21]">{product.name}</div>
                                                            <div className="text-xs text-gray-500 mb-1">In Stock • Next Day</div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-bold text-sm text-gray-900">{product.price}</span>
                                                                <button className="bg-gray-100 hover:bg-[#F36F21] hover:text-white text-gray-700 p-1 rounded transition-colors">
                                                                    <ShoppingCart className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* HIGH IMPACT SUBSCRIPTION BLOCK */}
                    <div className="bg-[#0A1D33] rounded-lg p-8 text-white text-center relative overflow-hidden shadow-lg">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/3 flex flex-col items-center border-r border-gray-700 pr-8">
                                <div className="h-16 w-16 bg-[#F36F21] rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <Bell className="h-8 w-8 text-white" />
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">10,000+</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide">Safety Pros Joined</div>
                                </div>
                            </div>
                            <div className="md:w-2/3 text-left">
                                <h3 className="text-2xl font-bold mb-2">
                                    {selectedIndustry === 'All' ? 'Get Compliance Updates' : `Get ${selectedIndustry} Safety Alerts`}
                                </h3>
                                <p className="text-gray-300 mb-6 text-sm">
                                    Receive monthly alerts tailored to your workplace. No spam. No legal jargon. Just what you need to stay compliant.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your work email"
                                        className="flex-1 px-4 py-3 rounded text-gray-900 border-none focus:ring-2 focus:ring-[#F36F21]"
                                    />
                                    <Button className="bg-[#F36F21] text-white hover:bg-[#d85a10] border-none px-8 py-3 h-auto font-bold text-base">
                                        Subscribe Free
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F36F21] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </main>

                {/* SIDEBAR */}
                <aside className="space-y-6">
                    {/* Upcoming Deadlines Module */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#F36F21]" />
                            Upcoming Deadlines
                        </h3>
                        <ul className="space-y-3">
                            {upcomingDeadlines.map((item, i) => (
                                <li key={i} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="text-xs font-bold text-red-600 mb-1">{item.date}</div>
                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Top Products Carousel (Vertical) */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Trending in {selectedIndustry === 'All' ? 'Safety' : selectedIndustry}</h3>
                        <div className="space-y-4">
                            {topProducts.map((product, i) => (
                                <div key={i} className="flex gap-3 group cursor-pointer">
                                    <div className="h-16 w-16 bg-gray-100 rounded p-1 shrink-0">
                                        <img src={product.image} className="h-full w-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#F36F21] line-clamp-2">{product.name}</div>
                                        <div className="text-sm font-bold text-gray-900 mt-1">{product.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" className="w-full mt-4 text-sm">View Top 100</Button>
                    </div>

                    {/* Ask an Expert */}
                    <div className="bg-[#0A1D33] rounded-lg p-6 text-white text-center">
                        <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="h-6 w-6 text-[#F36F21]" />
                        </div>
                        <h4 className="font-bold mb-2">Unsure about a rule?</h4>
                        <p className="text-xs text-gray-300 mb-4">
                            Our compliance team can help you choose the right signage.
                        </p>
                        <Button className="w-full bg-[#F36F21] text-white border-none hover:bg-[#d85a10]">
                            Ask an Expert
                        </Button>
                    </div>
                </aside>
            </div>

            {/* FOOTER (Reused) */}
            <footer className="mt-auto bg-[#0A1D33] pt-12 text-gray-400">
                <div className="container mx-auto grid gap-8 px-4 pb-12 md:grid-cols-4">
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Products</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Fire Safety</a></li>
                            <li><a href="#" className="hover:text-white">Construction</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Business Accounts</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Apply for Trade Account</a></li>
                            <li><a href="#" className="hover:text-white">Request a Quote</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">About SafetySignHub</h4>
                        <p className="mb-4 text-sm">
                            A GTSE Brand. We provide compliant safety signage to thousands of UK businesses.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function UrgencyTag({ urgency }: { urgency: Urgency }) {
    const styles = {
        'Critical': 'bg-red-600 text-white border-red-700',
        'Mandatory': 'bg-[#F36F21] text-white border-orange-600',
        'Upcoming': 'bg-blue-600 text-white border-blue-700',
        'Advisory': 'bg-gray-600 text-white border-gray-700',
    };

    const icons = {
        'Critical': AlertTriangle,
        'Mandatory': AlertTriangle,
        'Upcoming': Clock,
        'Advisory': Info,
    };

    const Icon = icons[urgency];

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[urgency]}`}>
            <Icon className="h-3 w-3" />
            {urgency}
        </span>
    );
}
