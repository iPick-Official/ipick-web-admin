import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_PERMISSIONS } from "./config/adminPermissions";

const OPERATION_ALLOWED_PATHS = [
  "/admin/bookings",
  "/admin/drivers",
  "/admin/dashboard",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const department = req.cookies.get("admin_department")?.value;

  const pathname = req.nextUrl.pathname;

  const isLoginPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  // Not logged in → block admin
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Logged in → block auth pages
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  const permissions =
    ADMIN_PERMISSIONS[department as keyof typeof ADMIN_PERMISSIONS];

  if (
    isAdminPage &&
    permissions &&
    permissions.paths !== "ALL" &&
    !permissions.paths.some((allowed) => pathname.startsWith(allowed))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}
