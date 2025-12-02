// B2B Demo Live - Uses real BigCommerce data
// Remove this folder to rollback

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { ProductCardFragment } from '~/components/product-card/fragment';
import { getPreferredCurrencyCode } from '~/lib/currency';

export const metadata = {
  title: 'B2B Homepage Demo (Live Data) | GTSE',
  description: 'Industrial supplies for professionals - Real BigCommerce data',
};

// GraphQL query for categories and products
const B2BDemoQuery = graphql(
  `
    query B2BDemoQuery($currencyCode: currencyCode) {
      site {
        categoryTree {
          entityId
          name
          path
          productCount
          children {
            entityId
            name
            path
            productCount
          }
        }
        newestProducts(first: 6) {
          edges {
            node {
              ...ProductCardFragment
            }
          }
        }
        featuredProducts(first: 6) {
          edges {
            node {
              ...ProductCardFragment
            }
          }
        }
        brands(first: 10) {
          edges {
            node {
              entityId
              name
              path
            }
          }
        }
        settings {
          storeName
          contact {
            phone
            email
          }
        }
      }
    }
  `,
  [ProductCardFragment],
);

async function getB2BDemoData() {
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();

  const response = await client.fetch({
    document: B2BDemoQuery,
    customerAccessToken,
    variables: { currencyCode },
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  return response.data.site;
}

function formatPrice(price: { value: number; currencyCode: string } | null | undefined): string {
  if (!price) return 'Price on request';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.value);
}

export default async function B2BDemoLivePage() {
  const siteData = await getB2BDemoData();

  const categories = siteData.categoryTree.slice(0, 8);
  const newestProducts = removeEdgesAndNodes(siteData.newestProducts);
  const featuredProducts = removeEdgesAndNodes(siteData.featuredProducts);
  const brands = removeEdgesAndNodes(siteData.brands);
  const storeName = siteData.settings?.storeName || 'GTSE';
  const storePhone = siteData.settings?.contact?.phone || '0800 123 4567';
  const storeEmail = siteData.settings?.contact?.email || 'sales@gtse.com';

  // Use newest or featured products, whichever has more
  const products = newestProducts.length > 0 ? newestProducts : featuredProducts;

  // Calculate total product count from categories
  const totalProducts = categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0);

  return (
    <main className="bg-slate-100">
      {/* Compact Hero */}
      <section className="relative bg-slate-900 py-8">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left - Main Message */}
            <div className="lg:col-span-7">
              <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                {totalProducts.toLocaleString()}+ Industrial Products
              </h1>
              <p className="mb-4 text-slate-300">
                Browse our complete range from {storeName}. Fast delivery on thousands of items.
              </p>
              {/* Search Bar */}
              <form action="/search" className="flex max-w-xl overflow-hidden rounded-lg bg-white shadow-lg">
                <input
                  className="flex-1 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none"
                  name="term"
                  placeholder="Search by product, SKU or keyword..."
                  type="text"
                />
                <button className="bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700" type="submit">
                  Search
                </button>
              </form>
            </div>
            {/* Right - Quick Stats */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">{totalProducts.toLocaleString()}+</div>
                <div className="text-xs text-slate-300">Products</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">{categories.length}</div>
                <div className="text-xs text-slate-300">Categories</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">{brands.length}+</div>
                <div className="text-xs text-slate-300">Brands</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-green-400">Next Day</div>
                <div className="text-xs text-slate-300">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-b border-slate-200 bg-white py-2">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 text-sm md:justify-between">
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Free delivery over £50
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Trade accounts available
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Expert technical support
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Quality assured
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left Sidebar - Categories */}
          <div className="space-y-4 lg:col-span-3">
            {/* Categories Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="rounded-t-lg border-b border-slate-200 bg-slate-800 px-4 py-3">
                <h2 className="font-bold text-white">Shop by Category</h2>
              </div>
              <ul className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <li key={cat.entityId}>
                    <a
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50"
                      href={cat.path}
                    >
                      <span className="text-slate-700">{cat.name}</span>
                      {cat.productCount > 0 && (
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                          {cat.productCount.toLocaleString()}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-200 p-3">
                <a className="text-sm font-medium text-blue-600 hover:underline" href="/categories">
                  View all categories →
                </a>
              </div>
            </div>

            {/* Contact Widget */}
            <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white shadow">
              <h3 className="mb-2 font-bold">Need Help?</h3>
              <p className="mb-3 text-sm text-slate-300">Our experts are ready to assist</p>
              <div className="space-y-2 text-sm">
                <a className="flex items-center gap-2 hover:text-blue-300" href={`tel:${storePhone}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {storePhone}
                </a>
                <a className="flex items-center gap-2 hover:text-blue-300" href={`mailto:${storeEmail}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {storeEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6 lg:col-span-6">
            {/* Featured Categories Grid */}
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(0, 3).map((cat) => (
                <a
                  key={cat.entityId}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200"
                  href={cat.path}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="font-bold text-white drop-shadow">{cat.name}</span>
                    {cat.productCount > 0 && (
                      <span className="mt-1 block text-xs text-slate-200">
                        {cat.productCount.toLocaleString()} products
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Products from BigCommerce */}
            <div className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Latest Products</h2>
                <a className="text-sm text-blue-600 hover:underline" href="/new">View all</a>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3">
                {products.map((product) => (
                  <a
                    key={product.entityId}
                    className="group rounded-lg border border-slate-200 p-2 transition-shadow hover:shadow-md"
                    href={product.path}
                  >
                    <div className="aspect-square overflow-hidden rounded bg-slate-100">
                      {product.defaultImage ? (
                        <img
                          alt={product.defaultImage.altText || product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          src={product.defaultImage.url.replace('{:size}', '300x300')}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="line-clamp-2 text-xs text-slate-600">{product.name}</p>
                      <p className="mt-1 text-sm font-bold text-blue-600">
                        {formatPrice(product.prices?.price)}
                      </p>
                      {product.brand && (
                        <p className="text-xs text-slate-400">{product.brand.name}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Promo Banners Row */}
            <div className="grid grid-cols-2 gap-3">
              <a className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 p-4 text-white" href="/sale">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider">Limited Time</span>
                  <h3 className="text-lg font-bold">Sale Items</h3>
                  <p className="text-sm opacity-90">Special offers</p>
                </div>
                <div className="absolute -right-4 -top-4 text-6xl opacity-20">%</div>
              </a>
              <a className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700 p-4 text-white" href="/contact">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider">Trade</span>
                  <h3 className="text-lg font-bold">Bulk Discounts</h3>
                  <p className="text-sm opacity-90">Contact us</p>
                </div>
                <div className="absolute -right-2 -top-2 text-5xl opacity-20">📦</div>
              </a>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 lg:col-span-3">
            {/* Brands Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="rounded-t-lg border-b border-slate-200 bg-blue-600 px-4 py-3">
                <h2 className="font-bold text-white">Shop by Brand</h2>
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                {brands.map((brand) => (
                  <a
                    key={brand.entityId}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 hover:bg-blue-100 hover:text-blue-700"
                    href={brand.path}
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
              {brands.length > 0 && (
                <div className="border-t border-slate-200 p-3">
                  <a className="text-sm font-medium text-blue-600 hover:underline" href="/brands">
                    View all brands →
                  </a>
                </div>
              )}
            </div>

            {/* More Categories Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">More Categories</h2>
              </div>
              <div className="p-3">
                {categories.slice(3, 8).map((cat) => (
                  <a
                    key={cat.entityId}
                    className="mb-2 flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-sm hover:border-blue-300 hover:bg-blue-50"
                    href={cat.path}
                  >
                    <span className="text-slate-700">{cat.name}</span>
                    {cat.productCount > 0 && (
                      <span className="text-xs text-slate-500">{cat.productCount}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="rounded-lg bg-blue-600 p-4 text-white shadow">
              <h3 className="mb-2 font-bold">Trade Newsletter</h3>
              <p className="mb-3 text-sm text-blue-100">Get exclusive trade pricing & offers</p>
              <input
                className="mb-2 w-full rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                placeholder="Your email"
                type="email"
              />
              <button className="w-full rounded bg-white py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
                Subscribe
              </button>
            </div>

            {/* Account Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Your Account</h2>
              </div>
              <div className="p-4 text-center">
                <p className="mb-3 text-sm text-slate-500">Sign in for trade pricing</p>
                <a
                  className="inline-block rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  href="/login"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Full Width */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Features Row */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: '🚚', title: 'Next Day Delivery', desc: 'Order before 3pm' },
              { icon: '💳', title: 'Trade Accounts', desc: '30 day credit terms' },
              { icon: '📞', title: 'Expert Support', desc: 'Technical advice' },
              { icon: '↩️', title: 'Easy Returns', desc: '30 day returns' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Data Source Indicator */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-green-800">
              <strong>Live Data:</strong> This page displays real data from your BigCommerce store.
              {' '}Categories: {categories.length} | Products: {products.length} | Brands: {brands.length}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
