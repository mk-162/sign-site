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
import { CursorPagination, CursorPaginationInfo } from '@/vibes/soul/primitives/cursor-pagination';

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
    paginationInfo?: Streamable<CursorPaginationInfo>;
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
    paginationInfo,
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

                    {paginationInfo && <CursorPagination info={paginationInfo} />}
                </div>
            </div>
        </div>
    );
}

function FilterList({ filters }: { filters: Filter[] }) {
    // Build parsers for all filters to connect to URL state
    const filterParsers = filters.reduce<Record<string, typeof parseAsString>>((acc, filter) => {
        if ('paramName' in filter && filter.paramName) {
            return { ...acc, [filter.paramName]: parseAsString };
        }
        return acc;
    }, {});

    const [params, setParams] = useQueryStates(filterParsers, { shallow: false });
    const [isPending, startTransition] = useTransition();

    const handleFilterChange = (paramName: string, value: string, checked: boolean) => {
        startTransition(() => {
            const currentValues = params[paramName]?.split(',').filter(Boolean) || [];
            let newValues: string[];

            if (checked) {
                newValues = [...currentValues, value];
            } else {
                newValues = currentValues.filter(v => v !== value);
            }

            setParams({ [paramName]: newValues.length > 0 ? newValues.join(',') : null });
        });
    };

    if (filters.length === 0) {
        return <p className="text-sm text-muted-foreground">No filters available</p>;
    }

    return (
        <Accordion type="multiple" className="w-full" defaultValue={filters.map((_, i) => `item-${i}`)}>
            {filters.map((filter, index) => {
                if (filter.type === 'link-group') return null;

                const paramName = 'paramName' in filter ? filter.paramName : '';
                const currentValues = params[paramName]?.split(',').filter(Boolean) || [];

                return (
                    <AccordionItem value={`item-${index}`} key={index} className="border-b border-slate-200">
                        <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline">
                            {filter.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {filter.type === 'toggle-group' && 'options' in filter && filter.options?.map((option, optIndex) => {
                                    const isChecked = currentValues.includes(option.value);
                                    return (
                                        <div key={optIndex} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`${paramName}-${option.value}`}
                                                checked={isChecked}
                                                disabled={option.disabled && !isChecked}
                                                onCheckedChange={(checked) =>
                                                    handleFilterChange(paramName, option.value, checked as boolean)
                                                }
                                            />
                                            <Label
                                                htmlFor={`${paramName}-${option.value}`}
                                                className={`text-sm cursor-pointer ${option.disabled && !isChecked ? 'text-slate-400' : 'text-slate-700'}`}
                                            >
                                                {option.label}
                                            </Label>
                                        </div>
                                    );
                                })}
                                {filter.type === 'range' && (
                                    <p className="text-xs text-muted-foreground">Price range filter</p>
                                )}
                                {filter.type === 'rating' && (
                                    <p className="text-xs text-muted-foreground">Rating filter</p>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
