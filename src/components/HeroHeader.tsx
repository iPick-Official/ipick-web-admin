'use client';

import Image from 'next/image';
import { useState } from 'react';
import DownloadModal from '@/components/DownloadModal';

export default function HeroHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const downloadLinks = [
        {
            label: 'Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.ipick.starter&hl=en',
            icon: '/download/androidDownload.svg',
        },
        {
            label: 'App Store',
            url: 'https://apps.apple.com/ph/app/ipick-booking-services/id6738897138',
            icon: '/download/iosDownload.svg',
        },
    ];

    return (
        <div className="bg-white overflow-x-hidden md:overflow-x-visible">
            <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6fbf73] to-[#FF9E2A] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl font-semibold tracking-tight text-green-700 sm:text-7xl">
                                iPick. <span className="text-orange-600">Bringing you to places</span>
                            </h1>
                            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                                Hatid ka namin saan mo man gustuhin, buong puso at may malasakit.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                                >
                                    Book Now
                                </button>
                                <a href="#learn-more" className="text-sm font-semibold text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        <div className="relative flex justify-center md:justify-end">
                            {/* Abstract background SVG */}
                            <div className="absolute -top-20 -right-20 z-0 w-[500px] h-[700px] opacity-40 pointer-events-none">
                                <Image
                                    src="/abstract-bg.svg"
                                    alt="abstract background"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Foreground Image */}
                            <Image
                                src="/phone-mockup.png"
                                alt="iPick Driver App on smartphone"
                                width={300}
                                height={700}
                                className="relative z-10"
                            />
                        </div>
                    </div>
                </div>
                {/* Background Shape - Bottom */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#6fbf73] to-[#FF9E2A] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>

            <DownloadModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Download iPick Passenger App"
                downloads={downloadLinks}
            />
        </div>
    );
}
