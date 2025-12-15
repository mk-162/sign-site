'use client';

import { useActionState, useEffect } from 'react';
import { MoveRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitTradeEnquiry, type TradeEnquiryState } from '../_actions/submit-trade-enquiry';

const initialState: TradeEnquiryState = {
  status: 'idle',
  message: '',
};

export function TradeEnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitTradeEnquiry, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      // Reset form on success
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    }
  }, [state.status]);

  return (
    <div
      className="rounded-xl border border-slate-100 bg-white p-8 shadow-xl"
      id="contact-form"
    >
      <h3 className="mb-2 text-2xl font-bold text-slate-900">
        Apply for a Trade Credit Account
      </h3>
      <p className="mb-6 text-slate-500">
        Streamline procurement across your sites with a GTSE trade account.
      </p>

      {state.status === 'success' && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <p>{state.message}</p>
        </div>
      )}

      {state.status === 'error' && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <p>{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="firstName">
              First Name *
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              id="firstName"
              name="firstName"
              required
              type="text"
            />
            {state.errors?.firstName && (
              <p className="mt-1 text-sm text-red-600">{state.errors.firstName[0]}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="lastName">
              Last Name *
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              id="lastName"
              name="lastName"
              required
              type="text"
            />
            {state.errors?.lastName && (
              <p className="mt-1 text-sm text-red-600">{state.errors.lastName[0]}</p>
            )}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="companyName">
            Company Name *
          </label>
          <input
            className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            id="companyName"
            name="companyName"
            required
            type="text"
          />
          {state.errors?.companyName && (
            <p className="mt-1 text-sm text-red-600">{state.errors.companyName[0]}</p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
              Email Address *
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              id="email"
              name="email"
              required
              type="email"
            />
            {state.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
              id="phone"
              name="phone"
              type="tel"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="monthlySpend">
            Estimated Monthly Spend
          </label>
          <select
            className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            id="monthlySpend"
            name="monthlySpend"
          >
            <option value="Not sure">Not sure</option>
            <option value="Less than £500">Less than £500</option>
            <option value="£500 - £2000">£500 - £2000</option>
            <option value="£2000+">£2000+</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="message">
            Additional Details
          </label>
          <textarea
            className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            id="message"
            name="message"
            rows={3}
          />
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-3 font-bold text-white shadow-md transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application <MoveRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
