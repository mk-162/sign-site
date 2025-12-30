import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield, LayoutGrid, CheckCircle2, TrendingDown, Clock } from 'lucide-react';
import { TradeEnquiryForm } from './_components/trade-enquiry-form';
import { buildCanonical } from '~/lib/seo/canonical';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Trade Enquiries | Safety Sign Hub',
  description: 'Bulk safety signage for businesses. High-volume safety signage at competitive trade prices.',
  alternates: {
    canonical: buildCanonical('/trade-enquiries'),
  },
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
              <strong className="text-slate-900">Safety Sign Hub</strong> delivers high-volume safety signage at competitive trade prices with
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
                    Expert advice and rapid quotations backed by our established logistics
                    network.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <TradeEnquiryForm />
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-slate-900">How to Connect</h3>
          <p className="text-slate-700">
            Reach us via live chat, phone{' '}
            <strong className="text-slate-900">(01592 655646)</strong>, email{' '}
            <a href="mailto:sales@caledoniasigns.co.uk" className="font-bold text-orange-600 hover:underline">(sales@caledoniasigns.co.uk)</a>, or the contact form
            above.
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Safety Sign Hub is operated by Caledonia Signs Limited | Company No. SC163223
        </div>
      </div>
    </>
  );
}
