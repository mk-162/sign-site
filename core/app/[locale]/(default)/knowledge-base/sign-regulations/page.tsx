import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Calendar, Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { ProductCardFragment } from '~/components/product-card/fragment';
import { getPreferredCurrencyCode } from '~/lib/currency';

export const metadata: Metadata = {
  title: 'UK Safety Sign Regulations Guide | Knowledge Base',
  description: 'Complete guide to Health and Safety (Safety Signs and Signals) Regulations 1996 and BS EN ISO 7010 standards for workplace safety signage.',
};

// GraphQL query for related products - search for safety sign products
const RelatedProductsQuery = graphql(
  `
    query RelatedProductsQuery($currencyCode: currencyCode, $searchTerm: String!) {
      site {
        search {
          searchProducts(filters: { searchTerm: $searchTerm }) {
            products(first: 4) {
              edges {
                node {
                  ...ProductCardFragment
                }
              }
            }
          }
        }
        categoryTree {
          entityId
          name
          path
          children {
            entityId
            name
            path
          }
        }
      }
    }
  `,
  [ProductCardFragment],
);

async function getRelatedProducts() {
  try {
    const customerAccessToken = await getSessionCustomerAccessToken();
    const currencyCode = await getPreferredCurrencyCode();

    const response = await client.fetch({
      document: RelatedProductsQuery,
      customerAccessToken,
      variables: { currencyCode, searchTerm: 'safety sign' },
      fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
    });

    const products = removeEdgesAndNodes(response.data.site.search.searchProducts.products);
    const categories = response.data.site.categoryTree;

    return { products, categories };
  } catch (error) {
    console.error('Error fetching related products:', error);
    return { products: [], categories: [] };
  }
}

function formatPrice(price: { value: number; currencyCode: string } | null | undefined): string {
  if (!price) return 'Price on request';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.value);
}

const tableOfContents = [
  { id: 'overview', title: 'Overview' },
  { id: 'regulations', title: 'Key Regulations' },
  { id: 'sign-categories', title: 'Sign Categories' },
  { id: 'colour-coding', title: 'Colour Coding System' },
  { id: 'employer-duties', title: 'Employer Duties' },
  { id: 'iso-7010', title: 'BS EN ISO 7010' },
  { id: 'checklist', title: 'Compliance Checklist' },
];

const relatedArticles = [
  {
    slug: 'sign-colours-meanings',
    title: 'Safety Sign Colours & Their Meanings',
    category: 'Basics',
  },
  {
    slug: 'fire-safety-signs',
    title: 'Fire Safety Signage Requirements',
    category: 'Fire Safety',
  },
  {
    slug: 'sign-placement',
    title: 'Where to Place Safety Signs',
    category: 'Installation',
  },
];

