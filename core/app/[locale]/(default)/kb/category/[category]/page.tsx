import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allKBArticles } from 'contentlayer/generated';

interface Props {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

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

export async function generateStaticParams() {
  const categories = new Set<string>();
  allKBArticles.forEach((article) => {
    categories.add(getCategory(article));
  });
  return Array.from(categories).map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} | Knowledge Base`,
    description: `Browse our ${categoryName.toLowerCase()} articles and guides.`,
  };
}

export default async function KBCategoryPage({ params }: Props) {
  const { locale, category } = await params;

  setRequestLocale(locale);

  const categorySlug = category.toLowerCase();

  // Filter articles by category
  const articles = allKBArticles
    .filter((article) => {
      if (article.draft) return false;
      const cat = getCategory(article);
      return cat.toLowerCase().replace(/\s+/g, '-') === categorySlug;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (articles.length === 0) {
    notFound();
  }

  // Get category name from first article
  const categoryName = getCategory(articles[0]!);

  // Get all categories for navigation
  const allCategories = new Set<string>();
  allKBArticles.forEach((article) => {
    if (!article.draft) {
      allCategories.add(getCategory(article));
    }
  });
  const categoryNames = Array.from(allCategories).sort();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-[#1e293b] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            {categoryImages[categoryName] && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg shadow-sm">
                <Image
                  alt={categoryName}
                  className="h-full w-full object-cover"
                  fill
                  sizes="64px"
                  src={categoryImages[categoryName]}
                />
              </div>
            )}
            <h1 className="text-4xl font-black">{categoryName}</h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Browse our {categoryName.toLowerCase()} articles and guides.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <Link
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            href="/kb"
          >
            All Categories
          </Link>
          {categoryNames.map((cat) => {
            const slug = cat.toLowerCase().replace(/\s+/g, '-');
            const isActive = slug === categorySlug;
            return (
              <Link
                className={
                  isActive
                    ? 'rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white'
                    : 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white'
                }
                href={`/kb/category/${slug}`}
                key={cat}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
      </div>
    </main>
  );
}
