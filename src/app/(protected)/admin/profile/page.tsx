'use client';

import { useEffect, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { departments } from "@/app/utils/department";
import { Avatar } from "@/components/ui/Avatar";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Loading } from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { PasswordForm } from "@/components/ui/ProfileChangePass";
import { ProfileForm } from "@/components/ui/ProfileUpdate";
import { Info } from "@/components/ui/ProfileInfo";

export default function ProfilePage() {
    const { admin, loading, updateAdmin } = useAdmin();
    const [modal, setModal] = useState<"edit" | "password" | null>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [profileForm, setProfileForm] = useState({ username: "", email: "", mobnum: "", address: "" });
    const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });

    useEffect(() => {
        if (admin) setProfileForm({
            username: admin.username || "",
            email: admin.email || "",
            mobnum: admin.mobnum || "",
            address: admin.address || "",
        });
    }, [admin]);

    if (loading) return <Loading />;
    if (!admin) return <p>Not authorized</p>;

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) window.location.href = "/auth";
            else alert((await res.json()).message || "Logout failed");
        } catch (err) { alert("Logout error"); console.error(err); }
    };

    const submitProfile = async () => {
        if (!Object.values(profileForm).every(f => f.trim())) return alert("All fields are required");
        try {
            const res = await fetch(`/api/employees/${admin?._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileForm)
            });
            if (!res.ok) alert((await res.json()).message || "Failed to update profile");
            else {
                updateAdmin(await res.json());
                setModal(null);
                alert("Profile updated successfully");
            }
        } catch (err) { alert("Error updating profile"); console.error(err); }
    };

    const submitPassword = async () => {
        if (!passwordForm.oldPassword || !passwordForm.newPassword) return alert("Both fields required");
        try {
            const res = await fetch(`/api/employees/${admin?._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordForm)
            });
            if (!res.ok) alert((await res.json()).message || "Failed to change password");
            else { alert("Password changed"); setModal(null); setPasswordForm({ oldPassword: "", newPassword: "" }); }
        } catch (err) { alert("Error changing password"); console.error(err); }
    };

    const roleName = departments
        .find(d => d.id === admin.department)?.roles.find(r => r.id === admin.position)?.name || admin.position;

    return (
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
            {/* Profile Card */}
            <div className="relative flex items-center gap-6 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700">
                <span className="absolute top-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                    {process.env.NEXT_PUBLIC_VERSION_NUMBER || "1.0.2"}
                </span>
                <div className="w-25 h-25 rounded-full overflow-hidden border-2 border-gray-200 dark:border-zinc-700 ring-2 ring-green-500 dark:ring-green-700">
                    <Avatar photoUrl={admin?.photoUrl?.url} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{admin.firstName} {admin.middleName} {admin.lastName}</h1>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">Username: <span className="font-medium">{admin.username}</span></p>
                    <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">{roleName}</span>
                </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700 space-y-3">
                    <h2 className="text-lg font-semibold tracking-wide">Profile Information</h2>
                    <Info label="Address" value={admin.address} />
                    <Info label="Email Address" value={admin.email} />
                    <Info label="Mobile Number" value={`+63${admin.mobnum}`} />
                    <Info label="Department" value={departments.find(d => d.id === admin.department)?.name || admin.department} />
                    <Info label="Status" value="Active" />
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Actions</h2>
                    <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700" onClick={() => setModal("edit")}>Edit Profile</button>
                    <button className="w-full border border-gray-300 dark:border-zinc-600 py-2.5 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setModal("password")}>Change Password</button>
                    <button className="w-full text-red-600 border border-red-200 dark:border-red-700 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900" onClick={() => setShowLogoutConfirm(true)}>Logout</button>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "edit" ? "Edit Profile" : "Change Password"} size="auto">
                {modal === "edit" ?
                    <ProfileForm form={profileForm} setForm={setProfileForm} onSubmit={submitProfile} /> :
                    <PasswordForm form={passwordForm} setForm={setPasswordForm} onSubmit={submitPassword} />
                }
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