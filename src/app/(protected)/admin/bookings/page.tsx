'use client';

import { exportBookingsToCSV } from '@/app/utils/DownloadReports';
import { fetchJSON } from '@/app/utils/fetchJSON';
import { sortByDate } from '@/app/utils/sortByDate';
import { getStatusColor } from '@/app/utils/statusColor';
import { Loading } from '@/components/ui/Loading';
import { Pagination } from '@/components/ui/Pagination';
import { Sidebar } from '@/components/ui/Sidebar';
import { useSort } from '@/hooks/useSort';
import { Booking } from '@/types/bookings';
import { CheckCircleIcon, Eye, PauseCircleIcon, SparklesIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import SortButton from '@/components/ui/SortButton';
import StatsCard from '@/components/ui/StatsCard';
import FilterToolbar from '@/components/ui/FilterToolbar';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function BookingsPage() {
    const { sortOrder, toggleSort } = useSort("desc");
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

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

    async function fetchAllBookings() {
        setLoading(true);
        fetchJSON<Booking[]>("/api/bookings/all")
            .then(setBookings)
            .catch(console.error)
            .finally(() => setLoading(false));
    }

    const displayedBookings = useMemo(() => {
        return bookings.filter((b) => {
            const updated = b.updatedAt ? new Date(b.updatedAt) : null;

            const matchesDate =
                !fromDate ||
                !toDate ||
                (updated &&
                    updated >= new Date(fromDate) &&
                    updated <= new Date(toDate));

            const matchesStatus =
                statusFilter === "all" || b.status === statusFilter;

            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                b._id?.toLowerCase().includes(term) ||
                b.driverId?.toLowerCase().includes(term) ||
                b.riderId?.toLowerCase().includes(term)

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [bookings, statusFilter, searchTerm, fromDate, toDate]);

    const sortedBookings = useMemo(() => {
        return sortByDate(displayedBookings, "updatedAt", sortOrder);
    }, [displayedBookings, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate]);

    // Pagination
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const paginatedRiders = sortedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totals = useMemo(() => {
        const finished = displayedBookings.filter(b => b.status === 'finished').length;
        const cancelled = displayedBookings.filter(b => b.status === 'cancelled').length;
        const active = displayedBookings.filter(b => b.status === 'active').length;
        const inactive = displayedBookings.filter(b => b.status === 'inactive').length;
        const booked = displayedBookings.filter(b => b.status === 'booked').length;

        const totalBookings = displayedBookings.length;

        return { finished, cancelled, active, inactive, booked, totalBookings };
    }, [displayedBookings]);

    const columns: Column<Booking>[] = [
        { key: "_id", label: "Booking ID" },
        { key: "riderId", label: "Rider ID" },
        { key: "driverId", label: "Driver ID", render: (b) => b.driverId || "Unassigned" },
        {
            key: "status",
            label: "Status",
            render: (b) => (
                <span className={`font-semibold ${getStatusColor(b.status)}`}>
                    {b.status.toUpperCase()}
                </span>
            ),
        },
        {
            key: "travelFare",
            label: "Fare",
            render: (b) => `₱${b.travelFare?.toFixed(2) ?? "0.00"}`,
        },
        { key: "origin", label: "Origin", render: (b) => b.origin?.name ?? "-" },
        { key: "destination", label: "Destination", render: (b) => b.destination?.name ?? "-" },

        // Timestamp column
        {
            key: "updatedAt",
            label: "Timestamp",
            render: (b) => new Date(b.updatedAt).toLocaleString(),
            sortable: true,
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Bookings"
                    dateFilters={[
                        { label: "From", value: fromDate, onChange: setFromDate },
                        { label: "To", value: toDate, onChange: setToDate },
                    ]}
                    selectFilters={[
                        {
                            label: "Status",
                            value: statusFilter,
                            onChange: setStatusFilter,
                            options: [
                                { label: "All", value: "all" },
                                { label: "Completed", value: "finished" },
                                { label: "Cancelled", value: "cancelled" },
                                { label: "Active", value: "active" },
                                { label: "Inactive", value: "inactive" },
                                { label: "Booked", value: "booked" },
                            ],
                        },
                    ]}
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onRefresh={fetchAllBookings}
                    onExport={() => exportBookingsToCSV(sortedBookings)}
                    exportDisabled={loading}
                />

                <StatsCard
                    columns={6}
                    items={[
                        {
                            id: "booking",
                            label: "Bookings",
                            value: totals.totalBookings,
                            icon: <CheckCircleIcon className="w-5 h-5" />,
                            color: "green-600",
                        },
                        {
                            id: "finished",
                            label: "Completed",
                            value: totals.finished,
                            icon: <SparklesIcon className="w-5 h-5" />,
                            color: "zinc-500",
                        },
                        {
                            id: "cancelled",
                            label: "Cancelled",
                            value: totals.cancelled,
                            icon: <XCircleIcon className="w-5 h-5" />,
                            color: "red-600",
                        },
                        {
                            id: "active",
                            label: "Active",
                            value: totals.active,
                            icon: <SparklesIcon className="w-5 h-5" />,
                            color: "blue-600",
                        },
                        {
                            id: "inactive",
                            label: "Inactive",
                            value: totals.inactive,
                            icon: <PauseCircleIcon className="w-5 h-5" />,
                            color: "zinc-500",
                        },
                        {
                            id: "booked",
                            label: "Booked",
                            value: totals.booked,
                            icon: <CheckCircleIcon className="w-5 h-5" />,
                            color: "yellow-600",
                        },
                    ]}
                />

                <DataTable
                    columns={columns}
                    data={paginatedRiders}
                    loading={loading}
                    rowKey={(b) => b._id}
                    rowClassName={(b) => {
                        const bookingDate = b.updatedAt.slice(0, 10);
                        return bookingDate === today
                            ? "bg-orange-50 dark:bg-zinc-800"
                            : "bg-white dark:bg-zinc-900";
                    }}
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    emptyMessage="No bookings found for selected date(s)."
                    // onRowClick={(b) => fetchBookingDetails(b._id)}
                    actionColumn={{
                        label: "Action",
                        render: (b) => (
                            <div className="flex items-center text-green-700 justify-center">
                                <Eye />
                            </div>
                        ),
                    }}
                />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </div>
    );
}
