"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Initialize theme based on localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl bg-white dark:bg-zinc-800 border dark:border-zinc-700 flex items-center justify-center transition-transform hover:scale-110"
            title="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                {theme === "light" ? (
                    <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-yellow-500 text-2xl"
                    >
                        <Sun />
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-blue-400 text-2xl"
                    >
                        <Moon />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
