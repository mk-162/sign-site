import { Flame, Car, ArrowRightCircle, AlertTriangle, ShieldCheck, Ban } from 'lucide-react';
import Link from 'next/link';

// Specific categories with correct paths under /shop-by-sign-type
const categories = [
    {
        name: 'Fire Safety Signs',
        path: '/shop-by-sign-type/fire-safety-signs/',
        icon: Flame,
    },
    {
        name: 'Road & Traffic Signs',
        path: '/shop-by-sign-type/road-traffic-signs/',
        icon: Car,
    },
    {
        name: 'Safe Condition Signs',
        path: '/shop-by-sign-type/safe-condition-signs/',
        icon: ArrowRightCircle,
    },
    {
        name: 'Warning Signs',
        path: '/shop-by-sign-type/warning-signs/',
        icon: AlertTriangle,
    },
    {
        name: 'Mandatory Signs',
        path: '/shop-by-sign-type/mandatory-signs/',
        icon: ShieldCheck,
    },
    {
        name: 'Prohibition Signs',
        path: '/shop-by-sign-type/prohibition-signs/',
        icon: Ban,
    },
];

export function CategoriesGrid() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Shop By Category</h2>
                <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full" />
                <p className="text-slate-500 mt-4">
                    Browse our extensive range of safety signage and equipment. All products manufactured to
                    meet rigorous industrial standards.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                        <Link href={cat.path} key={i}>
                            <div className="group bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 transition-all cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                                    <Icon className="w-8 h-8 text-slate-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                                    {cat.name}
                                </h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
