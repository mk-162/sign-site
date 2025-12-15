import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PersonalDetailsForm } from './_components/personal-details-form';
import { ChangePasswordForm } from './_components/change-password-form';

import { changePassword } from './_actions/change-password';
import { updateCustomer } from './_actions/update-customer';
import { getCustomerSettingsQuery } from './page-data';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Account.Settings' });

  return {
    title: t('title'),
  };
}

export default async function Settings({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Account.Settings');

  const customerSettings = await getCustomerSettingsQuery();

  if (!customerSettings) {
    notFound();
  }

  return (
    <div className="w-full">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-[#1e293b]">Account Settings</h1>
      </header>

      <div className="space-y-12 max-w-2xl">
        {/* Personal Details Section */}
        <section>
          <PersonalDetailsForm
            account={customerSettings.customerInfo}
            action={updateCustomer}
            submitLabel={t('cta')}
            firstNameLabel={t('firstName')}
            lastNameLabel={t('lastName')}
            emailLabel={t('email')}
            companyLabel={t('company')}
          />
        </section>

        {/* Change Password Section */}
        <section className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">{t('changePassword')}</h2>

          <ChangePasswordForm
            action={changePassword}
            submitLabel={t('cta')}
            currentPasswordLabel={t('currentPassword')}
            newPasswordLabel={t('newPassword')}
            confirmPasswordLabel={t('confirmPassword')}
          />
        </section>
      </div>
    </div>
  );
}
