'use client';

import { Riders } from '@/types/riders';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import { Info } from '../ui/ProfileInfo';

interface RiderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    rider: Riders | null;
}

export default function RiderDetailsModal({
    isOpen,
    onClose,
    rider,
}: RiderDetailsModalProps) {
    if (!rider) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">

                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 backdrop-blur-md px-8 py-5">
                        <div>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                                Rider Profile
                            </DialogTitle>
                            <p className="text-sm text-gray-500">
                                Detailed information about this rider
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[75vh] overflow-y-auto px-8 py-8 space-y-10">

                        {/* Profile Section */}
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                                {rider.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {rider.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Rider ID: {rider.id}
                                </p>

                                <span
                                    className={`inline-flex items-center mt-2 rounded-full px-3 py-1 text-xs font-medium ${rider.isLogged
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    {rider.isLogged ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <section>
                            <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                <Info label="Full Name" value={rider.name} />
                                <Info label="Email Address" value={rider.email} />
                                <Info label="Mobile Number" value={rider.mobnum} />
                                <Info label="Address" value={rider.address} />
                            </div>
                        </section>

                        {/* Account Dates */}
                        <section>
                            <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">
                                Account Details
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                <Info
                                    label="Created At"
                                    value={
                                        rider.createdAt
                                            ? new Date(rider.createdAt).toLocaleString()
                                            : '-'
                                    }
                                />
                                <Info
                                    label="Last Updated"
                                    value={
                                        rider.updatedAt
                                            ? new Date(rider.updatedAt).toLocaleString()
                                            : '-'
                                    }
                                />
                            </div>
                        </section>

                        {/* Places */}
                        {rider.places && rider.places.length > 0 && (
                            <section>
                                <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase mb-4">
                                    Saved Places
                                </h3>

                                <div className="space-y-4">
                                    {rider.places.map((place, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <p className="font-medium text-gray-900">
                                                {place.name || 'Unnamed Place'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Coordinates: {place.coordinates[0]}, {place.coordinates[1]}
                                            </p>
                                            {place.notes && (
                                                <p className="text-sm text-gray-400 italic">
                                                    Notes: {place.notes}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}