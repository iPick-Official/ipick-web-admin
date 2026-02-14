import Image from "next/image";
import { Detail } from "../ui/Details";
import { CameraIcon } from "lucide-react";
import { Driver, DriverStatus, SignedUrls } from "@/types/drivers";
import { Admin } from "@/types/admin";
import { getStatusBadge } from "@/app/utils/getStatusBadge";

type Props = {
    selectedDriver: Driver;
    signedUrls: SignedUrls;
    admin?: Admin | null;
    updateDriverStatus: (id: string, status: DriverStatus) => void;
};

function parseDate(value: string | { $date: string } | undefined | null) {
    if (!value) return null;
    return typeof value === "string" ? value : value.$date;
}

export default function DriverDetailsCard({
    selectedDriver,
    signedUrls,
    admin,
    updateDriverStatus,
}: Props) {
    const createdAt = selectedDriver.createdAt
        ? new Date(selectedDriver.createdAt).toLocaleString()
        : "-";

    const updatedAtRaw = parseDate(selectedDriver.updatedAt);
    const updatedAt = updatedAtRaw
        ? new Date(updatedAtRaw).toLocaleString()
        : "-";

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* LEFT SIDE */}
                <div className="flex flex-col w-full lg:w-72 gap-6">

                    {/* Profile + Status */}
                    <div className="relative w-full h-97 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-md group">

                        {/* Image */}
                        <Image
                            src={signedUrls.profile || "/logo.png"}
                            alt={`${selectedDriver.name} Profile`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Soft Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent 
                            opacity-0 group-hover:opacity-100 transition duration-300" />

                        {/* Status Badge */}
                        <span
                            className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md
                                ${getStatusBadge(selectedDriver.status)}`}
                        >
                            {selectedDriver.status.toUpperCase()}
                        </span>

                        {/* Floating Upload Button */}
                        <label
                            className="absolute bottom-4 right-4 cursor-pointer 
                                opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300 ease-out"
                        >
                            <div className="w-11 h-11 flex items-center justify-center 
                                rounded-full bg-white/90 dark:bg-zinc-800/90 
                                backdrop-blur-md shadow-lg 
                                hover:scale-105 hover:bg-white transition text-black"
                            >
                                <CameraIcon/>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            // onChange={handleProfileUpload}
                            />
                        </label>
                    </div>

                    {/* Wallet Card */}
                    <div className="w-full bg-gradient-to-r from-slate-800 to-slate-500 text-white rounded-2xl p-4 shadow-md flex flex-col justify-center h-35">
                        <p className="text-xs uppercase tracking-wide opacity-80">
                            Wallet Balance
                        </p>
                        <p className="text-2xl font-semibold mt-1">
                            ₱{selectedDriver.wallet?.walletBalance.toFixed(2) || "0.00"}
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                            {selectedDriver.name}
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Driver ID: {selectedDriver.id}
                        </p>
                    </div>

                    <div className="border-t border-zinc-200 dark:border-zinc-800" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        {[
                            ["Email", selectedDriver.email],
                            ["Mobile", selectedDriver.mobnum],
                            ["Car Type", selectedDriver.carType || "-"],
                            [
                                "Address",
                                `${selectedDriver.address}, ${selectedDriver.city}, ${selectedDriver.province}, ${selectedDriver.zipCode}`,
                            ],
                            ["LTFRB Case Number", selectedDriver.caseNum],
                            ["Created At", createdAt],
                            ["Updated By", selectedDriver.updatedBy || "-"],
                            ["Updated At", updatedAt],
                        ].map(([label, value]) => (
                            <Detail key={label!} label={label!} value={value} />
                        ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    {(selectedDriver.status === "pending" &&
                        admin?.department === "executive_leadership") ||
                        selectedDriver.status === "approved" ? (
                        <>
                            <div className="border-t border-zinc-200 dark:border-zinc-800" />

                            {selectedDriver.status === "pending" &&
                                admin?.department === "executive_leadership" && (
                                    <div className="flex gap-4">
                                        <button
                                            className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow transition"
                                            onClick={() =>
                                                updateDriverStatus(selectedDriver._id!, "rejected")
                                            }
                                        >
                                            Reject
                                        </button>

                                        <button
                                            className="flex-1 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow transition"
                                            onClick={() =>
                                                updateDriverStatus(selectedDriver._id!, "approved")
                                            }
                                        >
                                            Approve
                                        </button>
                                    </div>
                                )}

                            {selectedDriver.status === "approved" && (
                                <div className="flex gap-4">
                                    <button
                                        className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow transition"
                                        onClick={() =>
                                            updateDriverStatus(selectedDriver.id, "inactive")
                                        }
                                    >
                                        Deactivate
                                    </button>

                                    <button
                                        className="flex-1 px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow transition"
                                        onClick={() =>
                                            updateDriverStatus(selectedDriver._id!, "pending")
                                        }
                                    >
                                        Disapprove
                                    </button>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
