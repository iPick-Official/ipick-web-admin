'use client';
import React, { useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Keyboard navigation: Left = Previous, Right = Next
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && currentPage > 1) {
                onPageChange(currentPage - 1);
            } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages, onPageChange]);

    // Early return for no pages
    if (totalPages === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            {/* Previous Button */}
            <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &larr;
            </button>

            {/* Current Page */}
            <span className="px-4 py-2 rounded-md border border-gray-300">
                Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &rarr;
            </button>
        </div>
    );
};
