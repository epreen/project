import { cohere } from "@/lib/cohere"
import { extractFloatEmbedding } from "@/utils/cohere-utils"

export async function embedText(text: string): Promise<number[]> {
  const response = await cohere.embed({
    model: "embed-english-v3.0",
    texts: [text],
    inputType: "search_document",
  })

  return extractFloatEmbedding(response.embeddings)
}
