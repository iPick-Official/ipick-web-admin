import { capitalize } from "@/app/utils/capitalized";
import { departments } from "@/app/utils/department";

type RegisterFormType = {
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobnum: string;
    address: string;
    password: string;
    position: string;
    department: string;
};

interface RegisterFormProps {
    form: RegisterFormType;
    setForm: React.Dispatch<React.SetStateAction<RegisterFormType>>;
    onSubmit: () => void;
}

export function RegisterForm({ form, setForm, onSubmit }: RegisterFormProps) {
    const requiredFields: (keyof RegisterFormType)[] = [
        "username",
        "firstName",
        "lastName",
        "mobnum",
        "email",
        "address",
        "password",
    ];

    const fieldsOrder: (keyof RegisterFormType)[] = [
        "username",
        "firstName",
        "middleName",
        "lastName",
        "email",
        "mobnum",
        "address",
        "department", // Department first
        "position",   // Position after department
        "password",
    ];

    const renderInput = (key: keyof RegisterFormType) => {
        const isSelect = key === "position" || key === "department";
        const isRequired = requiredFields.includes(key);

        const placeholderText = isRequired ? `(Required)` : `(Optional)`;

        return (
            <div key={key}>
                <label className="block text-xs mb-1 capitalize">{key}</label>

                {isSelect ? (
                    <select
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form[key]}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                                ...(key === "department" ? { position: "" } : {}),
                            }))
                        }
                        required={isRequired}
                    >
                        <option value="">Select {key}</option>
                        {key === "department"
                            ? departments.map((dept) => (
                                <option key={dept.name} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))
                            : departments
                                .find((d) => d.name === form.department)
                                ?.roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                    </select>
                ) : (
                    <input
                        type={key === "password" ? "password" : "text"}
                        placeholder={placeholderText}
                        className="w-full border rounded-md p-2 dark:bg-zinc-800 dark:text-white"
                        value={form[key]}
                        onChange={(e) => {
                            let value = e.target.value;

                            if (key === "mobnum") {
                                // digits only
                                value = value.replace(/\D/g, "");
                            }
                            else if (
                                key !== "username" &&
                                key !== "email" &&
                                key !== "password"
                            ) {
                                value = capitalize(value);
                            }

                            setForm((prev) => ({ ...prev, [key]: value }));
                        }}
                        maxLength={key === "mobnum" ? 10 : undefined}
                        required={isRequired}
                        readOnly={key === "password"}
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
            {/* 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldsOrder.map(renderInput)}
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
                Save Changes
            </button>
        </form>
    );
}