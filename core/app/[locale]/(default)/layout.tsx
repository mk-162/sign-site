import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { getCategoryTree } from '~/client/queries/get-category-tree';
import { Footer } from '~/components/layout/Footer';
import { Header } from '~/components/layout/Header';
import { getHeaderAuthData, getHeaderCartData } from '~/components/layout/header-data';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Fetch all data in parallel
  const [categories, authData, cartData] = await Promise.all([
    getCategoryTree(),
    getHeaderAuthData(),
    getHeaderCartData(),
  ]);

  return (
    <>
      <Header
        categories={categories}
        isLoggedIn={authData.isLoggedIn}
        customerName={authData.customerName}
        customerEmail={authData.customerEmail}
        cartItems={cartData.items}
        cartItemCount={cartData.itemCount}
        cartSubtotal={cartData.subtotal}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export const experimental_ppr = true;
