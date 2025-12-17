// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt", // ← must be literal, not string
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.authId = account.providerAccountId
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.authId = token.authId as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }