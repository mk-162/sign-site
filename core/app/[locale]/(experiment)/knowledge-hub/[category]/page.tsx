import { Button } from '@/vibes/soul/primitives/button';
import { ChevronRight, Filter, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

// Dummy Data
const articles = [
    { title: 'Fire Exit Signs: Height & Location Rules', excerpt: 'Where to position your signs for maximum visibility and compliance.', image: '/stock_images/imgi_56_evacuation.jpg' },
    { title: 'Understanding Fire Extinguisher Colors', excerpt: 'A guide to the different types of extinguishers and their color codes.', image: '/stock_images/imgi_55_fire.jpg' },
    { title: 'Fire Action Notices Explained', excerpt: 'What information must be included on your fire action notices.', image: '/stock_images/imgi_54_danger.jpg' },
    { title: 'Do I Need Photoluminescent Signs?', excerpt: 'The benefits of glow-in-the-dark signage for emergency routes.', image: '/stock_images/imgi_46_Signs-Materials-Finishes-Guide.jpg' },
    { title: 'Fire Door Signage Regulations', excerpt: 'Mandatory signs for fire doors and keep shut requirements.', image: '/stock_images/imgi_52_Prohibition.jpg' },
    { title: 'Assembly Point Signage Guide', excerpt: 'How to clearly mark your emergency assembly points.', image: '/stock_images/imgi_57_first-aid.jpg' },
];

const products = [
    { title: 'Fire Exit Running Man (Right)', price: '£4.95', image: '/stock_images/imgi_56_evacuation.jpg' },
    { title: 'Fire Action Notice', price: '£3.50', image: '/stock_images/imgi_54_danger.jpg' },
    { title: 'Water Fire Extinguisher ID', price: '£2.99', image: '/stock_images/imgi_55_fire.jpg' },
    { title: 'Fire Door Keep Shut', price: '£1.95', image: '/stock_images/imgi_52_Prohibition.jpg' },
];

export default async function KnowledgeBaseCategory({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="min-h-screen bg-[hsl(var(--contrast-100))] font-sans text-[hsl(var(--foreground))]">
            {/* BREADCRUMBS */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/en/knowledge-hub" className="hover:text-[hsl(var(--primary))]">Knowledge Base</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-semibold text-[hsl(var(--foreground))]">{categoryName}</span>
                </div>
            </div>

            {/* HEADER */}
            <section className="bg-[hsl(var(--accent))] py-12 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 font-heading text-4xl font-bold">{categoryName} Guides</h1>
                    <p className="max-w-2xl text-lg text-gray-300">
                        Everything you need to know about {categoryName} regulations, best practices, and compliance in the UK workplace.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 grid gap-8 lg:grid-cols-4">
                {/* SIDEBAR */}
                <aside className="hidden lg:block space-y-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-bold text-lg flex items-center gap-2">
                            <Filter className="h-4 w-4" /> Filter Topics
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><label className="flex items-center gap-2 cursor-pointer hover:text-[hsl(var(--primary))]"><input type="checkbox" className="rounded border-gray-300" /> Regulations</label></li>
                            <li><label className="flex items-center gap-2 cursor-pointer hover:text-[hsl(var(--primary))]"><input type="checkbox" className="rounded border-gray-300" /> Installation</label></li>
                            <li><label className="flex items-center gap-2 cursor-pointer hover:text-[hsl(var(--primary))]"><input type="checkbox" className="rounded border-gray-300" /> Maintenance</label></li>
                            <li><label className="flex items-center gap-2 cursor-pointer hover:text-[hsl(var(--primary))]"><input type="checkbox" className="rounded border-gray-300" /> Buyer's Guides</label></li>
                        </ul>
                    </div>

                    <div className="rounded-lg bg-[hsl(var(--contrast-100))] p-6 border border-gray-200">
                        <h3 className="mb-2 font-bold text-lg">Need Help?</h3>
                        <p className="text-sm text-gray-600 mb-4">Our experts are here to help you choose the right signage.</p>
                        <Button variant="secondary" className="w-full text-sm">Contact Support</Button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="lg:col-span-3 space-y-12">
                    {/* Article Grid 1 */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {articles.slice(0, 4).map((article, i) => (
                            <Link href={`/en/knowledge-hub/${category}/article-slug`} key={i} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="h-48 overflow-hidden bg-gray-100">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--primary))]">{article.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex-1">{article.excerpt}</p>
                                    <span className="text-[hsl(var(--primary))] font-bold text-sm">Read Guide &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* COMMERCIAL BREAK: Best Sellers */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Best Selling {categoryName} Products</h3>
                            <Link href="#" className="text-[hsl(var(--primary))] text-sm font-bold hover:underline">Shop All &rarr;</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {products.map((product, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square bg-gray-50 rounded-lg mb-2 p-2 relative">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                        <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[hsl(var(--primary))] hover:text-white">
                                            <ShoppingCart className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-[hsl(var(--primary))]">{product.title}</h4>
                                    <div className="flex items-center gap-1 mb-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <span className="font-bold">{product.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Article Grid 2 */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {articles.slice(4).map((article, i) => (
                            <Link href={`/en/knowledge-hub/${category}/article-slug`} key={i} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="h-48 overflow-hidden bg-gray-100">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[hsl(var(--primary))]">{article.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 flex-1">{article.excerpt}</p>
                                    <span className="text-[hsl(var(--primary))] font-bold text-sm">Read Guide &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
