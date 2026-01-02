'use client';

import { Sidebar } from '@/components/Sidebar';
import { Riders } from '@/types/riders';
import { useEffect, useState, useMemo } from 'react';
import { Pagination } from '@/components/Pagination';
import { Loading } from '@/components/Loading';
import { Download, Edit, Eye, Percent, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { useSort } from '@/hooks/useSort';
import { Discounts } from '@/types/discount';
import SortButton from '@/components/SortButton';
import Modal from '@/components/Modal';
import { Detail } from '@/components/Details';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function RidersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState<Discounts | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const { sortOrder, toggleSort } = useSort("desc");
    const [riders, setRiders] = useState<Riders[]>([]);
    const [discounts, setDiscounts] = useState<Discounts[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    const itemsPerPage = 100;

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

    useEffect(() => {
        async function fetchRiders() {
            setLoading(true);
            try {
                const res = await fetch('/api/rider');
                if (!res.ok) throw new Error('Failed to fetch riders');
                const data = await res.json();
                setRiders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRiders();
    }, []);

    async function fetchDiscounts() {
        setIsOpen(true);
        setLoading(true);
        try {
            const res = await fetch('/api/discount');
            if (!res.ok) throw new Error('Failed to fetch riders');
            const data = await res.json();
            setDiscounts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Filtered and sorted riders
    const displayedRiders = useMemo(() => {
        let filtered = [...riders];

        if (fromDate && toDate) {
            filtered = filtered.filter((r) => {
                const created = r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : '';
                return created >= fromDate && created <= toDate;
            });
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (r) =>
                    r.id?.toLowerCase().includes(term) ||
                    r.name?.toLowerCase().includes(term) ||
                    r.email?.toLowerCase().includes(term) ||
                    r.mobnum?.includes(term)
            );
        }

        return filtered;
    }, [riders, searchTerm, fromDate, toDate]);

    const sortedRiders = useMemo(() => {
        return [...displayedRiders].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
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
        return { loggedIn, notLoggedIn };
    }, [displayedRiders]);

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
                body: JSON.stringify({ status: newStatus, reviewedBy: updatedBy }),
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

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">Passengers</h2>
                    <div className="flex flex-wrap items-center gap-4 border border-gray-300 rounded-lg p-4">
                        {/* Date Filters */}
                        {[
                            { label: 'From', value: fromDate, setter: setFromDate },
                            { label: 'To', value: toDate, setter: setToDate },
                        ].map((d) => (
                            <div key={d.label} className="flex items-center gap-2">
                                <label className="text-sm">{d.label}:</label>
                                <input
                                    type="date"
                                    value={d.value}
                                    onChange={(e) => d.setter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        ))}

                        {/* Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, email, or mobile"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                        />
                        <button className="ml-auto px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md shadow-sm text-sm font-medium transition" onClick={fetchDiscounts}>
                            <Percent />
                        </button>
                        <button className="ml-auto px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition">
                            <Download />
                        </button>
                    </div>
                </div>

                {/* Totals Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Passengers', value: riders.length },
                        { label: 'Logged In', value: totals.loggedIn },
                        { label: 'Not Logged In', value: totals.notLoggedIn },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="relative bg-orange-50 dark:bg-zinc-800 border-l-4 border-orange-500 dark:border-green-800 shadow-sm rounded-lg px-4 py-6"
                        >
                            {/* Label in top-left */}
                            <p className="absolute top-2 left-4 text-sm">{item.label}</p>

                            {/* Value centered */}
                            <div className="flex items-center justify-center h-full">
                                <p className="text-orange-700 dark:text-orange-300 font-bold text-2xl">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="shadow-md rounded-lg overflow-hidden max-h-[75vh] bg-white dark:bg-zinc-800">
                    <div className="overflow-y-auto max-h-[75vh]">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                                <tr>
                                    {['ID', 'Name', 'Email', 'Mobile', 'Address', 'Logged'].map((col) => (
                                        <th key={col} className="px-6 py-3 font-medium text-left">
                                            {col}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 font-medium text-left">
                                        <SortButton
                                            label="Created At"
                                            sortOrder={sortOrder}
                                            onToggle={toggleSort}
                                        />
                                    </th>
                                    <th className="px-6 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="py-6">
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Loading />
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedRiders.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                                            No riders found for selected filters.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedRiders.map((r) => (
                                        <tr key={r._id} className="border-b hover:bg-gray-800 hover:text-white transition">
                                            <td className="px-6 py-3">{r.id}</td>
                                            <td className="px-6 py-3">{r.name.toUpperCase() || '-'}</td>
                                            <td className="px-6 py-3">{r.email || '-'}</td>
                                            <td className="px-6 py-3">{r.mobnum || '-'}</td>
                                            <td className="px-6 py-3">{r.address || '-'}</td>
                                            <td className={`px-6 py-3 font-semibold ${r.isLogged ? 'text-green-600' : 'text-gray-500'}`}>
                                                {r.isLogged ? 'Yes' : 'No'}
                                            </td>
                                            <td className="px-6 py-3">
                                                {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center text-green-700 justify-center">
                                                    <Eye />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Discount Details' size="xxl">
                <div className="shadow-md rounded-lg overflow-hidden max-h-[75vh] bg-white dark:bg-zinc-800">
                    <div className="overflow-y-auto max-h-[75vh]">
                        {!selectedDiscount ? (
                            <table className="min-w-full text-sm text-left border-collapse">
                                <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                                    <tr>
                                        {['ID', 'Name', 'ID Number', 'Type', 'Status', 'Expiration Date'].map((col) => (
                                            <th key={col} className="px-6 py-3 font-medium text-left">
                                                {col}
                                            </th>
                                        ))}
                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} className="py-6">
                                                <div className="flex items-center justify-center w-full h-full">
                                                    <Loading />
                                                </div>
                                            </td>
                                        </tr>
                                    ) : discounts.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                                                No riders found for selected filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        discounts.map((d) => (
                                            <tr key={d._id} className="border-b hover:bg-gray-800 hover:text-white transition">
                                                <td className="px-6 py-3">{d.riderId}</td>
                                                <td className="px-6 py-3">{d.name}</td>
                                                <td className="px-6 py-3">{d.idNumber}</td>
                                                <td className="px-6 py-3 uppercase">{d.idType}</td>
                                                <td className="px-6 py-3 uppercase">{d.status}</td>
                                                <td className="px-6 py-3">{d.expirationDate ? new Date(d.expirationDate).toLocaleDateString() : '-'}</td>
                                                <td className="px-6 py-3 text-green-700 text-right">
                                                    <button onClick={() => handleDiscountDetails(d)}>
                                                        <Edit />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            /* ================= DETAILS VIEW ================= */
                            <div className="p-6 space-y-4">
                                {/* Back button */}
                                <button
                                    onClick={() => setSelectedDiscount(null)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    ← Back to list
                                </button>

                                {/* Details grid */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <Detail label="Rider ID" value={selectedDiscount.riderId} />
                                    <Detail label="Name" value={selectedDiscount.name} />
                                    <Detail label="ID Number" value={selectedDiscount.idNumber} />
                                    <Detail label="ID Type" value={selectedDiscount.idType?.toUpperCase()} />
                                    <Detail label="Status" value={selectedDiscount.status?.toUpperCase()} />
                                    <Detail label="Reason for rejected" value={selectedDiscount.reason} />
                                    <Detail
                                        label="Expiration Date"
                                        value={
                                            selectedDiscount.expirationDate
                                                ? new Date(selectedDiscount.expirationDate).toLocaleDateString()
                                                : '—'
                                        }
                                    />
                                    <Detail
                                        label="Photo"
                                        value={
                                            photoUrl ? (
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {selectedDiscount.photoUrl?.name || 'View Photo'}
                                                </button>
                                            ) : (
                                                '—'
                                            )
                                        }
                                    />

                                    {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                                            {/* Buttons always on top */}
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button
                                                    className="p-2 bg-gray-700 bg-opacity-70 rounded hover:bg-opacity-90"
                                                    onClick={() => setZoom((prev) => prev + 0.1)}
                                                    title="Zoom In"
                                                >
                                                    <ZoomInIcon className="w-6 h-6 text-white" />
                                                </button>
                                                <button
                                                    className="p-2 bg-gray-700 bg-opacity-70 rounded hover:bg-opacity-90"
                                                    onClick={() => setZoom((prev) => Math.max(0.1, prev - 0.1))}
                                                    title="Zoom Out"
                                                >
                                                    <ZoomOutIcon className="w-6 h-6 text-white" />
                                                </button>
                                                <button
                                                    className="p-2 bg-red-600 bg-opacity-80 rounded hover:bg-opacity-100"
                                                    onClick={() => {
                                                        setIsModalOpen(false);
                                                        setZoom(1);
                                                    }}
                                                    title="Close"
                                                >
                                                    <XMarkIcon className="w-6 h-6 text-white" />
                                                </button>
                                            </div>

                                            {/* Image */}
                                            <div className="flex items-center justify-center w-full h-full">
                                                {photoUrl && (
                                                    <img
                                                        src={photoUrl}
                                                        alt={selectedDiscount.photoUrl?.name}
                                                        style={{
                                                            transform: `scale(${zoom})`,
                                                            transition: 'transform 0.2s ease-in-out',
                                                            maxHeight: '90vh',
                                                            maxWidth: '90vw',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <Detail label="Reviewed By" value={selectedDiscount.reviewedBy} />
                                    <Detail
                                        label="Reviewed At"
                                        value={
                                            selectedDiscount.updatedAt && new Date(selectedDiscount.updatedAt).toLocaleString()
                                        }
                                    />
                                </div>

                                {/* Approve / Reject buttons if status is pending */}
                                {selectedDiscount.status === 'pending' && (
                                    <>
                                        <div className="mt-4 space-y-2">
                                            <label className="text-sm font-medium">
                                                Rejection Reason <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                className="w-full border rounded p-2 text-sm bg-gray-100 dark:bg-zinc-900"
                                                rows={3}
                                                placeholder="Enter reason for rejection"
                                                value={rejectReason}
                                                onChange={(e) => setRejectReason(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-4 mt-4">
                                            <button
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                onClick={() =>
                                                    updateDiscountStatus(selectedDiscount._id, 'approved')
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded text-white transition ${rejectReason?.trim()
                                                    ? 'bg-red-600 hover:bg-red-700'
                                                    : 'bg-red-400 cursor-not-allowed'
                                                    }`}
                                                disabled={!rejectReason?.trim() || !selectedDiscount}
                                                onClick={() => {
                                                    if (!selectedDiscount) return;
                                                    updateDiscountStatus(
                                                        selectedDiscount._id,
                                                        'rejected',
                                                        rejectReason
                                                    );
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
