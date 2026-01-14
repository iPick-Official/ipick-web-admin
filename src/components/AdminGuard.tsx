"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_PERMISSIONS } from "@/config/adminPermissions";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { admin, loading } = useAdmin();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!loading && admin) {
            const permissions =
                ADMIN_PERMISSIONS[admin.department as keyof typeof ADMIN_PERMISSIONS];

            if (permissions && permissions.paths !== "ALL") {
                const allowedPaths = Array.isArray(permissions.paths)
                    ? permissions.paths
                    : [permissions.paths];

                const hasAccess = allowedPaths.some(p =>
                    pathname.startsWith(p)
                );

                if (!hasAccess) {
                    router.replace("/admin/dashboard");
                }
            }
        }
    }, [admin, loading, pathname, router]);

    if (loading) return null;

    return <>{children}</>;
}
