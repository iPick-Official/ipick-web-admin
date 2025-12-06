// app/admin/dashboard/page.tsx
"use client";

import { MapView } from "@/components/MapView";
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <MapView />
      </div>
    </div>
  );
}
