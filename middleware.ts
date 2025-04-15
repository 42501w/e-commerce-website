import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Organized route configuration
  const routeConfig = {
    protected: ["/cart", "/shop", "/about", "/contact"],
    public: ["/login", "/sign-up"],
    authPages: ["/login", "/sign-up"],
    home: "/"
  };

  // Check route types
  const isProtectedRoute = routeConfig.protected.some(route => pathname.startsWith(route));
  const isPublicRoute = routeConfig.public.some(route => pathname.startsWith(route));
  const isAuthPage = routeConfig.authPages.some(route => pathname.startsWith(route));

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      console.log("Redirecting to login from protected route");
      return NextResponse.redirect(new URL(routeConfig.authPages[0], request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "development_secret"
      );
      await jwtVerify(token, secret);
    } catch (error) {
      console.error("JWT verification failed:", error);
      
      // Clear invalid token
      const response = NextResponse.redirect(new URL(routeConfig.authPages[0], request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Redirect logged-in users away from auth pages
  if (isAuthPage && token) {
    console.log("Redirecting logged-in user from auth page");
    return NextResponse.redirect(new URL(routeConfig.home, request.url));
  }

  return NextResponse.next();
}

// Modern matcher configuration
export const config = {
  matcher: [
    "/cart", 
    "/shop", 
    "/about", 
    "/contact", 
    "/sign-up", 
    "/login", 
    "/"
  ],
};