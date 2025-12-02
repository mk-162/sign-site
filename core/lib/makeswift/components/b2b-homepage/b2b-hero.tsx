'use client';

import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Image } from '~/components/image';

interface TrustBadge {
  icon: string;
  text: string;
}

interface Props {
  className?: string;
  headline: string;
  subheadline?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  trustBadges?: TrustBadge[];
  ctaText?: string;
  ctaLink?: { href?: string; target?: string };
}

export function B2BHero({
  className,
  headline = 'Over 50,000 Products for Industry Professionals',
  subheadline = 'Your trusted partner for cable ties, signage, and industrial supplies',
  showSearch = true,
  searchPlaceholder = 'Search products...',
  backgroundImage,
  overlayOpacity = 70,
  trustBadges = [
    { icon: 'shield', text: 'ISO Certified' },
    { icon: 'truck', text: 'Next Day Delivery' },
    { icon: 'users', text: '10,000+ Customers' },
  ],
  ctaText,
  ctaLink,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'truck':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      case 'users':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'check':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'star':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <section
      className={clsx(
        'relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-900 py-16 @container md:min-h-[600px] md:py-24',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            alt="Hero background"
            className="h-full w-full object-cover"
            fill
            priority
            sizes="100vw"
            src={backgroundImage}
          />
          <div
            className="absolute inset-0 bg-slate-900"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        {/* Headline */}
        <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
          {headline}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
            {subheadline}
          </p>
        )}

        {/* Search Bar */}
        {showSearch && (
          <form
            className="mx-auto mb-8 flex max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl"
            onSubmit={handleSearch}
          >
            <input
              className="flex-1 px-6 py-4 text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              type="text"
              value={searchQuery}
            />
            <button
              className="bg-blue-600 px-8 text-white transition-colors hover:bg-blue-700"
              type="submit"
            >
              <Search className="h-6 w-6" />
            </button>
          </form>
        )}

        {/* CTA Button */}
        {ctaText && ctaLink?.href && (
          <a
            className="mb-8 inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            href={ctaLink.href}
            target={ctaLink.target}
          >
            {ctaText}
          </a>
        )}

        {/* Trust Badges */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((badge, index) => (
              <div
                className="flex items-center gap-2 text-slate-300"
                key={index}
              >
                <span className="text-blue-400">{getIcon(badge.icon)}</span>
                <span className="text-sm font-medium md:text-base">{badge.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
