import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
  }
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    style={
      {
        "--chart-1": "hsl(var(--primary))",
        "--chart-2": "hsl(var(--secondary))",
        "--chart-3": "hsl(var(--accent))",
        "--chart-4": "hsl(var(--muted))",
        "--chart-5": "hsl(var(--destructive))",
        ...Object.entries(config).reduce((acc, [key, value]) => {
          if (value.color) {
            acc[`--color-${key}`] = value.color
          }
          return acc
        }, {} as Record<string, string>),
      } as React.CSSProperties
    }
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    labelFormatter?: (value: unknown) => string
    indicator?: "line" | "dot" | "dashed"
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center gap-4 pt-4", className)}
    {...props}
  />
))
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 text-sm", className)}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}