// lib/models.ts
export const COHERE_MODELS = {
    // Command family — for chat, agent tasks, instruction following:
    COMMAND_A: "command-a-03-2025",         // Most performant Command model (256K context)  
    COMMAND_R7B: "command-r7b-12-2024",     // Smaller, faster 7B model (128K context)
    COMMAND_A_TRANSLATE: "command-a-translate-08-2025", // Translate-focused chat
    COMMAND_A_REASONING: "command-a-reasoning-08-2025", // Reasoning optimized
    COMMAND_A_VISION: "command-a-vision-07-2025",       // Multimodal (text + image)
    COMMAND_R: "command-r-08-2024",         // Standard reasoning model
    COMMAND_R_PLUS: "command-r-plus-08-2024", // Stronger reasoning + chat
} as const

export const COHERE_EMBED_MODELS = {
    EMBED_V4: "embed-v4.0",                  // Multimodal text + image embeddings
    EMBED_ENGLISH_3: "embed-english-3",      // English text embeddings
    EMBED_MULTILINGUAL_3: "embed-multilingual-3", // Multilingual text embeddings
    // …light / image variants may also be available
} as const

export const COHERE_RERANK_MODELS = {
    RERANK_3_5: "rerank-v3.5",               // Relevance rerank model
} as const

export const COHERE_AYA_MODELS = {
    AYA_EXPANSE_32B: "c4ai-aya-expanse-32b",
    AYA_VISION_8B: "c4ai-aya-vision-8b",
    AYA_VISION_32B: "c4ai-aya-vision-32b",
} as const

export const MODELS = {
    dialogue: COHERE_MODELS.COMMAND_A,
    embed: COHERE_EMBED_MODELS.EMBED_V4,
    rerank: COHERE_RERANK_MODELS.RERANK_3_5,
} as const  