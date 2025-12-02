
import Link from 'next/link';
import { ArrowRight, Shield, ShoppingCart, FileText, Bell } from 'lucide-react';

export default function DemoLinkPage() {
    const demos = [
        {
            title: 'Vibe Check (E-commerce Home)',
            description: 'The "Amazon-style" commercial homepage with dense product grids and sticky navigation.',
            href: '/en/vibe-check',
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-700',
        },
        {
            title: 'Knowledge Hub Home',
            description: 'The central hub for safety guides, featuring a search-first hero and topic grid.',
            href: '/en/knowledge-hub',
            icon: Shield,
            color: 'bg-green-100 text-green-700',
        },
        {
            title: 'Compliance News Feed',
            description: 'The new industry-specific regulatory feed with filtering and commercial integration.',
            href: '/en/knowledge-hub/compliance-feed',
            icon: Bell,
            color: 'bg-orange-100 text-orange-700',
        },
        {
            title: 'Category Page (Fire Safety)',
            description: 'Example of a topic-specific landing page with sidebar filters and article lists.',
            href: '/en/knowledge-hub/fire-safety',
            icon: FileText,
            color: 'bg-purple-100 text-purple-700',
        },
        {
            title: 'Article Page (Regulations Guide)',
            description: 'Long-form editorial content with sticky TOC and inline product cards.',
            href: '/en/knowledge-hub/fire-safety/regulations-guide',
            icon: FileText,
            color: 'bg-gray-100 text-gray-700',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">GTSE Demo Index</h1>
                    <p className="text-gray-600">Quick access to all experimental features and prototypes.</p>
                </div>

                <div className="grid gap-4">
                    {demos.map((demo) => (
                        <Link
                            key={demo.href}
                            href={demo.href}
                            className="group flex items-center gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
                        >
                            <div className={`h-16 w-16 rounded-full flex items-center justify-center shrink-0 ${demo.color}`}>
                                <demo.icon className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-1">
                                    {demo.title}
                                </h2>
                                <p className="text-gray-500 text-sm">{demo.description}</p>
                            </div>
                            <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center text-sm text-gray-400">
                    Running on Next.js 15 • Port 3000
                </div>
            </div>
        </div>
    );
}
