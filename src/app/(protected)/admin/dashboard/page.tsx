// app/admin/dashboard/page.tsx
"use client";

import { MapView } from "@/components/ui/MapView";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 relative">
        <MapView />
      </div>
    </div>
  );
}