export default async function SignRegulationsPage() {
  const { products, categories } = await getRelatedProducts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/knowledge-base" className="text-slate-500 hover:text-slate-700">
              Knowledge Base
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500">Compliance</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 font-medium">UK Safety Sign Regulations</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link
            href="/knowledge-base"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Knowledge Base
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Compliance
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4 md:text-4xl">
            UK Safety Sign Regulations Guide
          </h1>

          <p className="text-xl text-slate-600 mb-6 max-w-3xl">
            Complete guide to Health and Safety (Safety Signs and Signals) Regulations 1996
            and BS EN ISO 7010 standards for workplace safety signage.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated: December 2024</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="rounded-xl bg-white p-6 shadow-sm mb-6">
                <h2 className="font-semibold text-slate-900 mb-4">On this page</h2>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-slate-600 hover:text-blue-600 transition-colors py-1"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Reference Card */}
              <div className="rounded-xl bg-blue-600 p-6 text-white">
                <Shield className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Quick Reference</h3>
                <p className="text-sm text-blue-100 mb-3">
                  Key regulation: Health and Safety (Safety Signs and Signals) Regulations 1996
                </p>
                <p className="text-sm text-blue-100">
                  Standard: BS EN ISO 7010:2020
                </p>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <main className="lg:col-span-3">
            <article className="rounded-xl bg-white p-8 shadow-sm prose prose-slate max-w-none">

              {/* Overview Section */}
              <section id="overview">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="h-6 w-6 text-blue-600" />
                  Overview
                </h2>
                <p className="text-slate-600 mb-4">
                  Safety signs are a crucial part of workplace health and safety. In the UK, the use of safety
                  signs is governed by the <strong>Health and Safety (Safety Signs and Signals) Regulations 1996</strong>,
                  which implement European Directive 92/58/EEC.
                </p>
                <p className="text-slate-600 mb-4">
                  These regulations require employers to provide and maintain safety signs where there is a
                  significant risk to health and safety that cannot be avoided or controlled by other means.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Important Note</p>
                      <p className="text-sm text-amber-700">
                        Safety signs should not be used as a substitute for proper risk control measures.
                        They are meant to supplement other safety measures, not replace them.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Regulations Section */}
              <section id="regulations" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Regulations</h2>

                <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                  Health and Safety (Safety Signs and Signals) Regulations 1996
                </h3>
                <p className="text-slate-600 mb-4">
                  This is the primary legislation governing safety signs in UK workplaces. Key requirements include:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                  <li>Employers must use safety signs where risks cannot be adequately controlled by other means</li>
                  <li>Signs must conform to specified colours, shapes, and symbols</li>
                  <li>Signs must be properly maintained and kept clean</li>
                  <li>Employees must receive adequate instruction and training on the meaning of signs</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                  Regulatory Reform (Fire Safety) Order 2005
                </h3>
                <p className="text-slate-600 mb-4">
                  This order requires appropriate fire safety signs to be displayed in workplaces, including:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Fire exit signs</li>
                  <li>Fire action notices</li>
                  <li>Fire equipment identification signs</li>
                  <li>Emergency escape route signs</li>
                </ul>
              </section>

              {/* Sign Categories Section */}
              <section id="sign-categories" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sign Categories</h2>
                <p className="text-slate-600 mb-6">
                  Safety signs are divided into four main categories, each with specific shapes and colours:
                </p>

                <div className="grid gap-4 sm:grid-cols-2 not-prose">
                  {/* Prohibition Signs */}
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-white border-2 border-red-600 flex items-center justify-center">
                        <div className="h-6 w-0.5 bg-red-600 rotate-45"></div>
                      </div>
                      <h4 className="font-semibold text-red-900">Prohibition Signs</h4>
                    </div>
                    <p className="text-sm text-red-800">
                      Round shape with red border and diagonal line. Indicates actions that must NOT be done.
                    </p>
                    <p className="text-xs text-red-600 mt-2">Example: No Smoking, No Entry</p>
                  </div>

                  {/* Warning Signs */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-0 w-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-amber-500"></div>
                      <h4 className="font-semibold text-amber-900">Warning Signs</h4>
                    </div>
                    <p className="text-sm text-amber-800">
                      Triangular shape with yellow background and black border. Alerts to potential hazards.
                    </p>
                    <p className="text-xs text-amber-600 mt-2">Example: Caution Wet Floor, High Voltage</p>
                  </div>

                  {/* Mandatory Signs */}
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-900">Mandatory Signs</h4>
                    </div>
                    <p className="text-sm text-blue-800">
                      Round shape with blue background. Indicates actions that MUST be taken.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">Example: Wear Safety Helmet, Eye Protection Required</p>
                  </div>

                  {/* Safe Condition Signs */}
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-14 rounded bg-green-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">EXIT</span>
                      </div>
                      <h4 className="font-semibold text-green-900">Safe Condition Signs</h4>
                    </div>
                    <p className="text-sm text-green-800">
                      Rectangular/square with green background. Shows escape routes and safety equipment.
                    </p>
                    <p className="text-xs text-green-600 mt-2">Example: Fire Exit, First Aid</p>
                  </div>
                </div>
              </section>

              {/* Colour Coding Section */}
              <section id="colour-coding" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Colour Coding System</h2>

                <div className="overflow-x-auto not-prose">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Colour</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Meaning</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-red-600"></span>
                            Red
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">Prohibition / Danger</td>
                        <td className="py-3 px-4 text-slate-600">Stop signs, prohibition signs, fire equipment</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-amber-400"></span>
                            Yellow/Amber
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">Warning / Caution</td>
                        <td className="py-3 px-4 text-slate-600">Hazard warnings, dangerous conditions</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-blue-600"></span>
                            Blue
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">Mandatory</td>
                        <td className="py-3 px-4 text-slate-600">Required actions, PPE requirements</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-green-600"></span>
                            Green
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">Safe Condition</td>
                        <td className="py-3 px-4 text-slate-600">Emergency exits, first aid, safety equipment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Employer Duties Section */}
              <section id="employer-duties" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Employer Duties</h2>
                <p className="text-slate-600 mb-4">
                  Under the regulations, employers have several key responsibilities:
                </p>

                <div className="space-y-3 not-prose">
                  {[
                    'Conduct risk assessments to identify where safety signs are needed',
                    'Provide appropriate safety signs that comply with regulations',
                    'Ensure signs are clearly visible and appropriately positioned',
                    'Maintain signs in good condition (clean, legible, not damaged)',
                    'Provide training to employees on the meaning of safety signs',
                    'Review and update signage when risks or layouts change',
                  ].map((duty, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600">{duty}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ISO 7010 Section */}
              <section id="iso-7010" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">BS EN ISO 7010</h2>
                <p className="text-slate-600 mb-4">
                  <strong>BS EN ISO 7010:2020</strong> is the international standard for safety sign design.
                  It provides a consistent set of graphical symbols that are recognised worldwide.
                </p>
                <p className="text-slate-600 mb-4">
                  Key benefits of using ISO 7010 compliant signs:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>Universal recognition across different languages and cultures</li>
                  <li>Consistent design improves comprehension</li>
                  <li>Regular updates to include new hazard symbols</li>
                  <li>Supports multinational workplace compliance</li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Recommendation</p>
                      <p className="text-sm text-blue-700">
                        When replacing old signs, we recommend upgrading to BS EN ISO 7010 compliant versions
                        for improved clarity and international compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Compliance Checklist Section */}
              <section id="checklist" className="mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Compliance Checklist</h2>
                <p className="text-slate-600 mb-6">
                  Use this checklist to ensure your workplace signage meets regulatory requirements:
                </p>

                <div className="bg-slate-50 rounded-lg p-6 not-prose">
                  <div className="space-y-4">
                    {[
                      'Risk assessment completed identifying signage needs',
                      'All required safety signs are in place',
                      'Signs comply with correct colours, shapes, and symbols',
                      'Signs are clearly visible from appropriate distances',
                      'Signs are positioned at correct heights',
                      'All signs are clean and in good condition',
                      'Damaged or faded signs have been replaced',
                      'Employees have received signage training',
                      'Fire exit routes are clearly marked',
                      'Emergency equipment is clearly identified',
                      'Signage is reviewed when layout changes occur',
                    ].map((item, index) => (
                      <label key={index} className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="mt-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white not-prose">
                <h3 className="text-xl font-bold mb-3">Need Compliant Safety Signs?</h3>
                <p className="text-slate-300 mb-4">
                  Browse our complete range of BS EN ISO 7010 compliant safety signs,
                  available in multiple materials and sizes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/categories/safety-signs"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Shop Safety Signs
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg bg-white/10 px-5 py-2.5 font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    Get Expert Advice
                  </Link>
                </div>
              </section>
            </article>

            {/* Related Products from BigCommerce */}
            {products.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Related Products</h2>
                  <Link href="/search?term=safety+sign" className="text-sm text-blue-600 hover:underline">
                    View all safety signs →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <Link
                      key={product.entityId}
                      href={product.path}
                      className="group rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100 mb-3">
                        {product.defaultImage ? (
                          <img
                            alt={product.defaultImage.altText || product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            src={product.defaultImage.url.replace('{:size}', '300x300')}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <Shield className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-blue-600 font-semibold">
                        {formatPrice(product.prices?.price)}
                      </p>
                      {product.brand && (
                        <p className="text-xs text-slate-500 mt-1">{product.brand.name}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Shop by Category - from BigCommerce */}
            {categories.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Browse Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.entityId}
                      href={category.path}
                      className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/knowledge-base/${article.slug}`}
                    className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <h3 className="font-medium text-slate-900 mt-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
