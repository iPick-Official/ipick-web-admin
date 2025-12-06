import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only run middleware on /auth and /dashboard routes
export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isLoginPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect non-authenticated users from dashboard
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Redirect authenticated users from login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
