'use client';

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import DownloadModal from "@/components/LandingPageDownload";
import Image from "next/image";
import Link from "next/link";

export default function HeroHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const downloadLinks = [
        {
            label: "Google Play",
            url: "https://play.google.com/store/apps/details?id=com.ipick.starter&hl=en",
            icon: "/download/androidDownload.svg",
        },
        {
            label: "App Store",
            url: "https://apps.apple.com/ph/app/ipick-booking-services/id6738897138",
            icon: "/download/iosDownload.svg",
        },
    ];

    // Ref for the hero section
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: false, margin: "-100px" }); // triggers when scrolled into view

    return (
        <section ref={heroRef} className="relative bg-gradient-to-b from-white to-orange-50 overflow-hidden">
            {/* Top Abstract Shape */}
            <div
                aria-hidden="true"
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[72rem] aspect-[1155/678] bg-gradient-to-tr from-green-300 via-yellow-200 to-orange-200 opacity-30 blur-3xl rotate-[30deg]"
                style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:py-56 grid md:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                    className="text-center md:text-left space-y-6"
                >
                    <Image
                        src="/logo-word.png"
                        width={200}
                        height={100}
                        alt="iPick Logo"
                        className="mx-auto md:mx-0"
                    />
                    <h1 className="text-2xl sm:text-5xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
                        Bringing you to places.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 max-w-lg mx-auto md:mx-0">
                        iPick connects passengers with trusted drivers efficiently and safely. Book your ride, track your driver, and experience hassle-free travel anytime, anywhere.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition"
                        >
                            Book Now
                        </button>
                        <Link
                            href="/become-driver"
                            className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full font-semibold transition"
                        >
                            Become a Driver
                        </Link>
                    </div>
                </motion.div>

                {/* Right Content - Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 1 }}
                    className="relative flex justify-center md:justify-end"
                >
                    <div className="absolute -top-20 -right-20 w-[400px] h-[700px] opacity-30 pointer-events-none">
                        <Image
                            src="/abstract-bg.svg"
                            alt="Abstract Background"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <Image
                        src="/phone-mockup.png"
                        alt="iPick App on smartphone"
                        width={300}
                        height={700}
                        className="relative z-10 "
                    />
                </motion.div>
            </div>

            {/* Bottom Abstract Shape */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[72rem] aspect-[1155/678] bg-gradient-to-tr from-green-300 via-yellow-200 to-orange-200 opacity-20 blur-3xl rotate-[0deg]"
                style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />

            <DownloadModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Download iPick Passenger App"
                downloads={downloadLinks}
            />
        </section>
    );
}