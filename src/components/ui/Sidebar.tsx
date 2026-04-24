"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navSections } from "./SidebarSec";
import { useAdmin } from "@/hooks/useAdmin";
import { ADMIN_PERMISSIONS } from "@/config/adminPermissions";
import { Avatar } from "./Avatar";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isProfileActive = pathname.startsWith("/admin/profile");
  const { admin, loading } = useAdmin();

  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const permissions = ADMIN_PERMISSIONS[admin?.department as keyof typeof ADMIN_PERMISSIONS];

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
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMobile) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const filteredNavSections =
    permissions?.sections === "ALL"
      ? navSections
      : navSections.filter((section) => {
        return (
          Array.isArray(permissions?.sections) &&
          permissions.sections.includes(section.title)
        );
      });

  if (loading) return <div />;
  if (!admin) return <p>Not authorized</p>;
  const fullName = `${admin.firstName} ${admin?.lastName}`.trim();

  return (
    <>
      {/* Floating Menu Button */}
      {isMobile && (
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
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          ${isMobile ? "fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out" : "sticky top-0 h-screen"} 
          w-64 bg-white dark:bg-zinc-900 shadow-lg flex flex-col justify-between
          ${isMobile ? (collapsed ? "-translate-x-full" : "translate-x-0") : "translate-x-0"}
        `}
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
          {filteredNavSections.map((section) => (
            <div key={section.title} className="mb-4">
              <h3 className="text-green-900 dark:text-green-500 text-xs font-semibold uppercase px-2 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <li key={item.label}>
                      {isActive ? (
                        <div
                          className="flex items-center gap-3 p-2 rounded-lg bg-slate-700 text-slate-100 font-medium cursor-default"
                        >
                          {item.icon}
                          <span className="whitespace-nowrap">{item.label}</span>
                        </div>
                      ) : (
                        <Link href={item.path}>
                          <div
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                          >
                            {item.icon}
                            <span className="whitespace-nowrap">{item.label}</span>
                          </div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Profile */}
        {isProfileActive ? (
          <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-700 text-slate-100 font-medium cursor-default">
            <Avatar
              photoUrl={admin?.photoUrl?.url}
              size={48}
              alt="Admin profile"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="truncate">{fullName}</p>
              <p className="text-sm truncate">{admin?.email}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => router.push("/admin/profile")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 hover:text-gray-200 transition-all duration-200"
          >
            <Avatar
              photoUrl={admin?.photoUrl?.url}
              size={48}
              alt="Admin profile"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium truncate">{fullName}</p>
              <p className="text-sm truncate">{admin?.email}</p>
            </div>
          </button>
        )}
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