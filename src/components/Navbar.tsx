'use client';

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
    { label: "About Us", path: "/" },
    { label: "Driver Center", path: "/driver-center" },
    { label: "Help Center", path: "/help-center" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-24"
                }`}
        >
            <div className="rounded-full bg-gradient-to-r from-orange-50/70 via-white/50 to-amber-50/70 backdrop-blur-md border border-orange-100 shadow-lg">
                <div className="px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Image
                                src="/logo-word.png"
                                alt="21st Learning Center Logo"
                                width={100}
                                height={100}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex gap-10 text-sm text-slate-800">
                            {navItems.map((item) => (
                                <li key={item.path} className="group relative">
                                    <Link
                                        href={item.path}
                                        className="transition-colors duration-300 group-hover:text-orange-500"
                                    >
                                        {item.label}
                                    </Link>
                                    <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </li>
                            ))}
                        </ul>

                        {/* Enroll Button → Navigate to /become-driver */}
                        <Link
                            href="/become-driver"
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition"
                        >
                            Be our Partner
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-800"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle Menu"
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-2 rounded-2xl bg-gradient-to-r from-orange-50/70 via-white/50 to-amber-50/70 backdrop-blur-md border border-orange-100 shadow-lg">
                    <ul className="flex flex-col items-center gap-6 py-6 text-slate-800 text-sm">
                        {navItems.map((item) => (
                            <li key={item.path} onClick={() => setOpen(false)}>
                                <Link
                                    href={item.path}
                                    className="transition-colors duration-300 hover:text-orange-500"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile Enroll → Navigate to /become-driver */}
                        <li>
                            <Link
                                href="/become-driver"
                                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-medium transition"
                                onClick={() => setOpen(false)}
                            >
                                Become our Driver
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}