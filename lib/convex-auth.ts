import { convex } from "@/lib/convex"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export async function getOrCreateUserByAuthId(
  authId: string
): Promise<Id<"users">> {
  const existing = await convex.query(
    api.functions.users.byAuthId,
    { authId }
  )

  if (existing.length > 0) {
    return existing[0]._id
  }

  return await convex.mutation(
    api.functions.users.insert,
    {
      authId,
      createdAt: Date.now(),
    }
  )
}