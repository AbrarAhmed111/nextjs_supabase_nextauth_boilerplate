import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow public assets and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Allow access to the signin and signup pages without a token
  if (!token && (pathname === "/auth/signin" || pathname === "/auth/signup")) {
    return NextResponse.next();
  }

  // If no token and trying to access protected routes, redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If token exists and trying to access signin or signup pages, redirect to dashboard
  if ((pathname === "/auth/signin" || pathname === "/auth/signup") && token) {
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
