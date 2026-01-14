'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Loading } from '@/components/Loading';
import { Download, PenBox, PlusIcon } from 'lucide-react';
import { PeakHour } from '@/types/peak-hour';
import Modal from '@/components/Modal';

export default function RainyDaySurge() {
    const [loading, setLoading] = useState(false);
    const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<PeakHour | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function fetchPeakHours() {
            setLoading(true);
            try {
                const res = await fetch('/api/peak-hour');
                if (!res.ok) throw new Error('Failed to fetch peak hours');
                const data = await res.json();
                const peakHourArray = Array.isArray(data)
                    ? data
                    : data.data ?? [];

                setPeakHours(peakHourArray);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPeakHours();
    }, []);

    const filteredPeakHours = peakHours.filter(ph =>
        ph.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ph.dayOfWeek?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ph.AMPMSPECIAL?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">
                        Rainy Day Surge
                    </h2>

                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search ID, Day, AM/PM"
                            className="px-3 py-2 border rounded-md text-sm w-64"
                        />

                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setOpenModal(true);
                            }}
                            className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md"
                        >
                            <PlusIcon />
                        </button>

                        <button className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md">
                            <Download />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="shadow-md rounded-lg overflow-hidden bg-white dark:bg-zinc-800">
                    <div className="overflow-y-auto max-h-[75vh]">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                                <tr>
                                    {[
                                        'ID',
                                        'Day',
                                        'AM/PM',
                                        'From',
                                        'To',
                                        'Surcharge',
                                        'Status',
                                        'Timestamp',
                                    ].map(col => (
                                        <th key={col} className="px-6 py-3 font-medium">
                                            {col}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="py-6 text-center">
                                            <Loading />
                                        </td>
                                    </tr>
                                ) : filteredPeakHours.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="py-6 text-center text-gray-500 italic">
                                            No peak hour records found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPeakHours.map(ph => (
                                        <tr
                                            key={ph._id ?? ph.id ?? `${ph.dayOfWeek}-${ph.FROM}-${ph.TO}`}
                                            className="border-b hover:bg-gray-800 hover:text-white transition"
                                        >
                                            <td className="px-6 py-3">{ph.id}</td>
                                            <td className="px-6 py-3">{ph.dayOfWeek}</td>
                                            <td className="px-6 py-3">{ph.AMPMSPECIAL}</td>
                                            <td className="px-6 py-3">{ph.FROM}</td>
                                            <td className="px-6 py-3">{ph.TO}</td>
                                            <td className="px-6 py-3">
                                                {(ph.peakHourSurcharge * 100).toFixed(0)}%
                                            </td>
                                            <td className="px-6 py-3">
                                                {ph.Status === "1" ? "Active" : "Inactive"}
                                            </td>
                                            <td className="px-6 py-3">{ph.timestamp}</td>
                                            <td className="px-6 py-3 flex justify-end text-green-700">
                                                <PenBox
                                                    className="cursor-pointer"

                                                    onClick={() => {
                                                        setEditingItem(ph);
                                                        setOpenModal(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal placeholder for Add/Edit */}
                <Modal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title={editingItem ? "Edit Peak Hour" : "Add Peak Hour"}
                    size="lg"
                >
                    <div className="text-center text-gray-500 py-10">
                        Peak Hour form goes here
                    </div>
                </Modal>
            </div>
        </div>
    );
}
