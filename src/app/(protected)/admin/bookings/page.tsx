'use client';

import { exportBookingsToCSV } from '@/app/utils/DownloadReports';
import { fetchJSON } from '@/app/utils/fetchJSON';
import { sortByDate } from '@/app/utils/sortByDate';
import { getStatusColor } from '@/app/utils/statusColor';
import { Pagination } from '@/components/ui/Pagination';
import { useSort } from '@/hooks/useSort';
import { Booking } from '@/types/bookings';
import { CheckCircleIcon, Eye, PauseCircleIcon, SparklesIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import StatsCard from '@/components/ui/StatsCard';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';
import BookingDetailsModal from '@/components/bookings-modal/BookingDetails';
import ActionButtons from '@/components/ui/ActionButtons';

export default function BookingsPage() {
    const { sortOrder, toggleSort } = useSort("desc");
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const today = new Date().toISOString().split("T")[0];
    const addDays = (dateString: string, days: number) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date.toISOString().split("T")[0];
    };

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(addDays(today, 1));
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        setLoading(true);
        fetchJSON<Booking[]>("/api/bookings")
            .then(setBookings)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const displayedBookings = useMemo(() => {
        return bookings.filter((b) => {
            const updated = b.updatedAt ? new Date(b.updatedAt) : null;
            const matchesDate =
                !fromDate || !toDate ||
                (updated && updated >= new Date(fromDate) && updated <= new Date(toDate));
            const matchesStatus = statusFilter === "all" || b.status === statusFilter;
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                b.referenceNumber?.toLowerCase().includes(term) ||
                b._id?.toLowerCase().includes(term) ||
                b.driverId?.toLowerCase().includes(term) ||
                b.riderId?.toLowerCase().includes(term);

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [bookings, statusFilter, searchTerm, fromDate, toDate]);

    const sortedBookings = useMemo(() => sortByDate(displayedBookings, "updatedAt", sortOrder), [displayedBookings, sortOrder]);
    useEffect(() => setCurrentPage(1), [searchTerm, fromDate, toDate, statusFilter]);
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const paginatedBookings = sortedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totals = useMemo(() => {
        return {
            totalBookings: displayedBookings.length,
            finished: displayedBookings.filter(b => b.status === 'finished').length,
            cancelled: displayedBookings.filter(b => b.status === 'cancelled').length,
            active: displayedBookings.filter(b => b.status === 'active').length,
            inactive: displayedBookings.filter(b => b.status === 'inactive').length,
            booked: displayedBookings.filter(b => b.status === 'booked').length,
        };
    }, [displayedBookings]);

    const columns: Column<Booking>[] = [
        {
            key: "bookingInfo", label: "Booking ID", render: (b) => (
                <div className="flex flex-col">
                    <span className="font-semibold">Ref: {b.referenceNumber ?? "-"}</span>
                    <span className="text-xs text-zinc-500">{b._id}</span>
                </div>
            )
        },
        { key: "riderId", label: "Rider ID" },
        { key: "driverId", label: "Driver ID", render: (b) => b.driverId || "Unassigned" },
        {
            key: "status", label: "Status", render: (b) => (
                <span className={`font-semibold ${getStatusColor(b.status)}`}>{b.status.toUpperCase()}</span>
            )
        },
        { key: "travelFare", label: "Fare", render: (b) => `₱${b.travelFare?.toFixed(2) ?? "0.00"}` },
        { key: "origin", label: "Origin", render: (b) => b.origin?.name ?? "-" },
        { key: "destination", label: "Destination", render: (b) => b.destination?.name ?? "-" },
        { key: "updatedAt", label: "Timestamp", render: (b) => b.updatedAt ? new Date(b.updatedAt).toLocaleString() : "-", sortable: true },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Bookings"
                    dateFilters={[
                        { label: "From", value: fromDate, onChange: setFromDate },
                        { label: "To", value: toDate, onChange: setToDate },
                    ]}
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onExport={() => exportBookingsToCSV(sortedBookings)}
                    exportDisabled={loading}
                />

                <StatsCard
                    columns={6}
                    items={[
                        { id: "all", label: "Bookings", value: totals.totalBookings, icon: <BsCardChecklist className="w-5 h-5" />, color: "blue" },
                        { id: "finished", label: "Completed", value: totals.finished, icon: <CheckCircleIcon className="w-5 h-5" />, color: "green" },
                        { id: "cancelled", label: "Cancelled", value: totals.cancelled, icon: <XCircleIcon className="w-5 h-5" />, color: "red" },
                        { id: "active", label: "Active", value: totals.active, icon: <SparklesIcon className="w-5 h-5" />, color: "blue" },
                        { id: "inactive", label: "Inactive", value: totals.inactive, icon: <PauseCircleIcon className="w-5 h-5" />, color: "zinc" },
                        { id: "booked", label: "Booked", value: totals.booked, icon: <CheckCircleIcon className="w-5 h-5" />, color: "yellow" },
                    ]}
                    onFilter={setStatusFilter}
                />

                <DataTable
                    columns={columns}
                    data={paginatedBookings}
                    loading={loading}
                    rowKey={(b) => b._id}
                    rowClassName={(b) => {
                        const bookingDate = b.updatedAt ? b.updatedAt.slice(0, 10) : '';
                        return bookingDate === today ? "bg-orange-50 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900";
                    }}
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    emptyMessage="No bookings found for selected date(s)."
                    actionColumn={{
                        label: "Action",
                        render: (b) => (
                            <ActionButtons
                                id={b._id}
                                onView={() => setSelectedBooking(b)}
                                showView
                                showDirections
                                onDirections={() => {
                                    const originCoords = b.origin?.coordinates;
                                    const destinationCoords = b.destination?.coordinates;
                                    if (!originCoords || !destinationCoords) return;
                                    const origin = `${originCoords[0]},${originCoords[1]}`;
                                    const destination = `${destinationCoords[0]},${destinationCoords[1]}`;
                                    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
                                    window.open(url, "_blank");
                                }}
                            />
                        )
                    }}
                />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {/* Booking Details Modal */}
            <BookingDetailsModal
                isOpen={!!selectedBooking}
                onClose={() => setSelectedBooking(null)}
                booking={selectedBooking}
            />
        </div>
    );
}