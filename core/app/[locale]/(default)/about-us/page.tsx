import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'About Us | Safety Sign Hub',
  description: 'Learn about Safety Sign Hub, the specialist safety signage division of GTSE.',
};

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-slate-900">About Us</h1>

      <div className="prose prose-slate max-w-none">
        <p className="lead mb-8 text-xl text-slate-600">
          <strong>Safety Sign Hub</strong> is a specialist safety signage provider, bringing years of trade supply expertise
          to workplace safety compliance.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900">Our History</h2>
        <p>
          We operate as a dedicated safety signage manufacturer and supplier, focused on delivering
          high-quality, compliant signage to businesses across the UK. With our manufacturing
          expertise, we ensure every sign meets strict quality and safety standards.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900">Why Safety Sign Hub?</h2>
        <p>
          Recognising the critical importance of workplace safety compliance and the specialized
          Recognising the critical importance of workplace safety compliance and the specialized
          knowledge required in safety signage, <strong>Safety Sign Hub</strong> was established as
          a dedicated brand focused exclusively on:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Regulatory Compliance</strong>: All signage meets UK Health & Safety
            regulations, including the Regulatory Reform (Fire Safety) Order 2005 and BS EN ISO
            7010:2020
          </li>
          <li>
            <strong>Industry Expertise</strong>: Serving Construction, Manufacturing, Warehousing,
            Marine, Oil & Gas, Healthcare, Hospitality, and more
          </li>
          <li>
            <strong>Comprehensive Range</strong>: Fire safety signs, warning signs, mandatory signs,
            prohibition signs, and custom safety solutions
          </li>
          <li>
            <strong>Quality Assurance</strong>: Premium materials from rigid plastic to
            photoluminescent and aluminum options
          </li>
          <li>
            <strong>Fast Delivery</strong>: Utilizing established logistics networks for
            rapid UK-wide delivery
          </li>
        </ul>

        <p>
          While we operate as a specialized brand, Safety Sign Hub is committed to
          combining the personalized service of a dedicated team with the logistics,
          technology, and purchasing power of a leading supplier. Whether you're a small
          workshop or a large industrial facility, we ensure you get compliant, durable safety
          signage exactly when you need it.
        </p>

        <p className="mt-6 text-lg font-bold text-slate-900">
          Safety Sign Hub - Protecting People, Ensuring Compliance.
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Trading Information</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Trading Name:</span> Safety Sign Hub
            </li>
            <li>
              <span className="font-semibold">Operated by:</span> Gocableties Ltd (trading as GTSE)
            </li>
            <li>
              <span className="font-semibold">Company Registration Number:</span> 09162871
            </li>
            <li>
              <span className="font-semibold">Registered Office:</span> GTSE | WeWork - Dalton Place
              | 29 John Dalton St | Manchester | M2 6DS
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
