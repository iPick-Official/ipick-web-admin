"use client";

import { useState } from "react";
import Image from 'next/image';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = isLogin ? "login" : "register";
        const body = isLogin ? { username, password, role: "admin" } : { username, email, password, role: "admin" };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            if (isLogin) {
                localStorage.setItem("token", data.access_token);
                alert("Login successful!");
            } else {
                alert("Registration successful! You can now log in.");
                setIsLogin(true);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);  // Safely access err.message if it's an instance of Error
            } else {
                alert("An unknown error occurred");
            }
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('/bg-bus.png')" }}
        >
            {/* Frosted glass card */}
            <div className="bg-white/30 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl w-96 transition-all duration-500 relative">

                {/* Logo above the card */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/logo-komyut.png"
                        alt="KomyutPH Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-lg rounded-2xl bg-white"
                    />
                </div>

                {/* Add top spacing so content doesn’t overlap */}
                <div className="mt-10">
                    {/* Toggle buttons */}
                    <div className="flex justify-between mb-6 rounded-xl overflow-hidden bg-gray-200/70 backdrop-blur-sm p-1">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${isLogin ? "bg-gray-800 text-white shadow" : "text-gray-700"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${!isLogin ? "bg-gray-800 text-white shadow" : "text-gray-700"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Forms */}
                    <div
                        className={`transition-all duration-500 transform ${isLogin
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4 absolute"
                            }`}
                    >
                        {isLogin && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 text-white py-2 rounded-xl hover:bg-blue-900 transition shadow-md"
                                >
                                    Login
                                </button>

                                {/* Google button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
                                    }
                                    className="w-full flex items-center justify-center bg-white/80 backdrop-blur-sm text-gray-700 py-2 rounded-xl border border-gray-200 shadow hover:bg-white transition"
                                >
                                    <Image
                                        src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
                                        alt="Google"
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />
                                    <span className="font-medium">Sign in with Google</span>
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Animated register form */}
                    <div
                        className={`transition-all duration-500 transform ${!isLogin
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4 absolute"
                            }`}>
                        {!isLogin && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-800 text-white py-2 rounded-xl hover:bg-blue-900 transition shadow-md"
                                >
                                    Register
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}
