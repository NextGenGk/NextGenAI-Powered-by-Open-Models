import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's API keys
    const userApiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: { 
        id: true, 
        name: true, 
        isActive: true, 
        createdAt: true,
        lastUsedAt: true 
      }
    })

    const apiKeyIds = userApiKeys.map(key => key.id)
    const activeApiKeys = userApiKeys.filter(key => key.isActive).length

    // Calculate date ranges
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get API usage data
    const allUsageData = await prisma.apiUsage.findMany({
      where: {
        apiKeyId: { in: apiKeyIds }
      },
      orderBy: { timestamp: 'desc' }
    })

    const thisMonthUsage = allUsageData.filter(u => new Date(u.timestamp) >= oneMonthAgo)
    const lastMonthUsage = allUsageData.filter(u => {
      const date = new Date(u.timestamp)
      const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
      return date >= twoMonthsAgo && date < oneMonthAgo
    })

    // Calculate metrics
    const totalApiCalls = allUsageData.length
    const successfulCalls = allUsageData.filter(u => u.status === 'success').length
    const successRate = totalApiCalls > 0 ? (successfulCalls / totalApiCalls) * 100 : 0

    // Calculate month-over-month change
    const thisMonthCalls = thisMonthUsage.length
    const lastMonthCalls = lastMonthUsage.length
    const apiCallsChange = lastMonthCalls > 0 
      ? ((thisMonthCalls - lastMonthCalls) / lastMonthCalls) * 100 
      : thisMonthCalls > 0 ? 100 : 0

    // Keys created this week
    const keysCreatedThisWeek = userApiKeys.filter(key => 
      new Date(key.createdAt) >= oneWeekAgo
    ).length

    // Recent activity (last 10 API calls)
    const recentActivity = allUsageData.slice(0, 10).map(usage => {
      const apiKey = userApiKeys.find(key => key.id === usage.apiKeyId)
      return {
        id: usage.id,
        action: `API call to ${usage.endpoint || 'unknown endpoint'}`,
        keyName: apiKey?.name || 'Unknown Key',
        timestamp: usage.timestamp.toISOString(),
        status: usage.status
      }
    })

    return NextResponse.json({
      totalApiCalls,
      activeApiKeys,
      successRate,
      apiCallsChange,
      keysCreatedThisWeek,
      recentActivity
    })

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}