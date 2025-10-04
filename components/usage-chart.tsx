"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UsageChartData {
  date: string
  successful: number
  failed: number
  total: number
}

interface UsageChartProps {
  data: UsageChartData[]
  timeRange: '24h' | '7d' | '30d'
  onTimeRangeChange: (range: '24h' | '7d' | '30d') => void
}



export function UsageChart({ data, timeRange, onTimeRangeChange }: UsageChartProps) {
  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return []
    
    const now = new Date()
    let daysToSubtract = 7
    
    if (timeRange === "24h") {
      daysToSubtract = 1
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "30d") {
      daysToSubtract = 30
    }
    
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    
    return data.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate
    })
  }, [data, timeRange])

  const totalRequests = filteredData.reduce((sum, item) => sum + item.total, 0)
  const successfulRequests = filteredData.reduce((sum, item) => sum + item.successful, 0)
  const successRate = totalRequests > 0 ? ((successfulRequests / totalRequests) * 100).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>API Usage Over Time</CardTitle>
          <CardDescription>
            {totalRequests.toLocaleString()} total requests with {successRate}% success rate
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24h" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {filteredData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            No usage data available for the selected time range
          </div>
        ) : (
          <div className="h-[250px] w-full">
            
            {/* Simple bar chart fallback */}
            <div className="h-[220px] flex items-end justify-between gap-1 p-4 bg-muted/20 rounded">
              {filteredData.slice(0, 20).map((item, index) => {
                const maxValue = Math.max(...filteredData.map(d => d.total), 1) // Ensure at least 1
                const totalHeight = Math.max((item.total / maxValue) * 160, item.total > 0 ? 4 : 0) // Min 4px if data exists
                const successHeight = Math.max((item.successful / maxValue) * 160, item.successful > 0 ? 2 : 0)
                const failedHeight = Math.max(totalHeight - successHeight, item.failed > 0 ? 2 : 0)
                
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1 max-w-[40px]">
                    <div className="flex flex-col justify-end w-full" style={{ height: '160px' }}>
                      {item.total > 0 ? (
                        <>
                          <div 
                            className="bg-orange-500 rounded-t-sm w-full" 
                            style={{ height: `${successHeight}px` }}
                            title={`${item.date}: ${item.successful} successful`}
                          />
                          {item.failed > 0 && (
                            <div 
                              className="bg-red-500 w-full" 
                              style={{ height: `${failedHeight}px` }}
                              title={`${item.date}: ${item.failed} failed`}
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full h-1 bg-gray-200 rounded"></div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground text-center w-full truncate">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-sm">Successful</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Failed</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}