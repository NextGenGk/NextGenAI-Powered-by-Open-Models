import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createOpenAIClient } from '@/lib/openai-client'

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
    const openai = createOpenAIClient()

    startTime = Date.now()
    
    const response = await openai.chat.completions.create({
      model: process.env.LLM_MODEL || "ai/gpt-oss",
      messages: body.messages,
      ...body
    })

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Log the API usage
    await prisma.apiUsage.create({
      data: {
        apiKeyId: keyRecord.id,
        endpoint: '/api/v1/chat/completions',
        status: 'success',
        responseTime,
        tokens: response.usage?.total_tokens || 0
      }
    })

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() }
    })

    return NextResponse.json(response)

  } catch (error: unknown) {
    console.error('API Error:', error)
    
    // Log failed request if we have a valid key
    if (keyRecord) {
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      await prisma.apiUsage.create({
        data: {
          apiKeyId: keyRecord.id,
          endpoint: '/api/v1/chat/completions',
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