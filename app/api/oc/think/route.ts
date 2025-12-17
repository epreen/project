import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { think } from "@/oc/rose/think"
import { getOrCreateUserByAuthId } from "@/lib/convex-auth"
import { createSession, getActiveSession } from "@/lib/session"
import { convex } from "@/lib/convex"
import { api } from "@/convex/_generated/api"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.authId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, sessionId: providedSessionId } = await req.json();

  const userId = await getOrCreateUserByAuthId(session.user.authId);

  // Use provided sessionId OR fetch active session
  let sessionId = providedSessionId || (await getActiveSession(userId));

  // If no active session, create one
  if (!sessionId) {
    sessionId = await createSession(userId);
  }

  const result = await think({
    userId,
    sessionId,
    userInput: message,
  });

  await convex.mutation(api.functions.messages.insert, {
    sessionId,
    role: "rose",
    content: result.reply
  });

  return NextResponse.json({ ...result, sessionId });
}