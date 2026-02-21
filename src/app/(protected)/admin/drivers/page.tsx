'use client';

import { CheckCircleIcon, ClockIcon, Eye, XCircleIcon } from 'lucide-react';
import { Driver, DriverResponse, DriverWithWallet, WalletLog } from '@/types/drivers';
import { useEffect, useState, useMemo } from 'react';
import { useSignedDocs } from '@/hooks/useSignedDocs';
import { DriverDataResponse } from '@/types/history';
import { useSort } from '@/hooks/useSort';
import { useAdmin } from '@/hooks/useAdmin';
import { exportDriversToCSVWithPapa } from '@/app/utils/DownloadReports';
import { Pagination } from "@/components/ui/Pagination";
import { Sidebar } from "@/components/ui/Sidebar";
import { fetchJSON } from '@/app/utils/fetchJSON';
import { getStatusColor } from '@/app/utils/statusColor';
import { sortByDate } from '@/app/utils/sortByDate';
import { BsCardChecklist } from 'react-icons/bs';
import DriverDetailsCard from "@/components/drivers-modal/DriverDetailsCard";
import PersonalRequirementsCard from "@/components/drivers-modal/PersonalRequirementsCard";
import TransportRequirementsCard from "@/components/drivers-modal/TransportRequirementsCard";
import RideHistoryCard from "@/components/drivers-modal/RideHistoryCard";
import MessagesCard from "@/components/drivers-modal/MessagesCard";
import WalletCard from "@/components/drivers-modal/WalletCard";
import DriverModal from '@/components/drivers-modal/DriverModal';
import FilterToolbar from '@/components/ui/FilterToolbar';
import StatsCard from '@/components/ui/StatsCard';
import DataTable, { Column } from '@/components/ui/DataTable';

