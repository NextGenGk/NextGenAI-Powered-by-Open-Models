'use client'

import { useState, useEffect } from 'react'
import { Key, Lightbulb } from 'lucide-react'
import { ContentLoading } from "@/components/ui/loading"

interface ApiKey {
  id: string
  name: string
  key: string
  isActive: boolean
  createdAt: string
  lastUsedAt: string | null
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys')
      if (response.ok) {
        const data = await response.json()
        setApiKeys(data.apiKeys)
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch API keys:', errorData)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newKeyName
        })
      })

      if (response.ok) {
        setNewKeyName('')
        setShowCreateForm(false)
        fetchApiKeys()
      } else {
        const errorData = await response.json()
        console.error('Failed to create API key:', errorData)
        alert(`Failed to create API key: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating API key:', error)
      alert('Failed to create API key. Please try again.')
    }
  }

  const toggleKeyStatus = async (keyId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        fetchApiKeys()
      } else {
        const errorData = await response.json()
        console.error('Failed to update API key:', errorData)
        alert(`Failed to update API key: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating API key:', error)
      alert('Failed to update API key. Please try again.')
    }
  }

  const deleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchApiKeys()
        alert('API key deleted successfully!')
      } else {
        const errorData = await response.json()
        console.error('Failed to delete API key:', errorData)
        alert(`Failed to delete API key: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting API key:', error)
      alert('Failed to delete API key. Please try again.')
    }
  }

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(keyId)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (isLoading) {
    return <ContentLoading message="Loading API keys..." />
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm text-muted-foreground">Dashboard</div>
        <div className="text-sm text-muted-foreground">/</div>
        <div className="text-sm font-medium">API Keys</div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for accessing the NextGenAI API</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <span className="mr-2">+</span>
            Create New API Key
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-card p-6 rounded-lg shadow border">
            <h3 className="text-lg font-medium mb-4">Create New API Key</h3>
            <form onSubmit={createApiKey} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Key Name *
                </label>
                <input
                  type="text"
                  required
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring bg-background text-foreground"
                  placeholder="e.g., Production API Key, Development Key"
                />
                <p className="text-xs text-muted-foreground mt-1">Choose a descriptive name to identify this key</p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
                >
                  Create Key
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {apiKeys.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg shadow border">
            <div className="flex justify-center mb-4">
              <Key className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No API keys yet</h3>
            <p className="text-muted-foreground mb-6">Create your first API key to start using the NextGenAI API</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium"
            >
              Create Your First API Key
            </button>
          </div>
        ) : (
          <div className="bg-card shadow rounded-lg overflow-hidden border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">Your API Keys</h3>
            </div>
            <ul className="divide-y divide-border">
              {apiKeys.map((key) => (
                <li key={key.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-foreground">{key.name}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          key.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {key.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                        {key.lastUsedAt && (
                          <span>Last Used: {new Date(key.lastUsedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <code className="bg-muted px-3 py-2 rounded text-sm font-mono flex-1 max-w-md truncate">
                          {key.key}
                        </code>
                        <button
                          onClick={() => copyToClipboard(key.key, key.id)}
                          className="text-primary hover:text-primary/80 text-sm font-medium px-3 py-2 border border-border rounded hover:bg-muted"
                        >
                          {copySuccess === key.id ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleKeyStatus(key.id, key.isActive)}
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          key.isActive
                            ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {key.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="px-3 py-1 text-xs font-medium rounded bg-destructive/10 text-destructive hover:bg-destructive/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Usage Information */}
        <div className="bg-muted/50 border border-border rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
            <Lightbulb className="w-5 h-5" />
            API Key Usage Tips
          </h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>• Keep your API keys secure and never share them publicly</li>
            <li>• Use different keys for different environments (development, staging, production)</li>
            <li>• Monitor your API usage regularly</li>
            <li>• Disable or delete keys that are no longer needed</li>
          </ul>
        </div>
      </div>
    </>
  )
}