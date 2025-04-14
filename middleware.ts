import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;
  const tokenInBrowser = request.cookies.get("token")?.value;


  const protectedRoutes = ["/cart", "/shop", "/about", "/contact"];
  const publicRoutes = ["/login", "/sign-up"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    urlPath.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => urlPath.startsWith(route));

  if (isProtectedRoute) {
    if (!tokenInBrowser) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    try {
      const JWT_SECRET = new TextEncoder().encode(
        process.env.JWT_SECRET || "development_secret"
      );

      const { payload } = await jwtVerify(tokenInBrowser, JWT_SECRET);

      console.log("Token payload:", payload);
    } catch (error) {
      console.error("Token verification failed:", error);

      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // If the user is logged in and trying to access a public route, redirect to home
  if (isPublicRoute && tokenInBrowser) {
    console.log("User is logged in, redirecting to home");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/shop", "/about", "/contact", "/sign-up", "/login", "/"],
};
