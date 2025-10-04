import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('range') || '30d'

    // Calculate date range
    const now = new Date()
    const startDate = new Date()
    
    switch (timeRange) {
      case '24h':
        startDate.setHours(now.getHours() - 24)
        break
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get user's API keys
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: { id: true, name: true }
    })

    if (apiKeys.length === 0) {
      return NextResponse.json({
        chartData: [],
        stats: {
          totalRequests: 0,
          totalErrors: 0,
          errorRate: 0,
          avgResponseTime: 0,
          successRate: 100
        },
        topKeys: [],
        errorBreakdown: []
      })
    }

    const apiKeyIds = apiKeys.map(key => key.id)

    // Get request logs for the time range
    const requestLogs = await prisma.requestLog.findMany({
      where: {
        apiKeyId: { in: apiKeyIds },
        timestamp: {
          gte: startDate,
          lte: now
        }
      },
      select: {
        timestamp: true,
        statusCode: true,
        responseTime: true,
        apiKeyId: true,
        errorType: true
      },
      orderBy: { timestamp: 'asc' }
    })

    // Group data by date for charts
    const chartData: Array<{
      date: string;
      requests: number;
      errors: number;
      totalResponseTime: number;
      responseTimeCount: number;
      avgResponseTime?: number;
    }> = []
    const dateMap = new Map()

    // Initialize date buckets
    const bucketSize = timeRange === '24h' ? 'hour' : 'day'
    const current = new Date(startDate)
    
    while (current <= now) {
      const key = bucketSize === 'hour' 
        ? current.toISOString().slice(0, 13) + ':00:00.000Z'
        : current.toISOString().slice(0, 10)
      
      dateMap.set(key, {
        date: key,
        requests: 0,
        errors: 0,
        totalResponseTime: 0,
        responseTimeCount: 0
      })

      if (bucketSize === 'hour') {
        current.setHours(current.getHours() + 1)
      } else {
        current.setDate(current.getDate() + 1)
      }
    }

    // Process request logs
    let totalRequests = 0
    let totalErrors = 0
    let totalResponseTime = 0
    let responseTimeCount = 0
    const keyUsage = new Map()
    const errorTypes = new Map()

    requestLogs.forEach(log => {
      const bucketKey = bucketSize === 'hour'
        ? log.timestamp.toISOString().slice(0, 13) + ':00:00.000Z'
        : log.timestamp.toISOString().slice(0, 10)

      const bucket = dateMap.get(bucketKey)
      if (bucket) {
        bucket.requests++
        totalRequests++

        if (log.statusCode >= 400) {
          bucket.errors++
          totalErrors++
          
          if (log.errorType) {
            errorTypes.set(log.errorType, (errorTypes.get(log.errorType) || 0) + 1)
          }
        }

        if (log.responseTime) {
          bucket.totalResponseTime += log.responseTime
          bucket.responseTimeCount++
          totalResponseTime += log.responseTime
          responseTimeCount++
        }
      }

      // Track usage by API key
      const keyName = apiKeys.find(k => k.id === log.apiKeyId)?.name || 'Unknown'
      keyUsage.set(keyName, (keyUsage.get(keyName) || 0) + 1)
    })

    // Convert map to array and calculate averages
    Array.from(dateMap.values()).forEach(bucket => {
      bucket.avgResponseTime = bucket.responseTimeCount > 0 
        ? Math.round(bucket.totalResponseTime / bucket.responseTimeCount)
        : 0
      chartData.push(bucket)
    })

    // Calculate stats
    const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0
    const avgResponseTime = responseTimeCount > 0 ? Math.round(totalResponseTime / responseTimeCount) : 0
    const successRate = 100 - errorRate

    // Top API keys by usage
    const topKeys = Array.from(keyUsage.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, usage]) => ({
        name,
        usage,
        percentage: totalRequests > 0 ? Math.round((usage / totalRequests) * 100) : 0
      }))

    // Error breakdown
    const errorBreakdown = Array.from(errorTypes.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }))

    return NextResponse.json({
      chartData,
      stats: {
        totalRequests,
        totalErrors,
        errorRate: Math.round(errorRate * 100) / 100,
        avgResponseTime,
        successRate: Math.round(successRate * 100) / 100
      },
      topKeys,
      errorBreakdown,
      timeRange,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}