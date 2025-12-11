import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allBlogPosts } from 'contentlayer/generated';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | SafetySignHub Blog`,
    description: post.description,
    keywords: post.tags?.join(', '),
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const post = allBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postDate = new Date(post.publishedAt);

  // Breadcrumb data
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  if (post.category) {
    breadcrumbs.push({
      label: post.category,
      href: `/blog?category=${encodeURIComponent(post.category)}`,
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="no-scrollbar container mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap px-4 py-3 text-xs text-slate-500">
          {breadcrumbs.map((crumb, i) => (
            <span className="flex items-center gap-2" key={crumb.href}>
              {i > 0 && (
                <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              )}
              <Link className="transition-colors hover:text-orange-600" href={crumb.href}>
                {crumb.label}
              </Link>
            </span>
          ))}
          <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="truncate font-bold text-slate-900">{post.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <article className="mx-auto max-w-3xl">
          <header className="mb-8 text-center">
            {/* Category & Subcategory */}
            <div className="mb-4 flex items-center justify-center gap-2">
              {post.category && (
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {post.category}
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="font-medium">By {post.author}</span>
              <span>•</span>
              <time dateTime={postDate.toISOString()}>
                {postDate.toLocaleDateString('en-gb', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {post.tags.map((tag) => (
                  <span className="text-xs font-medium text-orange-600" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.image && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                src={post.image}
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none rounded-xl border border-slate-200 bg-white p-8 shadow-sm prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-orange-600 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </article>
      </div>
    </main>
  );
}
