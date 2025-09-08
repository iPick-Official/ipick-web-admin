'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contact"
            className="bg-gray-100 text-gray-800 py-10 px-6 text-center sm:text-left"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Company Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">iPick</h3>
                    <p className="text-sm leading-relaxed">
                        iPick is your go-to ride-hailing app for fast, safe, and affordable travel. We bring you to places with care and convenience.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Quick links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/driver-center" className="hover:text-green-600">
                                Driver Center
                            </a>
                        </li>
                        <li>
                            <a href="/help-center" className="hover:text-green-600">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="/become-driver" className="hover:text-green-600">
                                Become a Driver
                            </a>
                        </li>
                        <li>
                            <a href="/discounts" className="hover:text-green-600">
                                Apply for Discounts
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/privacy-policy" className="hover:text-green-600">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/code-of-conduct" className="hover:text-green-600">
                                Code of Conduct
                            </a>
                        </li>
                        <li>
                            <a href="/terms-of-service" className="hover:text-green-600">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="mailto:support@ipick.com" className="hover:text-green-600">
                                Support
                            </a>
                        </li>
                    </ul>
                </div>

                {/* App Downloads */}
                <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Get the App</h4>
                    <div className="flex flex-col gap-4 items-center sm:items-start">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.ipick.starter&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/download/androidDownload.svg"
                                alt="Download on Google Play"
                                width={144}  // 12rem * 12px per rem = 144px (optional, or use actual SVG width)
                                height={48}  // height 12 (3rem = 48px)
                                style={{ objectFit: 'contain' }}
                            />
                        </a>
                        <a
                            href="https://apps.apple.com/ph/app/ipick-booking-services/id6738897138"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/download/iosDownload.svg"
                                alt="Download on the App Store"
                                width={144}
                                height={48}
                                style={{ objectFit: 'contain' }}
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-10 border-t border-gray-300 pt-6 text-center">
                <p className="mb-4 text-sm sm:text-base">
                    © {currentYear} iPick. All rights reserved.
                </p>
                {/* <div className="flex gap-6 justify-center flex-wrap text-sm sm:text-base">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600"
                    >
                        Instagram
                    </a>
                    <a
                        href="mailto:support@ipick.com"
                        className="hover:text-green-600"
                    >
                        Contact
                    </a>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
