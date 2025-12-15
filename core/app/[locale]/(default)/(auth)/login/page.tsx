/* eslint-disable react/jsx-no-bind */
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';
import { SignInForm } from '@/vibes/soul/sections/sign-in-section/sign-in-form';
import { ArrowRight, Check, Lock, Mail } from 'lucide-react';
import { buildConfig } from '~/build-config/reader';
import { ForceRefresh } from '~/components/force-refresh';
import { Slot } from '~/lib/makeswift/slot';

import { login } from './_actions/login';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Auth.Login' });

  return {
    title: t('title'),
  };
}

export default async function Login({ params, searchParams }: Props) {
  const { locale } = await params;
  const { redirectTo = '/account/orders' } = await searchParams;

  setRequestLocale(locale);

  const t = await getTranslations('Auth.Login');

  const vanityUrl = buildConfig.get('urls').vanityUrl;
  const redirectUrl = new URL(redirectTo, vanityUrl);
  const redirectTarget = redirectUrl.pathname + redirectUrl.search;

  return (
    <>
      <ForceRefresh />
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-[#1e293b] mb-4">Welcome Back</h1>
              <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
              <p className="text-slate-500 mt-4 max-w-lg mx-auto">
                Securely access your account to manage orders, view compliance documents, and track shipments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* Login Column */}
              <div className="bg-white p-8 md:p-10 rounded-lg border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="mb-8 border-b border-slate-100 pb-6">
                  <h2 className="text-2xl font-bold text-[#1e293b] flex items-center gap-2">
                    <Lock className="w-6 h-6 text-orange-500" />
                    {t('heading')}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Existing customers login here</p>
                </div>

                <SignInForm
                  action={login.bind(null, { redirectTo: redirectTarget })}
                  emailLabel="EMAIL ADDRESS"
                  passwordLabel="PASSWORD"
                  submitLabel={t('cta')}
                  emailPrepend={<Mail className="w-5 h-5 text-slate-400" />}
                  passwordPrepend={<Lock className="w-5 h-5 text-slate-400" />}
                />

                <div className="mt-4 flex justify-end">
                  <a href="/login/forgot-password" className="text-orange-600 hover:text-orange-700 text-xs font-semibold hover:underline">
                    {t('forgotPassword')}
                  </a>
                </div>
              </div>

              {/* New Customer Column */}
              <div className="bg-[#1e293b] p-8 md:p-10 rounded-lg text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{t('CreateAccount.title')}</h2>
                    <p className="text-slate-400 text-sm">Create a business account today</p>
                  </div>

                  <div className="space-y-6 mb-10">
                    <p className="text-slate-300 leading-relaxed">
                      {t('CreateAccount.accountBenefits')}
                    </p>

                    <ul className="space-y-4">
                      {[
                        t('CreateAccount.fastCheckout'),
                        t('CreateAccount.multipleAddresses'),
                        t('CreateAccount.ordersHistory'),
                        t('CreateAccount.ordersTracking'),
                        t('CreateAccount.wishlists')
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-200">
                          <div className="bg-orange-500/20 p-1 rounded-full mt-0.5">
                            <Check className="w-3 h-3 text-orange-500" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ButtonLink
                    className="w-full h-12 border-2 border-white/20 text-white hover:bg-white hover:text-[#1e293b] font-bold text-base uppercase tracking-wide transition-all group flex items-center justify-center bg-transparent whitespace-nowrap"
                    href="/register"
                    variant="ghost"
                  >
                    {t('CreateAccount.cta')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </ButtonLink>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex justify-center items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/OSHA_logo.svg/1200px-OSHA_logo.svg.png" className="h-8 md:h-10 object-contain" alt="OSHA" />
              </div>
              <div className="flex justify-center items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/ANSI_logo.svg/1200px-ANSI_logo.svg.png" className="h-8 md:h-10 object-contain" alt="ANSI" />
              </div>
              <div className="flex justify-center items-center font-black text-2xl text-slate-400">
                ISO 9001
              </div>
              <div className="flex justify-center items-center font-black text-2xl text-slate-400">
                BSI Kitemark
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
