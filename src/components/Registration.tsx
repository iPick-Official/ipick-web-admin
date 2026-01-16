import { capitalize } from "@/app/utils/capitalized";
import { departments, statusOptions } from "@/app/utils/department";
import { RegisterFormType } from "@/types/registration";
import { useMemo, useRef } from "react";
import Image from "next/image";

interface RegisterFormProps {
    form: RegisterFormType;
    setForm: React.Dispatch<React.SetStateAction<RegisterFormType>>;
    onSubmit: () => void;
    onFileChange?: (file: File) => void; // optional prop for image selection
    profileImage?: { name: string; url: string } | null; // optional preview
}

export function RegisterForm({ form, setForm, onSubmit, onFileChange, profileImage }: RegisterFormProps) {
    const initialFormRef = useRef<RegisterFormType>(form);

    const requiredFields: (keyof RegisterFormType)[] = [
        "username",
        "firstName",
        "lastName",
        "mobnum",
        "email",
        "address",
        "photoUrl",
    ];

    const fieldsOrder: (keyof RegisterFormType)[] = [
        "username",
        "firstName",
        "middleName",
        "lastName",
        "email",
        "mobnum",
        "address",
        "department",
        "position",
        "status",
    ];

    const hasChanges = useMemo(() => {
        return (
            Object.keys(form).some((key) => {
                const k = key as keyof RegisterFormType;
                if (k === "photoUrl") return false;
                return form[k] !== initialFormRef.current[k];
            }) || !!profileImage
        );
    }, [form, profileImage]);

    const renderInput = (key: keyof RegisterFormType) => {
        if (key === "photoUrl") return null; // file handled separately
        const isDepartmentOrPosition = key === "department" || key === "position";
        const isStatus = key === "status";
        const isRequired = requiredFields.includes(key);

        return (
            <div key={key}>
                <label className="block text-xs mb-1 capitalize">{key}</label>

                {isDepartmentOrPosition && (
                    <select
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form[key] || ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                                ...(key === "department" ? { position: "" } : {}),
                            }))
                        }
                    >
                        <option value="">Select {key}</option>
                        {key === "department"
                            ? departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))
                            : departments
                                .find((d) => d.id === form.department)
                                ?.roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                    </select>
                )}

                {isStatus && (
                    <select
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form.status || ""}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, status: e.target.value }))
                        }
                    >
                        <option value="">Select status</option>
                        {statusOptions.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                )}

                {!isDepartmentOrPosition && !isStatus && (
                    <input
                        type="text"
                        placeholder={
                            key === "password"
                                ? "Leave blank to keep current password"
                                : isRequired
                                    ? "(Required)"
                                    : "(Optional)"
                        }
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={typeof form[key] === "string" ? form[key] : ""}
                        onChange={(e) => {
                            let value = e.target.value;

                            if (key === "mobnum") value = value.replace(/\D/g, "");
                            else if (!["username", "email", "password"].includes(key))
                                value = capitalize(value);

                            setForm((prev) => ({ ...prev, [key]: value }));
                        }}
                        maxLength={key === "mobnum" ? 10 : undefined}
                    />
                )}
            </div>
        );
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="space-y-4 text-sm"
        >
            {/* Profile Photo Upload */}
            {onFileChange && (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800">
                            {profileImage ? (
                                <img
                                    src={profileImage.url}
                                    alt={profileImage.name || "Profile Preview"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
                                    No Image
                                </div>
                            )}
                        </div>

                        <label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            <span className="text-white text-xs font-medium">Change</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    // Update preview
                                    const url = URL.createObjectURL(file);
                                    onFileChange(file);

                                    // Also update form.photoUrl.name
                                    setForm((prev) => ({
                                        ...prev,
                                        photoUrl: { name: file.name, url },
                                    }));
                                }}
                            />
                        </label>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                            Profile Photo
                        </p>
                        <p>PNG, JPG up to 500KB</p>
                        <p>Recommended: 1:1 ratio</p>
                        {profileImage?.name && (
                            <p className="mt-1 text-gray-600 dark:text-gray-400 text-xs">
                                {profileImage.name}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldsOrder.map(renderInput)}
            </div>

            <button
                type="submit"
                disabled={!hasChanges}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
                Save Changes
            </button>
        </form>
    );
}
