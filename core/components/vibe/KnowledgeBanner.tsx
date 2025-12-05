'use client';

import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface KnowledgeBannerProps {
    title?: string;
    description?: string;
    articleUrl?: string;
    ctaText?: string;
    variant?: 'default' | 'highlight';
}

export function KnowledgeBanner({
    title = 'Learn More',
    description = 'Read our latest guide on safety compliance.',
    articleUrl = 'http://localhost:4321/blog',
    ctaText = 'Read Article',
    variant = 'default',
}: KnowledgeBannerProps) {
    return (
        <div
            className={clsx(
                'rounded-lg border p-6 transition-all',
                variant === 'default'
                    ? 'border-gray-200 bg-white'
                    : 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5]'
            )}
        >
            <div className="flex items-start gap-4">
                <div
                    className={clsx(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                        variant === 'default'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-[hsl(var(--primary))] text-white'
                    )}
                >
                    <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                    <p className="mb-4 text-sm text-gray-600">{description}</p>
                    <Link
                        href={articleUrl}
                        className={clsx(
                            'inline-flex items-center gap-2 text-sm font-bold hover:underline',
                            variant === 'default' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--primary))]'
                        )}
                    >
                        {ctaText} <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
