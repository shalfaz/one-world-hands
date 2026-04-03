import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("owh_session")?.value;
  const role = request.cookies.get("owh_role")?.value;
  const { pathname } = request.nextUrl;

  // Admin dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!session || role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Employee
  if (pathname.startsWith("/employee-dashboard")) {
    if (!session || role !== "employee") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Volunteer
  if (pathname.startsWith("/volunteer-dashboard")) {
    if (!session || role !== "volunteer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employee-dashboard/:path*",
    "/volunteer-dashboard/:path*",
  ],
};