'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member'
  status: 'active' | 'pending'
  joinedAt: string
  avatar?: string
}

export default function TeamPage() {
  const { user } = useUser()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)


  const fetchTeamMembers = useCallback(async () => {
    try {
      // Show only the current user as the owner
      if (user) {
        const currentUser: TeamMember = {
          id: user.id,
          name: user.fullName || 'You',
          email: user.primaryEmailAddress?.emailAddress || '',
          role: 'owner',
          status: 'active',
          joinedAt: user.createdAt?.toISOString() || new Date().toISOString(),
          avatar: user.imageUrl
        }
        
        setTeamMembers([currentUser])
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading user data:', error)
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchTeamMembers()
  }, [fetchTeamMembers])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-muted-foreground mt-2">
          Manage your team members and their access
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            View and manage your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading team members...</p>
          ) : (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {member.avatar && (
                      <Image 
                        src={member.avatar} 
                        alt={member.name} 
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full" 
                      />
                    )}
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground capitalize">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}