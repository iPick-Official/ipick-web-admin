import { TnvsConfigItem } from "@/types/tnvs-config";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, PenBox } from "lucide-react";
import { CSS } from '@dnd-kit/utilities';

/* ---------- Draggable Card ---------- */
export function DraggableCard({
    item,
    onEdit,
}: {
    item: TnvsConfigItem;
    onEdit: (item: TnvsConfigItem) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 relative hover:shadow-lg transition"
        >
            {/* Drag Handle */}
            <div
                {...listeners}
                className="absolute top-4 left-4 cursor-grab text-gray-400 hover:text-gray-600"
            >
                <GripVertical size={18} />
            </div>

            {/* Edit */}
            <PenBox
                className="absolute top-4 right-4 cursor-pointer text-green-700"
                onClick={() => onEdit(item)}
            />

            {/* Header */}
            <div className="mb-4 mt-4">
                <p className="text-xs text-gray-400">ID</p>
                <p className="font-semibold">{item.id}</p>
            </div>

            {/* Content */}
            <div className="space-y-2 text-sm">
                <Row label="Seater" value={item.seaterCapacity} />
                <Row label="Base Fare" value={`₱${item.baseFare}`} />
                <Row label="Per KM" value={`₱${item.perKilometer}`} />
                <Row label="Per Minute" value={`₱${item.perMinute}`} />
                <Row label="Add Stop Fare" value={`₱${item.addStopBaseFare}`} />
                <Row label="Max Surge" value={`${item.maxSurge}x`} />
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                <span className={item.status === 1 ? "text-green-600" : "text-red-500"}>
                    {item.status === 1 ? 'Active' : 'Inactive'}
                </span>
                <span className="text-gray-400">{item.timestamp}</span>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between">
            <span>{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}