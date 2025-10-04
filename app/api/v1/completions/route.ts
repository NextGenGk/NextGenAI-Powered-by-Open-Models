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
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100))
    
    const completionResponse = {
      id: `cmpl-${Date.now()}`,
      object: 'text_completion',
      created: Math.floor(Date.now() / 1000),
      model: body.model || 'ai/gpt-oss',
      choices: [{
        text: `\n\nThis is a mock completion response for the prompt: "${body.prompt || 'No prompt provided'}"`,
        index: 0,
        logprobs: null,
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: Math.ceil((body.prompt?.length || 0) / 4),
        completion_tokens: 20,
        total_tokens: Math.ceil((body.prompt?.length || 0) / 4) + 20
      }
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        apiKeyId: keyRecord.id,
        endpoint: '/api/v1/completions',
        status: 'success',
        responseTime,
        tokens: completionResponse.usage.total_tokens
      }
    })

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json(completionResponse)

  } catch (error: unknown) {
    console.error('API Error:', error)
    
    // Log failed request if we have a valid key
    if (keyRecord) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      await prisma.apiUsage.create({
        data: {
          apiKeyId: keyRecord.id,
          endpoint: '/api/v1/completions',
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