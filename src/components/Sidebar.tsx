"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BusFront,
  BarChart2,
  Settings,
  MapPin,
  UserCog,
  Route,
  History
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
  { label: "Trips", icon: <History size={20} />, path: "/trips" },
  { label: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
  { label: "Driver Management", icon: <UserCog size={20} />, path: "/drivers" },
  { label: "Unit Management", icon: <BusFront size={20} />, path: "/units" },
  { label: "Routing Managment", icon: <Route size={20} />, path: "/routes" },
  { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setCollapsed(true);
  };

  return (
    <div
      className={`group bg-white shadow-md h-full transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <MapPin size={30} />
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Komyut<span className="text-orange-500">PH</span>
          </h2>
        )}
      </div>

      {/* Nav Items */}
      <ul className="p-4 space-y-2 text-gray-700">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <li key={item.label}>
              <Link href={item.path}>
                <div
                  className={`flex items-center gap-3 p-2 rounded-lg transition cursor-pointer ${isActive
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
