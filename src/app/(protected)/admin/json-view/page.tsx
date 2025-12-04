'use client';

import { Sidebar } from "@/components/Sidebar";
import { useState, useRef } from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function JsonViewPage() {
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<object | null>(null);
    const [error, setError] = useState<string | null>(null);

    const dropRef = useRef<HTMLDivElement>(null);

    // Parse JSON automatically (live preview)
    const autoParse = (value: string) => {
        try {
            const json = JSON.parse(value);
            setParsed(json);
            setError(null);
        } catch (e: any) {
            setParsed(null);
            setError(e.message);
        }
    };

    // Auto parse as user types
    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setInput(value);
        autoParse(value);
    };

    // Auto-format JSON
    const handleFormat = () => {
        try {
            const json = JSON.parse(input);
            const pretty = JSON.stringify(json, null, 2);
            setInput(pretty);
            setParsed(json);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    // Copy JSON
    const handleCopy = async () => {
        if (!parsed) return;
        await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
        alert("Copied to clipboard!");
    };

    // Download JSON
    const handleDownload = () => {
        if (!parsed) return;
        const blob = new Blob([JSON.stringify(parsed, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // File Drag & Drop
    const handleDrop = async (e: DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (!file) return;

        const text = await file.text();
        setInput(text);
        autoParse(text);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    // Compute total count
    const getTotalCount = (data: any) => {
        if (Array.isArray(data)) {
            return data.length;
        } else if (data && typeof data === "object") {
            return Object.keys(data).length;
        }
        return 0;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Sidebar />
            <h1 className="text-3xl font-bold mb-4">Advanced JSON Visualizer</h1>

            {/* Drag & Drop Zone */}
            <div
                ref={dropRef}
                onDrop={handleDrop as any}
                onDragOver={handleDragOver as any}
                className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center text-gray-600 bg-gray-50"
            >
                Drag & Drop JSON file here
            </div>

            {/* Input */}
            <textarea
                className="w-full border rounded p-3 font-mono text-sm"
                rows={12}
                placeholder="Paste JSON here..."
                value={input}
                onChange={handleInputChange}
            />

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={handleFormat}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Auto-Format JSON
                </button>

                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Copy JSON
                </button>

                <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                    Download JSON
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="text-red-600 border border-red-400 p-2 rounded bg-red-50">
                    {error}
                </div>
            )}

            {/* Output */}
            {parsed && (
                <div className="bg-gray-50 p-4 rounded space-y-2">
                    <div className="text-gray-700 font-medium">
                        Total items: {getTotalCount(parsed)}
                    </div>
                    <JsonView data={parsed} style={defaultStyles} />
                </div>
            )}
        </div>
    );
}
