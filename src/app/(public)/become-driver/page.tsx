'use client';

import Footer from '@/components/LandingPageFooter';
import Navbar from '@/components/LandingPageNavbar';
import DownloadModal from '@/components/LandingPageDownload';
import DriverOnboard from '@/components/LandingPageOnboard';
import Image from 'next/image';
import { useState } from 'react';
import { CloudArrowDownIcon, IdentificationIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { ShieldCheckIcon, MapPinIcon, PowerCircleIcon } from 'lucide-react';

const features = [
    {
        name: 'Download the App',
        description: 'Start your journey by downloading the iPick Driver app from the App Store or Google Play.',
        icon: CloudArrowDownIcon,
    },
    {
        name: 'Register & Submit Documents',
        description: 'Sign up and upload the required documents — such as your license and vehicle registration.',
        icon: IdentificationIcon,
    },
    {
        name: 'Profile Verification',
        description: 'We’ll verify your information and notify you once your account is approved.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Turn on Your Location',
        description: 'Enable location services to receive nearby passenger bookings in real-time.',
        icon: MapPinIcon,
    },
    {
        name: 'Start Accepting Rides',
        description: 'Go online, accept ride requests, and begin earning on your own schedule.',
        icon: PowerCircleIcon,
    },
    {
        name: 'Get Paid',
        description: 'Receive your earnings through secure in-app payouts — fast and hassle-free.',
        icon: CurrencyDollarIcon,
    },
];

export default function BecomeDriver() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const driverDownloads = [
        {
            label: 'Download from Google Play',
            url: 'https://play.google.com/store/apps/details?id=ipick.driver.com&pcampaignid=web_share',
            bgColor: 'bg-green-600',
            icon: '/download/androidDownload.svg',
        },
        {
            label: 'Download from App Store',
            url: 'https://apps.apple.com/ph/app/ipick-driver/id6747301801',
            bgColor: 'bg-gray-800',
            icon: '/download/iosDownload.svg',
        },
    ];

    return (
        <>
            <div className="bg-white dark:bg-zinc-900 min-h-screen flex flex-col overflow-x-hidden md:overflow-x-visible">
                <Navbar />

                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow">
                    {/* Background Shape - Top */}
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
                            {/* Text Content */}
                            <div className="text-center md:text-left">
                                <Image
                                    src='/logo-word.png'
                                    width={500}
                                    height={500}
                                    alt='logo-word'
                                />
                                <h1 className="text-5xl font-semibold text-orange-400 sm:text-6xl font-cursive">
                                    Driver
                                </h1>
                                <p className="mt-8 text-lg font-medium sm:text-xl">
                                    Be your own boss. Drive with iPick and enjoy flexible hours, steady income, and full support every step of the way.
                                </p>
                                <div className="mt-10 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
                                    >
                                        Become a Driver
                                    </button>
                                    <a href="#learn-more" className="text-sm font-semibold">
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
                                    src="/driver-mobile.png"
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
                <DriverOnboard />
                <section id="learn-more" className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                                How iPick Driver Works?
                            </p>
                            <p className="mt-6 text-lg leading-8">
                                iPick Driver is built for partners who want flexibility, control over their time, and access to a growing passenger network. Here&apos;s how drivers thrive on the iPick platform.
                            </p>
                        </div>

                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7">
                                            <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base leading-7">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>


                {/* Modal */}
                <DownloadModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    title="Download iPick Driver App"
                    downloads={driverDownloads}
                />
            </div>
            <Footer />
        </>
    );
}
