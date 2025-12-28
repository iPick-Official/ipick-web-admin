import { capitalize } from "@/app/utils/capitalized";
import { departments, statusOptions } from "@/app/utils/department";
import { RegisterFormType } from "@/types/registration";
import { useMemo, useRef } from "react";

interface RegisterFormProps {
    form: RegisterFormType;
    setForm: React.Dispatch<React.SetStateAction<RegisterFormType>>;
    onSubmit: () => void;
}

export function RegisterForm({ form, setForm, onSubmit }: RegisterFormProps) {
    const initialFormRef = useRef<RegisterFormType>(form);
    const requiredFields: (keyof RegisterFormType)[] = [
        "username",
        "firstName",
        "lastName",
        "mobnum",
        "email",
        "address",
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
        return Object.keys(form).some(
            (key) =>
                form[key as keyof RegisterFormType] !==
                initialFormRef.current[key as keyof RegisterFormType]
        );
    }, [form]);


    const renderInput = (key: keyof RegisterFormType) => {
        const isDepartmentOrPosition = key === "department" || key === "position";
        const isStatus = key === "status";
        const isRequired = requiredFields.includes(key);

        return (
            <div key={key}>
                <label className="block text-xs mb-1 capitalize">{key}</label>

                {/* Department & Position dropdown */}
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

                {/* ✅ Status dropdown */}
                {isStatus && (
                    <select
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form.status || ""}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                status: e.target.value,
                            }))
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

                {/* Text inputs */}
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
                        value={form[key] ?? ""}
                        onChange={(e) => {
                            let value = e.target.value;

                            if (key === "mobnum") {
                                value = value.replace(/\D/g, "");
                            } else if (
                                key !== "username" &&
                                key !== "email" &&
                                key !== "password"
                            ) {
                                value = capitalize(value);
                            }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldsOrder.map(renderInput)}
            </div>

            <button
                type="submit"
                disabled={!hasChanges}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
                Save Changes
            </button>
        </form>
    );
}
