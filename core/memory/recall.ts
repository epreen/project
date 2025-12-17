import { cohere } from "@/lib/cohere"
import { cosineSimilarity } from "./similarity"
import { api } from "@/convex/_generated/api"
import { convex } from "@/lib/convex"
import type { Id } from "@/convex/_generated/dataModel"
import { extractFloatEmbedding } from "@/utils/cohere-utils"
import { MemoryRecord } from "./types"

export async function recallRelevantMemories({
  userId,
  query,
}: {
  userId: Id<"users">
  query: string
}): Promise<MemoryRecord[]> {
  const embedResponse = await cohere.embed({
    model: "embed-english-v3.0",
    texts: [query],
    inputType: "search_query",
  })

  const queryVector = extractFloatEmbedding(embedResponse.embeddings)

  const memories = await convex.query(
    api.functions.memories.byUser,
    { userId }
  )

  const scored = memories.map((m: MemoryRecord) => ({
    ...m,
    score: cosineSimilarity(queryVector, m.embedding),
  }))

  return scored
  .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 5)
}
