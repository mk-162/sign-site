'use client';

import React from 'react';
import { CheckCircle2, Truck, Settings, Phone } from 'lucide-react';

const features = [
    {
        icon: CheckCircle2,
        title: 'Compliance Guaranteed',
        description:
            'Every sign we manufacture meets the latest ISO 7010 and BS EN ISO 7010 standards.',
    },
    {
        icon: Truck,
        title: 'Fast Shipping',
        description: '98% of orders ship same-day. Free shipping on all orders over £50 (ex. VAT).',
    },
    {
        icon: Settings,
        title: 'Custom Manufacturing',
        description:
            'Need specific wording or branding? We design and manufacture custom signs in-house.',
    },
    {
        icon: Phone,
        title: 'Expert Support',
        description: 'Real safety experts ready to help you find the right compliance solutions.',
    },
];

export function WhyChooseUs() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="bg-[#1e293b] rounded-2xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="text-2xl font-black mb-6 text-white">
                            Why Professionals <br />
                            Trust <span className="text-orange-500">SafetySignHub</span>
                        </h3>
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="h-12 px-3 bg-white rounded flex items-center">
                                <span className="text-slate-800 font-bold text-sm">ISO 7010</span>
                            </div>
                            <div className="h-12 px-3 bg-white rounded flex items-center">
                                <span className="text-slate-800 font-bold text-sm">BS EN</span>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="bg-orange-500/20 p-3 rounded-lg h-fit">
                                    <feature.icon className="w-8 h-8 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 text-white">{feature.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
