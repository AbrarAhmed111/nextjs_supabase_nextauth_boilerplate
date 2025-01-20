import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow public assets and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // If no token and trying to access protected routes, redirect to signin
  if (!token && pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If token exists and trying to access signin page, redirect to dashboard
  if (pathname === "/auth-signin" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except for public assets
    "/((?!_next|api|static).*)",
  ],
};
