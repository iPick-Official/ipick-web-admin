"use client";

import { useState } from "react";
import Image from "next/image";
import { Loading } from "../../../components/Loading";

export default function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                window.location.href = '/admin/dashboard';
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange-100 opacity-70 blur-3xl z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-orange opacity-60 filter blur-2xl rounded-full z-10 pointer-events-none" />

            {/* Auth Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg w-96 relative">
                {/* Logo */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="/logo.png"
                        alt="ipick Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-lg rounded-xl bg-white p-1"
                    />
                </div>

                <div className="mt-10">
                    <form onSubmit={handleLogin} className="space-y-4">
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
                            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 duration-300 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
