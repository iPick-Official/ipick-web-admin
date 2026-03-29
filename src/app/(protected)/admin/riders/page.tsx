'use client';

import { Riders } from '@/types/riders';
import { useEffect, useState, useMemo } from 'react';
import { CheckCircleIcon, Eye, XCircleIcon } from 'lucide-react';
import { useSort } from '@/hooks/useSort';
import { Discounts } from '@/types/discount';
import { exportRidersToCSV } from '@/app/utils/DownloadReports';
import { Sidebar } from '@/components/ui/Sidebar';
import { Pagination } from '@/components/ui/Pagination';
import { fetchJSON } from '@/app/utils/fetchJSON';
import { sortByDate } from '@/app/utils/sortByDate';
import { updateDiscountStatusRequest } from '@/app/utils/discountHelpers';
import FilterToolbar from '@/components/ui/FilterToolbar';
import StatsCard from '@/components/ui/StatsCard';
import DataTable, { Column } from '@/components/ui/DataTable';
import DiscountDetailsModal from '@/components/riders-modal/DiscountModal';
import { BsCardChecklist } from 'react-icons/bs';
import RiderDetailsModal from '@/components/riders-modal/RiderDetails';
import ActionButtons from '@/components/ui/ActionButtons';

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
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const { sortOrder, toggleSort } = useSort("desc");
    const itemsPerPage = 10;
    const [selectedRider, setSelectedRider] = useState<Riders | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchJSON<Riders[]>("/api/rider")
            .then(setRiders)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const displayedRiders = useMemo(() => {
        return riders.filter((r) => {
            const created = r.createdAt ? new Date(r.createdAt) : null;

            // Date filter
            const matchesDate =
                (!fromDate || !toDate) ||
                (created && created >= new Date(fromDate) && created <= new Date(toDate));

            // Status filter
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && r.isLogged) ||
                (statusFilter === 'inactive' && !r.isLogged);

            // Search filter
            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                r.id?.toLowerCase().includes(term) ||
                r.name?.toLowerCase().includes(term) ||
                r.email?.toLowerCase().includes(term) ||
                r.mobnum?.toLowerCase().includes(term);

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [riders, searchTerm, fromDate, toDate, statusFilter]);

    const sortedRiders = useMemo(() => {
        return sortByDate(displayedRiders, "createdAt", sortOrder);
    }, [displayedRiders, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate]);
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

    const columns: Column<Riders>[] = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', render: (r) => r.name?.toUpperCase() || '-' },
        { key: 'email', label: 'Email', render: (r) => r.email || '-' },
        { key: 'mobnum', label: 'Mobile', render: (r) => r.mobnum || '-' },
        { key: 'address', label: 'Address', render: (r) => r.address || '-' },
        {
            key: 'isLogged',
            label: 'Active',
            render: (r) => (
                <span className={`font-semibold ${r.isLogged ? 'text-green-600' : 'text-gray-500'}`}>
                    {r.isLogged ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'createdAt',
            label: 'Created At',
            render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'),
            sortable: true,
        },
    ];


    {/* Rider Discounts Functions*/ }
    const handleDiscountDetails = (discount: Discounts) => {
        setSelectedDiscount(discount);
    };

    async function fetchDiscounts() {
        setIsOpen(true);
        setLoading(true);
        fetchJSON<Discounts[]>("/api/discount")
            .then(setDiscounts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }

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

    const updateDiscountStatus = async (
        id: string,
        newStatus: "approved" | "rejected",
        reason?: string
    ) => {
        try {
            const { reviewedBy } = await updateDiscountStatusRequest({
                id,
                status: newStatus,
                reason,
            });

            setDiscounts((prev) =>
                prev.map((d) =>
                    d._id === id
                        ? { ...d, status: newStatus, reviewedBy, reason }
                        : d
                )
            );

            if (selectedDiscount?._id === id) {
                setSelectedDiscount({
                    ...selectedDiscount,
                    status: newStatus,
                    reviewedBy,
                    reason,
                });
            }

            console.log(`Discount ${newStatus}`);
        } catch (error) {
            console.error(error);
            alert("Failed to update discount status");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Passengers"
                    dateFilters={[
                        { label: 'From', value: fromDate, onChange: setFromDate },
                        { label: 'To', value: toDate, onChange: setToDate },
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
                        { id: 'total', label: 'Total Passengers', value: riders.length, icon: <BsCardChecklist className="w-5 h-5" />, color: 'blue' },
                        { id: 'active', label: 'Active', value: totals.loggedIn, icon: <CheckCircleIcon className="w-5 h-5" />, color: 'green' },
                        { id: 'inactive', label: 'Inactive', value: totals.notLoggedIn, icon: <XCircleIcon className="w-5 h-5" />, color: 'zinc' },
                    ]}
                    onFilter={(status) => {
                        // Map card id to statusFilter
                        if (status === 'active') setStatusFilter('active');
                        else if (status === 'inactive') setStatusFilter('inactive');
                        else setStatusFilter('all');
                    }}
                />

                <DataTable
                    columns={columns}
                    data={paginatedRiders}
                    loading={loading}
                    rowKey={(r) => r._id}
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    emptyMessage="No riders found for selected date(s)."
                    actionColumn={{
                        label: 'Action',
                        render: (r) => (
                            <ActionButtons
                                id={r._id}
                                onView={() => setSelectedRider(r)}
                                showView={true}
                            />
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
            <RiderDetailsModal
                isOpen={!!selectedRider}
                onClose={() => setSelectedRider(null)}
                rider={selectedRider}
            />
        </div>
    );
}