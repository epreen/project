// proxy.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isAuthRoute = req.nextUrl.pathname.startsWith("/login")

    if (req.nextauth.token && isAuthRoute) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
}