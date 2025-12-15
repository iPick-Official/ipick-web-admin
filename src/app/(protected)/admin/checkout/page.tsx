"use client";

import { useState } from "react";

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError(null);
            setResponse(null);

            const res = await fetch("/api/2c2p/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}), // optional dynamic payload
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data);
            } else {
                setResponse(data);
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Unknown JSON parse error";
            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

            <div className="bg-white border shadow-md rounded-lg p-6">
                <p className="text-lg mb-1">
                    <span className="font-semibold">Item:</span> Premium Product
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Amount:</span> PHP 1000
                </p>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`mt-5 w-full py-3 rounded-lg text-white text-lg font-medium transition ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Processing..." : "Pay with 2C2P"}
                </button>
            </div>

            {response && (
                <div className="mt-6 bg-gray-100 border p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">2C2P Response</h3>
                    <pre className="text-sm overflow-auto">
                        {JSON.stringify(response, null, 2)}
                    </pre>
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-100 border border-red-300 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Error</h3>
                    <pre className="text-sm overflow-auto text-red-800">
                        {JSON.stringify(error, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
