import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Terms & Conditions | Safety Sign Hub',
  description: 'Read the terms and conditions for using Safety Sign Hub.',
};

export default async function TermsConditionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-slate-900">Terms & Conditions</h1>

      <div className="prose prose-slate max-w-none">
        <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900">Overview</h2>
        <p>
          This website is operated by <strong>Gocableties Ltd</strong> (Company Registration No.
          09162871) trading as <strong>Safety Sign Hub</strong> (a GTSE brand). Throughout
          the site, the terms "we", "us", "our", "Safety Sign Hub" refer to Gocableties Ltd.
        </p>
        <p>
          Gocableties Ltd offers this website, including all information, tools, and services
          available from this site to you, the user, conditioned upon your acceptance of all terms,
          conditions, policies, and notices stated here.
        </p>
        <p>
          By visiting our site and/or purchasing something from us, you engage in our "Service" and
          agree to be bound by the following terms and conditions ("Terms of Service", "Terms"),
          including those additional terms and conditions and policies referenced herein and/or
          available by hyperlink. These Terms of Service apply to all users of the site.
        </p>
        <p>
          Please read these Terms of Service carefully before accessing or using our website. By
          accessing or using any part of the site, you agree to be bound by these Terms of Service.
          If you do not agree to all the terms and conditions of this agreement, then you may not
          access the website or use any services.
        </p>
        <p>
          Our store is hosted on BigCommerce, Inc. They provide us with the online e-commerce
          platform that allows us to sell our safety signage products and services to you.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          SECTION 1 - ONLINE STORE TERMS
        </h3>
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of
          majority in your state or province of residence, or that you are the age of majority and
          have given us your consent to allow any of your minor dependents to use this site.
        </p>
        <p>
          You may not use our products for any illegal or unauthorized purpose nor may you, in the
          use of the Service, violate any laws in your jurisdiction (including but not limited to
          copyright laws).
        </p>
        <p>You must not transmit any worms, viruses, or any code of a destructive nature.</p>
        <p>
          A breach or violation of any of the Terms will result in immediate termination of your
          Services.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          SECTION 2 - REGULATORY COMPLIANCE
        </h3>
        <p>
          Safety Sign Hub products are designed to meet UK Health & Safety regulations including the
          Regulatory Reform (Fire Safety) Order 2005 and relevant British Standards (BS EN ISO
          7010:2020). While we ensure our products comply with current regulations at time of sale,
          it is the purchaser's responsibility to ensure ongoing compliance with their specific
          workplace requirements and to seek professional advice where necessary.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          SECTION 3 - GENERAL CONDITIONS
        </h3>
        <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
        <p>
          You understand that your content (not including credit card information), may be
          transferred unencrypted and involve (a) transmissions over various networks; and (b)
          changes to conform and adapt to technical requirements of connecting networks or devices.
          Credit card information is always encrypted during transfer over networks.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the
          Service, use of the Service, or access to the Service or any contact on the website
          through which the service is provided, without express written permission by us.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">SECTION 4 - PROHIBITED USES</h3>
        <p>
          Furthermore, any products purchased from safetysignhub.co.uk, operated by Gocableties Ltd,
          may not be resold on Amazon or eBay marketplaces without prior written authorization.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">SECTION 5 - GOVERNING LAW</h3>
        <p>
          These Terms of Service and any separate agreements whereby we provide you Services shall
          be governed by and construed in accordance with the laws of England and Wales.
        </p>
        <p className="mt-4">
          <strong>Registered Office:</strong> GTSE | WeWork - Dalton Place | 29 John Dalton St | Manchester | M2 6DS
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          SECTION 6 - CONTACT INFORMATION
        </h3>
        <p>
          Questions about the Terms of Service should be sent to us at{' '}
          <a className="text-orange-600 hover:underline" href="mailto:sales@safetysignhub.co.uk">
            sales@safetysignhub.co.uk
          </a>
          .
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Company Details</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Trading Names:</span> Safety Sign Hub
            </li>
            <li>
              <span className="font-semibold">Legal Entity:</span> Gocableties Ltd (trading as GTSE)
            </li>
            <li>
              <span className="font-semibold">Company Registration:</span> 09162871
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
}
