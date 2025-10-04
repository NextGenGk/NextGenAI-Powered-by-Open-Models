'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, CheckCircle, Hash, Zap } from 'lucide-react'
import { ContentLoading } from "@/components/ui/loading"
import { UsageChart } from "@/components/usage-chart"

interface UsageData {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  totalTokens: number
  averageResponseTime: number
  requestsToday: number
  requestsThisWeek: number
  requestsThisMonth: number
  topEndpoints: Array<{
    endpoint: string
    requests: number
    percentage: number
  }>
  recentActivity: Array<{
    id: string
    timestamp: string
    endpoint: string
    status: 'success' | 'error'
    responseTime: number
    tokens: number
  }>
  chartData: Array<{
    date: string
    successful: number
    failed: number
    total: number
  }>
}

export default function UsagePage() {
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')

  const fetchUsageData = useCallback(async () => {
    try {
      const response = await fetch(`/api/usage?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setUsageData(data)
      }
    } catch (error) {
      console.error('Error fetching usage data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchUsageData()
  }, [fetchUsageData])



  if (isLoading) {
    return <ContentLoading message="Loading usage data..." />
  }

  if (!usageData || usageData.totalRequests === 0) {
    return (
      <>
        <div className="flex items-center gap-2 mb-4">
          <div className="text-sm text-muted-foreground">Dashboard</div>
          <div className="text-sm text-muted-foreground">/</div>
          <div className="text-sm font-medium">API Usage</div>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">API Usage</h1>
              <p className="text-muted-foreground">Monitor your API usage and performance metrics</p>
            </div>
          </div>



          <div className="text-center py-12 bg-card rounded-lg shadow border">
            <div className="flex justify-center mb-4">
              <BarChart3 className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No API usage yet</h3>
            <p className="text-muted-foreground mb-6">
              Start making API calls to see your usage statistics here. All API requests will be tracked automatically.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Available API endpoints:
              </p>
              <div className="space-y-2">
                <code className="text-sm bg-muted px-3 py-1 rounded block">
                  POST /api/v1/chat/completions
                </code>
                <code className="text-sm bg-muted px-3 py-1 rounded block">
                  POST /api/v1/completions
                </code>
                <code className="text-sm bg-muted px-3 py-1 rounded block">
                  GET /api/v1/models
                </code>
              </div>
              <div className="flex gap-2 justify-center">
                <a 
                  href="/dashboard/keys" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium inline-block"
                >
                  Get API Keys
                </a>
                <a 
                  href="/dashboard/examples" 
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium inline-block"
                >
                  View Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const successRate = usageData.totalRequests > 0 
    ? ((usageData.successfulRequests / usageData.totalRequests) * 100).toFixed(1)
    : '0'

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm text-muted-foreground">Dashboard</div>
        <div className="text-sm text-muted-foreground">/</div>
        <div className="text-sm font-medium">API Usage</div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">API Usage</h1>
            <p className="text-muted-foreground">Monitor your API usage and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchUsageData}
              disabled={isLoading}
              className="px-3 py-2 border border-input rounded-md shadow-sm hover:bg-muted focus:outline-none focus:ring-ring focus:border-ring bg-background text-foreground disabled:opacity-50"
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
              className="px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring bg-background text-foreground"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Usage Chart */}
        <UsageChart 
          data={usageData.chartData || []}
          timeRange={timeRange}
          onTimeRangeChange={(range) => setTimeRange(range as '24h' | '7d' | '30d')}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.totalRequests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {timeRange === '24h' ? 'in the last 24 hours' : 
                 timeRange === '7d' ? 'in the last 7 days' : 'in the last 30 days'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">
                {usageData.successfulRequests.toLocaleString()} successful requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.totalTokens.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                tokens processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.averageResponseTime}ms</div>
              <p className="text-xs text-muted-foreground">
                average response time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Breakdown</CardTitle>
              <CardDescription>Requests over different time periods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Today</span>
                <span className="text-sm text-muted-foreground">{usageData.requestsToday.toLocaleString()} requests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Week</span>
                <span className="text-sm text-muted-foreground">{usageData.requestsThisWeek.toLocaleString()} requests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm text-muted-foreground">{usageData.requestsThisMonth.toLocaleString()} requests</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Endpoints</CardTitle>
              <CardDescription>Most frequently used API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {usageData.topEndpoints.map((endpoint) => (
                  <div key={endpoint.endpoint} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {endpoint.endpoint}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {endpoint.requests.toLocaleString()} ({endpoint.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest API requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {activity.endpoint}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{activity.responseTime}ms</span>
                    <span>{activity.tokens} tokens</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      activity.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}