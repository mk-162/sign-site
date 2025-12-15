import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/vibes/soul/sections/breadcrumbs';

export const metadata: Metadata = {
    title: 'Industry Guides | Specialist Signage Advice',
    description: 'Expert guides, tips, and compliance information for the UK sign industry. Learn about ISO 7010, fire safety regulations, and construction site requirements.',
};

export default function IndustryGuidesPage() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Industry Guides', href: '/industry-guides' }
                ]}
                className="mb-8"
            />

            {/* Title Section */}
            <div className="mb-12 text-center md:text-left">
                <h1 className="mb-6 text-4xl font-black text-slate-900 sm:text-5xl">
                    Industry Guides
                </h1>
                <p className="max-w-3xl text-xl text-slate-600">
                    Your comprehensive resource for UK signage regulations, compliance tips, and industry-specific best practices. Ensure your business meets the highest standards of safety and clarity.
                </p>
            </div>

            {/* Featured Image */}
            <div className="relative mb-16 h-80 w-full overflow-hidden rounded-2xl md:h-96">
                <Image
                    src="/images/industry-guides/hero.png"
                    alt="Industry Signage Context"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Intro Section */}
            <div className="mb-16">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Expert Advice for Every Sector</h2>
                    <p className="mt-4 max-w-3xl text-lg text-slate-600">
                        Navigating the complex world of safety signage can be challenging. Our editorial team has compiled essential guides to help you understand the latest UK regulations and keep your workforce safe.
                    </p>
                </div>

                {/* Guides Grid */}
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Card 1: ISO 7010 */}
                    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border border-slate-100">
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src="/images/industry-guides/iso-7010.png"
                                alt="ISO 7010 Safety Sign"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-blue-600">Compliance</p>
                                <Link href="/industry-guides/iso-7010-compliance" className="mt-2 block">
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                                        Understanding ISO 7010: The Standard
                                    </h3>
                                    <p className="mt-3 text-base text-slate-500">
                                        Why ISO 7010 is now the gold standard for safety signs across Europe and how to ensure your premises are compliant.
                                    </p>
                                </Link>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/industry-guides/iso-7010-compliance"
                                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500"
                                >
                                    Read Guide <span aria-hidden="true" className="ml-1">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Fire Safety */}
                    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border border-slate-100">
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src="/images/industry-guides/fire-safety.png"
                                alt="Fire Safety Equipment"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-600">Regulations</p>
                                <Link href="/industry-guides/fire-safety-regulations" className="mt-2 block">
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-red-600">
                                        Essential Fire Safety Signage
                                    </h3>
                                    <p className="mt-3 text-base text-slate-500">
                                        From fire action notices to extinguisher identification. A complete breakdown of what you need to meet the Regulatory Reform Order 2005.
                                    </p>
                                </Link>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/industry-guides/fire-safety-regulations"
                                    className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-500"
                                >
                                    Read Guide <span aria-hidden="true" className="ml-1">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Construction */}
                    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl border border-slate-100">
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src="/images/industry-guides/construction.png"
                                alt="Construction Site Entrance"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-yellow-600">Site Safety</p>
                                <Link href="/industry-guides/construction-site-safety" className="mt-2 block">
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-yellow-600">
                                        Construction Site Mandatory Signage
                                    </h3>
                                    <p className="mt-3 text-base text-slate-500">
                                        Keep your site safe and legal. A checklist of mandatory, warning, and prohibition signs required for UK construction projects.
                                    </p>
                                </Link>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/industry-guides/construction-site-safety"
                                    className="inline-flex items-center text-sm font-semibold text-yellow-600 hover:text-yellow-500"
                                >
                                    Read Guide <span aria-hidden="true" className="ml-1">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
