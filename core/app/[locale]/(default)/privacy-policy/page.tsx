import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Privacy Policy | Safety Sign Hub',
  description: 'Learn how Safety Sign Hub collects, uses, and protects your personal information.',
};

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-slate-900">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared
          when you visit or make a purchase from safetysignhub.co.uk (the "Site").
        </p>
        <p>
          <strong>Data Controller:</strong> Gocableties Ltd (trading as GTSE),
          Company No. 09162871
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          PERSONAL INFORMATION WE COLLECT
        </h3>
        <p>
          When you visit the Site, we automatically collect certain information about your device,
          including information about your web browser, IP address, time zone, and some of the
          cookies installed on your device. Additionally, as you browse the Site, we collect
          information about the individual web pages or products that you view, what websites or
          search terms referred you to the Site, and information about how you interact with the
          Site. We refer to this automatically-collected information as "Device Information."
        </p>
        <p>We collect Device Information using the following technologies:</p>
        <ul className="my-2 list-disc space-y-1 pl-6">
          <li>
            <strong>"Cookies"</strong> are data files placed on your device and often include an
            anonymous unique identifier.
          </li>
          <li>
            <strong>"Log files"</strong> track actions occurring on the Site and collect data
            including your IP address, browser type, Internet service provider, referring/exit
            pages, and date/time stamps.
          </li>
          <li>
            <strong>"Web beacons," "tags," and "pixels"</strong> are electronic files used to record
            information about how you browse the Site.
          </li>
        </ul>
        <p>
          Additionally, when you make a purchase or attempt to make a purchase through the Site, we
          collect certain information from you, including your name, billing address, shipping
          address, payment information, email address, and phone number. We refer to this
          information as "Order Information."
        </p>
        <p>
          When we talk about "Personal Information" in this Privacy Policy, we are talking about
          both Device Information and Order Information.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          HOW DO WE USE YOUR PERSONAL INFORMATION?
        </h3>
        <p>
          We use the Order Information that we collect generally to fulfill any orders placed
          through the Site (including processing your payment information, arranging for shipping,
          and providing you with invoices and/or order confirmations). Additionally, we use this
          Order Information to:
        </p>
        <ul className="my-2 list-disc space-y-1 pl-6">
          <li>Communicate with you regarding your safety signage orders</li>
          <li>Screen our orders for potential risk or fraud</li>
          <li>
            Provide you with information or advertising relating to our safety products or services
            (when in line with your preferences)
          </li>
          <li>Ensure compliance with applicable safety regulations</li>
        </ul>
        <p>
          We use the Device Information to help us screen for potential risk and fraud (in
          particular, your IP address), and more generally to improve and optimize our Site.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">
          SHARING YOUR PERSONAL INFORMATION
        </h3>
        <p>
          We share your Personal Information with third parties to help us use your Personal
          Information, as described above. For example, we use BigCommerce to power our online store
          and Google Analytics to understand how our customers use the Site.
        </p>
        <p>We will not sell or rent your personal information to third parties.</p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">BEHAVIOURAL ADVERTISING</h3>
        <p>
          We use your Personal Information to provide you with targeted advertisements or marketing
          communications we believe may be of interest to you.
        </p>
        <p>You can opt out of targeted advertising by visiting:</p>
        <ul className="my-2 list-disc space-y-1 pl-6">
          <li>
            FACEBOOK -{' '}
            <a
              className="text-orange-600 hover:underline"
              href="https://www.facebook.com/settings/?tab=ads"
            >
              https://www.facebook.com/settings/?tab=ads
            </a>
          </li>
          <li>
            GOOGLE -{' '}
            <a
              className="text-orange-600 hover:underline"
              href="https://www.google.com/settings/ads/anonymous"
            >
              https://www.google.com/settings/ads/anonymous
            </a>
          </li>
          <li>
            BING -{' '}
            <a
              className="text-orange-600 hover:underline"
              href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
            >
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            </a>
          </li>
        </ul>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">YOUR RIGHTS (UK GDPR)</h3>
        <p>If you are a UK resident, you have the right to:</p>
        <ul className="my-2 list-disc space-y-1 pl-6">
          <li>Access personal information we hold about you</li>
          <li>Request that your personal information be corrected, updated, or deleted</li>
          <li>Object to processing of your personal information</li>
          <li>Request restriction of processing of your personal information</li>
          <li>Request transfer of your personal information</li>
          <li>Withdraw consent</li>
        </ul>
        <p>To exercise these rights, please contact us using the details below.</p>

        <h3 className="mb-2 mt-8 text-xl font-bold text-slate-900">DATA RETENTION</h3>
        <p>
          When you place an order through the Site, we will maintain your Order Information for our
          records in accordance with our legal obligations and legitimate business interests, unless
          you ask us to delete this information.
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Contact Us</h3>
          <p className="mb-4">
            For more information about our privacy practices, to make a complaint, or to exercise
            your data rights, please contact us:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">Email:</span>{' '}
              <a className="text-orange-600 hover:underline" href="mailto:sales@safetysignhub.co.uk">
                sales@safetysignhub.co.uk
              </a>
            </li>
            <li>
              <span className="font-semibold">Mail:</span> GTSE | WeWork - Dalton Place | 29 John Dalton St | Manchester | M2 6DS
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
