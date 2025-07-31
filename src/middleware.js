import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get current user from the request
  const user = getCurrentUser(request);

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    // Check if user is authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user has admin role
    if (user.role !== "admin") {
      // Redirect non-admin users to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (user && (pathname === "/login" || pathname === "/sign-in")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Admin routes
    "/admin/:path*",
    // Auth pages
    "/login",
    "/sign-in",
  ],
};
