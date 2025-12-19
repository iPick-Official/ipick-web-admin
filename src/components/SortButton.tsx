"use client";

import React from "react";

type SortOrder = "asc" | "desc";

interface SortButtonProps {
    label: string;
    sortOrder: SortOrder;
    onToggle: () => void;
    className?: string;
}

export default function SortButton({
    label,
    sortOrder,
    onToggle,
    className = "",
}: SortButtonProps) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-1 uppercase transition hover:text-gray-600 ${className}`}
        >
            {label}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                />
            </svg>
        </button>
    );
}
