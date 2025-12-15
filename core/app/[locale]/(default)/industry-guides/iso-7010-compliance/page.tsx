import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/vibes/soul/sections/breadcrumbs';

export const metadata: Metadata = {
    title: 'Understanding ISO 7010 | Compliance Guide',
    description: 'Learn why ISO 7010 is the international standard for safety signs and how to ensure your UK business is compliant with the latest regulations.',
};

export default function ISO7010Page() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Industry Guides', href: '/industry-guides' },
                    { label: 'ISO 7010 Compliance', href: '/industry-guides/iso-7010-compliance' }
                ]}
                className="mb-8"
            />

            <header className="mb-8">
                <span className="block text-base font-semibold text-blue-600">Compliance</span>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Understanding ISO 7010: The Gold Standard
                </h1>
                <p className="mt-4 text-xl text-slate-500">
                    Everything you need to know about the international standard for safety signs.
                </p>
            </header>

            <div className="relative mb-10 h-80 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                    src="/images/industry-guides/iso-7010.png"
                    alt="ISO 7010 Exit Sign"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-lg prose-slate mx-auto text-slate-700">
                <h2>What is ISO 7010?</h2>
                <p>
                    ISO 7010 is an International Organization for Standardization technical standard for graphical hazard symbols on hazard and danger signs, including those indicating emergency exits. It uses colours and principles set out in ISO 3864.
                </p>
                <p>
                    The purpose of the standard is to introduce a globally recognised range of safety pictograms. As people travel and work internationally more than ever, having a universal visual language for safety is critical. Text-only signs can be confusing for non-native speakers, but a "Running Man" symbol is understood everywhere.
                </p>

                <h2>Why Compliance Matters in the UK</h2>
                <p>
                    In the UK, the Health and Safety (Safety Signs and Signals) Regulations 1996 require employers to provide specific safety signs whenever there is a risk that has not been avoided or controlled by other means.
                </p>
                <p>
                    While older signs (BS 5499) are still legal if they are clear, mixing them with ISO 7010 signs can be confusing. The best practice, and the recommendation for all new installations, is to strictly follow ISO 7010.
                </p>

                <h2>Key Sign Categories</h2>
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        <strong>Safe Condition (Green):</strong> Signs indicating escape routes, emergency exits, or first aid equipment. E.g., The famous "Running Man".
                    </li>
                    <li className="mb-2">
                        <strong>Mandatory (Blue):</strong> Signs prescribing specific behavior. E.g., "Wear Eye Protection".
                    </li>
                    <li className="mb-2">
                        <strong>Prohibition (Red/White):</strong> Signs forbidding behavior likely to cause a risk to health or safety. E.g., "No Smoking".
                    </li>
                    <li className="mb-2">
                        <strong>Warning (Yellow/Black):</strong> Signs giving warning of a hazard or danger. E.g., "High Voltage".
                    </li>
                    <li>
                        <strong>Fire Fighting (Red):</strong> Signs indicating the location of fire fighting equipment.
                    </li>
                </ul>

                <div className="mt-12 rounded-lg bg-blue-50 p-6 border border-blue-100">
                    <h3 className="text-blue-900 font-bold mb-2">Need Help Upgrading?</h3>
                    <p className="text-blue-800">
                        If your premises still rely on text-heavy or outdated legacy signage, now is the time to upgrade. We offer a full range of ISO 7010 compliant signs to keep your workforce safe and your business legal.
                    </p>
                </div>
            </div>
        </article>
    );
}
