import { useState } from "react";

export function PasswordForm({ form, setForm, onSubmit }: any) {
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