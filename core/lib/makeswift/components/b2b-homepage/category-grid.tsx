'use client';

import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

import { Image } from '~/components/image';
import { Link } from '~/components/link';

interface Category {
  title: string;
  image?: string;
  href?: { href?: string; target?: string };
  productCount?: number;
}

interface Props {
  className?: string;
  title?: string;
  subtitle?: string;
  categories?: Category[];
  columns?: '3' | '4' | '6';
  showProductCount?: boolean;
}

function CategoryCard({
  title,
  image,
  href,
  productCount,
  showProductCount,
}: Category & { showProductCount?: boolean }) {
  return (
    <Link
      className="group relative flex aspect-square flex-col overflow-hidden rounded-xl bg-slate-100 transition-all duration-300 hover:shadow-xl"
      href={href?.href ?? '#'}
      target={href?.target}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <Image
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative mt-auto flex items-end justify-between p-4 md:p-6">
        <div>
          <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          {showProductCount && productCount !== undefined && (
            <p className="mt-1 text-sm text-slate-300">{productCount.toLocaleString()} products</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-600">
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600/0 transition-colors duration-300 group-hover:bg-blue-600/10" />
    </Link>
  );
}

export function CategoryGrid({
  className,
  title = 'Shop by Category',
  subtitle = 'Browse our extensive range of industrial supplies',
  categories = [
    { title: 'Cable Ties', href: { href: '/categories/cable-ties' }, productCount: 5000 },
    { title: 'Safety Signs', href: { href: '/categories/safety-signs' }, productCount: 3500 },
    { title: 'Tools & Equipment', href: { href: '/categories/tools' }, productCount: 2800 },
    { title: 'PPE', href: { href: '/categories/ppe' }, productCount: 1500 },
    { title: 'Electrical', href: { href: '/categories/electrical' }, productCount: 4200 },
    { title: 'Labels & Tags', href: { href: '/categories/labels' }, productCount: 2100 },
  ],
  columns = '3',
  showProductCount = true,
}: Props) {
  const gridCols: Record<string, string> = {
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '6': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <section className={clsx('bg-white py-12 md:py-16 lg:py-20', className)}>
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-10 text-center md:mb-12">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-slate-600 md:text-lg">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={clsx('grid gap-4 md:gap-6', gridCols[columns])}>
          {categories.map((category, index) => (
            <CategoryCard
              href={category.href}
              image={category.image}
              key={index}
              productCount={category.productCount}
              showProductCount={showProductCount}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
