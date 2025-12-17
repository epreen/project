import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      authId: string
    }
  }

  interface User {
    authId: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authId?: string
  }
}