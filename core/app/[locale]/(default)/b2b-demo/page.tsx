import { B2BHero } from '~/lib/makeswift/components/b2b-homepage/b2b-hero';
import { StatsCounter } from '~/lib/makeswift/components/b2b-homepage/stats-counter';
import { TrustBadges } from '~/lib/makeswift/components/b2b-homepage/trust-badges';

export const metadata = {
  title: 'B2B Homepage Demo | GTSE',
  description: 'Industrial supplies for professionals - Cable ties, signage, and more',
};

export default function B2BDemoPage() {
  const categories = [
    { name: 'Cable Ties', count: 5200, href: '/categories/cable-ties' },
    { name: 'Safety Signs', count: 3800, href: '/categories/safety-signs' },
    { name: 'Labels & Tags', count: 2400, href: '/categories/labels' },
    { name: 'Tools', count: 1800, href: '/categories/tools' },
    { name: 'PPE', count: 2100, href: '/categories/ppe' },
    { name: 'Electrical', count: 4500, href: '/categories/electrical' },
    { name: 'Markers', count: 890, href: '/categories/markers' },
    { name: 'Tape', count: 1200, href: '/categories/tape' },
  ];

  const popularProducts = [
    { name: 'Heavy Duty Cable Ties 300mm (100pk)', price: '12.99', sku: 'CT-HD-300', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80' },
    { name: 'Warning Sign - High Voltage', price: '8.50', sku: 'WS-HV-001', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&q=80' },
    { name: 'Cable Tie Gun Professional', price: '45.00', sku: 'CTG-PRO-1', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=200&q=80' },
    { name: 'Thermal Labels 500 Roll', price: '15.99', sku: 'TL-500-W', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&q=80' },
    { name: 'Safety Helmet - Yellow', price: '18.99', sku: 'SH-YEL-01', image: 'https://images.unsplash.com/photo-1618090583459-6e53c34a784f?w=200&q=80' },
    { name: 'Insulation Tape Black 10pk', price: '9.99', sku: 'IT-BLK-10', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=200&q=80' },
  ];

  const brands = [
    'HellermannTyton', 'Brady', '3M', 'Panduit', 'Thomas & Betts', 'TE Connectivity'
  ];

  const quickLinks = [
    { name: 'New Products', href: '/new', badge: 'NEW' },
    { name: 'Clearance', href: '/clearance', badge: 'SALE' },
    { name: 'Bulk Orders', href: '/bulk' },
    { name: 'Custom Printing', href: '/custom' },
    { name: 'Trade Account', href: '/trade' },
    { name: 'Catalogue', href: '/catalogue' },
  ];

  return (
    <main className="bg-slate-100">
      {/* Compact Hero */}
      <section className="relative bg-slate-900 py-8">
        <div className="absolute inset-0 opacity-30">
          <img
            alt="Industrial background"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left - Main Message */}
            <div className="lg:col-span-7">
              <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                50,000+ Industrial Products
              </h1>
              <p className="mb-4 text-slate-300">
                Cable ties, signage, labels & more. Next day delivery on 10,000+ items.
              </p>
              {/* Search Bar */}
              <div className="flex max-w-xl overflow-hidden rounded-lg bg-white shadow-lg">
                <input
                  className="flex-1 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none"
                  placeholder="Search by product, SKU or keyword..."
                  type="text"
                />
                <button className="bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
            {/* Right - Quick Stats */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">50,000+</div>
                <div className="text-xs text-slate-300">Products</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">25+</div>
                <div className="text-xs text-slate-300">Years</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-white">10,000+</div>
                <div className="text-xs text-slate-300">Customers</div>
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
            ISO 9001 Certified
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Trade accounts available
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            Expert technical support
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left Sidebar - Categories & Quick Links */}
          <div className="space-y-4 lg:col-span-3">
            {/* Categories Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 bg-slate-800 px-4 py-3 rounded-t-lg">
                <h2 className="font-bold text-white">Shop by Category</h2>
              </div>
              <ul className="divide-y divide-slate-100">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <a
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50"
                      href={cat.href}
                    >
                      <span className="text-slate-700">{cat.name}</span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        {cat.count.toLocaleString()}
                      </span>
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

            {/* Quick Links Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 bg-blue-600 px-4 py-3 rounded-t-lg">
                <h2 className="font-bold text-white">Quick Links</h2>
              </div>
              <ul className="p-2">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      className="flex items-center justify-between rounded px-3 py-2 text-sm text-slate-700 hover:bg-blue-50"
                      href={link.href}
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                          link.badge === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Widget */}
            <div className="rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white shadow">
              <h3 className="mb-2 font-bold">Need Help?</h3>
              <p className="mb-3 text-sm text-slate-300">Our experts are ready to assist</p>
              <div className="space-y-2 text-sm">
                <a className="flex items-center gap-2 hover:text-blue-300" href="tel:01onal234567">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0800 123 4567
                </a>
                <a className="flex items-center gap-2 hover:text-blue-300" href="mailto:sales@gtse.com">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  sales@gtse.com
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6 lg:col-span-6">
            {/* Featured Categories Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Cable Ties', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', color: 'from-blue-600' },
                { name: 'Safety Signs', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&q=80', color: 'from-yellow-600' },
                { name: 'Labels', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&q=80', color: 'from-green-600' },
              ].map((cat, i) => (
                <a
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                  href={`/categories/${cat.name.toLowerCase().replace(' ', '-')}`}
                >
                  <img
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={cat.img}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="font-bold text-white drop-shadow">{cat.name}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Popular Products */}
            <div className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Popular Products</h2>
                <a className="text-sm text-blue-600 hover:underline" href="/products">View all</a>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3">
                {popularProducts.map((product, i) => (
                  <a
                    key={i}
                    className="group rounded-lg border border-slate-200 p-2 transition-shadow hover:shadow-md"
                    href={`/products/${product.sku}`}
                  >
                    <div className="aspect-square overflow-hidden rounded bg-slate-100">
                      <img
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        src={product.image}
                      />
                    </div>
                    <div className="mt-2">
                      <p className="line-clamp-2 text-xs text-slate-600">{product.name}</p>
                      <p className="mt-1 text-sm font-bold text-blue-600">£{product.price}</p>
                      <p className="text-xs text-slate-400">{product.sku}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Promo Banners Row */}
            <div className="grid grid-cols-2 gap-3">
              <a className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-700 p-4 text-white" href="/clearance">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider">Limited Time</span>
                  <h3 className="text-lg font-bold">Clearance Sale</h3>
                  <p className="text-sm opacity-90">Up to 50% off</p>
                </div>
                <div className="absolute -right-4 -top-4 text-6xl opacity-20">%</div>
              </a>
              <a className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700 p-4 text-white" href="/bulk">
                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider">Trade</span>
                  <h3 className="text-lg font-bold">Bulk Discounts</h3>
                  <p className="text-sm opacity-90">Save more, buy more</p>
                </div>
                <div className="absolute -right-2 -top-2 text-5xl opacity-20">📦</div>
              </a>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 lg:col-span-3">
            {/* Order by SKU Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 bg-green-600 px-4 py-3 rounded-t-lg">
                <h2 className="font-bold text-white">Quick Order</h2>
              </div>
              <div className="p-4">
                <p className="mb-3 text-sm text-slate-600">Know your SKU? Order directly:</p>
                <div className="space-y-2">
                  <input
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="SKU (e.g. CT-HD-300)"
                    type="text"
                  />
                  <div className="flex gap-2">
                    <input
                      className="w-20 rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      defaultValue="1"
                      min="1"
                      type="number"
                    />
                    <button className="flex-1 rounded bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Shop by Industry</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { name: 'Construction', icon: '🏗️' },
                  { name: 'Manufacturing', icon: '🏭' },
                  { name: 'Electrical', icon: '⚡' },
                  { name: 'Healthcare', icon: '🏥' },
                  { name: 'Transport', icon: '🚛' },
                  { name: 'Education', icon: '🎓' },
                ].map((industry, i) => (
                  <a
                    key={i}
                    className="flex items-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm hover:border-blue-300 hover:bg-blue-50"
                    href={`/industries/${industry.name.toLowerCase()}`}
                  >
                    <span>{industry.icon}</span>
                    <span className="text-slate-700">{industry.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Brands Widget */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Top Brands</h2>
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                {brands.map((brand, i) => (
                  <a
                    key={i}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 hover:bg-blue-100 hover:text-blue-700"
                    href={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {brand}
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

            {/* Recent Orders Widget (for logged in users) */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="font-bold text-slate-900">Reorder</h2>
              </div>
              <div className="p-4 text-center">
                <p className="mb-3 text-sm text-slate-500">Sign in to see your recent orders</p>
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

          {/* Bottom Links Grid */}
          <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-6 md:grid-cols-4">
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Popular Categories</h4>
              <ul className="space-y-1 text-sm">
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Cable Ties</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Safety Signs</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Labels & Tags</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Hand Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Product Guides</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Technical Data</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Safety Regulations</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Account</h4>
              <ul className="space-y-1 text-sm">
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Sign In</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Register</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Trade Account</a></li>
                <li><a className="text-slate-600 hover:text-blue-600" href="#">Order History</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Contact</h4>
              <ul className="space-y-1 text-sm">
                <li className="text-slate-600">0800 123 4567</li>
                <li className="text-slate-600">sales@gtse.com</li>
                <li className="text-slate-600">Mon-Fri 8am-6pm</li>
                <li><a className="text-blue-600 hover:underline" href="#">Live Chat</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
