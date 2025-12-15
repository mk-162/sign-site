import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { getCategoryTree } from '~/client/queries/get-category-tree';
import { Footer } from '~/components/layout/Footer';
import { Header } from '~/components/layout/Header';
import {
  getHeaderAuthData,
  getHeaderCartData,
  groupCategories,
  CategoryTreeItem,
} from '~/components/layout/header-data';

import { GlobalSchema } from './_components/global-schema';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Fetch all data in parallel
  const [rawCategories, authData, cartData] = await Promise.all([
    getCategoryTree(),
    getHeaderAuthData(),
    getHeaderCartData(),
  ]);

  // Transform categories to include entityId for grouping
  const categories: CategoryTreeItem[] = rawCategories.map((cat) => ({
    entityId: cat.entityId,
    name: cat.name,
    path: cat.path,
    children: cat.children.map((child) => ({
      entityId: child.entityId,
      name: child.name,
      path: child.path,
      children: child.children.map((grandchild) => ({
        entityId: grandchild.entityId,
        name: grandchild.name,
        path: grandchild.path,
        children: [],
      })),
    })),
  }));

  // Group categories for navigation
  const navGroups = groupCategories(categories);

  return (
    <>
      <GlobalSchema />
      <Header
        categories={categories}
        navGroups={navGroups}
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
