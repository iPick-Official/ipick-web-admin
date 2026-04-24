import React from "react";
import { Eye, Wallet, Edit as EditIcon, Trash, MapIcon } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

interface ActionButtonsProps {
    id: string;
    onView?: (id: string) => void;
    onWallet?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDirections?: (id: string) => void;
    showView?: boolean;
    showWallet?: boolean;
    showEdit?: boolean;
    showDelete?: boolean
    showDirections?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    id,
    onView,
    onWallet,
    onEdit,
    onDelete,
    onDirections,
    showView,
    showWallet,
    showEdit,
    showDelete,
    showDirections
}) => {
    const { admin } = useAdmin();
    return (
        <div className="flex items-center justify-end gap-1">
            {/* View */}
            {showView && (
                <button
                    onClick={() => onView?.(id)}
                    className="p-1.5 rounded-md 
                        bg-green-100 hover:bg-green-200 text-green-700 
                        dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-300
                        shadow-sm transition transform hover:scale-105"
                    title="View Details"
                >
                    <Eye className="w-4 h-4" />
                </button>
            )}

            {/* Wallet */}
            {showWallet && admin?.department === "executive_leadership" && (
                <button
                    onClick={() => onWallet?.(id)}
                    className="p-1.5 rounded-md 
                    bg-orange-100 hover:bg-orange-200 text-orange-700 
                    dark:bg-orange-900 dark:hover:bg-orange-800 dark:text-orange-300
                    shadow-sm transition transform hover:scale-105"
                >
                    <Wallet className="w-4 h-4" />
                </button>
            )}

            {/* Edit */}
            {showEdit && (
                <button
                    onClick={() => onEdit?.(id)}
                    className="p-1.5 rounded-md 
                        bg-gray-100 hover:bg-gray-200 text-gray-700 
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300
                        shadow-sm transition transform hover:scale-105"
                    title="Edit"
                >
                    <EditIcon className="w-4 h-4" />
                </button>
            )}

            {/* Delete */}
            {showDelete && (
                <button
                    onClick={() => onDelete?.(id)}
                    className="p-1.5 rounded-md 
                        bg-red-100 hover:bg-red-200 text-red-700 
                        dark:bg-red-800 dark:hover:bg-red-700 dark:text-red-300
                        shadow-sm transition transform hover:scale-105"
                    title="Delete"
                >
                    <Trash className="w-4 h-4" />
                </button>
            )}

            {/* Directions */}
            {showDirections && (
                <button
                    onClick={() => onDirections?.(id)}
                    className="p-1.5 rounded-md 
            bg-blue-100 hover:bg-blue-200 text-blue-700 
            dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300
            shadow-sm transition transform hover:scale-105"
                    title="View Directions"
                >
                    <MapIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;