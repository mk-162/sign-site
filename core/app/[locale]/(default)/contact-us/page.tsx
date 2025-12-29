import type { Metadata } from 'next';
import { buildCanonical } from '~/lib/seo/canonical';
import { ContactForm } from './_components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Safety Sign Hub',
  description: 'Get in touch with Safety Sign Hub for expert safety signage advice. Phone, email, or live chat support from our UK-based team.',
  alternates: {
    canonical: buildCanonical('/contact-us'),
  },
};

export default function ContactUsPage() {
  return <ContactForm />;
}
