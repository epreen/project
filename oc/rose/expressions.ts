import {
    Smile,
    Meh,
    AlertCircle,
    Sparkles,
    Eye,
    Loader2,
} from "lucide-react"
  
export type RoseExpression =
    | "neutral"
    | "amused"
    | "sarcastic"
    | "correcting"
    | "curious"
    | "focused"
    | "thinking"
    | "typing"
  
export const ROSE_EXPRESSIONS: Record<
    RoseExpression,
    {
      icon: any
      color: string
      placement: "inside" | "outside"
    }
  > = {
    neutral: {
      icon: Meh,
      color: "text-muted-foreground",
      placement: "outside",
    },
  
    amused: {
      icon: Smile,
      color: "text-emerald-500",
      placement: "inside",
    },
  
    sarcastic: {
      icon: Sparkles,
      color: "text-pink-500",
      placement: "inside",
    },
  
    correcting: {
      icon: AlertCircle,
      color: "text-amber-500",
      placement: "inside",
    },
  
    curious: {
      icon: Eye,
      color: "text-sky-500",
      placement: "inside",
    },
  
    focused: {
      icon: Eye,
      color: "text-indigo-500",
      placement: "outside",
    },
  
    thinking: {
      icon: Loader2,
      color: "text-muted-foreground",
      placement: "inside",
    },
  
    typing: {
      icon: Loader2,
      color: "text-muted-foreground",
      placement: "inside",
    },
}  