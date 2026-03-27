'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import { Booking } from '@/types/bookings';

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export default function BookingDetailsModal({
    isOpen,
    onClose,
    booking,
}: BookingDetailsModalProps) {
    if (!booking) return null;

    const distanceFare =
        booking.computations.fareDistanceInKM *
        booking.computations.costPerKM;

    const durationFare =
        booking.computations.fareDurationInMins *
        booking.computations.costPerMin;

    const pickupFare = booking.pickupFare ?? 0;

    const systemShare = booking.systemShare ?? 0;

    const subtotal =
        booking.computations.baseFare +
        distanceFare +
        durationFare +
        pickupFare +
        booking.computations.serviceFee +
        systemShare;

    const surgeCharge = Math.max(0, booking.travelFare - subtotal);
    const incentives = systemShare * 0.4;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow-2xl rounded-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">

                    {/* Header */}
                    <div className="relative text-center border-b border-gray-200 dark:border-zinc-700 px-6 py-6">
                        <DialogTitle className="text-xl font-bold">{`BOOKING RECEIPT`}</DialogTitle>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ref: {booking.referenceNumber}</p>
                        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 text-sm space-y-4">

                        {/* Trip Info */}
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Trip Details</p>
                            <div className="mt-2 space-y-1">
                                <div className="flex justify-between"><span>Distance</span><span>{booking.computations.fareDistanceInKM.toFixed(2)} km</span></div>
                                <div className="flex justify-between"><span>Duration</span><span>{booking.computations.fareDurationInMins.toFixed(1)} mins</span></div>
                            </div>
                        </div>

                        <hr className="border-dashed border-gray-300 dark:border-zinc-700" />

                        {/* Fare Breakdown */}
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Fare Breakdown</p>
                            <div className="mt-2 space-y-1">
                                {[
                                    ["Base Fare", booking.computations.baseFare.toFixed(2)],
                                    ["Distance Fare", distanceFare.toFixed(2)],
                                    ["Time Fare", durationFare.toFixed(2)],
                                    ["Pickup Fare", pickupFare.toFixed(2)],
                                    ["Service Fee", booking.computations.serviceFee.toFixed(2)],
                                    ["System Share", systemShare.toFixed(2)],
                                    ["Surge Charge", surgeCharge.toFixed(2)],
                                    ["Incentives", incentives.toFixed(2)]
                                ].map(([label, value]) => (
                                    <div className="flex justify-between" key={label}>
                                        <span>{label}</span>
                                        <span>₱{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-dashed border-gray-300 dark:border-zinc-700" />

                        {/* Total */}
                        <div className="flex justify-between text-base font-bold font-mono">
                            <span>TOTAL</span>
                            <span>₱{booking.travelFare.toFixed(2)}</span>
                        </div>

                        <hr className="border-dashed border-gray-300 dark:border-zinc-700" />

                        {/* Route */}
                        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <p><span className="font-semibold">From:</span> {booking.origin?.name || '-'}</p>
                            <p><span className="font-semibold">To:</span> {booking.destination?.name || '-'}</p>
                        </div>

                        <hr className="border-dashed border-gray-300 dark:border-zinc-700" />

                        {/* Meta */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            {[
                                ["Seat Type", booking.seatType],
                                ["Payment", booking.paymentMethod],
                                ["Status", booking.status.toUpperCase()],
                                ["Date", booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "-"]
                            ].map(([label, value]) => (
                                <div className="flex justify-between" key={label}>
                                    <span>{label}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>

                        {booking.notes && (
                            <>
                                <hr className="border-dashed border-gray-300 dark:border-zinc-700" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 italic text-center">"{booking.notes}"</p>
                            </>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}