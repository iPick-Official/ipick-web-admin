'use client';

import { useEffect, useState } from 'react';
import { TimeMatrixItem } from '@/types/time-matrix';
import { fetchJSON } from '@/app/utils/fetchJSON';
import Modal from '@/components/ui/Modal';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';
import ActionButtons from '@/components/ui/ActionButtons';

export default function TnvsConfig() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TimeMatrixItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<TimeMatrixItem | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetchJSON<{ data?: any[];[key: string]: any }>("/api/time-matrix")
            .then((json) => {
                const items = Array.isArray(json) ? json : json.data ?? [];
                setData(items);
            })
            .catch((err) => console.error("Error fetching time matrix:", err))
            .finally(() => setLoading(false));
    }, []);

    /** Search by ID or Time Range */
    const filteredData = data.filter(item =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rangeTimeFrom?.includes(searchTerm) ||
        item.rangeTimeTo?.includes(searchTerm)
    );

    const columns: Column<typeof filteredData[0]>[] = [
        { key: "id", label: "ID" },
        { key: "rangeTimeFrom", label: "From (Min)" },
        { key: "rangeTimeTo", label: "To (Min)" },
        {
            key: "tTime",
            label: "Total Time",
            render: (row) => `${row.tTime} mins`,
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (row.status === 1 ? "Active" : "Inactive"),
        },
        { key: "createdOn", label: "Created On" },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Time Matrix"
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
                    emptyMessage="No time matrix records found."
                    rowKey={(row) => row._id ?? row.id ?? `${row.rangeTimeFrom}-${row.rangeTimeTo}`}
                    actionColumn={{
                        label: "Action",
                        render: (row) => (
                            <ActionButtons
                                id={row._id}
                                onEdit={() => setEditingItem(row)}
                                showEdit={true}
                            />
                        ),
                        className: "text-right",
                    }}
                />

                {/* Modal */}
                <Modal
                    isOpen={openModal || !!editingItem}
                    onClose={() => {
                        setOpenModal(false);
                        setEditingItem(null);
                    }}
                    title={editingItem ? "Edit Time Matrix" : "Add Time Matrix"}
                    size="lg"
                >
                    <div className="text-center text-gray-500 py-10">
                        Time Matrix form goes here
                    </div>
                </Modal>
            </div>
        </div>
    );
}
