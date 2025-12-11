import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allKBArticles } from 'contentlayer/generated';

interface Props {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return allKBArticles.map((article) => ({
    slug: article.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const article = allKBArticles.find((a) => a.slug === slugPath);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Knowledge Base`,
    description: article.description,
  };
}

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


export default async function KBArticlePage({ params }: Props) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const slugPath = slug.join('/');
  const article = allKBArticles.find((a) => a.slug === slugPath);

  if (!article) {
    notFound();
  }

  const category = getCategory(article);
  const articleDate = article.lastUpdated ? new Date(article.lastUpdated) : new Date();

  // Breadcrumb data
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Knowledge Base', href: '/kb' },
    {
      label: category,
      href: `/kb#${category.toLowerCase().replace(/\s+/g, '-')}`,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-3 text-xs text-slate-500">
          {breadcrumbs.map((crumb, i) => (
            <span className="flex items-center gap-2" key={crumb.href}>
              {i > 0 && (
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              )}
              <Link className="transition-colors hover:text-orange-600" href={crumb.href}>
                {crumb.label}
              </Link>
            </span>
          ))}
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="truncate font-bold text-slate-900">{article.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                {category}
              </span>
              {article.difficulty && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
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
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              {article.title}
            </h1>
            <p className="mb-4 text-lg text-slate-600">{article.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              {article.readingTime && <span>📖 {article.readingTime} min read</span>}
              <span>
                Last updated:{' '}
                {articleDate.toLocaleDateString('en-gb', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </header>

          {article.image && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                src={article.image}
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none rounded-xl border border-slate-200 bg-white p-8 shadow-sm prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-orange-600 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.body.html }}
          />
        </article>
      </div>
    </main>
  );
}
