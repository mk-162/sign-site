import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/vibes/soul/sections/breadcrumbs';

export const metadata: Metadata = {
    title: 'Fire Safety Signage Regulations | UK Business Guide',
    description: 'A comprehensive guide to fire safety signage regulations in the UK. Ensure your business complies with the Regulatory Reform (Fire Safety) Order 2005.',
};

export default function FireSafetyPage() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Industry Guides', href: '/industry-guides' },
                    { label: 'Fire Safety Regulations', href: '/industry-guides/fire-safety-regulations' }
                ]}
                className="mb-8"
            />

            <header className="mb-8">
                <span className="block text-base font-semibold text-red-600">Regulations</span>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Fire Safety Signage: UK Regulations Explained
                </h1>
                <p className="mt-4 text-xl text-slate-500">
                    A critical guide to meeting the Regulatory Reform (Fire Safety) Order 2005.
                </p>
            </header>

            <div className="relative mb-10 h-80 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                    src="/images/industry-guides/fire-safety.png"
                    alt="Fire Extinguisher and Action Sign"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-lg prose-slate mx-auto text-slate-700">
                <h2>The Legal Requirement</h2>
                <p>
                    Under the <strong>Regulatory Reform (Fire Safety) Order 2005</strong>, the "Responsible Person" at any commercial premise must ensure that the building is safe for employees and visitors. This includes the provision of adequate safety signage.
                </p>
                <p>
                    Fire safety signs are not optional decoration; they are life-saving tools that provide essential information when seconds count.
                </p>

                <h2>Essential Fire Signs</h2>
                <p>
                    Your fire risk assessment will dictate exactly what you need, but most businesses legally require the following:
                </p>

                <h3>1. Fire Action Notices</h3>
                <p>
                    These must be displayed next to every fire alarm call point and at every final exit door. They tell occupants exactly what to do in an emergency:
                </p>
                <ul className="list-disc pl-6">
                    <li>How to raise the alarm</li>
                    <li>How to contact the fire brigade</li>
                    <li>Where the assembly point is</li>
                </ul>

                <h3>2. Fire Exit Signs</h3>
                <p>
                    All escape routes must be clearly marked. The signs should be placed so that from any point in the building, the path to safety is obvious. If the direct view of an exit is obscured, directional arrows must be used.
                </p>

                <h3>3. Fire Extinguisher ID Signs</h3>
                <p>
                    Extinguishers themselves are red, but different types (Water, CO2, Foam, Powder) are used for different fires. Identification signs must be placed next to each extinguisher explaining:
                </p>
                <ul className="list-disc pl-6">
                    <li>The type of extinguisher</li>
                    <li>What fires it is safe to use on</li>
                    <li>What fires it must NOT be used on</li>
                </ul>

                <h3>4. Fire Alarm Call Points</h3>
                <p>
                    Red "Fire Alarm" signs should identify the location of manual call points to ensure they can be located quickly.
                </p>

                <div className="mt-12 rounded-lg bg-red-50 p-6 border border-red-100">
                    <h3 className="text-red-900 font-bold mb-2">Photoluminescent Signs (Glow in the Dark)</h3>
                    <p className="text-red-800">
                        It is highly recommended (and often required) to use photoluminescent rigid plastic signs. In the event of a power failure during a fire, these signs glow brightly, guiding people to safety through smoke and darkness.
                    </p>
                </div>
            </div>
        </article>
    );
}
