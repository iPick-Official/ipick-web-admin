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
} from "lucide-react";
import Image from 'next/image';

// Navigation items
const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
  { label: "Trips", icon: <History size={20} />, path: "/trips" },
  { label: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
  { label: "Driver Management", icon: <UserCog size={20} />, path: "/drivers" },
  { label: "Unit Management", icon: <BusFront size={20} />, path: "/units" },
  { label: "Routing Management", icon: <Route size={20} />, path: "/routes" },
  { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div
      className={`group bg-white shadow-md h-full flex flex-col transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 p-4 transition-all duration-300 ease-in-out">
        <Image
          src="/logo.png"
          alt="Jeepney Icon"
          width={30} height={30}
        />
        <h2
          className={`text-xl font-bold text-green-800 whitespace-nowrap transition-all duration-300 ${collapsed ? "opacity-0 scale-95 translate-x-[-10px]" : "opacity-100 scale-100 translate-x-0"
            }`}
        >
          iPick
        </h2>
      </div>

      {/* Navigation Items */}
      <ul className="p-2 space-y-2 text-gray-700 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <li key={item.label}>
              <Link href={item.path}>
                <div
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-green-100 text-black-600 font-medium"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                  <span
                    className={`transition-all duration-300 whitespace-nowrap ${collapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
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
    </div>
  );
};
