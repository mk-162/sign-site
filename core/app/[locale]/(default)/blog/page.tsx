import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { allBlogPosts } from 'contentlayer/generated';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Blog | SafetySignHub',
  description: 'News, guides, and updates from the safety experts.',
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Sort posts by date
  const posts = allBlogPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());

  // Get unique categories
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];

  // Featured posts
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-[#1e293b] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-black">Safety Insights</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            News, guides, and updates from the safety experts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <Link
              className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white"
              href="/blog"
            >
              All Posts
            </Link>
            {categories.map((cat) => {
              if (!cat) return null;
              const slug = cat.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  href={`/blog/category/${slug}`}
                  key={cat}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-8 w-2 rounded-full bg-orange-500" />
              <h2 className="text-2xl font-black text-slate-900">Featured</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post) => {
                const postDate = new Date(post.publishedAt);
                return (
                  <Link
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
                    href={post.url}
                    key={post.slug}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      {post.image ? (
                        <Image
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          src={post.image}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
                          <span className="text-6xl text-white/50">📝</span>
                        </div>
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase text-white">
                        Featured
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {post.category && (
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-orange-600">
                          {post.category}
                        </div>
                      )}
                      <h3 className="mb-2 line-clamp-2 text-xl font-black text-slate-900 transition-colors group-hover:text-orange-600">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-500">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                        <span>{post.author}</span>
                        <time dateTime={postDate.toISOString()} suppressHydrationWarning>
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
        )}

        {/* All Posts Grid */}
        <div className="mb-12">
          {regularPosts.length > 0 && (
            <div className="mb-6 flex items-center gap-3">
              <span className="h-8 w-2 rounded-full bg-slate-400" />
              <h2 className="text-2xl font-black text-slate-900">Latest Articles</h2>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => {
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
                      <time dateTime={postDate.toISOString()} suppressHydrationWarning>
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
      </div>
    </main>
  );
}
