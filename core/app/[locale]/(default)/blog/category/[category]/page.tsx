import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { allBlogPosts } from 'contentlayer/generated';

interface Props {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = [
    ...new Set(allBlogPosts.map((post) => post.category).filter(Boolean)),
  ];
  return categories.map((cat) => ({
    category: cat!.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');

  return {
    title: `${categoryName} Articles | SafetySignHub Blog`,
    description: `Browse our ${categoryName} articles and guides.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params;

  setRequestLocale(locale);

  // Convert slug back to category name for matching
  const categorySlug = category.toLowerCase();

  // Filter posts by category
  const posts = allBlogPosts
    .filter((post) => {
      if (!post.category || post.draft) return false;
      return post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug;
    })
    .sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());

  if (posts.length === 0) {
    notFound();
  }

  // Get the category name from the first post
  const categoryName = posts[0]?.category || category.replace(/-/g, ' ');

  // Get all unique categories for the filter
  const allCategories = [
    ...new Set(allBlogPosts.map((post) => post.category).filter(Boolean)),
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-[#1e293b] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-black">{categoryName}</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Articles and guides about {categoryName.toLowerCase()}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Link
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            href="/blog"
          >
            All Posts
          </Link>
          {allCategories.map((cat) => {
            if (!cat) return null;
            const slug = cat.toLowerCase().replace(/\s+/g, '-');
            const isActive = slug === categorySlug;
            return (
              <Link
                className={
                  isActive
                    ? 'rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white'
                    : 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white'
                }
                href={`/blog/category/${slug}`}
                key={cat}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const postDate = new Date(post.publishedAt);
            return (
              <Link
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                href={post.url}
                key={post.slug}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {post.image ? (
                    <Image
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={post.image}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.category && (
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-orange-600">
                      {post.category}
                    </div>
                  )}
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-500">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                    <span>{post.author}</span>
                    <time dateTime={postDate.toISOString()}>
                      {postDate.toLocaleDateString('en-gb', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
