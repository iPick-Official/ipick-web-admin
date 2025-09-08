'use client';

import Image from 'next/image';

export default function DriverOnboard() {
    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    >
                        <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#35e950ff" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            iPick Driver Onboarding
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Welcome to iPick driver onboarding process. Please review the necessary
                            information to get started quickly and easily.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/IPICK.pdf"
                                className="text-sm font-semibold text-green-400 hover:text-green-500"
                            >
                                Start Onboarding{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8 lg:h-auto lg:w-[45rem]">
                        <Image
                            alt="App screenshot"
                            src="/driver-marketing.png"
                            fill
                            className="absolute top-0 left-0 rounded-md bg-white/10 ring-1 ring-gray-700 object-cover"
                            sizes="(min-width: 1024px) 45rem, 100vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
