import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isLoginPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}