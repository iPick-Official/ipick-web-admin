// app/settings/page.tsx
"use client";

import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <h2>Settings Page</h2>
      </div>
    </div>
  );
}
