import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Clock, AlertCircle } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Delivery & Returns | Safety Sign Hub',
  description: 'Fast, reliable safety signage delivery across the UK. Learn about our delivery options and returns policy.',
};

export default async function DeliveryReturnsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-slate-900">Delivery & Returns</h1>
      <p className="lead mb-8 text-xl text-slate-600">
        Fast, Reliable Safety Signage Delivery Across the UK.
      </p>

      <div className="mb-12 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-blue-900">
          <Clock className="h-5 w-5" /> Christmas Warehouse Closure Notice
        </h3>
        <p className="text-blue-800">
          Please note that our warehouse will close for Christmas on 23rd December 2025 and will
          reopen on 2nd January 2026. The last day for next-day delivery is 23rd December (orders
          placed before 3:15 pm). We will resume dispatch on 2nd January.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Dispatch Times</h2>
          <p className="mb-4 text-slate-700">
            Our standard dispatch times are Monday to Friday until 15:15.
          </p>
          <p className="text-slate-700">
            Occasionally, dispatch may occur the next working day due to stock locations and
            preparation requirements for certain safety signage products (particularly custom or
            large-format signs). You will receive an email notification with FedEx tracking
            information once your order is dispatched.
          </p>
          <p className="mt-4 text-slate-700">
            For order status enquiries, please email{' '}
            <a className="text-orange-600 hover:underline" href="mailto:sales@caledoniasigns.co.uk">
              sales@caledoniasigns.co.uk
            </a>{' '}
            and our customer service team will assist you.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Delivery Options</h2>
          <p className="mb-6 text-slate-700">
            When you place your order, you will be presented with delivery options based on your
            location and order size:
          </p>

          <div className="overflow-x-auto">
            <table className="font-sm w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="p-4 font-bold text-slate-900">Delivery Service</th>
                  <th className="p-4 font-bold text-slate-900">Description</th>
                  <th className="p-4 font-bold text-slate-900">Price ex VAT</th>
                  <th className="p-4 font-bold text-slate-900">Price inc VAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-medium text-slate-900">UK Express Courier - FedEx</td>
                  <td className="p-4 text-slate-600">1-2 working days tracked service</td>
                  <td className="p-4 font-medium text-slate-900">£5.99</td>
                  <td className="p-4 text-slate-600">£7.19</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Free Next Working Day - FedEx</td>
                  <td className="p-4 text-slate-600">
                    1-2 working days tracked for orders over £50 ex VAT (selected UK areas)
                  </td>
                  <td className="p-4 font-bold text-green-600">FREE</td>
                  <td className="p-4 font-bold text-green-600">FREE</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Northern Ireland</td>
                  <td className="p-4 text-slate-600">Approx. 2 working days (per 30kg)</td>
                  <td className="p-4 font-medium text-slate-900">£18.50</td>
                  <td className="p-4 text-slate-600">£22.20</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Scottish Highlands</td>
                  <td className="p-4 text-slate-600">Approx. 2 working days (per 30kg)</td>
                  <td className="p-4 font-medium text-slate-900">£14.00</td>
                  <td className="p-4 text-slate-600">£16.80</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">UK Offshore Outer Areas</td>
                  <td className="p-4 text-slate-600">Approx. 2 working days (per 30kg)</td>
                  <td className="p-4 font-medium text-slate-900">£20.00</td>
                  <td className="p-4 text-slate-600">£24.00</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Shetland Islands</td>
                  <td className="p-4 text-slate-600">Approx. 2 working days (per 30kg)</td>
                  <td className="p-4 font-medium text-slate-900">£34.00</td>
                  <td className="p-4 text-slate-600">£40.80</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Outer Hebrides (HS postcodes)</td>
                  <td className="p-4 text-slate-600">Approx. 2 working days (per 30kg)</td>
                  <td className="p-4 font-medium text-slate-900">£40.00</td>
                  <td className="p-4 text-slate-600">£48.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Custom & Large Format Safety Signs
          </h2>
          <div className="rounded-lg border border-orange-100 bg-orange-50 p-6">
            <p className="mb-4 text-slate-700">
              Custom safety signs and large-format signage may require additional production time
              (typically 3-5 working days). Delivery charges and lead times will be confirmed before
              order confirmation.
            </p>
            <p className="flex items-center gap-2 font-bold text-orange-800">
              <AlertCircle className="h-5 w-5" /> Please note: Custom-made safety signage cannot be
              returned unless faulty or incorrectly produced.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">EU & International Orders</h2>
          <p className="text-slate-700">
            To arrange safety signage delivery outside the UK, please contact us at{' '}
            <a className="text-orange-600 hover:underline" href="mailto:sales@caledoniasigns.co.uk">
              sales@caledoniasigns.co.uk
            </a>{' '}
            or call 01592 655646.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Returns Policy</h2>
          <p className="mb-4 text-slate-700">
            We take pride in the quality and compliance of our safety signage. If your order doesn't
            meet your requirements, please contact us for assistance.
          </p>

          <h3 className="mb-2 text-lg font-bold text-slate-900">Returns Period</h3>
          <p className="mb-2 text-slate-700">
            Returns accepted within <strong className="text-slate-900">28 days of order</strong> if:
          </p>
          <ul className="my-2 list-disc space-y-1 pl-6 text-slate-700">
            <li>The product is faulty or damaged</li>
            <li>We've sent the incorrect item</li>
            <li>You've changed your mind (signs must be unused and in original packaging)</li>
          </ul>
          <p className="mb-6 text-sm italic text-slate-500">
            Please note: We cannot refund opened packs or custom-made safety signage unless faulty.
          </p>

          <h3 className="mb-2 text-lg font-bold text-slate-900">Returns Process</h3>
          <p className="mb-6 text-slate-700">
            Email{' '}
            <a className="text-orange-600 hover:underline" href="mailto:sales@caledoniasigns.co.uk">
              sales@caledoniasigns.co.uk
            </a>{' '}
            with your order number. We'll arrange the best return method and process your refund or
            replacement promptly.
          </p>

          <h3 className="mb-2 text-lg font-bold text-slate-900">Missing Items</h3>
          <p className="text-slate-700">
            Please notify us within 14 days of delivery if items are missing. Contact{' '}
            <a className="text-orange-600 hover:underline" href="mailto:sales@caledoniasigns.co.uk">
              sales@caledoniasigns.co.uk
            </a>{' '}
            or call 01592 655646 with your order number.
          </p>
        </section>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          Operated by: Caledonia Signs Limited | Company No. SC163223
        </div>
      </div>
    </div>
  );
}
