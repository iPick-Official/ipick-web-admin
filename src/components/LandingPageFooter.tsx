'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6 },
        }),
    };

    return (
        <footer
            id="contact"
            className="relative bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 py-16 px-6 sm:px-12"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Company Info */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-3"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">iPick</h3>
                    <p className="text-sm leading-relaxed">
                        iPick is your go-to ride-hailing app for fast, safe, and affordable travel. We bring you to places with care and convenience.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-3"
                >
                    <h4 className="text-md font-semibold mb-2">Quick links</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: 'Driver Center', href: '/driver-center' },
                            { name: 'Help Center', href: '/help-center' },
                            { name: 'Become a Driver', href: '/become-driver' },
                            { name: 'Apply for Discounts', href: '/discounts' },
                        ].map((link, i) => (
                            <motion.li
                                key={link.name}
                                whileHover={{ x: 5, color: '#16a34a' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href={link.href} className="inline-block">
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Legal */}
                <motion.div
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-3"
                >
                    <h4 className="text-md font-semibold mb-2">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: 'Privacy Policy', href: '/privacy-policy' },
                            { name: 'Code of Conduct', href: '/code-of-conduct' },
                            { name: 'Terms & Conditions', href: '/terms-of-service' },
                            { name: 'Support', href: 'mailto:support@ipick.com' },
                        ].map((link, i) => (
                            <motion.li
                                key={link.name}
                                whileHover={{ x: 5, color: '#16a34a' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href={link.href} className="inline-block">
                                    {link.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* App Downloads */}
                <motion.div
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="space-y-4 flex flex-col items-center sm:items-start"
                >
                    <h4 className="text-md font-semibold mb-2">Get the App</h4>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.ipick.starter&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <Image
                            src="/download/androidDownload.svg"
                            alt="Download on Google Play"
                            width={144}
                            height={48}
                            style={{ objectFit: 'contain' }}
                        />
                    </a>
                    <a
                        href="https://apps.apple.com/ph/app/ipick-booking-services/id6738897138"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        <Image
                            src="/download/iosDownload.svg"
                            alt="Download on the App Store"
                            width={144}
                            height={48}
                            style={{ objectFit: 'contain' }}
                        />
                    </a>
                </motion.div>
            </div>

            {/* Bottom Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 border-t border-gray-300 pt-6 text-center text-sm sm:text-base"
            >
                <p>© {currentYear} iPick. All rights reserved.</p>
            </motion.div>
        </footer>
    );
};

export default Footer;