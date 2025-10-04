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
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))
    
    // Generate mock embedding (1536 dimensions like OpenAI)
    const embedding = Array.from({ length: 1536 }, () => Math.random() * 2 - 1)
    
    const embeddingResponse = {
      object: 'list',
      data: [{
        object: 'embedding',
        embedding: embedding,
        index: 0
      }],
      model: body.model || 'text-embedding-ada-002',
      usage: {
        prompt_tokens: Math.ceil((body.input?.length || 0) / 4),
        total_tokens: Math.ceil((body.input?.length || 0) / 4)
      }
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        apiKeyId: keyRecord.id,
        endpoint: '/api/v1/embeddings',
        status: 'success',
        responseTime,
        tokens: embeddingResponse.usage.total_tokens
      }
    })

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json(embeddingResponse)

  } catch (error: unknown) {
    console.error('API Error:', error)
    
    // Log failed request if we have a valid key
    if (keyRecord) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      await prisma.apiUsage.create({
        data: {
          apiKeyId: keyRecord.id,
          endpoint: '/api/v1/embeddings',
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