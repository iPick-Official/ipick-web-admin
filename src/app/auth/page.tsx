"use client";

import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Loading } from "../../components/Loading";

export default function AuthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? "login" : "register";
        const body = isLogin
            ? { username, password, role: "admin" }
            : { username, email, password, role: "admin" };

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
                alert(err.message);
            } else {
                alert("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 relative">
            {/* Top nav back button */}
            <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
            </nav>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange-100 opacity-70 blur-3xl z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-orange opacity-60 filter blur-2xl rounded-full z-10 pointer-events-none" />
            {/* Auth Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg w-96 relative">
                {/* Logo */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/komyut-logo.png"
                        alt="KomyutPH Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-lg rounded-xl bg-white p-1"
                    />
                </div>

                <div className="mt-10">
                    {/* Login/Register Toggle */}
                    <div className="flex justify-between mb-6 bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${isLogin ? "bg-gray-700 text-white" : "text-gray-700"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${!isLogin ? "bg-gray-700 text-white" : "text-gray-700"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Login Form */}
                    <div className={`${isLogin ? "block" : "hidden"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 duration-300 transition"
                            >
                                Login
                            </button>

                            {/* Google button */}
                            <button
                                type="button"
                                onClick={() =>
                                    (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
                                }
                                className="w-full flex items-center justify-center bg-white text-gray-700 py-2 rounded-lg border border-gray-300 shadow hover:bg-gray-50 transition"
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
                    </div>

                    {/* Register Form */}
                    <div className={`${!isLogin ? "block" : "hidden"}`}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 duration-300 transition"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
