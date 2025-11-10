"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BusFront,
  BarChart2,
  Settings,
  UserCog,
  Route,
  History,
  LogOut,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

// Navigation items
const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
  { label: "Bookings", icon: <History size={20} />, path: "/admin/bookings" },
  { label: "Analytics", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
  { label: "Driver Management", icon: <UserCog size={20} />, path: "/admin/drivers" },
  { label: "Unit Management", icon: <BusFront size={20} />, path: "/units" },
  { label: "Routing Management", icon: <Route size={20} />, path: "/routes" },
  { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Expand on hover (desktop only)
  const handleMouseEnter = () => {
    if (!isMobile) setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setCollapsed(true);
  };

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

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

  return (
    <div
      className={`group bg-white shadow-md h-full flex flex-col justify-between transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-64"
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 p-2 transition-all duration-300 ease-in-out">
        <img src="/logo.png" alt="Jeepney Icon" className="w-10 h-10" />
      </div>

      {/* Navigation Items */}
      <ul className="p-2 space-y-2 text-gray-700 flex-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <li key={item.label}>
              <Link href={item.path}>
                <div
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${isActive ? "bg-orange-100 text-orange-600 font-medium" : "hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                  <span
                    className={`transition-all duration-300 whitespace-nowrap ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                      }`}
                  >
                    {item.label}
                  </span>
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
        <span
          className={`transition-all duration-300 whitespace-nowrap ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            }`}
        >
          Logout
        </span>
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
  );
};
