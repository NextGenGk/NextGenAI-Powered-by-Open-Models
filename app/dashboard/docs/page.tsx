"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Key, Zap, Code, Shield } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function DocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Getting Started</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to integrate with the NextGen AI API in minutes
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Get up and running with the NextGen AI API in 3 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">1</Badge>
                <Key className="w-4 h-4" />
                <span className="font-semibold">Get API Key</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create your API key from the dashboard
              </p>
              <Link href="/dashboard/keys">
                <Button variant="outline" size="sm">
                  Create API Key
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">2</Badge>
                <Code className="w-4 h-4" />
                <span className="font-semibold">Make Request</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Use our REST API or OpenAI SDK
              </p>
              <Link href="/dashboard/examples">
                <Button variant="outline" size="sm">
                  View Examples
                </Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">3</Badge>
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Monitor Usage</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Track your API usage and performance
              </p>
              <Link href="/dashboard/usage">
                <Button variant="outline" size="sm">
                  View Usage
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Secure your API requests with bearer token authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            All API requests must include your API key in the Authorization header:
          </p>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY")}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Keep your API keys secure and never expose them in client-side code.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card>
        <CardHeader>
          <CardTitle>Base URL</CardTitle>
          <CardDescription>
            All API endpoints are relative to the base URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/v1</code>
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(`${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/v1`)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* First API Call */}
      <Card>
        <CardHeader>
          <CardTitle>Your First API Call</CardTitle>
          <CardDescription>
            Test the API with a simple chat completion request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ai/gpt-oss",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}</code>
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ai/gpt-oss",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Available Models */}
      <Card>
        <CardHeader>
          <CardTitle>Available Models</CardTitle>
          <CardDescription>
            Choose from our selection of AI models for different use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">ai/gpt-oss</h4>
                <Badge variant="secondary">Chat</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                General-purpose conversational AI model for chat completions
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">text-embedding-ada-002</h4>
                <Badge variant="secondary">Embeddings</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                High-quality text embeddings for semantic search and similarity
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Format */}
      <Card>
        <CardHeader>
          <CardTitle>Response Format</CardTitle>
          <CardDescription>
            All API responses follow OpenAI-compatible format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h4 className="font-semibold">Successful Response</h4>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "ai/gpt-oss",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}`}</code>
          </pre>

          <h4 className="font-semibold">Error Response</h4>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`{
  "error": {
    "message": "Invalid API key provided",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
          <CardDescription>
            Understanding API usage limits and best practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Good news!</strong> Currently, there are no rate limits on API requests. 
              However, we recommend implementing reasonable request patterns for optimal performance.
            </p>
          </div>
          
          <h4 className="font-semibold">Best Practices</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Implement exponential backoff for error handling</li>
            <li>• Cache responses when appropriate</li>
            <li>• Use batch requests for multiple operations</li>
            <li>• Monitor your usage in the dashboard</li>
          </ul>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader>
          <CardTitle>Error Handling</CardTitle>
          <CardDescription>
            Common error codes and how to handle them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-mono">400</code>
                <Badge variant="destructive">Bad Request</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Invalid request format or missing required parameters
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-mono">401</code>
                <Badge variant="destructive">Unauthorized</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Invalid or missing API key
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-mono">500</code>
                <Badge variant="destructive">Server Error</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Internal server error - please try again later
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Ready to build? Here&apos;s what to do next
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/dashboard/examples">
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4" />
                    <span className="font-semibold">Interactive Examples</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Test the API directly in your browser with live examples
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/dashboard/keys">
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4" />
                    <span className="font-semibold">Manage API Keys</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Create and manage your API keys for different projects
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}