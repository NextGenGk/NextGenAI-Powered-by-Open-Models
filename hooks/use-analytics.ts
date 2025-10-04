'use client'

import { useState, useEffect, useCallback } from 'react'

export interface AnalyticsData {
  chartData: Array<{
    date: string
    requests: number
    errors: number
    avgResponseTime: number
  }>
  stats: {
    totalRequests: number
    totalErrors: number
    errorRate: number
    avgResponseTime: number
    successRate: number
  }
  topKeys: Array<{
    name: string
    usage: number
    percentage: number
  }>
  errorBreakdown: Array<{
    type: string
    count: number
  }>
  timeRange: string
  lastUpdated: string
}

export function useAnalytics(timeRange: string = '30d', refreshInterval: number = 30000) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}&metric=requests`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data')
      }
      
      const analyticsData = await response.json()
      setData(analyticsData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchAnalytics, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchAnalytics, refreshInterval])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics
  }
}