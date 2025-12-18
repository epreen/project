// middleware.ts (not proxy.ts — Next expects this name)
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname

    // If logged in and trying to access /login, redirect home
    if (req.nextauth.token && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Public routes
        if (
          pathname === "/login" ||
          pathname.startsWith("/api/auth")
        ) {
          return true
        }

        // Everything else requires auth
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}