export function extractFloatEmbedding(
    embeddings: unknown
    ): number[] {
    // Case 1: legacy format — number[][]
    if (Array.isArray(embeddings)) {
        if (embeddings.length === 0 || !Array.isArray(embeddings[0])) {
        throw new Error("Invalid embeddings array")
        }
        return embeddings[0]
    }
    
    // Case 2: object format
    if (
        typeof embeddings === "object" &&
        embeddings !== null &&
        "float" in embeddings
    ) {
        const floats = (embeddings as { float?: number[][] }).float
        if (floats && floats.length > 0) {
        return floats[0]
        }
    }
    
    throw new Error("No usable float embeddings returned by Cohere")
}   