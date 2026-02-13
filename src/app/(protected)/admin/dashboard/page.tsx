// app/admin/dashboard/page.tsx
"use client";

import { MapView } from "@/components/ui/MapView";
import { Sidebar } from "@/components/ui/Sidebar";

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
