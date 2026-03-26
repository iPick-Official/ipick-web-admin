// app/(admin)/layout.tsx
import { AdminGuard } from "@/components/AdminGuard";
import { Sidebar } from "@/components/ui/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminGuard>
            <div className="flex">
                <Sidebar />

                {/* Main content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}