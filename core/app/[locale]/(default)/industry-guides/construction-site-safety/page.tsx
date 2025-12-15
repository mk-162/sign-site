import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/vibes/soul/sections/breadcrumbs';

export const metadata: Metadata = {
    title: 'Construction Site Safety Signs | Mandatory Checklist',
    description: 'Ensure your UK construction site is safe and compliant with our checklist of mandatory safety signage. Hard hat areas, hazard warnings, and site access rules.',
};

export default function ConstructionSafetyPage() {
    return (
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Industry Guides', href: '/industry-guides' },
                    { label: 'Construction Safety', href: '/industry-guides/construction-site-safety' }
                ]}
                className="mb-8"
            />

            <header className="mb-8">
                <span className="block text-base font-semibold text-yellow-600">Site Safety</span>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Construction Site Safety: The Mandatory Checklist
                </h1>
                <p className="mt-4 text-xl text-slate-500">
                    Keeping your site secure and your workforce protected with compliant signage.
                </p>
            </header>

            <div className="relative mb-10 h-80 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                    src="/images/industry-guides/construction.png"
                    alt="Construction Site Hoarding Signs"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-lg prose-slate mx-auto text-slate-700">
                <h2>The High Stakes of Construction Safety</h2>
                <p>
                    Construction is one of the most hazardous industries in the UK. The Health and Safety Executive (HSE) enforces strict rules to prevent accidents. Signage plays a frontline role in communicating risks to workers, visitors, and the public.
                </p>

                <h2>Site Entrance: The First Line of Defense</h2>
                <p>
                    The perimeter of your site is where safety starts. Legally, you must display specific information to the public and anyone attempting to enter.
                </p>
                <ul className="list-disc pl-6">
                    <li><strong>"No Unauthorized Access"</strong>: Clarifies that the site is not a public area.</li>
                    <li><strong>Site Contact Details</strong>: Who to call in an emergency.</li>
                    <li><strong>Mandatory PPE Requirements</strong>: "Hard Hats Must Be Worn", "Safety Boots Required", "High Visibility Vests Mandatory".</li>
                </ul>

                <h2>Multi-Message Safety Boards</h2>
                <p>
                    To keep site entrances uncluttered but compliant, most main contractors use large Multi-Message Boards (`Site Safety Boards`). These combine:
                </p>
                <ol className="list-decimal pl-6">
                    <li><strong>Manadatory (Blue)</strong>: PPE instructions.</li>
                    <li><strong>Warning (Yellow)</strong>: "Danger Construction Site", "Deep Excavations", "Cranes Overhead".</li>
                    <li><strong>Prohibition (Red)</strong>: "No Entry to General Public", "No Children".</li>
                </ol>

                <h2>Specific Hazard Signage</h2>
                <p>
                    Inside the site, signs must move with the hazards.
                </p>
                <ul className="list-disc pl-6">
                    <li><strong>Electrical Hazards:</strong> High voltage warnings near generators and temporary power supplies.</li>
                    <li><strong>Traffic Management:</strong> "5mph Speed Limit", "Reversing Vehicles", and pedestrian walkways must be clearly separated.</li>
                    <li><strong>Hazardous Substances (COSHH):</strong> Storage areas for fuel, cement, and chemicals must be marked.</li>
                </ul>

                <h2>Traffic & Vehicle Safety</h2>
                <p>
                    Accidents involving vehicles are a leading cause of fatal injuries. Banksman signals and clear directional signage for delivery vehicles are essential. "Sound Horn" and "Dead Slow" signs can prevent collisions at blind corners.
                </p>

                <div className="mt-12 rounded-lg bg-yellow-50 p-6 border border-yellow-100">
                    <h3 className="text-yellow-900 font-bold mb-2">Custom Site Boards</h3>
                    <p className="text-yellow-800">
                        We can produce custom-branded site safety boards that include your company logo alongside all mandatory safety messages. This projects a professional image while ensuring full HSE compliance.
                    </p>
                </div>
            </div>
        </article>
    );
}
