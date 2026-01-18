'use client';

import Link from 'next/link';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
    DocumentTextIcon,
    ShieldCheckIcon,
    ClipboardDocumentCheckIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

const policies = [
    {
        name: 'Privacy Policy',
        description: 'How we protect your personal data',
        href: '/privacy-policy',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Code of Conduct',
        description: 'Our guidelines for driver and rider behavior',
        href: '/code-of-conduct',
        icon: ClipboardDocumentCheckIcon,
    },
    {
        name: 'Terms of Service',
        description: 'Rules and regulations for using iPick',
        href: '/terms-of-service',
        icon: DocumentTextIcon,
    },
    {
        name: 'Discounts',
        description: 'Information about available promotions',
        href: '/discounts',
        icon: TagIcon,
    },
];

export default function Policies() {
    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center text-sm font-semibold hover:text-green-700 transition duration-300">
                <span>Legal</span>
                <ChevronDownIcon aria-hidden="true" className="size-5 ml-1" />
            </PopoverButton>

            <PopoverPanel
                className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-sm/6 shadow-lg ring-1 ring-gray-200">
                    <div className="p-4">
                        {policies.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-100 hover:text-black transition"
                            >
                                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-green-700">
                                    <item.icon aria-hidden="true" className="size-6 text-green-600 group-hover:text-green-100" />
                                </div>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="mt-1">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
