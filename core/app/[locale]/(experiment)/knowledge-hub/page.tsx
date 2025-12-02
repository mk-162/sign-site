import { Button } from '@/vibes/soul/primitives/button';
import {
    ArrowRight,
    BookOpen,
    Building,
    CheckCircle,
    ChevronRight,
    FileText,
    Flame,
    HardHat,
    HelpCircle,
    Info,
    Search,
    Shield,
    Truck,
} from 'lucide-react';
import Link from 'next/link';

const topics = [
    { name: 'Legislation & Compliance', icon: ScaleIcon, count: '45 Guides', slug: 'legislation' },
    { name: 'Fire Safety', icon: Flame, count: '32 Guides', slug: 'fire-safety' },
    { name: 'Construction Safety', icon: HardHat, count: '28 Guides', slug: 'construction' },
    { name: 'Workplace Hazards', icon: AlertTriangle, count: '50+ Guides', slug: 'hazards' },
    { name: 'First Aid & Emergency', icon: HeartPulse, count: '15 Guides', slug: 'first-aid' },
    { name: 'Warehouse Logistics', icon: Truck, count: '20 Guides', slug: 'warehouse' },
    { name: 'Office Safety', icon: Building, count: '12 Guides', slug: 'office' },
    { name: 'Signs & Signals', icon: Info, count: '60+ Guides', slug: 'signs' },
];

function ScaleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
    );
}

function AlertTriangle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}

function HeartPulse(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 11l6.92-2L12 19" />
        </svg>
    )
}


export default function KnowledgeBaseHome() {
    return (
        <div className="min-h-screen bg-[hsl(var(--contrast-100))] font-sans text-[hsl(var(--foreground))]">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[hsl(var(--accent))] py-20 text-white lg:py-28">
                <div className="container mx-auto relative z-10 px-4 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-[hsl(var(--primary))] backdrop-blur-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Trusted by 20,000+ UK Businesses</span>
                    </div>
                    <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight lg:text-6xl">
                        Safety Knowledge Hub
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
                        The UK's largest resource for workplace safety regulations, compliance guides, and expert advice.
                    </p>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-3xl">
                        <div className="relative flex items-center overflow-hidden rounded-lg bg-white p-2 shadow-xl">
                            <Search className="ml-4 h-6 w-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for guides, regulations, or safety tips..."
                                className="flex-1 border-none px-4 py-3 text-lg text-gray-900 placeholder-gray-500 focus:ring-0"
                            />
                            <Button size="large" className="bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))/90]">
                                Search
                            </Button>
                        </div>
                        <div className="mt-4 flex justify-center gap-4 text-sm text-gray-400">
                            <span>Popular:</span>
                            <a href="#" className="hover:text-white hover:underline">Fire Extinguishers</a>
                            <a href="#" className="hover:text-white hover:underline">ISO 7010</a>
                            <a href="#" className="hover:text-white hover:underline">First Aid Kits</a>
                        </div>
                    </div>
                </div>
                {/* Abstract Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('/stock_images/imgi_14_traffic_management.webp')] bg-cover bg-center mix-blend-overlay"></div>
            </section>

            {/* TOPIC GRID */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-10 text-center font-heading text-3xl font-bold">Browse by Topic</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {topics.map((topic) => (
                            <Link
                                href={`/en/knowledge-hub/${topic.slug}`}
                                key={topic.name}
                                className="group relative flex flex-col items-start rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--contrast-100))] text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors">
                                    <topic.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold group-hover:text-[hsl(var(--primary))]">
                                    {topic.name}
                                </h3>
                                <p className="text-sm text-gray-500">{topic.count}</p>
                                <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-gray-300 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED GUIDES (Editorial + Commercial) */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="font-heading text-3xl font-bold">Featured Compliance Guides</h2>
                            <p className="mt-2 text-gray-500">Essential reading for UK business owners.</p>
                        </div>
                        <Button variant="tertiary">View All Guides</Button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Feature */}
                        <div className="group relative overflow-hidden rounded-xl border border-gray-200 lg:col-span-2">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img
                                src="/stock_images/imgi_46_Signs-Materials-Finishes-Guide.jpg"
                                alt="Guide"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 z-20 p-8 text-white">
                                <span className="mb-3 inline-block rounded bg-[hsl(var(--primary))] px-2 py-1 text-xs font-bold uppercase">
                                    Updated for 2025
                                </span>
                                <h3 className="mb-3 text-3xl font-bold">The Ultimate Guide to UK Safety Sign Regulations</h3>
                                <p className="mb-6 max-w-xl text-gray-200">
                                    A complete breakdown of BS EN ISO 7010, the Health & Safety (Safety Signs and Signals) Regulations 1996, and what they mean for your business.
                                </p>
                                <Link href="/en/knowledge-hub/fire-safety/regulations-guide">
                                    <Button className="bg-white text-[hsl(var(--foreground))] hover:bg-gray-100 border-none">
                                        Read Guide
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Side Features */}
                        <div className="flex flex-col gap-8">
                            <div className="group flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img src="/stock_images/imgi_55_fire.jpg" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <h4 className="mb-2 text-xl font-bold group-hover:text-[hsl(var(--primary))]">Fire Exit Signage Requirements</h4>
                                    <p className="mb-4 text-sm text-gray-500">How to ensure your evacuation routes are compliant.</p>
                                    <Link href="/en/knowledge-hub/fire-safety/regulations-guide" className="text-sm font-bold text-[hsl(var(--primary))]">Read Article &rarr;</Link>
                                </div>
                            </div>
                            <div className="group flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img src="/stock_images/imgi_54_danger.jpg" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <h4 className="mb-2 text-xl font-bold group-hover:text-[hsl(var(--primary))]">Understanding Hazard Symbols</h4>
                                    <p className="mb-4 text-sm text-gray-500">A quick reference guide to GHS and hazard warning symbols.</p>
                                    <Link href="/en/knowledge-hub/fire-safety/regulations-guide" className="text-sm font-bold text-[hsl(var(--primary))]">Read Article &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMERCIAL PROMO BLOCK */}
            <section className="bg-[hsl(var(--foreground))] py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 font-heading text-3xl font-bold">Ready to make your workplace compliant?</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                        We stock over 20,000 ISO-compliant safety signs, available for next-day delivery.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="large" className="bg-[hsl(var(--primary))] text-white border-none hover:bg-[hsl(var(--primary))/90]">
                            Shop All Safety Signs
                        </Button>
                        <Button size="large" variant="tertiary" className="border-gray-600 text-white hover:bg-white hover:text-[hsl(var(--foreground))]">
                            Download 2025 Catalogue
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
