'use client';

import { Suspense, useState, useTransition } from 'react';
import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { ProductList, ProductListSkeleton } from './product-list';
import { Product } from './product-card';
import { SlidersHorizontal } from 'lucide-react';
import { useQueryStates, parseAsString } from 'nuqs';
import { Badge } from '~/components/ui/badge';
import { getFilterParsers } from '@/vibes/soul/sections/products-list-section/filter-parsers';
import { Filter } from '@/vibes/soul/sections/products-list-section/filters-panel';

import { Breadcrumbs as BreadcrumbsComponent } from '@/vibes/soul/sections/breadcrumbs';

interface Breadcrumb {
    label: string;
    href: string;
}

interface ProductsListSectionProps {
    title: string;
    products: Streamable<Product[]>;
    filters: Streamable<Filter[]>;
    sortOptions?: any;
    totalCount: Streamable<string>;
    showCompare?: boolean;
    breadcrumbs?: Breadcrumb[];
    compareLabel?: string;
    compareProducts?: any;
    emptyStateSubtitle?: string;
    emptyStateTitle?: string;
    filterLabel?: string;
    filtersPanelTitle?: string;
    maxCompareLimitMessage?: string;
    maxItems?: number;
    paginationInfo?: any;
    rangeFilterApplyLabel?: string;
    removeLabel?: string;
    resetFiltersLabel?: string;
    sortDefaultValue?: string;
    sortLabel?: string;
    sortParamName?: string;
}

export function ProductsListSection({
    title,
    products,
    filters,
    totalCount,
    showCompare = false,
    breadcrumbs,
}: ProductsListSectionProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                    <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
                </div>
            )}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-64 shrink-0 space-y-6">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Stream value={filters}>
                        {(filtersData) => <FilterList filters={filtersData} />}
                    </Stream>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header / Mobile Filters */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                            <Stream value={totalCount}>
                                {count => <Badge variant="secondary">{count}</Badge>}
                            </Stream>
                        </div>

                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-4">
                                        <Stream value={filters}>
                                            {(filtersData) => <FilterList filters={filtersData} />}
                                        </Stream>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <Suspense fallback={<ProductListSkeleton />}>
                        <ProductList products={products} showCompare={showCompare} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

function FilterList({ filters }: { filters: Filter[] }) {
    // Simplified filter rendering reusing the logic from vibes filters-panel
    // but using our Accordion/Checkbox components

    // NOTE: This logic needs to be robustly connected to URL state (nuqs)
    // For now, I'm just scaffolding the UI structure. 
    // The actual state handling code from vibes/filters-panel is complex and needs to be carefully ported.

    // For this step, I'm just rendering the UI structure to prove the visual change.

    return (
        <Accordion type="multiple" className="w-full">
            {filters.map((filter, index) => {
                if (filter.type === 'link-group') return null; // handle separately if needed

                return (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{filter.label}</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {/* Placeholder for specific filter inputs */}
                                <p className="text-xs text-muted-foreground">Filter options here...</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}
