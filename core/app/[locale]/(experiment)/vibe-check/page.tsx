import { Button } from '@/vibes/soul/primitives/button';
import { clsx } from 'clsx';
import {
    ArrowRight,
    Check,
    ChevronDown,
    ChevronRight,
    Menu,
    Search,
    ShoppingCart,
    Star,
    Truck,
    User,
    Users,
    X,
    Shield,
    Phone,
    CreditCard,
    HelpCircle,
    FileText,
    AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Dummy Data for Products
const products = [
    {
        id: 1,
        title: 'Fire Exit Running Man Sign (Right)',
        price: '£4.95',
        rating: 5,
        image: '/stock_images/imgi_56_evacuation.jpg',
        badge: 'Best Seller',
    },
    {
        id: 2,
        title: 'Danger High Voltage Sign',
        price: '£3.50',
        rating: 4,
        image: '/stock_images/imgi_54_danger.jpg',
        badge: 'Bulk Buy',
    },
    {
        id: 3,
        title: 'No Smoking Prohibition Sign',
        price: '£2.99',
        rating: 5,
        image: '/stock_images/imgi_52_Prohibition.jpg',
    },
    {
        id: 4,
        title: 'First Aid Station Sign',
        price: '£5.25',
        rating: 5,
        image: '/stock_images/imgi_57_first-aid.jpg',
    },
    {
        id: 5,
        title: 'Wear Safety Helmet Mandatory Sign',
        price: '£3.95',
        rating: 4,
        image: '/stock_images/imgi_42_DMEU_PED80_6_std.lang.all.jpg',
    },
    {
        id: 6,
        title: 'CCTV In Operation Sign',
        price: '£4.50',
        rating: 5,
        image: '/stock_images/imgi_36_DMEU_HZ115A1_std.lang.all.jpg',
    },
];

const categories = [
    { name: 'Fire Safety', image: '/stock_images/imgi_55_fire.jpg', count: '450+' },
    { name: 'Warning Signs', image: '/stock_images/imgi_54_danger.jpg', count: '320+' },
    { name: 'Prohibition', image: '/stock_images/imgi_52_Prohibition.jpg', count: '210+' },
    { name: 'Mandatory', image: '/stock_images/imgi_42_DMEU_PED80_6_std.lang.all.jpg', count: '180+' },
    { name: 'Construction', image: '/stock_images/imgi_14_traffic_management.webp', count: '500+' },
    { name: 'First Aid', image: '/stock_images/imgi_57_first-aid.jpg', count: '120+' },
    { name: 'Hazard', image: '/stock_images/imgi_58_harmful-substances.jpg', count: '290+' },
    { name: 'Information', image: '/stock_images/imgi_59_information.jpg', count: '150+' },
];

export default function SafetySignHubPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-[hsl(var(--foreground))]">
            {/* 1. TOP NAVIGATION (Sticky) */}
            <header className="sticky top-0 z-50 shadow-md">
                {/* Top Bar */}
                <div className="bg-[hsl(var(--accent))] text-white">
                    <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
                            <span>SafetySignHub</span>
                        </div>

                        {/* Search Bar (Central, Large) */}
                        <div className="flex max-w-2xl flex-1">
                            <div className="flex w-full overflow-hidden rounded-md bg-white">
                                <button className="flex items-center gap-1 bg-gray-100 px-3 text-sm font-medium text-gray-700 hover:bg-gray-200">
                                    All <ChevronDown className="h-4 w-4" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search 20,000+ signs..."
                                    className="flex-1 border-none px-4 py-2 text-gray-900 focus:ring-0"
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
                            <div className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                                <User className="h-6 w-6" />
                                <span className="text-xs">Account</span>
                            </div>
                            <div className="flex cursor-pointer flex-col items-center hover:text-[hsl(var(--primary))]">
                                <div className="relative">
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] font-bold">
                                        3
                                    </span>
                                </div>
                                <span className="text-xs">Basket</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Nav Bar */}
                <div className="bg-[hsl(var(--foreground))] text-white">
                    <div className="container mx-auto flex h-10 items-center gap-6 px-4 text-sm font-medium">
                        <div className="flex cursor-pointer items-center gap-2 hover:text-[hsl(var(--primary))]">
                            <Menu className="h-4 w-4" /> All Categories
                        </div>
                        {['Fire Safety', 'Warning', 'Prohibition', 'Mandatory', 'Construction', 'First Aid', 'Hazard', 'Posters'].map(
                            (item) => (
                                <a key={item} href="#" className="hidden hover:text-[hsl(var(--primary))] lg:block">
                                    {item}
                                </a>
                            )
                        )}
                        <div className="ml-auto flex gap-4 text-[hsl(var(--primary))]">
                            <a href="#" className="hover:underline">
                                New Arrivals
                            </a>
                            <a href="#" className="hover:underline">
                                Trade Account
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* 8. TRUST ELEMENTS (High Visibility) */}
            <div className="border-b border-gray-200 bg-white py-2 text-xs font-medium text-gray-600">
                <div className="container mx-auto flex justify-between px-4">
                    <span className="flex items-center gap-1">
                        <Truck className="h-4 w-4 text-[hsl(var(--primary))]" /> Next Day Delivery Available
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[hsl(var(--primary))]" /> Bulk Discounts for Trade
                    </span>
                    <span className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-[hsl(var(--primary))]" /> ISO 7010 Compliant
                    </span>
                    <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-[hsl(var(--primary))]" /> 4.9/5 Customer Rating
                    </span>
                </div>
            </div>

            <main className="container mx-auto grid gap-6 px-4 py-6">
                {/* 4. ECOMMERCE HERO (Split Layout) */}
                <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
                    {/* Main Hero Banner */}
                    <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white lg:col-span-3 lg:row-span-2">
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

                    {/* Side Promo 1 */}
                    <div className="flex flex-col justify-center rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-lg font-bold text-[hsl(var(--foreground))]">Construction Packs</h3>
                        <p className="mb-4 text-sm text-gray-500">Complete site safety bundles.</p>
                        <a href="#" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline">
                            View Packs &rarr;
                        </a>
                    </div>

                    {/* Side Promo 2 */}
                    <div className="flex flex-col justify-center rounded-lg bg-[hsl(var(--primary))] p-6 text-white shadow-sm">
                        <h3 className="mb-2 text-lg font-bold">Custom Signage</h3>
                        <p className="mb-4 text-sm text-white/90">Add your logo to any sign.</p>
                        <a href="#" className="text-sm font-bold text-white hover:underline">
                            Start Designing &rarr;
                        </a>
                    </div>
                </div>

                {/* 6. ENHANCED SHOP BY CATEGORY */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Shop by Category</h2>
                        <a href="#" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline">
                            View all categories &rarr;
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                className="group flex cursor-pointer flex-col items-center rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-3 aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                                    {/* Using Next/Image would be ideal, but standard img for simplicity in vibe check */}
                                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <span className="text-center text-xs font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                                    {cat.name}
                                </span>
                                <span className="text-[10px] text-gray-400">{cat.count} items</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. PRODUCT DISCOVERY (Best Sellers) */}
                <section className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Best Sellers in Safety Signs</h2>
                        <a href="#" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline">
                            See Top 100 &rarr;
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {products.map((product) => (
                            <div key={product.id} className="group flex flex-col">
                                <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-50">
                                    {product.badge && (
                                        <span className="absolute left-0 top-0 z-10 bg-[hsl(var(--primary))] px-2 py-1 text-[10px] font-bold uppercase text-white">
                                            {product.badge}
                                        </span>
                                    )}
                                    <img src={product.image} alt={product.title} className="h-full w-full object-contain p-2 mix-blend-multiply" />
                                </div>
                                <a href="#" className="mb-1 line-clamp-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]">
                                    {product.title}
                                </a>
                                <div className="mb-2 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={clsx('h-3 w-3', i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-400">(120)</span>
                                </div>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-lg font-bold text-[hsl(var(--foreground))]">{product.price}</span>
                                    <button className="rounded-md bg-gray-100 p-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-white">
                                        <ShoppingCart className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. PROMOTIONAL BANNERS (Merchandising) */}
                <section className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg bg-[hsl(var(--accent))] p-8 text-white">
                        <div>
                            <span className="mb-2 block text-xs font-bold uppercase text-[hsl(var(--primary))]">Limited Time</span>
                            <h3 className="mb-2 text-2xl font-bold">Bulk Buy Savings</h3>
                            <p className="mb-4 text-sm text-gray-300">Save up to 20% when you buy 10+ signs.</p>
                            <Button size="small" className="bg-white text-[hsl(var(--accent))] hover:bg-gray-100">
                                Shop Bulk Deals
                            </Button>
                        </div>
                        <div className="h-24 w-24 rounded-full bg-white/10 p-4">
                            <Users className="h-full w-full text-white" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-200 p-8 text-[hsl(var(--foreground))]">
                        <div>
                            <span className="mb-2 block text-xs font-bold uppercase text-[hsl(var(--primary))]">New Arrival</span>
                            <h3 className="mb-2 text-2xl font-bold">Photoluminescent</h3>
                            <p className="mb-4 text-sm text-gray-600">Glow in the dark signs for emergency routes.</p>
                            <Button size="small" className="bg-[hsl(var(--foreground))] text-white hover:bg-[hsl(var(--foreground))/90]">
                                View Range
                            </Button>
                        </div>
                        <div className="h-24 w-24 rounded-full bg-white p-4">
                            <Star className="h-full w-full text-[hsl(var(--primary))]" />
                        </div>
                    </div>
                </section>

                {/* 7. EDITORIAL CONTENT (Subordinate) */}
                <section className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Buying Guides & Advice</h2>
                        <a href="/en/knowledge-hub" className="text-sm font-bold text-[hsl(var(--primary))] hover:underline">
                            Visit Knowledge Hub &rarr;
                        </a>
                    </div>
                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            'UK Safety Sign Regulations Guide',
                            'Fire Exit Signs: What You Need',
                            'Construction Site Setup Checklist',
                            'Material Guide: Rigid vs Sticker',
                        ].map((title, i) => (
                            <Link href="/en/knowledge-hub/fire-safety/regulations-guide" key={i} className="group cursor-pointer">
                                <div className="mb-3 aspect-[16/9] overflow-hidden rounded-md bg-gray-100">
                                    <img src="/stock_images/imgi_46_Signs-Materials-Finishes-Guide.jpg" alt="Guide" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <h3 className="mb-1 text-sm font-bold leading-tight text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                                    {title}
                                </h3>
                                <p className="text-xs text-gray-500">Read more &rarr;</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* 10. FOOTER (Dense & Utility) */}
            <footer className="mt-auto bg-[hsl(var(--foreground))] pt-12 text-gray-400">
                <div className="container mx-auto grid gap-8 px-4 pb-12 md:grid-cols-4">
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-white">Delivery Information</a></li>
                            <li><a href="#" className="hover:text-white">Track Order</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Products</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Fire Safety</a></li>
                            <li><a href="#" className="hover:text-white">Construction</a></li>
                            <li><a href="#" className="hover:text-white">Custom Signs</a></li>
                            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase text-white">Business Accounts</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Apply for Trade Account</a></li>
                            <li><a href="#" className="hover:text-white">Bulk Ordering</a></li>
                            <li><a href="#" className="hover:text-white">Request a Quote</a></li>
                            <li><a href="#" className="hover:text-white">Payment Options</a></li>
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
                        <span>&copy; 2025 SafetySignHub. All rights reserved.</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                            <a href="#" className="hover:text-white">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
