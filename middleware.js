// middleware.ts (in root directory)
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define protected routes
  const isProtectedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/profile") ||
    nextUrl.pathname.startsWith("/admin");

  // Define auth routes
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  // Redirect logic
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
