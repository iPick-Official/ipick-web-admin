"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();

    return (
        <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition"
                >
                    <ArrowLeft size={24} />
                    <span className="font-medium text-base">Back</span>
                </button>
            </div>
        </nav>
    );
};
