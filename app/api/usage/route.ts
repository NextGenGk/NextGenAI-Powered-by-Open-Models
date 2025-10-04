import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'

    // Calculate date range
    const now = new Date()
    let startDate: Date
    
    switch (range) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // Get user's API keys
    const userApiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: { id: true }
    })

    const apiKeyIds = userApiKeys.map(key => key.id)

    if (apiKeyIds.length === 0) {
      return NextResponse.json({
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        totalTokens: 0,
        averageResponseTime: 0,
        requestsToday: 0,
        requestsThisWeek: 0,
        requestsThisMonth: 0,
        topEndpoints: [],
        recentActivity: []
      })
    }

    // Get usage data from the specified time range
    const usageData = await prisma.apiUsage.findMany({
      where: {
        apiKeyId: { in: apiKeyIds },
        timestamp: { gte: startDate }
      },
      orderBy: { timestamp: 'desc' }
    })

    // Calculate metrics
    const totalRequests = usageData.length
    const successfulRequests = usageData.filter(u => u.status === 'success').length
    const failedRequests = totalRequests - successfulRequests
    const totalTokens = usageData.reduce((sum, u) => sum + (u.tokens || 0), 0)
    const averageResponseTime = totalRequests > 0 
      ? Math.round(usageData.reduce((sum, u) => sum + (u.responseTime || 0), 0) / totalRequests)
      : 0

    // Calculate time-based breakdowns
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const requestsToday = usageData.filter(u => new Date(u.timestamp) >= today).length
    const requestsThisWeek = usageData.filter(u => new Date(u.timestamp) >= thisWeek).length
    const requestsThisMonth = usageData.filter(u => new Date(u.timestamp) >= thisMonth).length

    // Calculate top endpoints
    const endpointCounts = usageData.reduce((acc, usage) => {
      const endpoint = usage.endpoint || 'unknown'
      acc[endpoint] = (acc[endpoint] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topEndpoints = Object.entries(endpointCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([endpoint, requests]) => ({
        endpoint,
        requests,
        percentage: totalRequests > 0 ? Math.round((requests / totalRequests) * 100) : 0
      }))

    // Get recent activity (last 10 requests)
    const recentActivity = usageData.slice(0, 10).map(usage => ({
      id: usage.id,
      timestamp: usage.timestamp.toISOString(),
      endpoint: usage.endpoint || 'unknown',
      status: usage.status as 'success' | 'error',
      responseTime: usage.responseTime || 0,
      tokens: usage.tokens || 0
    }))

    // Generate chart data - group by date
    const chartDataMap = new Map<string, { successful: number; failed: number; total: number }>()
    
    // Initialize with empty data for the date range
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      chartDataMap.set(dateStr, { successful: 0, failed: 0, total: 0 })
    }
    
    // Fill with actual data
    usageData.forEach(usage => {
      const dateStr = usage.timestamp.toISOString().split('T')[0]
      const existing = chartDataMap.get(dateStr) || { successful: 0, failed: 0, total: 0 }
      
      existing.total += 1
      if (usage.status === 'success') {
        existing.successful += 1
      } else {
        existing.failed += 1
      }
      
      chartDataMap.set(dateStr, existing)
    })
    
    const chartData = Array.from(chartDataMap.entries())
      .map(([date, data]) => ({
        date,
        ...data
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    return NextResponse.json({
      totalRequests,
      successfulRequests,
      failedRequests,
      totalTokens,
      averageResponseTime,
      requestsToday,
      requestsThisWeek,
      requestsThisMonth,
      topEndpoints,
      recentActivity,
      chartData
    })

  } catch (error) {
    console.error('Error fetching usage data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}