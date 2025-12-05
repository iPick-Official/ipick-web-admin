"use client";

import { useState } from "react";
import { Loading } from "../../../components/Loading";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // Redirect to protected route
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 relative">
            <div className="p-8 bg-white shadow-2xl rounded-xl w-full max-w-sm mx-auto transform transition duration-500">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width="60"
                        height="60"
                    />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-600 block mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-150 text-gray-700"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600 block mb-1">Password</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition duration-150 text-gray-700 pr-12"
                            required
                        />

                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition duration-150"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 transform hover:scale-[1.01]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
