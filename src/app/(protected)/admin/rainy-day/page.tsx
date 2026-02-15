'use client';

import { useEffect, useState } from 'react';
import { PenBox } from 'lucide-react';
import { RainyDaySurgeItem } from '@/types/rainy-day';
import { Sidebar } from '@/components/ui/Sidebar';
import { fetchJSON } from '@/app/utils/fetchJSON';
import Modal from '@/components/ui/Modal';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function RainyDaySurge() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<RainyDaySurgeItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<RainyDaySurgeItem | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetchJSON<{ data?: any[];[key: string]: any }>("/api/rainy-day")
            .then((json) => {
                const items = Array.isArray(json) ? json : json.data ?? [];
                setData(items);
            })
            .catch((err) => console.error("Error fetching rainy day surge data:", err))
            .finally(() => setLoading(false));
    }, []);

    /** Search by ID or Weather Condition */
    const filteredData = data.filter(item =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.weatherCondition?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<typeof filteredData[0]>[] = [
        { key: "id", label: "ID" },
        { key: "weatherCondition", label: "Weather" },
        {
            key: "intensityFactor",
            label: "Intensity",
            render: (row) => `${(row.intensityFactor * 100).toFixed(0)}%`,
        },
        {
            key: "baseSurcharge",
            label: "Base Surcharge",
            render: (row) => `${(row.baseSurcharge * 100).toFixed(0)}%`,
        },
        {
            key: "rainyDaySurchargerate",
            label: "Rainy Day Rate",
            render: (row) => `${(row.rainyDaySurchargerate * 100).toFixed(0)}%`,
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (row.status === "1" ? "Active" : "Inactive"),
        },
        { key: "timestamp", label: "Timestamp" },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Rainy Day Surge"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onRegister={() => setOpenModal(true)}
                    onExport={() => ""}
                    exportDisabled={loading}
                />

                {/* Table */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                    emptyMessage="No rainy day surge records found."
                    rowKey={(row) => row._id ?? row.id ?? `${row.weatherCondition}-${row.timestamp}`}
                    actionColumn={{
                        label: "Action",
                        render: (row) => (
                            <PenBox
                                className="cursor-pointer text-green-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingItem(row);
                                    setOpenModal(true);
                                }}
                            />
                        ),
                    }}
                />

                {/* Modal */}
                <Modal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title={editingItem ? "Edit Rainy Day Surge" : "Add Rainy Day Surge"}
                    size="lg"
                >
                    <div className="text-center text-gray-500 py-10">
                        Rainy Day Surge form goes here
                    </div>
                </Modal>
            </div>
        </div>
    );
}
