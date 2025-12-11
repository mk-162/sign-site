import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield, LayoutGrid, CheckCircle2, TrendingDown, Clock, MoveRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Trade Enquiries | Safety Sign Hub',
  description: 'Bulk safety signage for businesses. High-volume safety signage at competitive trade prices.',
};

export default async function TradeEnquiriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-black md:text-5xl">
            Bulk Safety Signage for Businesses
          </h1>
          <p className="mb-8 text-xl text-slate-300 md:text-2xl">
            Compliance Made Simple. High-volume safety signage at competitive trade prices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              className="rounded-full bg-orange-500 px-8 py-3 font-bold text-white transition-colors hover:bg-orange-600"
              href="#contact-form"
            >
              Get a Quote
            </a>
            <Link
              className="rounded-full bg-white/10 px-8 py-3 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              href="/contact-us"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-20 grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Why Choose Safety Sign Hub for Your Business?
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              <strong className="text-slate-900">Safety Sign Hub</strong>, powered by GTSE's global
              supply network, delivers high-volume safety signage at competitive trade prices with
              guaranteed regulatory compliance.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-2">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Regulatory Expertise</h3>
                  <p className="text-slate-600">
                    All signage meets UK Health & Safety requirements including Fire Safety Order
                    2005 and BS EN ISO 7010:2020.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-2">
                  <LayoutGrid className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Industry Specialization</h3>
                  <p className="text-slate-600">
                    We supply major organizations across Construction, Manufacturing, Facilities
                    Management, Property, Marine, Healthcare, Hospitality, and Industrial sectors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quality Assurance</h3>
                  <p className="text-slate-600">
                    Premium materials tested for durability and visibility—from photoluminescent to
                    weatherproof aluminum.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-2">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Bulk Pricing</h3>
                  <p className="text-slate-600">
                    Volume discounts for recurring orders and multi-site deployments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Fast Response</h3>
                  <p className="text-slate-600">
                    Expert advice and rapid quotations backed by GTSE's established logistics
                    network.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border border-slate-100 bg-white p-8 shadow-xl"
            id="contact-form"
          >
            <h3 className="mb-2 text-2xl font-bold text-slate-900">
              Apply for a Trade Credit Account
            </h3>
            <p className="mb-6 text-slate-500">
              Streamline procurement across your sites with a GTSE trade account.
            </p>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">First Name</label>
                  <input
                    className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    type="text"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Last Name</label>
                  <input
                    className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
                <input
                  className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  type="text"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    type="email"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Estimated Monthly Spend
                </label>
                <select className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500">
                  <option>Not sure</option>
                  <option>Less than £500</option>
                  <option>£500 - £2000</option>
                  <option>£2000+</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Additional Details
                </label>
                <textarea
                  className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-3 font-bold text-white shadow-md transition-colors hover:bg-slate-800"
                type="button"
              >
                Submit Application <MoveRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-slate-900">How to Connect</h3>
          <p className="text-slate-700">
            Reach us via live chat, phone{' '}
            <strong className="text-slate-900">(01246 386 126)</strong>, email{' '}
            <strong className="text-slate-900">(safety@gtse.co.uk)</strong>, or the contact form
            above.
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Safety Sign Hub is operated by Gocableties Ltd (trading as GTSE) | Company No. 09162871 |
          VAT No. 197 116 978
        </div>
      </div>
    </>
  );
}
