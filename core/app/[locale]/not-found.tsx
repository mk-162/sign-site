import { getTranslations } from 'next-intl/server';

import { NotFound as NotFoundSection } from '@/vibes/soul/sections/not-found';
import { Footer } from '~/components/vibe/Footer';
import { Header } from '~/components/vibe/Header';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <>
      <Header />

      <NotFoundSection
        className="flex-1 place-content-center"
        ctaLabel={t('search')}
        subtitle={t('subtitle')}
        title={t('title')}
      />

      <Footer />
    </>
  );
}
