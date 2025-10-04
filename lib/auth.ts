import { v4 as uuidv4 } from 'uuid'
import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export function generateApiKey(): string {
  return `nai_${uuidv4().replace(/-/g, '')}`
}

export async function getCurrentUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  // Check if user exists in our database, create if not
  let user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    // Get user info from Clerk
    const { clerkClient } = await import('@clerk/nextjs/server')
    const clerkUser = await clerkClient.users.getUser(userId)

    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null
      }
    })
  }

  return user
}