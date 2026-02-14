'use client';

import { Riders } from '@/types/riders';
import { useEffect, useState, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon, Eye } from 'lucide-react';
import { useSort } from '@/hooks/useSort';
import { exportRidersToCSV } from '@/app/utils/DownloadReports';
import { Sidebar } from '@/components/ui/Sidebar';
import { Pagination } from '@/components/ui/Pagination';
import { fetchJSON } from '@/app/utils/fetchJSON';
import { sortByDate } from '@/app/utils/sortByDate';
import FilterToolbar from '@/components/ui/FilterToolbar';
import StatsCard from '@/components/ui/StatsCard';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function RidersPage() {
    const [riders, setRiders] = useState<Riders[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const { sortOrder, toggleSort } = useSort('desc');
    const itemsPerPage = 100;

    useEffect(() => {
        setLoading(true);
        fetchJSON<Riders[]>('/api/rider')
            .then(setRiders)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Filter riders by date, status, and search term
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
                r._id?.toLowerCase().includes(term) ||
                r.name?.toLowerCase().includes(term) ||
                r.email?.toLowerCase().includes(term) ||
                r.mobnum?.toLowerCase().includes(term);

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [riders, searchTerm, fromDate, toDate, statusFilter]);

    const sortedRiders = useMemo(() => {
        return sortByDate(displayedRiders, 'createdAt', sortOrder);
    }, [displayedRiders, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate, statusFilter]);

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

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
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
                    exportDisabled={loading}
                />

                <StatsCard
                    columns={3}
                    items={[
                        { id: 'total', label: 'Total Passengers', value: totals.totalRiders, icon: <XCircleIcon className="w-5 h-5" />, color: 'blue' },
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
                    emptyMessage="No bookings found for selected date(s)."
                    actionColumn={{
                        label: 'Action',
                        render: (r) => (
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
