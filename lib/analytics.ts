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

