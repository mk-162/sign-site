'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageSquare, Clock, MapPin, Loader2, CheckCircle, Headphones } from 'lucide-react';
import { submitContactForm, ContactFormState } from '../_actions/submit-contact';

const initialState: ContactFormState = {
  status: 'idle',
  message: '',
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-black md:text-5xl">
            Get in Touch
          </h1>
          <p className="mb-8 text-xl text-slate-300 md:text-2xl">
            Expert safety signage advice from our UK-based team. We're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              className="rounded-full bg-orange-500 px-8 py-3 font-bold text-white transition-colors hover:bg-orange-600"
              href="#contact-form"
            >
              Send a Message
            </a>
            <a
              className="rounded-full bg-white/10 px-8 py-3 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              href="tel:01592655646"
            >
              01592 655646
            </a>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-20 grid items-start gap-12 md:grid-cols-2">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              How Can We Help?
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Our safety signage specialists are ready to assist with compliance requirements,
              product recommendations, bulk orders, and any questions you may have.
              Contact us via your preferred method below.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-3">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                  <a href="tel:01592655646" className="my-1 block text-xl font-bold text-orange-600 hover:underline">
                    01592 655646
                  </a>
                  <p className="text-slate-600">
                    Speak directly with our team for expert advice on regulations, materials, and custom solutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-3">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Email</h3>
                  <a
                    className="my-1 block text-xl font-bold text-orange-600 hover:underline"
                    href="mailto:sales@safetysignhub.co.uk"
                  >
                    sales@safetysignhub.co.uk
                  </a>
                  <p className="text-slate-600">
                    For compliance advice, bulk orders, or product enquiries. We aim to respond within the same working day.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-orange-100 p-3">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Live Chat</h3>
                  <p className="text-slate-600">
                    Get instant answers to your safety signage questions. Click the chat icon in the corner of your screen to speak with our team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-green-100 p-3">
                  <Headphones className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">WhatsApp Business</h3>
                  <p className="text-slate-600">
                    For quick enquiries: <strong className="text-slate-900">07548 383832</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-blue-100 p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Opening Hours</h3>
                  <p className="text-slate-600">
                    <strong className="text-slate-900">Monday - Friday:</strong> 9:00 AM - 5:30 PM GMT<br />
                    <strong className="text-slate-900">Saturday - Sunday:</strong> Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Trade Enquiries CTA */}
            <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Need Bulk Pricing?</h3>
              <p className="mb-4 text-slate-600">
                Looking for high-volume safety signage for multiple sites? Get competitive trade prices.
              </p>
              <Link
                href="/trade-enquiries"
                className="inline-block rounded-lg bg-orange-500 px-6 py-2 font-bold text-white transition-colors hover:bg-orange-600"
              >
                Trade Enquiries
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div id="contact-form" className="h-fit rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Send us a Message</h2>

            {state.status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 text-xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-slate-600">{state.message}</p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                {state.status === 'error' && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {state.message}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">First Name *</label>
                    <input
                      name="firstName"
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      type="text"
                    />
                    {state.errors?.firstName && (
                      <p className="mt-1 text-sm text-red-500">{state.errors.firstName[0]}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Last Name *</label>
                    <input
                      name="lastName"
                      required
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      type="text"
                    />
                    {state.errors?.lastName && (
                      <p className="mt-1 text-sm text-red-500">{state.errors.lastName[0]}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email Address *</label>
                  <input
                    name="email"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    type="email"
                  />
                  {state.errors?.email && (
                    <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number (Optional)</label>
                  <input
                    name="phone"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    type="tel"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
                  <select
                    name="subject"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Enquiry</option>
                    <option value="compliance">Compliance Advice</option>
                    <option value="custom">Custom Signage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Message *</label>
                  <textarea
                    name="message"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    rows={5}
                    placeholder="How can we help you today?"
                  />
                  {state.errors?.message && (
                    <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>
                  )}
                </div>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-4 font-bold text-white shadow-md transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Company Info Banner */}
        <div className="rounded-xl border border-orange-100 bg-orange-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-slate-900">Company Information</h3>
          <div className="grid gap-4 text-sm md:grid-cols-4">
            <div>
              <span className="block text-slate-500">Trading as</span>
              <span className="font-semibold text-slate-900">Safety Sign Hub</span>
            </div>
            <div>
              <span className="block text-slate-500">Company Name</span>
              <span className="font-semibold text-slate-900">Caledonia Signs Limited</span>
            </div>
            <div>
              <span className="block text-slate-500">Company Number</span>
              <span className="font-semibold text-slate-900">SC163223</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          <span>Units 3 Waverley Road | Mitchelston Industrial Estate | Kirkcaldy | KY1 3LT</span>
        </div>
      </div>
    </>
  );
}
