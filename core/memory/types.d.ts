// core/memory/types.d.ts
import type { Id } from "@/convex/_generated/dataModel"

type MemoryRecord = {
  _id: Id<"memories">
  content: string
  embedding: number[]
  type: "episodic" | "semantic" | "emotional"
  importance: number
  createdAt: number
}

type EmbedByTypeResponseEmbeddings = {
  float?: number[][]
  int8?: number[][]
  binary?: Uint8Array[]
}

type ThinkMode = "default" | "compression"