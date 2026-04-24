import { getStatusBadge } from "@/app/utils/getStatusBadge";
import { Discounts } from "@/types/discount";
import React, { useEffect, useMemo, useState } from "react";
import DataTable, { Column } from "../ui/DataTable";
import { Detail } from "../ui/Details";
import ImageView from "../ui/ImageView";
import Modal from "../ui/Modal";
import { Pagination } from "../ui/Pagination";
import FilterToolbar from "../ui/FilterToolbar";
import { exportBookingsToCSV, exportDiscountsToCSV } from "@/app/utils/DownloadReports";
import { sortByDate } from "@/app/utils/sortByDate";
import StatsCard from "../ui/StatsCard";
import { CheckCircleIcon, XCircleIcon, SparklesIcon, Clock } from "lucide-react";
import { BsCardChecklist } from "react-icons/bs";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    discounts: Discounts[];
    selectedDiscount: Discounts | null;
    setSelectedDiscount: React.Dispatch<React.SetStateAction<Discounts | null>>;
    handleDiscountDetails: (d: Discounts) => void;
    updateDiscountStatus: (id: string, status: "approved" | "rejected", reason?: string) => void;
    rejectReason: string;
    setRejectReason: (v: string) => void;
    isImageOpen: boolean;
    setIsImageOpen: (v: boolean) => void;
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
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const displayedDiscounts = useMemo(() => {
        return discounts.filter((d) => {
            const updated = d.updatedAt ? new Date(d.updatedAt) : null;
            const matchesDate =
                !fromDate || !toDate ||
                (updated && updated >= new Date(fromDate) && updated <= new Date(toDate));
            const matchesStatus = statusFilter === "all" || d.status === statusFilter;
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                d._id?.toLowerCase().includes(term) ||
                d.name.toLocaleLowerCase().includes(term) ||
                d.idNumber.toLocaleLowerCase().includes(term) ||
                d.riderId?.toLowerCase().includes(term);

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [discounts, statusFilter, searchTerm, fromDate, toDate]);

    const sortedDiscount = useMemo(() => sortByDate(displayedDiscounts, "updatedAt", sortOrder), [displayedDiscounts, sortOrder]);
    useEffect(() => setCurrentPage(1), [searchTerm, fromDate, toDate, statusFilter]);
    const totalPages = Math.ceil(sortedDiscount.length / itemsPerPage);
    const paginatedDiscounts = sortedDiscount.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totals = useMemo(() => {
        return {
            totalDiscounts: displayedDiscounts.length,
            approved: displayedDiscounts.filter(d => d.status === 'approved').length,
            pending: displayedDiscounts.filter(d => d.status === 'pending').length,
            rejected: displayedDiscounts.filter(d => d.status === 'rejected').length,
        };
    }, [displayedDiscounts]);

    const columns: Column<Discounts>[] = [
        { key: "riderId", label: "ID" },
        { key: "name", label: "Name" },
        { key: "idNumber", label: "ID Number" },
        { key: "idType", label: "Type", render: (d) => d.idType?.toUpperCase() },
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
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusBadge(d.status)}`}>
                        {d.status}
                    </span>
                </div>
            ),
        },
        { key: "reviewedBy", label: "Reviewed by" },
    ];

    const isPending = selectedDiscount?.status === "pending";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Discounts Details" size="full">
            <div className="max-h-[75vh] overflow bg-white dark:bg-zinc-800 rounded-lg shadow-md p-5">

                {!selectedDiscount ? (
                    <div className="flex-1 p-8 overflow-auto space-y-6">
                        {/* SEARCH */}
                        <FilterToolbar
                            title="Bookings"
                            searchValue={searchTerm}
                            onSearchChange={setSearchTerm}
                            onExport={() => exportDiscountsToCSV(sortedDiscount)}
                            exportDisabled={loading}
                        />

                        <StatsCard
                            columns={4}
                            items={[
                                { id: "all", label: "All", value: totals.totalDiscounts, icon: <BsCardChecklist className="w-5 h-5" />, color: "blue" },
                                { id: "approved", label: "Approved", value: totals.approved, icon: <CheckCircleIcon className="w-5 h-5" />, color: "green" },
                                { id: "pending", label: "Pending", value: totals.pending, icon: <Clock className="w-5 h-5" />, color: "yellow" },
                                { id: "rejected", label: "Rejected", value: totals.rejected, icon: <XCircleIcon className="w-5 h-5" />, color: "red" },
                            ]}
                            onFilter={setStatusFilter}
                        />

                        {/* TABLE */}
                        <DataTable
                            columns={columns}
                            data={paginatedDiscounts}
                            loading={loading}
                            rowKey={(d) => d._id}
                            sortOrder={sortOrder}
                            onSortToggle={() => setSortOrder(p => p === "asc" ? "desc" : "asc")}
                            emptyMessage="No discounts found."
                            onRowClick={handleDiscountDetails}
                        />
                    </div>
                ) : (
                    <div className="p-6 space-y-4 text-sm">
                        <button onClick={() => setSelectedDiscount(null)} className="text-blue-600">
                            ← Back
                        </button>

                        {/* DETAILS */}
                        <div className="grid grid-cols-2 gap-4">
                            <Detail label="Rider ID" value={selectedDiscount.riderId} />
                            <Detail label="Name" value={selectedDiscount.name} />
                            <Detail label="ID Number" value={selectedDiscount.idNumber} />
                            <Detail label="ID Type" value={selectedDiscount.idType.toUpperCase()} />
                            <Detail label="Status" value={selectedDiscount.status.toUpperCase()} />
                            <Detail label="Reason" value={selectedDiscount.reason} />
                            <Detail label="Expiration" value={selectedDiscount.expirationDate ? new Date(selectedDiscount.expirationDate).toLocaleDateString() : "—"} />
                            <Detail
                                label="Photo"
                                value={
                                    photoUrl ? (
                                        <button onClick={() => setIsImageOpen(true)} className="text-blue-600">
                                            View
                                        </button>
                                    ) : "—"
                                }
                            />
                            <Detail label="Reviewed By:" value={selectedDiscount.reviewedBy} />
                        </div>

                        {/* ACTIONS */}
                        {isPending && (
                            <>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Rejection reason..."
                                    className="w-full p-2 border rounded bg-gray-100 dark:bg-zinc-900"
                                />

                                <div className="flex justify-end gap-3">
                                    <button
                                        className="px-4 py-2 bg-green-600 text-white rounded"
                                        onClick={() => updateDiscountStatus(selectedDiscount._id, "approved")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        disabled={!rejectReason.trim()}
                                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                                        onClick={() => updateDiscountStatus(selectedDiscount._id, "rejected", rejectReason)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </>
                        )}

                        <ImageView
                            isOpen={isImageOpen}
                            imageUrl={photoUrl}
                            alt={selectedDiscount.photoUrl?.name}
                            onClose={() => setIsImageOpen(false)}
                        />
                    </div>
                )}
            </div>
            {totalPages > 1 && !selectedDiscount && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </Modal>
    );
};

export default DiscountDetailsModal;