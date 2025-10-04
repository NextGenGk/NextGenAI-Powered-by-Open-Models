import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total API keys
    const totalKeys = await prisma.apiKey.count({
      where: { userId: user.id }
    })

    // Get active API keys
    const activeKeys = await prisma.apiKey.count({
      where: { 
        userId: user.id,
        isActive: true
      }
    })

    // Get total requests
    const totalRequests = await prisma.request.count({
      where: { userId: user.id }
    })

    // Get requests today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const requestsToday = await prisma.request.count({
      where: {
        userId: user.id,
        createdAt: { gte: today }
      }
    })

    return NextResponse.json({
      totalKeys,
      activeKeys,
      totalRequests,
      requestsToday
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}