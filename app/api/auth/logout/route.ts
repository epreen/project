import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getOrCreateUserByAuthId } from "@/lib/convex-auth"
import { getActiveSession } from "@/lib/session"
import { convex } from "@/lib/convex"
import { api } from "@/convex/_generated/api"

export async function POST() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.authId) {
    return NextResponse.json({ ok: true })
  }

  const userId = await getOrCreateUserByAuthId(session.user.authId)
  const activeSessionId = await getActiveSession(userId)

  if (activeSessionId) {
    await convex.mutation(api.functions.sessions.end, {
      sessionId: activeSessionId,
      endedAt: Date.now(),
    })
  }

  return NextResponse.json({ ok: true })
}
