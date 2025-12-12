import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, User, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src="/images/ss-logo.svg"
                                alt="SafetySignHub - GTSE Brand"
                                width={200}
                                height={60}
                                className="h-14 w-auto"
                            />
                        </Link>
                        <p className="text-sm max-w-sm leading-relaxed">
                            The leading provider of industrial safety signage and equipment. Dedicated to keeping your
                            workplace safe, compliant, and productive.
                        </p>
                        {/* Social icons will be added here later */}
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/shop-by-sign-type/warning-signs/" className="hover:text-orange-500 transition-colors">
                                    Warning Signs
                                </a>
                            </li>
                            <li>
                                <a href="/shop-by-sign-type/prohibition-signs/" className="hover:text-orange-500 transition-colors">
                                    Prohibition Signs
                                </a>
                            </li>
                            <li>
                                <a href="/shop-by-sign-type/mandatory-signs/" className="hover:text-orange-500 transition-colors">
                                    Mandatory Signs
                                </a>
                            </li>
                            <li>
                                <a href="/shop-by-sign-type/safe-condition-signs/" className="hover:text-orange-500 transition-colors">
                                    Safe Condition Signs
                                </a>
                            </li>
                            <li>
                                <a href="/shop-by-sign-type/fire-safety-signs/" className="hover:text-orange-500 transition-colors">
                                    Fire Safety Signs
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Support & Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/about-us" className="hover:text-orange-500 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-orange-500 transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/kb" className="hover:text-orange-500 transition-colors">
                                    Knowledge
                                </a>
                            </li>
                            <li>
                                <a href="/contact-us" className="hover:text-orange-500 transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/delivery-returns" className="hover:text-orange-500 transition-colors">
                                    Delivery & Returns
                                </a>
                            </li>
                            <li>
                                <a href="/trade-enquiries" className="hover:text-orange-500 transition-colors">
                                    Trade Enquiries
                                </a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-orange-500 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms-conditions" className="hover:text-orange-500 transition-colors">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>
                                    01246 386 126
                                    <br />
                                    <span className="text-xs text-slate-500">Mon-Fri 9am-5.30pm GMT</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>sales@safetysignhub.co.uk</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>
                                    GTSE | WeWork - Dalton Place
                                    <br />
                                    29 John Dalton St
                                    <br />
                                    Manchester
                                    <br />
                                    M2 6DS
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; 2025 Safety Sign Hub - A GTSE Brand. All rights reserved. Operated by Gocableties Ltd | Company No. 09162871 | VAT No. 197 116 978</p>
                    <div className="flex gap-4">
                        <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Visa</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Mastercard</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Amex</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
