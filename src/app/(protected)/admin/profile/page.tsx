'use client';

import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import { useAdmin } from "@/hooks/useAdmin";
import { Loading } from "@/components/Loading";

export default function ProfilePage() {
    const { admin, loading } = useAdmin();

    if (loading) return <Loading />;
    if (!admin) return <p>Not authorized</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <Sidebar />
            <div className="flex items-center gap-6 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border">
                <Image
                    src="/logo.png"
                    alt="Admin Avatar"
                    width={96}
                    height={96}
                    className="rounded-full border"
                />

                <div>
                    <h1 className="text-2xl font-semibold">{admin.firstName} {admin.middleName} {admin.lastName}</h1>
                    <p className="text-sm text-muted-foreground">Username: {admin.username}</p>
                    <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {admin?.position}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border">
                    <h2 className="text-lg font-medium mb-4">Profile Information</h2>

                    <div className="space-y-3 text-sm">
                        <Info label="Address" value={admin.address} />
                        <Info label="Email Address" value={admin.email} />
                        <Info label="Mobile Number" value={`+63${admin.mobnum}`} />
                        <Info label="Department" value={admin.department} />
                        <Info label="Status" value="Active" />
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border space-y-3">
                    <h2 className="text-lg font-medium">Actions</h2>

                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                        Edit Profile
                    </button>

                    <button className="w-full border py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                        Change Password
                    </button>

                    <button className="w-full text-red-600 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}