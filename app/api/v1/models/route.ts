import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

export async function GET(request: NextRequest) {
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

    startTime = Date.now()
    
    // Mock models response
    const modelsResponse = {
      object: 'list',
      data: [
        {
          id: 'ai/gpt-oss',
          object: 'model',
          created: 1677610602,
          owned_by: 'nextgenai',
          permission: [],
          root: 'ai/gpt-oss',
          parent: null
        },
        {
          id: 'text-embedding-ada-002',
          object: 'model',
          created: 1677610602,
          owned_by: 'nextgenai',
          permission: [],
          root: 'text-embedding-ada-002',
          parent: null
        }
      ]
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        apiKeyId: keyRecord.id,
        endpoint: '/api/v1/models',
        status: 'success',
        responseTime,
        tokens: 0
      }
    })

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json(modelsResponse)

  } catch (error: unknown) {
    console.error('API Error:', error)
    
    // Log failed request if we have a valid key
    if (keyRecord) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      await prisma.apiUsage.create({
        data: {
          apiKeyId: keyRecord.id,
          endpoint: '/api/v1/models',
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