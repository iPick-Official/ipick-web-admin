import React from "react";
import { Eye, Wallet, Edit as EditIcon } from "lucide-react";

interface ActionButtonsProps {
    id: string;
    onView?: (id: string) => void;
    onWallet?: (id: string) => void;
    onEdit?: (id: string) => void;
    showView?: boolean;
    showWallet?: boolean;
    showEdit?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    id,
    onView,
    onWallet,
    onEdit,
    showView,
    showWallet,
    showEdit,
}) => {
    return (
        <div className="flex items-center justify-end gap-1">
            {/* View */}
            {showView && (
                <button
                    onClick={() => onView?.(id)}
                    className="p-1.5 rounded-md bg-green-100 hover:bg-green-200 text-green-700 shadow-sm transition transform hover:scale-105"
                    title="View Details"
                >
                    <Eye className="w-4 h-4" />
                </button>
            )}

            {/* Wallet */}
            {showWallet && (
                <button
                    onClick={() => onWallet?.(id)}
                    className="p-1.5 rounded-md bg-red-100 hover:bg-red-200 text-red-700 shadow-sm transition transform hover:scale-105"
                    title="Wallet History"
                >
                    <Wallet className="w-4 h-4" />
                </button>
            )}

            {/* Edit */}
            {showEdit && (
                <button
                    onClick={() => onEdit?.(id)}
                    className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition transform hover:scale-105"
                    title="Edit"
                >
                    <EditIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;