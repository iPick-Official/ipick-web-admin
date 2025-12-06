"use client";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    if (!isOpen) return null;

    // width + max-height mapping for sizes
    const sizeClasses = {
        sm: "max-w-sm max-h-[40vh]",
        md: "max-w-md max-h-[60vh]",
        lg: "max-w-lg max-h-[70vh]",
        xl: "max-w-xl max-h-[80vh]",
        full: "w-full h-full max-h-screen max-w-screen",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                className={`bg-white rounded-lg shadow-lg w-full ${sizeClasses[size]} mx-auto overflow-y-auto`}
            >
                {/* Header */}
                {title && (
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
