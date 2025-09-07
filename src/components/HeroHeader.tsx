'use client';

import Image from 'next/image';

export default function HeroHeader() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* Background Gradient Shape - Top */}
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

                {/* Hero Content */}
                <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Text Content */}
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl font-semibold tracking-tight text-green-700 sm:text-7xl">
                                iPick. <span className="text-orange-600">Bringing you to places</span>
                            </h1>
                            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                                Hatid ka namin saan mo man gustuhin, buong puso at may malasakit.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4">
                                <a
                                    href="#contact"
                                    className="rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Download App
                                </a>
                                <a href="#learn-more" className="text-sm font-semibold text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Smartphone Image */}
                        <div className="flex justify-center md:justify-end">
                            <Image
                                src="/phone-mockup.png"
                                alt="iPick App on smartphone"
                                width={300}
                                height={700}
                            />
                        </div>
                    </div>
                </div>

                {/* Background Gradient Shape - Bottom */}
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
        </div>
    );
}
