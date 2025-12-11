import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { allKBArticles } from 'contentlayer/generated';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Knowledge Base | SafetySignHub',
  description: 'Expert guides, compliance information, and installation tips to help you make the right choices.',
};

// Category images mapping
const categoryImages: Record<string, string> = {
  Compliance: '/images/kb/compliance.png',
  'Getting Started': '/images/kb/getting-started.png',
  'Industry Guides': '/images/kb/industry-guides.png',
  Installation: '/images/kb/installation.png',
  Materials: '/images/kb/materials.png',
  'Sign Types': '/images/kb/sign-types.png',
};

// Helper to get category from article
function getCategory(article: (typeof allKBArticles)[0]): string {
  if (article.category) return article.category;
  // Infer from path structure
  if (article.categoryFromPath) {
    return article.categoryFromPath
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return 'General';
}

export default async function KnowledgeBasePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Filter non-draft articles
  const articles = allKBArticles.filter((article) => !article.draft);

  // Group articles by category
  const categories: Record<string, typeof articles> = {};
  articles.forEach((article) => {
    const cat = getCategory(article);
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(article);
  });

  // Sort articles within each category by order
  Object.keys(categories).forEach((cat) => {
    categories[cat].sort((a, b) => (a.order || 0) - (b.order || 0));
  });

  // Get sorted category names
  const categoryNames = Object.keys(categories).sort();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-[#1e293b] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-black">Knowledge Base</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Expert guides, compliance information, and installation tips to help you make the right
            choices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categoryNames.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                href={`/kb/category/${slug}`}
                key={cat}
              >
                {cat}
                <span className="ml-1 text-slate-400">({categories[cat].length})</span>
              </Link>
            );
          })}
        </div>

        {/* Articles by Category */}
        <div className="space-y-16">
          {categoryNames.map((cat) => (
            <section id={cat.toLowerCase().replace(/\s+/g, '-')} key={cat}>
              <div className="mb-6 flex items-center gap-4">
                {categoryImages[cat] && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg shadow-sm">
                    <Image
                      alt={cat}
                      className="h-full w-full object-cover"
                      fill
                      sizes="64px"
                      src={categoryImages[cat]}
                    />
                  </div>
                )}
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="h-6 w-2 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-black text-slate-900">{cat}</h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories[cat].map((article) => (
                  <Link
                    className="group rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-orange-500 hover:shadow-lg"
                    href={article.url}
                    key={article.slug}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      {article.difficulty && (
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-bold ${
                            article.difficulty === 'Beginner'
                              ? 'bg-green-100 text-green-700'
                              : article.difficulty === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {article.difficulty}
                        </span>
                      )}
                      {article.readingTime && (
                        <span className="text-xs text-slate-400">{article.readingTime} min read</span>
                      )}
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                      {article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-500">{article.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
