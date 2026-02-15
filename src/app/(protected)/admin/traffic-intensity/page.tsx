'use client';

import { useEffect, useState } from 'react';
import { Download, PenBox, PlusIcon } from 'lucide-react';
import { TrafficIntensityItem } from '@/types/traffic-intensity';
import { Sidebar } from '@/components/ui/Sidebar';
import { Loading } from '@/components/ui/Loading';
import { fetchJSON } from '@/app/utils/fetchJSON';
import Modal from '@/components/ui/Modal';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function TrafficIntensity() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TrafficIntensityItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<TrafficIntensityItem | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetchJSON<{ data?: any[];[key: string]: any }>("/api/traffic-intensity")
            .then((json) => {
                const items = Array.isArray(json) ? json : json.data ?? [];
                setData(items);
            })
            .catch((err) => console.error("Error fetching traffic intensity:", err))
            .finally(() => setLoading(false));
    }, []);

    /** Search by ID or Intensity Level */
    const filteredData = data.filter(item =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.intensityLevel?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<typeof filteredData[0]>[] = [
        { key: "id", label: "ID" },
        { key: "intensityLevel", label: "Intensity Level" },
        { key: "isPeakHour", label: "Peak Hour" },
        {
            key: "surchargeRate",
            label: "Surcharge Rate",
            render: (row) => `${(Number(row.surchargeRate) * 100).toFixed(0)}%`,
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
                    title="Traffic Intensity"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onRegister={() => setOpenModal(true)}
                    onExport={() => ""}
                    exportDisabled={loading}
                />

                <DataTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                    emptyMessage="No traffic intensity records found."
                    rowKey={(row) => row._id ?? row.id ?? `${row.intensityLevel}-${row.timestamp}`}
                    actionColumn={{
                        label: "Action",
                        render: (row) => (
                            <PenBox
                                className="cursor-pointer text-green-700"
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent row click
                                    setEditingItem(row);
                                    setOpenModal(true);
                                }}
                            />
                        ),
                        className: "text-right",
                    }}
                />

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
