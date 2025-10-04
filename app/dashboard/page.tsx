'use client'

import { useState, useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Key, BarChart3, BookOpen } from "lucide-react"
import { ContentLoading } from "@/components/ui/loading"

interface DashboardStats {
  totalApiCalls: number
  activeApiKeys: number
  successRate: number
  apiCallsChange: number
  keysCreatedThisWeek: number
  recentActivity: Array<{
    id: string
    action: string
    keyName: string
    timestamp: string
    status: string
  }>
}

export default function Page() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <ContentLoading message="Loading dashboard..." />
  }
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Stats Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-card p-6 border border-primary/20">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">API Calls</h3>
              <p className="text-2xl font-bold text-primary">
                {stats?.totalApiCalls.toLocaleString() || '0'}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.apiCallsChange !== undefined && stats.apiCallsChange >= 0 ? '+' : ''}
              {stats?.apiCallsChange?.toFixed(1) || '0'}% from last month
            </p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-card p-6 border border-accent/20">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Active Keys</h3>
              <p className="text-2xl font-bold text-accent">
                {stats?.activeApiKeys || '0'}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.keysCreatedThisWeek || '0'} created this week
            </p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-card p-6 border border-primary/20">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
              <p className="text-2xl font-bold text-primary">
                {stats?.successRate?.toFixed(1) || '0'}%
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalApiCalls || '0'} total requests
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="min-h-[60vh] flex-1 rounded-xl bg-card border p-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to <span className="text-primary">NextGenAI</span> Dashboard
            </h2>
            <p className="text-muted-foreground">
              Manage your API keys, monitor usage, and explore our AI capabilities.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-primary/20 p-4 bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="font-semibold mb-2 text-primary">Quick Actions</h3>
              <div className="space-y-2">
                <a href="/dashboard/keys" className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20">
                  <Key className="w-4 h-4" />
                  Create new API key
                </a>
                <a href="/dashboard/usage" className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20">
                  <BarChart3 className="w-4 h-4" />
                  View API usage
                </a>
                <a href="/dashboard/docs" className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20">
                  <BookOpen className="w-4 h-4" />
                  Read documentation
                </a>
              </div>
            </div>
            
            <div className="rounded-lg border border-accent/20 p-4 bg-gradient-to-br from-accent/5 to-transparent">
              <h3 className="font-semibold mb-2 text-accent">Recent Activity</h3>
              <div className="space-y-2 text-sm">
                {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                  stats.recentActivity.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center p-2 rounded hover:bg-accent/10">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="truncate">{activity.action}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
