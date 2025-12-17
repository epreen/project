import { convex } from "@/lib/convex"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export async function createSession(
  userId: Id<"users">
): Promise<Id<"sessions">> {
  return await convex.mutation(
    api.functions.sessions.insert,
    {
      userId,
      startedAt: Date.now(),
    }
  )
}

export async function getActiveSession(
  userId: Id<"users">
): Promise<Id<"sessions"> | null> {
  const sessions = await convex.query(
    api.functions.sessions.byUserId,
    { userId }
  );

  const active = sessions.find(s => !s.endedAt);
  return active?._id ?? null;
}
