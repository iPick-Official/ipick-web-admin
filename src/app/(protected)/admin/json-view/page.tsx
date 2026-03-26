'use client';
import { Sidebar } from "@/components/ui/Sidebar";
import { useState, useRef } from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function JsonViewPage() {
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<object | null>(null);
    const [error, setError] = useState<string | null>(null);

    const dropRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Parse JSON automatically (live preview)
    const autoParse = (value: string) => {
        try {
            const json = JSON.parse(value) as object;
            setParsed(json);
            setError(null);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Unknown JSON parse error";
            setParsed(null);
            setError(message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        autoParse(value);
    };

    const handleFormat = () => {
        try {
            const json = JSON.parse(input) as object;
            const pretty = JSON.stringify(json, null, 2);
            setInput(pretty);
            setParsed(json);
            setError(null);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Unknown error";
            setError(message);
        }
    };

    const handleCopy = async () => {
        if (!parsed) return;
        await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
        alert("Copied to clipboard!");
    };

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

    // File selection (new feature)
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        setInput(text);
        autoParse(text);
    };

    // File Drag & Drop
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        const text = await file.text();
        setInput(text);
        autoParse(text);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const getTotalCount = (data: unknown): number => {
        if (Array.isArray(data)) return data.length;
        if (data && typeof data === "object") return Object.keys(data as object).length;
        return 0;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4">JSON Visualizer</h1>
            {/* Hidden file input */}
            <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Click + Drag & Drop Zone */}
            <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center text-gray-600 bg-gray-50 cursor-pointer"
            >
                Click or Drag & Drop JSON file here
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

            {error && (
                <div className="text-red-600 border border-red-400 p-2 rounded bg-red-50">
                    {error}
                </div>
            )}

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
