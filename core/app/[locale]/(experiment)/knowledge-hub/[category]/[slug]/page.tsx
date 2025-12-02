import { Button } from '@/vibes/soul/primitives/button';
import { ArrowLeft, Calendar, Check, ChevronRight, Clock, Share2, Shield, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

export default async function KnowledgeBaseArticle({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="min-h-screen bg-white font-sans text-[hsl(var(--foreground))]">
            {/* BREADCRUMBS */}
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="container mx-auto flex items-center gap-2 px-4 py-4 text-sm text-gray-500">
                    <Link href="/en/knowledge-hub" className="hover:text-[hsl(var(--primary))]">Knowledge Base</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/en/knowledge-hub/${category}`} className="hover:text-[hsl(var(--primary))]">{categoryName}</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="truncate font-semibold text-[hsl(var(--foreground))]">UK Fire Safety Sign Regulations Guide</span>
                </div>
            </div>

            <div className="container mx-auto grid gap-12 px-4 py-12 lg:grid-cols-[1fr_300px]">
                {/* MAIN CONTENT */}
                <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-[hsl(var(--primary))] prose-img:rounded-xl">
                    <header className="not-prose mb-8 border-b border-gray-100 pb-8">
                        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))]">
                            <span className="rounded bg-[hsl(var(--primary))/10] px-2 py-1">Regulation Guide</span>
                            <span className="text-gray-400">•</span>
                            <span className="flex items-center gap-1 text-gray-500"><Clock className="h-4 w-4" /> 8 min read</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                            The Complete Guide to UK Fire Safety Sign Regulations (2025 Update)
                        </h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                    <User className="h-full w-full p-2 text-gray-400" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-[hsl(var(--foreground))]">Written by Sarah Jenkins</p>
                                    <p className="text-gray-500">Safety Compliance Expert</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" /> Updated Jan 2025
                            </div>
                        </div>
                    </header>

                    <p className="lead text-xl text-gray-600">
                        Understanding BS EN ISO 7010 and the Health & Safety (Safety Signs and Signals) Regulations 1996 is crucial for every UK business owner. This guide breaks down exactly which signs you need, where to place them, and how to avoid common compliance pitfalls.
                    </p>

                    <div className="not-prose my-8 rounded-xl bg-[hsl(var(--contrast-100))] p-6">
                        <h3 className="mb-4 text-lg font-bold">In this guide:</h3>
                        <ul className="space-y-2 text-sm font-medium text-[hsl(var(--primary))]">
                            <li><a href="#regulations" className="hover:underline">1. Key Regulations Overview</a></li>
                            <li><a href="#types" className="hover:underline">2. Types of Fire Safety Signs</a></li>
                            <li><a href="#placement" className="hover:underline">3. Placement & Visibility Rules</a></li>
                            <li><a href="#materials" className="hover:underline">4. Choosing the Right Materials</a></li>
                        </ul>
                    </div>

                    <h2 id="regulations">1. Key Regulations Overview</h2>
                    <p>
                        In the UK, safety signage is governed primarily by the <strong>Health and Safety (Safety Signs and Signals) Regulations 1996</strong>. This legislation requires employers to provide specific safety signs whenever there is a risk that has not been avoided or controlled by other means.
                    </p>
                    <p>
                        Additionally, <strong>BS EN ISO 7010</strong> is the international standard for safety sign symbols. It was adopted to ensure consistency across Europe. All new signs installed should comply with this standard.
                    </p>

                    <div className="not-prose my-8 flex items-start gap-4 rounded-lg border-l-4 border-[hsl(var(--primary))] bg-orange-50 p-4">
                        <Shield className="mt-1 h-6 w-6 shrink-0 text-[hsl(var(--primary))]" />
                        <div>
                            <h4 className="font-bold text-[hsl(var(--foreground))]">Compliance Tip</h4>
                            <p className="text-sm text-gray-700">
                                Old signs that do not match ISO 7010 symbols (e.g., text-only signs) should be replaced to avoid confusion, although there is no immediate legal requirement to replace existing signs if they are still clear and legible.
                            </p>
                        </div>
                    </div>

                    <h2 id="types">2. Types of Fire Safety Signs</h2>
                    <p>
                        Fire safety signs generally fall into two categories: <strong>Safe Condition</strong> (Green) and <strong>Fire Equipment</strong> (Red).
                    </p>

                    <h3>Fire Exit Signs (Safe Condition)</h3>
                    <p>
                        These signs are green with white text and symbols. They indicate the route to a place of safety.
                    </p>

                    {/* INLINE PRODUCT CARD */}
                    <div className="not-prose my-8 grid gap-4 rounded-xl border border-gray-200 p-4 sm:grid-cols-[100px_1fr_auto]">
                        <div className="aspect-square rounded-lg bg-gray-100 p-2">
                            <img src="/stock_images/imgi_56_evacuation.jpg" alt="Fire Exit Sign" className="h-full w-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="font-bold text-[hsl(var(--foreground))]">Fire Exit Running Man (Right)</h4>
                            <p className="text-sm text-gray-500">ISO 7010 Compliant • Rigid Plastic or Sticker</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                                <Check className="h-3 w-3" /> In Stock
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-2">
                            <span className="text-lg font-bold">£4.95</span>
                            <Button size="small" className="bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))/90]">Add to Basket</Button>
                        </div>
                    </div>

                    <h3>Fire Equipment Signs</h3>
                    <p>
                        Red signs indicate the location of fire fighting equipment like extinguishers and call points.
                    </p>

                    <h2 id="placement">3. Placement & Visibility Rules</h2>
                    <p>
                        Signs must be placed at a suitable height and be unobstructed. For fire exits, signs should be placed <strong>above doors</strong> or suspended from ceilings where necessary to be seen from a distance.
                    </p>
                    <img src="/stock_images/imgi_46_Signs-Materials-Finishes-Guide.jpg" alt="Sign Placement Diagram" className="w-full" />

                    <h2 id="materials">4. Choosing the Right Materials</h2>
                    <p>
                        <strong>Rigid Plastic:</strong> Best for rough surfaces or outdoor use.<br />
                        <strong>Self-Adhesive Vinyl:</strong> Ideal for smooth, clean surfaces like doors or painted walls.<br />
                        <strong>Photoluminescent (Glow in the Dark):</strong> Highly recommended for fire exits to ensure visibility during power failures.
                    </p>

                </article>

                {/* SIDEBAR */}
                <aside className="space-y-8">
                    {/* Shop the Range */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-bold">Shop {categoryName}</h3>
                        <p className="mb-4 text-sm text-gray-500">
                            Browse our full range of compliant signs.
                        </p>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            <img src="/stock_images/imgi_56_evacuation.jpg" className="aspect-square rounded bg-gray-100 object-contain p-2" />
                            <img src="/stock_images/imgi_55_fire.jpg" className="aspect-square rounded bg-gray-100 object-contain p-2" />
                            <img src="/stock_images/imgi_54_danger.jpg" className="aspect-square rounded bg-gray-100 object-contain p-2" />
                            <img src="/stock_images/imgi_52_Prohibition.jpg" className="aspect-square rounded bg-gray-100 object-contain p-2" />
                        </div>
                        <Button className="w-full bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))/90]">
                            View All Products
                        </Button>
                    </div>

                    {/* Related Guides */}
                    <div className="rounded-xl bg-[hsl(var(--contrast-100))] p-6">
                        <h3 className="mb-4 text-lg font-bold">Related Guides</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="group block">
                                    <h4 className="mb-1 text-sm font-bold group-hover:text-[hsl(var(--primary))]">Fire Extinguisher Types & Colors</h4>
                                    <p className="text-xs text-gray-500">5 min read</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group block">
                                    <h4 className="mb-1 text-sm font-bold group-hover:text-[hsl(var(--primary))]">Fire Door Regulations Explained</h4>
                                    <p className="text-xs text-gray-500">4 min read</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="group block">
                                    <h4 className="mb-1 text-sm font-bold group-hover:text-[hsl(var(--primary))]">How to Conduct a Fire Risk Assessment</h4>
                                    <p className="text-xs text-gray-500">10 min read</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                        <span className="text-sm font-bold text-gray-500">Share this guide:</span>
                        <div className="flex gap-2">
                            <Button size="small" variant="ghost" className="h-8 w-8 p-0"><Share2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
