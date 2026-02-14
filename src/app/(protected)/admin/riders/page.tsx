'use client';

import { Riders } from '@/types/riders';
import { useEffect, useState, useMemo } from 'react';
import { CheckCircleIcon, Eye, SparklesIcon, XCircleIcon } from 'lucide-react';
import { useSort } from '@/hooks/useSort';
import { Discounts } from '@/types/discount';
import { exportRidersToCSV } from '@/app/utils/DownloadReports';
import { Sidebar } from '@/components/ui/Sidebar';
import { Pagination } from '@/components/ui/Pagination';
import { fetchJSON } from '@/app/utils/fetchJSON';
import { sortByDate } from '@/app/utils/sortByDate';
import FilterToolbar from '@/components/ui/FilterToolbar';
import StatsCard from '@/components/ui/StatsCard';
import DataTable, { Column } from '@/components/ui/DataTable';
import DiscountDetailsModal from '@/components/riders-modal/DiscountDetailsModal';

export default function RidersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<Discounts | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [riders, setRiders] = useState<Riders[]>([]);
    const [discounts, setDiscounts] = useState<Discounts[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const { sortOrder, toggleSort } = useSort("desc");
    const itemsPerPage = 100;

    useEffect(() => {
        setLoading(true);
        fetchJSON<Riders[]>("/api/rider")
            .then(setRiders)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const displayedRiders = useMemo(() => {
        return riders.filter((r) => {
            const updated = r.createdAt ? new Date(r.createdAt) : null;

            const matchesDate =
                !fromDate ||
                !toDate ||
                (updated &&
                    updated >= new Date(fromDate) &&
                    updated <= new Date(toDate));

            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                r._id?.toLowerCase().includes(term) ||
                r.name?.toLowerCase().includes(term) ||
                r.email?.toLowerCase().includes(term) ||
                r.mobnum?.toLowerCase().includes(term)

            return matchesDate && matchesSearch;
        });
    }, [riders, searchTerm, fromDate, toDate]);

    const sortedRiders = useMemo(() => {
        return sortByDate(displayedRiders, "createdAt", sortOrder);
    }, [displayedRiders, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate]);

    // Pagination
    const totalPages = Math.ceil(sortedRiders.length / itemsPerPage);
    const paginatedRiders = sortedRiders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Totals
    const totals = useMemo(() => {
        const loggedIn = displayedRiders.filter((r) => r.isLogged).length;
        const notLoggedIn = displayedRiders.filter((r) => !r.isLogged).length;
        const totalRiders = displayedRiders.length;
        return { loggedIn, notLoggedIn, totalRiders };
    }, [displayedRiders]);

    {/* Rider Discounts Functions*/ }

    const handleDiscountDetails = (discount: Discounts) => {
        setSelectedDiscount(discount);
    };
    
    useEffect(() => {
        const fetchPhotoUrl = async () => {
            if (!selectedDiscount?.photoUrl?.name) return;

            try {
                const res = await fetch(
                    `/api/photo-url?filename=${encodeURIComponent(
                        selectedDiscount.photoUrl.name
                    )}`
                );
                const data = await res.json();
                setPhotoUrl(data.url);
            } catch (err) {
                console.error('Failed to fetch photo URL:', err);
                setPhotoUrl(null);
            }
        };

        fetchPhotoUrl();
    }, [selectedDiscount]);

    async function fetchDiscounts() {
        setIsOpen(true);
        setLoading(true);
        fetchJSON<Discounts[]>("/api/discount")
            .then(setDiscounts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }

    const updateDiscountStatus = async (id: string, newStatus: 'approved' | 'rejected', reason?: string) => {
        try {
            const getAdminFromCookie = () => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; admin=`);
                if (parts.length === 2) {
                    const cookieValue = parts.pop()?.split(";").shift();
                    if (cookieValue) return JSON.parse(decodeURIComponent(cookieValue));
                }
                return null;
            };

            const admin = getAdminFromCookie();
            const updatedBy = admin?.firstName && admin?.lastName
                ? `${admin.firstName} ${admin.lastName}`
                : "unknown";

            const res = await fetch(`/api/discount/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus, reviewedBy: updatedBy, reason: rejectReason }),
            });

            if (!res.ok) throw new Error('Failed to update status');

            // Update local discounts state
            setDiscounts((prev) =>
                prev.map((d) =>
                    d._id === id ? { ...d, status: newStatus } : d
                )
            );

            // Update selectedDiscount if currently viewing
            if (selectedDiscount?._id === id) {
                setSelectedDiscount({ ...selectedDiscount, status: newStatus, reviewedBy: updatedBy, reason: reason });
            }

            console.log(`Discount ${newStatus}`);
        } catch (error) {
            console.error(error);
            alert('Failed to update discount status');
        }
    };

    const columns: Column<Riders>[] = [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "name",
            label: "Name",
            render: (r) => r.name?.toUpperCase() || "-",
        },
        {
            key: "email",
            label: "Email",
            render: (r) => r.email || "-",
        },
        {
            key: "mobnum",
            label: "Mobile",
            render: (r) => r.mobnum || "-",
        },
        {
            key: "address",
            label: "Address",
            render: (r) => r.address || "-",
        },
        {
            key: "isLogged",
            label: "Active",
            render: (r) => (
                <span
                    className={`font-semibold ${r.isLogged ? "text-green-600" : "text-gray-500"
                        }`}
                >
                    {r.isLogged ? "Yes" : "No"}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (r) =>
                r.createdAt ? new Date(r.createdAt).toLocaleString() : "-",
            sortable: true,
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Passengers"
                    dateFilters={[
                        { label: "From", value: fromDate, onChange: setFromDate },
                        { label: "To", value: toDate, onChange: setToDate },
                    ]}
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onExport={() => exportRidersToCSV(sortedRiders)}
                    onDiscount={fetchDiscounts}
                    exportDisabled={loading}
                />

                <StatsCard
                    columns={3}
                    items={[
                        {
                            id: "totals",
                            label: "Total Passenger",
                            value: totals.totalRiders,
                            icon: <XCircleIcon className="w-5 h-5" />,
                            color: "blue",
                        },
                        {
                            id: "active",
                            label: "Active",
                            value: totals.loggedIn,
                            icon: <CheckCircleIcon className="w-5 h-5" />,
                            color: "green",
                        },
                        {
                            id: "inactive",
                            label: "Inactive",
                            value: totals.notLoggedIn,
                            icon: <SparklesIcon className="w-5 h-5" />,
                            color: "zinc",
                        },
                    ]}
                />

                <DataTable
                    columns={columns}
                    data={paginatedRiders}
                    loading={loading}
                    rowKey={(r) => r._id}
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    emptyMessage="No bookings found for selected date(s)."
                    // onRowClick={(r) => fetchBookingDetails(r._id)}
                    actionColumn={{
                        label: "Action",
                        render: (r) => (
                            <div className="flex items-center text-green-700 justify-center">
                                <Eye />
                            </div>
                        ),
                    }}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
            <DiscountDetailsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                loading={loading}
                discounts={discounts}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
                handleDiscountDetails={handleDiscountDetails}
                updateDiscountStatus={updateDiscountStatus}
                rejectReason={rejectReason}
                setRejectReason={setRejectReason}
                isImageOpen={isImageOpen}
                setIsImageOpen={setIsImageOpen}
                photoUrl={photoUrl}
            />

        </div>
    );
}