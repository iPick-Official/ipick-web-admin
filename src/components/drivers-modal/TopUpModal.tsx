'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Driver } from '@/types/drivers';

interface TopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    driver: Driver | null;

    // controlled state
    amount: number;
    setAmount: (value: number) => void;
}

export default function TopUpModal({
    isOpen,
    onClose,
    onConfirm,
    driver,
    amount,
    setAmount,
}: TopUpModalProps) {

    if (!driver) return null;

    const handlePreset = (value: number) => {
        setAmount(amount + value);
    };

    const handleClear = () => {
        setAmount(0);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Center */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-2xl 
                    bg-white dark:bg-gray-900 
                    shadow-2xl dark:border-gray-800 
                    overflow-hidden transition">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-600 px-6 py-4 text-white">
                        <DialogTitle className="text-lg font-semibold">
                            Top Up Wallet
                        </DialogTitle>
                        <p className="text-xs text-green-100 mt-1">
                            Add balance to driver account
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-5">

                        {/* Driver Info */}
                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-4 space-y-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Driver
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {driver.name}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Current Balance
                            </p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                ₱{driver.wallet?.walletBalance?.toFixed(2) ?? '0.00'}
                            </p>
                        </div>

                        {/* Input */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Amount
                            </label>

                            <div className="mt-2 flex gap-2">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    placeholder="0.00"
                                    className="w-full rounded-xl 
                                        border border-gray-200 dark:border-gray-700 
                                        bg-white dark:bg-gray-800 
                                        px-4 py-3 text-sm 
                                        text-gray-900 dark:text-white
                                        outline-none 
                                        focus:border-green-500 
                                        focus:ring-2 focus:ring-green-500/30 
                                        transition"
                                />

                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="rounded-xl border border-gray-200 dark:border-gray-700 
                                        px-3 text-sm text-gray-600 dark:text-gray-300 
                                        hover:bg-gray-100 dark:hover:bg-gray-800 
                                        transition"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {/* Presets */}
                        <div className="grid grid-cols-3 gap-2">
                            {[50, 100, 200, 300, 500, 1000].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => handlePreset(val)}
                                    className="rounded-full border 
                                        border-gray-200 dark:border-gray-700 
                                        bg-gray-50 dark:bg-gray-800 
                                        py-2 text-sm font-medium 
                                        text-gray-700 dark:text-gray-200 
                                        hover:bg-gray-100 dark:hover:bg-gray-700 
                                        active:scale-95 transition"
                                >
                                    +₱{val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 
                        border-t border-gray-200 dark:border-gray-800 
                        bg-gray-50 dark:bg-gray-900 px-6 py-4">

                        <button
                            onClick={onClose}
                            className="rounded-xl px-4 py-2 text-sm font-medium 
                                text-gray-600 dark:text-gray-300 
                                hover:bg-gray-200 dark:hover:bg-gray-800 
                                transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={!amount}
                            className="rounded-xl bg-green-600 px-5 py-2 
                                text-sm font-semibold text-white 
                                shadow-md hover:bg-green-700 
                                disabled:opacity-40 disabled:cursor-not-allowed 
                                transition"
                        >
                            Top Up ₱{amount || 0}
                        </button>

                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}