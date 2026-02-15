'use client';

import { useEffect, useState } from 'react';
import { Download, PlusIcon } from 'lucide-react';
import { TnvsConfigItem } from '@/types/tnvs-config';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Sidebar } from '@/components/ui/Sidebar';
import { DraggableCard } from '@/components/ui/DraggableCard';
import { Loading } from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import { fetchJSON } from '@/app/utils/fetchJSON';

/* ---------- Main Page ---------- */
export default function TnvsConfig() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TnvsConfigItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<TnvsConfigItem | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    useEffect(() => {
        setLoading(true);

        fetchJSON<{ data?: any[];[key: string]: any }>("/api/tnvs-config")
            .then((json) => {
                const items = Array.isArray(json) ? json : json.data ?? [];
                setData(items);
            })
            .catch((err) => console.error("Error fetching TNVS config:", err))
            .finally(() => setLoading(false));
    }, []);

    const filteredData = data.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seaterCapacity.toString().includes(searchTerm)
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setData((items) => {
            const oldIndex = items.findIndex(i => i._id === active.id);
            const newIndex = items.findIndex(i => i._id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });

        // 🔥 Optional: Persist order to backend here
        // fetch('/api/tnvs-config/reorder', { method: 'POST', body: ... })
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">
                        TNVS Configuration
                    </h2>

                    <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search ID or Seater"
                            className="px-3 py-2 border rounded-md text-sm w-64"
                        />
                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setOpenModal(true);
                            }}
                            className="px-3 py-2 bg-blue-700 text-white rounded-md"
                        >
                            <PlusIcon />
                        </button>
                        <button className="px-3 py-2 bg-green-700 text-white rounded-md">
                            <Download />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loading />
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredData.map(i => i._id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredData.map(item => (
                                    <DraggableCard
                                        key={item._id}
                                        item={item}
                                        onEdit={(item) => {
                                            setEditingItem(item);
                                            setOpenModal(true);
                                        }}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}

                {/* Modal */}
                <Modal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title={editingItem ? "Edit TNVS Configuration" : "Add TNVS Configuration"}
                    size="lg"
                >
                    <div className="text-center text-gray-500 py-10">
                        TNVS configuration form goes here
                    </div>
                </Modal>
            </div>
        </div>
    );
}
