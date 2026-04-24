'use client';

import { useEffect, useState } from 'react';
import { Download, PenBox, PlusIcon } from 'lucide-react';
import { PeakHour } from '@/types/peak-hour';
import Modal from '@/components/ui/Modal';
import DataTable, { Column } from '@/components/ui/DataTable';
import FilterToolbar from '@/components/ui/FilterToolbar';
import { fetchJSON } from '@/app/utils/fetchJSON';
import ActionButtons from '@/components/ui/ActionButtons';

export default function PeakHourPage() {
    const [loading, setLoading] = useState(false);
    const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<PeakHour | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetchJSON<{ data?: any[];[key: string]: any }>("/api/peak-hour")
            .then((data) => {
                const peakHourArray = Array.isArray(data) ? data : data.data ?? [];
                setPeakHours(peakHourArray);
            })
            .catch((err) => console.error("Error fetching peak hours:", err))
            .finally(() => setLoading(false));
    }, []);

    const filteredPeakHours = peakHours.filter(ph =>
        ph.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ph.dayOfWeek?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ph.AMPMSPECIAL?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<typeof filteredPeakHours[0]>[] = [
        { key: "id", label: "ID" },
        { key: "dayOfWeek", label: "Day" },
        { key: "AMPMSPECIAL", label: "AM/PM" },
        { key: "FROM", label: "From" },
        { key: "TO", label: "To" },
        {
            key: "peakHourSurcharge",
            label: "Surcharge",
            render: (row) => `${(row.peakHourSurcharge * 100).toFixed(0)}%`,
        },
        {
            key: "Status",
            label: "Status",
            render: (row) => (row.Status === "1" ? "Active" : "Inactive"),
        },
        { key: "timestamp", label: "Timestamp" },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Peak Hour Time"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onRegister={() => setOpenModal(true)}
                    onExport={() => ""}
                    exportDisabled={loading}
                />

                <DataTable
                    columns={columns}
                    data={filteredPeakHours}
                    loading={loading}
                    emptyMessage="No peak hour records found."
                    rowKey={(row) => row._id ?? row.id ?? `${row.dayOfWeek}-${row.FROM}-${row.TO}`}
                    actionColumn={{
                        label: "Action",
                        render: (row) => (
                            <ActionButtons
                                id={row._id}
                                onEdit={() => setEditingItem(row)}
                                showEdit={true}
                            />
                        ),
                    }}
                />

                {/* Modal placeholder for Add/Edit */}
                <Modal
                    isOpen={openModal || !!editingItem}
                    onClose={() => {
                        setOpenModal(false);
                        setEditingItem(null);
                    }}
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
