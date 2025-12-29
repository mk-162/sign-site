import { Metadata } from 'next';

import { locales } from '~/i18n/locales';
import { HeroSection } from '~/components/sections/HeroSection';
import { CategoriesGrid } from '~/components/sections/CategoriesGrid';
import { FeaturedProducts } from '~/components/sections/FeaturedProducts';
import { WhyChooseUs } from '~/components/sections/WhyChooseUs';
import { SITE_URL } from '~/lib/config/site';

interface Params {
  locale: string;
}

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata(): Metadata {
  return {
    alternates: {
      canonical: SITE_URL,
    },
  };
}

interface Props {
  params: Promise<Params>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="space-y-0 pb-0">
      <HeroSection />
      <CategoriesGrid />
      <FeaturedProducts />
      <WhyChooseUs />
    </main>
  );
}
