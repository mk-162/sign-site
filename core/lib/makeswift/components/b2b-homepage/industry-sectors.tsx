'use client';

import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

import { Image } from '~/components/image';
import { Link } from '~/components/link';

interface Industry {
  title: string;
  description?: string;
  image?: string;
  href?: { href?: string; target?: string };
  icon?: string;
}

interface Props {
  className?: string;
  title?: string;
  subtitle?: string;
  industries?: Industry[];
  columns?: '2' | '3' | '4';
}

function IndustryIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case 'building':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'factory':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'heart':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'academic-cap':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    case 'truck':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case 'home':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'shopping-cart':
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    default:
      return (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
  }
}

function IndustryCard({ title, description, image, href, icon }: Industry) {
  return (
    <Link
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      href={href?.href ?? '#'}
      target={href?.target}
    >
      {/* Image or Icon Header */}
      <div className="relative h-40 overflow-hidden bg-slate-100">
        {image ? (
          <>
            <Image
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              src={image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <IndustryIcon icon={icon} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
          {title}
        </h3>
        {description && <p className="mb-4 flex-1 text-sm text-slate-600">{description}</p>}
        <div className="flex items-center text-sm font-medium text-blue-600">
          <span>View products</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function IndustrySectors({
  className,
  title = 'Industries We Serve',
  subtitle = 'Tailored solutions for every sector',
  industries = [
    {
      title: 'Construction',
      description: 'Site safety, signage, and cable management for building projects',
      href: { href: '/industries/construction' },
      icon: 'building',
    },
    {
      title: 'Manufacturing',
      description: 'Industrial supplies, machine guards, and process labelling',
      href: { href: '/industries/manufacturing' },
      icon: 'factory',
    },
    {
      title: 'Electrical',
      description: 'Cable ties, conduit, and electrical identification products',
      href: { href: '/industries/electrical' },
      icon: 'bolt',
    },
    {
      title: 'Healthcare',
      description: 'Medical labels, safety signage, and hygiene products',
      href: { href: '/industries/healthcare' },
      icon: 'heart',
    },
  ],
  columns = '4',
}: Props) {
  const gridCols: Record<string, string> = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={clsx('bg-slate-50 py-12 md:py-16 lg:py-20', className)}>
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
        <div className={clsx('grid gap-6', gridCols[columns])}>
          {industries.map((industry, index) => (
            <IndustryCard
              description={industry.description}
              href={industry.href}
              icon={industry.icon}
              image={industry.image}
              key={index}
              title={industry.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
