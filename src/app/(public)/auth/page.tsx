"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Loading } from "@/components/ui/Loading";
import Image from "next/image";

export default function AuthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log("Data", data);
            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            if (password === "iPick_2023") {
                alert("Please change your password immediately!");
                router.push("/admin/profile");
                return;
            }
            router.push("/admin/dashboard");
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <div className="flex items-center justify-center h-screen relative">
            <div className="p-8 bg-white dark:bg-zinc-800 shadow-2xl rounded-xl w-full max-w-sm mx-auto transition duration-500">

                {/* Logo */}
                <div className="flex justify-center mb-6 round-lg">
                    <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:ring-4 focus:ring-green-100 focus:border-green-500"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password */}
                <p className="mt-6 text-center text-sm">
                    <button
                        // onClick={() => setShowRegister(true)}
                        className="text-green-700 font-medium hover:underline"
                    >
                        Forgot password?
                    </button>
                </p>
            </div>
        </div>
    );
}
