import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

async function validateApiKey(apiKey: string) {
  const key = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { user: true }
  })

  if (!key || !key.isActive) {
    return null
  }

  return key
}

export async function POST(request: NextRequest) {
  let keyRecord: { id: string; user: { id: string } } | null = null
  let startTime = Date.now()
  
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    const apiKey = authHeader.substring(7)
    
    keyRecord = await validateApiKey(apiKey)
    if (!keyRecord) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const body = await request.json()
    startTime = Date.now()
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 50))
    
    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Create mock response
    const mockResponse = {
      id: `test-${Date.now()}`,
      object: 'test.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'test-model',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: `Test response for: ${body.message || 'Hello!'}`
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 15,
        total_tokens: 25
      }
    }

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        apiKeyId: keyRecord.id,
        endpoint: '/api/v1/test',
        status: 'success',
        responseTime,
        tokens: mockResponse.usage.total_tokens
      }
    })

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json(mockResponse)

  } catch (error: unknown) {
    console.error('API Error:', error)
    
    // Log failed request if we have a valid key
    if (keyRecord) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      await prisma.apiUsage.create({
        data: {
          apiKeyId: keyRecord.id,
          endpoint: '/api/v1/test',
          status: 'error',
          responseTime,
          tokens: 0
        }
      }).catch(console.error)
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'API key required' }, { status: 401 })
  }

  const apiKey = authHeader.substring(7)
  const keyRecord = await validateApiKey(apiKey)
  
  if (!keyRecord) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // Log the API usage for GET request
  await prisma.apiUsage.create({
    data: {
      apiKeyId: keyRecord.id,
      endpoint: '/api/v1/test',
      status: 'success',
      responseTime: 25,
      tokens: 0
    }
  })

  return NextResponse.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    apiKey: keyRecord.name
  })
}