'use client';

import { useEffect, useState } from 'react';
import { Download, PenBox, PlusIcon } from 'lucide-react';
import { TrafficIntensityItem } from '@/types/traffic-intensity';
import { Sidebar } from '@/components/ui/Sidebar';
import { Loading } from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';

export default function TrafficIntensity() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TrafficIntensityItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<TrafficIntensityItem | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function fetchTrafficIntensity() {
            setLoading(true);
            try {
                const res = await fetch('/api/traffic-intensity');
                if (!res.ok) throw new Error('Failed to fetch traffic intensity');

                const json = await res.json();
                const items = Array.isArray(json) ? json : json.data ?? [];
                setData(items);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTrafficIntensity();
    }, []);

    /** Search by ID or Intensity Level */
    const filteredData = data.filter(item =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.intensityLevel?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">
                        Traffic Intensity
                    </h2>

                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search ID or Intensity"
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
                                        'Intensity Level',
                                        'Peak Hour',
                                        'Surcharge Rate',
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
                                        <td colSpan={7} className="py-6 text-center">
                                            <Loading />
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                                            No traffic intensity records found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map(item => (
                                        <tr
                                            key={item._id}
                                            className="border-b hover:bg-gray-800 hover:text-white transition"
                                        >
                                            <td className="px-6 py-3">{item.id}</td>
                                            <td className="px-6 py-3">{item.intensityLevel}</td>
                                            <td className="px-6 py-3">{item.isPeakHour}</td>
                                            <td className="px-6 py-3">
                                                {(Number(item.surchargeRate) * 100).toFixed(0)}%
                                            </td>
                                            <td className="px-6 py-3">
                                                {item.status === '1' ? 'Active' : 'Inactive'}
                                            </td>
                                            <td className="px-6 py-3">
                                                {item.timestamp}
                                            </td>
                                            <td className="px-6 py-3 flex justify-end text-green-700">
                                                <PenBox
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setEditingItem(item);
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

                {/* Modal */}
                <Modal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title={editingItem ? "Edit Traffic Intensity" : "Add Traffic Intensity"}
                    size="lg"
                >
                    <div className="text-center text-gray-500 py-10">
                        Traffic Intensity form goes here
                    </div>
                </Modal>
            </div>
        </div>
    );
}
