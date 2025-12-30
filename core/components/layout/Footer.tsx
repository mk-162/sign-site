import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <div className="flex gap-4 items-center">
                            <Link href="/" className="block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/ss-logo.svg"
                                    alt="SafetySignHub - GTSE Brand"
                                    width={200}
                                    height={60}
                                    className="h-14 w-auto"
                                />
                            </Link>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/ISO-white.svg"
                                alt="ISO 9001 Certified"
                                width={60}
                                height={60}
                                className="h-14 w-auto"
                            />
                        </div>
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
                                <a href="/kb/faq" className="hover:text-orange-500 transition-colors">
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
                                    0161 870 6350
                                    <br />
                                    <span className="text-xs text-slate-500">Mon-Fri 9am-5.30pm GMT</span>
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <a href="mailto:sales@safetysignhub.co.uk" className="hover:text-orange-500 transition-colors">sales@safetysignhub.co.uk</a>
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
                    <p className="shrink min-w-0">&copy; 2025 Safety Sign Hub - A GTSE Brand. All rights reserved. Operated by Gocableties Ltd (GTSE) | Company No. 09162871</p>
                    <div className="flex gap-3 items-center flex-nowrap shrink-0 justify-center md:justify-end opacity-70 hover:opacity-100 transition-opacity duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/amex-stacked.svg" alt="American Express" className="h-4 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/mastercard-new.svg" alt="Mastercard" className="h-5 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg" alt="Amazon Pay" className="h-3 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-4 w-auto brightness-0 invert" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-4 w-auto brightness-0 invert" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
