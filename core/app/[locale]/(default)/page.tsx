import { locales } from '~/i18n/locales';
import { HeroSection } from '~/components/sections/HeroSection';
import { CategoriesGrid } from '~/components/sections/CategoriesGrid';
import { FeaturedProducts } from '~/components/sections/FeaturedProducts';
import { WhyChooseUs } from '~/components/sections/WhyChooseUs';

interface Params {
  locale: string;
}

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
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
