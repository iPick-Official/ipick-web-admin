'use client';

import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import ConfirmDialog from "@/components/ConfirmDialog";
import Modal from "@/components/Modal";
import { capitalize } from "@/app/utils/capitalized";

export default function ProfilePage() {
    const { admin, loading, updateAdmin } = useAdmin();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [profileForm, setProfileForm] = useState({
        username: "",
        email: "",
        mobnum: "",
        address: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
    });

    // Populate profile form once when admin loads
    useEffect(() => {
        if (admin) {
            setProfileForm({
                username: admin.username || "",
                email: admin.email || "",
                mobnum: admin.mobnum || "",
                address: admin.address || "",
            });
        }
    }, [admin]);

    async function handleLogout() {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                window.location.href = "/auth";
            } else {
                const data = await res.json();
                alert(data.message || "Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
            alert("Something went wrong during logout.");
        }
    }

    async function submitProfile() {
        try {
            const res = await fetch(`/api/admin/${admin?._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileForm),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to update profile");
            } else {
                const updated = await res.json();
                alert("Profile updated successfully");
                updateAdmin(updated); // Update state + cookie
                setShowEditProfile(false);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    async function submitPassword() {
        try {
            const res = await fetch(`/api/admin/${admin?._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordForm),
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to change password");
                setPasswordForm({ oldPassword: "", newPassword: "" });
            } else {
                alert("Password changed successfully");
                setShowChangePassword(false);
                setPasswordForm({ oldPassword: "", newPassword: "" });
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

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

                    <button
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={() => setShowEditProfile(true)}
                    >
                        Edit Profile
                    </button>

                    <button
                        className="w-full border py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                        onClick={() => setShowChangePassword(true)}
                    >
                        Change Password
                    </button>

                    <button
                        className="w-full text-red-600 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition"
                        onClick={() => setShowLogoutConfirm(true)}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={showEditProfile}
                onClose={() => setShowEditProfile(false)}
                title="Edit Profile"
                size="auto"
            >
                <ProfileForm form={profileForm} setForm={setProfileForm} onSubmit={submitProfile} />
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={showChangePassword}
                onClose={() => setShowChangePassword(false)}
                title="Change Password"
                size="auto"
            >
                <PasswordForm form={passwordForm} setForm={setPasswordForm} onSubmit={submitPassword} />
            </Modal>

            {/* Logout Confirmation */}
            <ConfirmDialog
                open={showLogoutConfirm}
                message="Are you sure you want to logout?"
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutConfirm(false)}
                confirmText="Yes, Logout"
                cancelText="Cancel"
            />
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

// Profile form
function ProfileForm({ form, setForm, onSubmit }: any) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3 text-sm">
            {Object.keys(form).map((key) => (
                <div key={key}>
                    <label className="block text-xs mb-1 capitalize">{key}</label>
                    <input
                        type="text"
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: (e.target.value) })}
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2"
            >
                Save Changes
            </button>
        </form>
    );
}

function PasswordForm({ form, setForm, onSubmit }: any) {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="space-y-3 text-sm"
        >
            {/* Old Password */}
            <div className="relative">
                <label className="block text-xs mb-1">Old Password</label>
                <input
                    type={showOld ? "text" : "password"}
                    className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white pr-10"
                    value={form.oldPassword}
                    onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-2 top-7 text-sm text-gray-500"
                >
                    {showOld ? "Hide" : "Show"}
                </button>
            </div>

            {/* New Password */}
            <div className="relative">
                <label className="block text-xs mb-1">New Password</label>
                <input
                    type={showNew ? "text" : "password"}
                    className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white pr-10"
                    value={form.newPassword}
                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-2 top-7 text-sm text-gray-500"
                >
                    {showNew ? "Hide" : "Show"}
                </button>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2"
            >
                Change Password
            </button>
        </form>
    );
}