export default function DriversPage() {
    const { sortOrder, toggleSort } = useSort("desc");
    const { admin } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rideHistory, setRideHistory] = useState<DriverDataResponse | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<DriverWithWallet | null>(null);
    const [walletLogs, setWalletLogs] = useState<WalletLog[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const [activeTab, setActiveTab] = useState("Details");
    const tabs = ["Details", "Personal", "Transport", "Ride History", "Messages", "Wallet"];

    // --- Top level hooks for all documents ---
    const docKeys = {

        profile: selectedDriver?.personalRequirements?.profilePicture?.url,
        pwdFile: selectedDriver?.personalRequirements?.pwdFile?.url,
        vaccinationCert: selectedDriver?.personalRequirements?.vaccinationCertificate?.url,
        driverLicenseFront: selectedDriver?.personalRequirements?.driverLicenseFront?.url,
        driverLicenseBack: selectedDriver?.personalRequirements?.driverLicenseBack?.url,
        otherDoc: selectedDriver?.personalRequirements?.documentImg?.url,

        operatorDocs: selectedDriver?.transportRequirements?.vehicleOwnership?.operatorDocuments?.url,
        ownerDocs: selectedDriver?.transportRequirements?.ownerDocuments?.url,
        operatorsDoc: selectedDriver?.transportRequirements?.operatorsDocument?.url,
        vehicleOR: selectedDriver?.transportRequirements?.vehicleOR?.url,
        vehicleCR: selectedDriver?.transportRequirements?.vehicleCR?.url,
        vehicleSalesInvoice: selectedDriver?.transportRequirements?.vehicleSalesInvoice?.url,
        authorizationLetterPageOne: selectedDriver?.transportRequirements?.authorizationLetterPageOne?.url,
        authorizationLetterPageTwo: selectedDriver?.transportRequirements?.authorizationLetterPageTwo?.url,
        sPAPageOne: selectedDriver?.transportRequirements?.sPAPageOne?.url,
        sPAPageTwo: selectedDriver?.transportRequirements?.sPAPageTwo?.url,
        pAPageOne: selectedDriver?.transportRequirements?.pAPageOne?.url,
        pAPageTwo: selectedDriver?.transportRequirements?.pAPageTwo?.url,
        cPCPageOne: selectedDriver?.transportRequirements?.cPCPageOne?.url,
        cPCPageTwo: selectedDriver?.transportRequirements?.cPCPageTwo?.url,
        mEPAPageOne: selectedDriver?.transportRequirements?.mEPAPageOne?.url,
        mEPAPageTwo: selectedDriver?.transportRequirements?.mEPAPageTwo?.url,
        pAMI: selectedDriver?.transportRequirements?.pAMI?.url,
    };

    const signedUrls = useSignedDocs(docKeys);
    const updateDriverStatus = async (
        driverId: string,
        newStatus: string
    ) => {
        if (!confirm(`Change driver status to ${newStatus.toUpperCase()}?`)) return;

        try {
            const cookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("admin="))
                ?.split("=")[1];

            const admin = cookie ? JSON.parse(decodeURIComponent(cookie)) : null;

            const updatedBy =
                admin?.firstName && admin?.lastName
                    ? `${admin.firstName} ${admin.lastName}`
                    : "unknown";

            const res = await fetch(`/api/driver/${driverId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, updatedBy }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            window.location.reload();
        } catch (err) {
            alert("Error updating driver");
        }
    };

    const tabComponents: Record<string, React.ReactNode> = {
        Details: (
            <DriverDetailsCard
                selectedDriver={selectedDriver!}
                signedUrls={signedUrls}
                admin={admin}
                updateDriverStatus={updateDriverStatus}
            />
        ),
        Personal: (
            <PersonalRequirementsCard
                personalRequirements={selectedDriver?.personalRequirements}
                signedUrls={signedUrls}
            />
        ),
        Transport: (
            <TransportRequirementsCard
                transportRequirements={selectedDriver?.transportRequirements}
                signedUrls={signedUrls}
            />
        ),
        "Ride History": <RideHistoryCard rideHistory={rideHistory} />,
        Messages: (
            <MessagesCard messages={rideHistory?.driver?.messages} />
        ),
        Wallet: (
            <WalletCard
                wallet={selectedDriver?.wallet}
                walletLogs={walletLogs}
            />
        ),
    };

    const renderTabContent = () => {
        if (!selectedDriver)
            return <p className="text-gray-500">No driver found.</p>;
        return tabComponents[activeTab] ?? null;
    };

    useEffect(() => {
        setLoading(true);
        fetchJSON<Driver[]>("/api/driver")
            .then(setDrivers)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    async function fetchDetailHistory(id: string) {
        setLoading(true);
        try {
            const data = await fetchJSON<DriverResponse>(
                `/api/driver/${id}/information`
            );

            setSelectedDriver({ ...data.driver, wallet: data.wallet });
            setWalletLogs(data.walletLogs || []);

            const history = await fetchJSON<DriverDataResponse>(
                `/api/driver/${data.driver.id}/history`
            );

            setRideHistory(history);
            setIsOpen(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const displayedDrivers = useMemo(() => {
        return drivers.filter((d) => {
            const created = d.createdAt ? new Date(d.createdAt) : null;

            const matchesDate =
                !fromDate ||
                !toDate ||
                (created &&
                    created >= new Date(fromDate) &&
                    created <= new Date(toDate));

            const matchesStatus =
                statusFilter === "all" || d.status === statusFilter;

            const term = searchTerm.toLowerCase();
            const matchesSearch =
                !term ||
                d.id?.toLowerCase().includes(term) ||
                d.name?.toLowerCase().includes(term) ||
                d.email?.toLowerCase().includes(term) ||
                d.mobnum?.includes(term);

            return matchesDate && matchesStatus && matchesSearch;
        });
    }, [drivers, statusFilter, searchTerm, fromDate, toDate]);

    const sortedDrivers = useMemo(() => {
        return sortByDate(displayedDrivers, "createdAt", sortOrder);
    }, [displayedDrivers, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm, fromDate, toDate]);

    const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);
    const paginatedDrivers = sortedDrivers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totals = useMemo(() => {
        const approved = displayedDrivers.filter((d) => d.status === 'approved').length;
        const pending = displayedDrivers.filter((d) => d.status === 'pending').length;
        const rejected = displayedDrivers.filter((d) => d.status === 'rejected').length;
        return { approved, pending, rejected };
    }, [displayedDrivers]);

    const columns: Column<Driver>[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name", render: (d: { name: string; }) => d.name.toUpperCase() },
        { key: "email", label: "Email" },
        { key: "mobnum", label: "Mobile" },
        { key: "carType", label: "Car Type" },
        {
            key: "plate",
            label: "Plate No.",
            render: (d: { transportRequirements: { plateNumber: any; }; }) => d.transportRequirements.plateNumber,
        },
        {
            key: "status",
            label: "Status",
            render: (d: { status: string; }) => (
                <span className={`font-semibold ${getStatusColor(d.status)}`}>
                    {d.status.toUpperCase()}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (d: Driver) =>
                d.createdAt ? new Date(d.createdAt).toLocaleString() : "-",
            sortable: true,
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                <FilterToolbar
                    title="Drivers"
                    dateFilters={[
                        { label: "From", value: fromDate, onChange: setFromDate },
                        { label: "To", value: toDate, onChange: setToDate },
                    ]}
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onExport={() => exportDriversToCSVWithPapa(sortedDrivers)}
                    onRegister={() => alert("Driver Register!")}
                    exportDisabled={loading}
                />

                <StatsCard
                    columns={4}
                    items={[
                        { id: "all", label: "Total Drivers", value: drivers.length, icon: <BsCardChecklist className="w-5 h-5" />, color: "blue" },
                        { id: "approved", label: "Approved", value: totals.approved, icon: <CheckCircleIcon className="w-5 h-5" />, color: "green" },
                        { id: "pending", label: "Pending", value: totals.pending, icon: <ClockIcon className="w-5 h-5" />, color: "yellow" },
                        { id: "rejected", label: "Rejected", value: totals.rejected, icon: <XCircleIcon className="w-5 h-5" />, color: "red" },
                    ]}
                    onFilter={(status) => { console.log("Filter table by:", status); setStatusFilter(status); }}
                />

                <DataTable
                    columns={columns}
                    data={paginatedDrivers}
                    loading={loading}
                    rowKey={(d) => d._id}
                    emptyMessage="No drivers found for selected filters."
                    sortOrder={sortOrder}
                    onSortToggle={toggleSort}
                    actionColumn={{
                        label: "Action",
                        render: (d) => (
                            <div
                                className="flex items-center justify-center text-green-700"
                                onClick={() => fetchDetailHistory(d._id)}
                            >
                                <Eye />
                            </div>
                        ),
                    }}
                />

                <DriverModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    selectedDriver={selectedDriver}
                    loading={loading}
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    renderTabContent={renderTabContent}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div >
    );
}
