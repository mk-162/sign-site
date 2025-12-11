import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Phone, Mail, MessageSquare, Briefcase } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Contact Us | Safety Sign Hub',
  description: 'Get expert safety signage advice. Contact our team for compliance questions, bulk orders, or product enquiries.',
};

export default async function ContactUsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-black text-slate-900">Contact Us</h1>
      <p className="mb-12 text-xl text-slate-600">
        Get Expert Safety Signage Advice. Contact Hours: Monday - Friday: 9:00AM - 5:30PM GMT
      </p>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="mb-6 text-slate-700">
              Our safety signage specialists are here to help you meet compliance requirements and
              protect your workplace. Contact us via live chat, email, phone, WhatsApp, or the form
              below.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                <p className="my-1 text-xl font-bold text-orange-600">01246 386 126</p>
                <p className="text-slate-600">
                  Speak directly with our safety signage team for expert advice on regulations,
                  materials, and custom solutions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Email</h3>
                <a
                  className="my-1 block text-lg font-bold text-orange-600 hover:underline"
                  href="mailto:safety@gtse.co.uk"
                >
                  safety@gtse.co.uk
                </a>
                <p className="text-slate-600">
                  Contact us for compliance advice, bulk orders, or product enquiries. We aim to
                  respond within the same working day.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Chat</h3>
                <p className="text-slate-600">
                  Get instant answers to your safety signage questions. Click the speech bubble in
                  the corner of your screen to speak with a team member.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16.95 7.43c-1.42-.92-3.1-1.43-4.95-1.43-4.96 0-9 3.58-9 8s4.04 8 9 8c1.85 0 3.53-.51 4.95-1.43" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">WhatsApp Business</h3>
                <p className="my-1 text-slate-600">
                  For business-specific safety signage enquiries:{' '}
                  <strong className="text-slate-900">07548 383832</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Trade & Bulk Orders</h3>
                <p className="text-slate-600">
                  Looking for high-volume safety signage for multiple sites? Visit our{' '}
                  <Link className="font-semibold text-orange-600 hover:underline" href="/trade-enquiries">
                    Trade Enquiries page
                  </Link>{' '}
                  for competitive pricing on bulk orders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit rounded-xl border border-slate-100 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Send us a Message</h2>
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
              <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
              <input
                className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                type="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Phone Number (Optional)
              </label>
              <input
                className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                type="tel"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                rows={4}
              />
            </div>
            <button
              className="w-full rounded-md bg-orange-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-orange-700"
              type="button"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-200 pt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Company Information</h3>
        <div className="grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="block text-slate-500">Trading as</span>
            <span className="font-medium text-slate-900">Safety Sign Hub</span>
          </div>
          <div>
            <span className="block text-slate-500">Company Name</span>
            <span className="font-medium text-slate-900">Gocableties Ltd (GTSE)</span>
          </div>
          <div>
            <span className="block text-slate-500">Registered Office</span>
            <span className="font-medium text-slate-900">
              GTSE | WeWork - Dalton Place | 29 John Dalton St | Manchester | M2 6DS
            </span>
          </div>
          <div>
            <span className="block text-slate-500">Registration</span>
            <span className="font-medium text-slate-900">Company No. 09162871 | VAT No. 197 116 978</span>
          </div>
        </div>
      </div>
    </div>
  );
}
