import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateApiKey, getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        key: true,
        isActive: true,
        rateLimit: true,
        createdAt: true,
        lastUsedAt: true
      }
    })

    return NextResponse.json({ apiKeys })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, rateLimit = 100 } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'API key name required' }, { status: 400 })
    }

    const apiKey = await prisma.apiKey.create({
      data: {
        key: generateApiKey(),
        name,
        userId: user.id,
        rateLimit
      }
    })

    return NextResponse.json({ 
      message: 'API key created successfully',
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        key: apiKey.key,
        rateLimit: apiKey.rateLimit
      }
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}