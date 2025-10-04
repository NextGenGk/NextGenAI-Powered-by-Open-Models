import { Loader2 } from "lucide-react"

interface LoadingProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function Loading({ message = "Loading...", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  }

  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <p className={`${textSizes[size]} text-muted-foreground`}>{message}</p>
    </div>
  )
}

export function PageLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export function ContentLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] w-full">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}