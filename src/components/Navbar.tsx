'use client';

import Image from 'next/image';
import { useState } from 'react';
import Policies from './Policies';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // Import the hook

export default function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();  // Get current path

    // Check if the current page is become-driver
    const isBecomeDriverPage = pathname === '/become-driver';

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex items-center lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                        <span className="sr-only">iPick</span>
                        <Image
                            src="/logo-word.png"
                            alt="iPick logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="size-6"
                            aria-hidden="true"
                        >
                            <path
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Policies />
                    <a
                        href="/driver-center"
                        className="text-sm font-semibold text-gray-900 hover:text-green-700 transition duration-300"
                    >
                        Driver Center
                    </a>
                    <a
                        href="/help-center"
                        className="text-sm font-semibold text-gray-900 hover:text-green-700 transition duration-300"
                    >
                        Help Center
                    </a>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {/* Only show "Become a Driver" link if NOT on the become-driver page */}
                    {!isBecomeDriverPage && (
                        <a href="/become-driver" className="text-sm font-semibold text-red-700">
                            Become a Driver <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">iPick</span>
                            <Image
                                src="/logo.png"
                                alt=""
                                className="h-8 w-auto"
                                width={32}
                                height={32}
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6 18 18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Policies />
                                <a href="/driver-center" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Driver Center</a>
                                <a href="/help-center" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Help Center</a>
                            </div>
                            <div className="py-6">
                                {/* Hide Become a Driver in mobile menu also */}
                                {!isBecomeDriverPage && (
                                    <a href="/become-driver" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-red-700 hover:bg-gray-50">
                                        Become a Driver
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
