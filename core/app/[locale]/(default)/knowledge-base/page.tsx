import { Metadata } from 'next';
import Link from 'next/link';
import { Book, FileText, Shield, AlertTriangle, Info, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Knowledge Base - Sign Information & Guides',
  description: 'Expert guides and resources for safety signs, compliance, and signage best practices.',
};

interface Article {
  slug: string;
  title: string;
  description: string;
  icon: 'shield' | 'alert' | 'info' | 'file';
  category: string;
  readTime: string;
}

const articles: Article[] = [
  {
    slug: 'sign-regulations',
    title: 'UK Safety Sign Regulations Guide',
    description: 'Complete guide to Health and Safety (Safety Signs and Signals) Regulations 1996 and BS EN ISO 7010 standards.',
    icon: 'shield',
    category: 'Compliance',
    readTime: '8 min read',
  },
  {
    slug: 'sign-colours-meanings',
    title: 'Safety Sign Colours & Their Meanings',
    description: 'Understanding the colour coding system for safety signs: red, yellow, blue, and green.',
    icon: 'info',
    category: 'Basics',
    readTime: '5 min read',
  },
  {
    slug: 'sign-placement',
    title: 'Where to Place Safety Signs',
    description: 'Best practices for sign placement, viewing distances, and mounting heights.',
    icon: 'file',
    category: 'Installation',
    readTime: '6 min read',
  },
  {
    slug: 'fire-safety-signs',
    title: 'Fire Safety Signage Requirements',
    description: 'Essential fire exit signs, fire equipment signs, and emergency escape route marking.',
    icon: 'alert',
    category: 'Fire Safety',
    readTime: '7 min read',
  },
  {
    slug: 'hazard-warning-signs',
    title: 'Hazard Warning Signs Explained',
    description: 'Guide to warning signs for chemical, electrical, biological, and physical hazards.',
    icon: 'alert',
    category: 'Hazards',
    readTime: '6 min read',
  },
  {
    slug: 'sign-materials',
    title: 'Choosing the Right Sign Material',
    description: 'Comparing rigid plastic, self-adhesive vinyl, aluminium, and photoluminescent materials.',
    icon: 'file',
    category: 'Materials',
    readTime: '5 min read',
  },
];

const categories = [
  { name: 'All Articles', count: articles.length },
  { name: 'Compliance', count: articles.filter(a => a.category === 'Compliance').length },
  { name: 'Fire Safety', count: articles.filter(a => a.category === 'Fire Safety').length },
  { name: 'Hazards', count: articles.filter(a => a.category === 'Hazards').length },
  { name: 'Installation', count: articles.filter(a => a.category === 'Installation').length },
  { name: 'Materials', count: articles.filter(a => a.category === 'Materials').length },
];

function getIcon(icon: Article['icon']) {
  const className = "h-6 w-6";
  switch (icon) {
    case 'shield':
      return <Shield className={className} />;
    case 'alert':
      return <AlertTriangle className={className} />;
    case 'info':
      return <Info className={className} />;
    default:
      return <FileText className={className} />;
  }
}

export default function KnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-10 w-10 text-blue-400" />
            <span className="text-blue-400 font-medium">Knowledge Base</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">
            Sign Information & Guides
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Expert resources to help you understand safety sign regulations, choose the right signage, and ensure workplace compliance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Quick Help Box */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Can&apos;t find what you&apos;re looking for? Our team is here to help.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Contact Us
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </aside>

          {/* Articles Grid */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                All Articles ({articles.length})
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/knowledge-base/${article.slug}`}
                  className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-blue-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {getIcon(article.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured Resource */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Download: Complete Safety Sign Guide
                  </h3>
                  <p className="text-blue-100">
                    Get our comprehensive PDF guide covering all UK safety sign regulations and best practices.
                  </p>
                </div>
                <button className="shrink-0 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
