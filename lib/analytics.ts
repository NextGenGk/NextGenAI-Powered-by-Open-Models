import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface RequestLogData {
  apiKeyId: string
  userId: string
  endpoint: string
  method: string
  statusCode: number
  responseTime?: number
  tokens?: number
  errorType?: string
  userAgent?: string
  ipAddress?: string
}

export async function logApiRequest(data: RequestLogData) {
  try {
    await prisma.requestLog.create({
      data: {
        ...data,
        timestamp: new Date()
      }
    })

    // Update the API key's last used timestamp
    await prisma.apiKey.update({
      where: { id: data.apiKeyId },
      data: { lastUsedAt: new Date() }
    })
  } catch (error) {
    console.error('Failed to log API request:', error)
  }
}

export async function generateSampleData(userId: string, apiKeyId: string) {
  // Generate sample data for the last 30 days for demonstration
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  const sampleLogs = []
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000)
    
    // Generate 10-50 requests per day
    const requestsPerDay = Math.floor(Math.random() * 40) + 10
    
    for (let j = 0; j < requestsPerDay; j++) {
      const timestamp = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000)
      const isError = Math.random() < 0.1 // 10% error rate
      
      sampleLogs.push({
        apiKeyId,
        userId,
        endpoint: '/api/v1/chat/completions',
        method: 'POST',
        statusCode: isError ? (Math.random() < 0.5 ? 429 : 500) : 200,
        responseTime: Math.floor(Math.random() * 2000) + 500, // 500-2500ms
        tokens: Math.floor(Math.random() * 1000) + 100,
        errorType: isError ? (Math.random() < 0.5 ? 'Rate Limit Exceeded' : 'Server Error') : null,
        userAgent: 'NextGenAI-Client/1.0',
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        timestamp
      })
    }
  }
  
  try {
    await prisma.requestLog.createMany({
      data: sampleLogs,
      skipDuplicates: true
    })
    console.log(`Generated ${sampleLogs.length} sample request logs`)
  } catch (error) {
    console.error('Failed to generate sample data:', error)
  }
}