import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { getCategoryTree } from '~/client/queries/get-category-tree';
import { Footer } from '~/components/layout/Footer';
import { Header } from '~/components/layout/Header';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const categories = await getCategoryTree();

  return (
    <>
      <Header categories={categories} />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export const experimental_ppr = true;
