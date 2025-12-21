"use client";

import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "./ConfirmDialog";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { navSections } from "./SidebarSec";
import { useAdmin } from "@/hooks/useAdmin";
import { Loading } from "./Loading";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { admin, loading } = useAdmin();

  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside sidebar or dropdown to collapse/close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/auth";
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong during logout.");
    }
  }

  if (loading) return <Loading />;
  if (!admin) return <p>Not authorized</p>;
  const fullName = `${admin.firstName} ${admin?.lastName}`.trim();

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`fixed top-4 z-50 p-3 rounded-full shadow-md bg-green-800 text-white hover:bg-gray-100 hover:text-black transition-all duration-300
          ${collapsed ? "left-2" : "left-64"} 
        `}
        aria-label="Toggle Sidebar"
        style={{ transform: "translateX(50%)" }}
      >
        {collapsed ? <Menu size={22} /> : <X size={22} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white dark:bg-zinc-900 shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out z-40 ${collapsed ? "-translate-x-full" : "translate-x-0"} w-64`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-2 m-2 border-b border-green-700/20">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10" />
          <span
            className="
              font-extrabold text-2xl
              bg-gradient-to-r
              from-green-700 via-green-800 to-green-900
              dark:from-green-400 dark:via-green-500 dark:to-green-600
              bg-clip-text text-transparent
            "
          >
            Central Hub
          </span>

        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              <h3 className="text-green-900 dark:text-green-500 text-xs font-semibold uppercase px-2 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <li key={item.label}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                            ? "bg-slate-700 text-slate-100 font-medium"
                            : "hover:bg-slate-200 hover:text-gray-900"
                            }`}
                        >
                          {item.icon}
                          <span className="whitespace-nowrap">{item.label}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Profile */}
        <div className="relative m-2 border-t border-green-700/20 rounded-lg ">
          <button
            onClick={() => router.push("/admin/profile")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-green-800 hover:text-gray-200 transition-all duration-200"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
              <User className="w-6 h-6 text-gray-900" />
            </div>
            <div className="text-left">
              <p className="font-medium">{fullName}</p>
              <p className="text-sm">{admin?.email}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-md"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};
