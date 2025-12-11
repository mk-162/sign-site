'use client';

import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from 'lucide-react';

const STORE_URL = 'http://localhost:3000';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white font-sans">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <a href="/" className="block">
                            <img
                                src="/images/ss-logo.svg"
                                alt="SafetySignHub - GTSE Brand"
                                className="h-14 w-auto"
                            />
                        </a>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Safety Sign Hub is the specialist safety signage division of <span className="text-white font-bold">GTSE</span> (Gocableties Ltd), delivering compliant, durable workplace safety signs across the UK and internationally.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="/trade-enquiries" className="hover:text-orange-400 transition-colors">Trade Enquiries</a></li>
                            <li><a href="/about-us" className="hover:text-orange-400 transition-colors">About Us</a></li>
                            <li><a href={`${STORE_URL}/safety-signs`} className="hover:text-orange-400 transition-colors">Safety Signs</a></li>
                            <li><a href={`${STORE_URL}/fire-safety`} className="hover:text-orange-400 transition-colors">Fire Safety</a></li>
                            <li><a href={`${STORE_URL}/construction`} className="hover:text-orange-400 transition-colors">Construction</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="/contact-us" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
                            <li><a href="/delivery-returns" className="hover:text-orange-400 transition-colors">Delivery & Returns</a></li>
                            <li><a href="/kb" className="hover:text-orange-400 transition-colors">Knowledge Base</a></li>
                            <li><a href="/blog" className="hover:text-orange-400 transition-colors">Blog</a></li>
                            <li><a href="/terms-conditions" className="hover:text-orange-400 transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-0.5 text-orange-500" />
                                <div>
                                    <div className="font-medium text-white">01246 386 126</div>
                                    <div className="text-xs">Mon-Fri 9am-5:30pm GMT</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 mt-0.5 text-orange-500" />
                                <a href="mailto:safety@gtse.co.uk" className="hover:text-orange-400 transition-colors">
                                    safety@gtse.co.uk
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-orange-500" />
                                <div>
                                    GTSE | WeWork - Dalton Place<br />
                                    29 John Dalton St<br />
                                    Manchester | M2 6DS
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 bg-slate-950">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex flex-col gap-1">
                        <div>
                            Safety Sign Hub is operated by <span className="text-slate-400 font-semibold">Gocableties Ltd</span> (Company No. 09162871)
                        </div>
                        <div>
                            Registered Office: WeWork - Dalton Place, 29 John Dalton St, Manchester, M2 6DS | VAT No. 197 116 978
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                        <a href="/terms-conditions" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
