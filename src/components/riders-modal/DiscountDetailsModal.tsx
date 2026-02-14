import { getStatusBadge } from "@/app/utils/getStatusBadge";
import { Discounts } from "@/types/discount";
import React from "react";
import DataTable, { Column } from "../ui/DataTable";
import { Detail } from "../ui/Details";
import ImageView from "../ui/ImageView";
import Modal from "../ui/Modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    discounts: Discounts[];
    selectedDiscount: Discounts | null;
    setSelectedDiscount: React.Dispatch<
        React.SetStateAction<Discounts | null>
    >;
    handleDiscountDetails: (d: Discounts) => void;
    updateDiscountStatus: (
        id: string,
        status: "approved" | "rejected",
        reason?: string
    ) => void;
    rejectReason: string;
    setRejectReason: (value: string) => void;
    isImageOpen: boolean;
    setIsImageOpen: (value: boolean) => void;
    photoUrl?: string | null;
}

const DiscountDetailsModal: React.FC<Props> = ({
    isOpen,
    onClose,
    loading,
    discounts,
    selectedDiscount,
    setSelectedDiscount,
    handleDiscountDetails,
    updateDiscountStatus,
    rejectReason,
    setRejectReason,
    isImageOpen,
    setIsImageOpen,
    photoUrl,
}) => {

    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

    const toggleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };
    const pageSize = 8;

    const filteredDiscounts = React.useMemo(() => {
        return discounts.filter((d) =>
            [d.name, d.idNumber, d.riderId, d.status]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [discounts, search]);

    const sortedDiscounts = React.useMemo(() => {
        const sorted = [...filteredDiscounts];

        sorted.sort((a, b) => {
            const dateA = a.expirationDate
                ? new Date(a.expirationDate).getTime()
                : 0;

            const dateB = b.expirationDate
                ? new Date(b.expirationDate).getTime()
                : 0;

            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        return sorted;
    }, [filteredDiscounts, sortOrder]);

    const totalPages = Math.ceil(sortedDiscounts.length / pageSize);

    const paginatedDiscounts = React.useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedDiscounts.slice(start, start + pageSize);
    }, [sortedDiscounts, page]);

    const columns: Column<Discounts>[] = [
        {
            key: "riderId",
            label: "ID",
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "idNumber",
            label: "ID Number",
        },
        {
            key: "idType",
            label: "Type",
            render: (d) => d.idType?.toUpperCase(),
        },
        {
            key: "status",
            label: "Status",
            render: (d) => (
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2.5 h-2.5 rounded-full ${d.status === "approved"
                            ? "bg-green-500"
                            : d.status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            } animate-pulse`}
                    />
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                            d.status
                        )}`}
                    >
                        {d.status}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Discounts Details"
            size="xxl"
        >
            <div className="shadow-md rounded-lg overflow-hidden max-h-[75vh] bg-white dark:bg-zinc-800">
                <div className="overflow-y-auto max-h-[75vh]">
                    {!selectedDiscount ? (
                        /* ================= LIST VIEW ================= */
                        <>
                            <div className="p-4">
                                <input
                                    type="text"
                                    placeholder="Search rider, ID number..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <DataTable
                                columns={columns}
                                data={paginatedDiscounts}
                                loading={loading}
                                rowKey={(d) => d._id}
                                sortOrder={sortOrder}
                                onSortToggle={toggleSort}
                                emptyMessage="No discounts found."
                                onRowClick={(d) => handleDiscountDetails(d)}
                            />

                            <div className="flex justify-between items-center p-4 text-sm">
                                <span>
                                    Page {page} of {totalPages || 1}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => p - 1)}
                                        className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-40"
                                    >
                                        Prev
                                    </button>

                                    <button
                                        disabled={page === totalPages || totalPages === 0}
                                        onClick={() => setPage((p) => p + 1)}
                                        className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 disabled:opacity-40"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* ================= DETAILS VIEW ================= */
                        <div className="p-6 space-y-4">
                            <button
                                onClick={() => setSelectedDiscount(null)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ← Back to list
                            </button>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <Detail label="Rider ID" value={selectedDiscount.riderId} />
                                <Detail label="Name" value={selectedDiscount.name} />
                                <Detail label="ID Number" value={selectedDiscount.idNumber} />
                                <Detail
                                    label="ID Type"
                                    value={selectedDiscount.idType.toUpperCase()}
                                />
                                <Detail
                                    label="Status"
                                    value={selectedDiscount.status.toUpperCase()}
                                />
                                <Detail
                                    label="Reason for rejected"
                                    value={selectedDiscount.reason}
                                />
                                <Detail
                                    label="Expiration Date"
                                    value={
                                        selectedDiscount.expirationDate
                                            ? new Date(
                                                selectedDiscount.expirationDate
                                            ).toLocaleDateString()
                                            : "—"
                                    }
                                />
                                <Detail
                                    label="Photo"
                                    value={
                                        photoUrl ? (
                                            <button
                                                onClick={() =>
                                                    setIsImageOpen(true)
                                                }
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Photo
                                            </button>
                                        ) : (
                                            "—"
                                        )
                                    }
                                />
                                <Detail
                                    label="Reviewed By"
                                    value={selectedDiscount.reviewedBy}
                                />
                                <Detail
                                    label="Reviewed At"
                                    value={
                                        selectedDiscount.updatedAt &&
                                        new Date(
                                            selectedDiscount.updatedAt
                                        ).toLocaleString()
                                    }
                                />
                            </div>

                            {/* Approve / Reject */}
                            {selectedDiscount.status === "pending" && (
                                <>
                                    <div className="mt-4 space-y-2">
                                        <label className="text-sm font-medium">
                                            Rejection Reason{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            className="w-full border rounded p-2 text-sm bg-gray-100 dark:bg-zinc-900"
                                            rows={3}
                                            placeholder="Enter reason for rejection"
                                            value={rejectReason}
                                            onChange={(e) =>
                                                setRejectReason(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            onClick={() =>
                                                updateDiscountStatus(
                                                    selectedDiscount._id,
                                                    "approved"
                                                )
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            disabled={!rejectReason?.trim()}
                                            className={`px-4 py-2 rounded text-white ${rejectReason?.trim()
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-red-400 cursor-not-allowed"
                                                }`}
                                            onClick={() =>
                                                updateDiscountStatus(
                                                    selectedDiscount._id,
                                                    "rejected",
                                                    rejectReason
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </>
                            )}

                            <ImageView
                                isOpen={isImageOpen}
                                imageUrl={photoUrl}
                                alt={selectedDiscount?.photoUrl?.name}
                                onClose={() => setIsImageOpen(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DiscountDetailsModal;
