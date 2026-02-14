'use client';

import { useEffect, useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { capitalize } from "@/app/utils/capitalized";
import { departments } from "@/app/utils/department";
import { Sidebar } from "@/components/ui/Sidebar";
import { Avatar } from "@/components/ui/Avatar";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Loading } from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { PasswordForm } from "@/components/ui/ProfileChangePass";
import { ProfileForm } from "@/components/ui/ProfileUpdate";
import { Info } from "@/components/ui/ProfileInfo";

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
        if (!profileForm.username?.trim() || !profileForm.email?.trim() || !profileForm.mobnum?.trim() || !profileForm.address?.trim()) {
            alert("All fields are required");
            return;
        }
        try {
            const res = await fetch(`/api/employees/${admin?._id}`, {
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
        if (!passwordForm.oldPassword?.trim() || !passwordForm.newPassword?.trim()) {
            alert("Both old and new passwords are required");
            return;
        }
        try {
            const res = await fetch(`/api/employees/${admin?._id}`, {
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
            <div className="relative flex items-center gap-6 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700">
                {/* Version */}
                <span className="absolute top-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                    v1.0.0
                </span>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-zinc-700 ring-2 ring-green-500 dark:ring-green-700">
                    <Avatar photoUrl={admin?.photoUrl?.url} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-wide">
                        {admin.firstName} {admin.middleName} {admin.lastName}
                    </h1>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                        Username: <span className="font-medium">{admin.username}</span>
                    </p>
                    <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 transition-all hover:bg-orange-200/80">
                        {
                            departments
                                .find(dept => dept.id === admin.department)
                                ?.roles.find(role => role.id === admin.position)?.name
                            || admin.position
                        }
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700">
                    <h2 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-200 tracking-wide">
                        Profile Information
                    </h2>

                    <div className="space-y-3 text-sm">
                        <Info label="Address" value={admin.address} />
                        <Info label="Email Address" value={admin.email} />
                        <Info label="Mobile Number" value={`+63${admin.mobnum}`} />
                        <Info label="Department" value={
                            departments.find((dept: { id: string; }) => dept.id === admin.department)?.name || admin.department
                        } />
                        <Info label="Status" value="Active" />
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-700 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Actions</h2>

                    <button
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:bg-green-700 transition-colors duration-200"
                        onClick={() => setShowEditProfile(true)}
                    >
                        Edit Profile
                    </button>

                    <button
                        className="w-full border border-gray-300 dark:border-zinc-600 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                        onClick={() => setShowChangePassword(true)}
                    >
                        Change Password
                    </button>

                    <button
                        className="w-full text-red-600 border border-red-200 dark:border-red-700 py-2.5 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
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

