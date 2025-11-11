"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  History,
  BarChart2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { BsPerson, BsPersonFillGear } from "react-icons/bs";

// Navigation items
const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
  { label: "Bookings", icon: <History size={20} />, path: "/admin/bookings" },
  { label: "Analytics", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
  { label: "Drivers", icon: <BsPersonFillGear size={20} />, path: "/admin/drivers" },
  { label: "Passengers", icon: <BsPerson size={20} />, path: "/admin/riders" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout
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

  useEffect(() => {
    if (!collapsed) {
      const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
          setCollapsed(true);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [collapsed]);

  return (
    <>
      {/* Floating Menu Button (attached to sidebar’s right edge) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`fixed top-4 z-50 p-3 rounded-full shadow-md bg-white hover:bg-gray-100 transition-all duration-300
          ${collapsed ? "left-2" : "left-64"} 
        `}
        aria-label="Toggle Sidebar"
        style={{
          transform: "translateX(50%)", // keeps it visually aligned at the right edge
        }}
      >
        {collapsed ? <Menu size={22} /> : <X size={22} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out z-40 ${collapsed ? "-translate-x-full" : "translate-x-0"
          } ${isMobile ? "w-64" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="font-extrabold text-2xl bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent">
            Central Hub
          </span>
        </div>

        {/* Navigation */}
        <ul className="p-2 space-y-1 text-gray-700 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <li key={item.label}>
                <Link href={item.path}>
                  <div
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "hover:bg-gray-100"
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

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-3 p-2 m-2 mb-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          aria-label="Logout"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* Confirm Dialog */}
        <ConfirmDialog
          open={showLogoutConfirm}
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
          confirmText="Yes, Logout"
          cancelText="Cancel"
        />
      </div>

      {/* Background Overlay (for mobile) */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-white/10 backdrop-blur-md"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};
