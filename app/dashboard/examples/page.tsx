"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function ExamplesPage() {
  const [apiKey, setApiKey] = useState("")
  const [chatInput, setChatInput] = useState("Hello! How are you?")
  const [embeddingInput, setEmbeddingInput] = useState("This is a sample text for embedding")
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, { error?: string; [key: string]: unknown }>>({})

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const testEndpoint = async (endpoint: string, data?: Record<string, unknown>) => {
    if (!apiKey) {
      toast.error("Please enter your API key first")
      return
    }

    const loadingKey = endpoint
    setLoading(loadingKey)
    
    try {
      const response = await fetch(`/api/v1/${endpoint}`, {
        method: data ? 'POST' : 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
      })

      const result = await response.json()
      setResults(prev => ({ ...prev, [loadingKey]: result }))
      if (response.ok) {
        toast.success(`${endpoint} request successful!`)
      } else {
        toast.error(`${endpoint} request failed: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Network error: ${errorMessage}`)
      setResults(prev => ({ ...prev, [loadingKey]: { error: errorMessage } }))
    } finally {
      setLoading(null)
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Examples</h1>
        <p className="text-muted-foreground mt-2">
          Interactive examples and code snippets for using the NextGen AI API
        </p>
      </div> 
     {/* API Key Input */}
      <Card>
        <CardHeader>
          <CardTitle>API Key Setup</CardTitle>
          <CardDescription>
            Enter your API key to test the endpoints interactively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Get your API key from the <a href="/dashboard/keys" className="text-primary hover:underline">API Keys</a> page
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive API Testing</CardTitle>
          <CardDescription>
            Test the API endpoints directly from this page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
              <TabsTrigger value="completions">Completions</TabsTrigger>
            </TabsList>



            <TabsContent value="chat" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chatInput">Message</Label>
                <Textarea
                  id="chatInput"
                  placeholder="Enter your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => testEndpoint('chat/completions', {
                    model: 'ai/gpt-oss-20b',
                    messages: [{ role: 'user', content: chatInput }]
                  })}
                  disabled={loading === 'chat/completions'}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {loading === 'chat/completions' ? 'Testing...' : 'Test Chat API'}
                </Button>

              </div>
              {results['chat/completions'] && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Chat API Response:</h4>
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(results['chat/completions'], null, 2)}
                  </pre>
                </div>
              )}

            </TabsContent>

            <TabsContent value="models" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Retrieve the list of available models
              </p>
              <Button 
                onClick={() => testEndpoint('models')}
                disabled={loading === 'models'}
              >
                <Play className="w-4 h-4 mr-2" />
                {loading === 'models' ? 'Testing...' : 'Test Models API'}
              </Button>
              {results['models'] && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(results['models'], null, 2)}
                  </pre>
                </div>
              )}
            </TabsContent>

            <TabsContent value="embeddings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embeddingInput">Text to Embed</Label>
                <Textarea
                  id="embeddingInput"
                  placeholder="Enter text to generate embeddings..."
                  value={embeddingInput}
                  onChange={(e) => setEmbeddingInput(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => testEndpoint('embeddings', {
                  model: 'text-embedding-ada-002',
                  input: embeddingInput
                })}
                disabled={loading === 'embeddings'}
              >
                <Play className="w-4 h-4 mr-2" />
                {loading === 'embeddings' ? 'Testing...' : 'Test Embeddings API'}
              </Button>
              {results['embeddings'] && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(results['embeddings'], null, 2)}
                  </pre>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completions" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="completionInput">Prompt</Label>
                <Textarea
                  id="completionInput"
                  placeholder="Enter your prompt..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => testEndpoint('completions', {
                  model: 'ai/gpt-oss-20b',
                  prompt: chatInput,
                  max_tokens: 100
                })}
                disabled={loading === 'completions'}
              >
                <Play className="w-4 h-4 mr-2" />
                {loading === 'completions' ? 'Testing...' : 'Test Completions API'}
              </Button>
              {results['completions'] && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(results['completions'], null, 2)}
                  </pre>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> 
     {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>
            Copy and paste these examples into your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Chat Completions</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`// Chat Completions
fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'ai/gpt-oss',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
})
.then(response => response.json())
.then(data => console.log(data));`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Chat Completions
fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'ai/gpt-oss',
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
})
.then(response => response.json())
.then(data => console.log(data));`}</code>
                </pre>

                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Models List</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`// Models List
fetch('/api/v1/models', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Models List
fetch('/api/v1/models', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}</code>
                </pre>

                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Embeddings</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`// Embeddings
fetch('/api/v1/embeddings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'text-embedding-ada-002',
    input: 'Hello world'
  })
})
.then(response => response.json())
.then(data => console.log(data));`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Embeddings
fetch('/api/v1/embeddings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'text-embedding-ada-002',
    input: 'Hello world'
  })
})
.then(response => response.json())
.then(data => console.log(data));`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="python">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Python Examples</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`import requests

# Chat Completions
url = "/api/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "ai/gpt-oss",
    "messages": [
        {"role": "user", "content": "Hello!"}
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())

# Models List
models_response = requests.get("/api/v1/models", headers={"Authorization": "Bearer YOUR_API_KEY"})
print(models_response.json())

# Embeddings
embeddings_data = {
    "model": "text-embedding-ada-002",
    "input": "Hello world"
}
embeddings_response = requests.post("/api/v1/embeddings", headers=headers, json=embeddings_data)
print(embeddings_response.json())`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import requests

# Chat Completions
url = "/api/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "ai/gpt-oss",
    "messages": [
        {"role": "user", "content": "Hello!"}
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())

# Models List
models_response = requests.get("/api/v1/models", headers={"Authorization": "Bearer YOUR_API_KEY"})
print(models_response.json())

# Embeddings
embeddings_data = {
    "model": "text-embedding-ada-002",
    "input": "Hello world"
}
embeddings_response = requests.post("/api/v1/embeddings", headers=headers, json=embeddings_data)
print(embeddings_response.json())`}</code>
                </pre>
              </div>
            </TabsContent> 
           <TabsContent value="curl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">cURL Examples</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`# Chat Completions
curl -X POST /api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ai/gpt-oss",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'

# Models List
curl -X GET /api/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Embeddings
curl -X POST /api/v1/embeddings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-ada-002",
    "input": "Hello world"
  }'`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`# Chat Completions
curl -X POST /api/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ai/gpt-oss",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'

# Models List
curl -X GET /api/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Embeddings
curl -X POST /api/v1/embeddings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-ada-002",
    "input": "Hello world"
  }'`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="nodejs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Node.js with OpenAI SDK</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://your-domain.com/api/v1'
});

async function main() {
  // Chat Completions
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Hello!' }],
    model: 'ai/gpt-oss',
  });
  console.log(completion.choices[0]);

  // Models List
  const models = await openai.models.list();
  console.log(models);

  // Embeddings
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: 'Hello world',
  });
  console.log(embedding);
}

main();`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://your-domain.com/api/v1'
});

async function main() {
  // Chat Completions
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Hello!' }],
    model: 'ai/gpt-oss',
  });
  console.log(completion.choices[0]);

  // Models List
  const models = await openai.models.list();
  console.log(models);

  // Embeddings
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: 'Hello world',
  });
  console.log(embedding);
}

main();`}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>
            Get started with the NextGen AI API in 3 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">1</Badge>
              <div>
                <h4 className="font-semibold">Get Your API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Visit the <a href="/dashboard/keys" className="text-primary hover:underline">API Keys</a> page to create a new API key
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">2</Badge>
              <div>
                <h4 className="font-semibold">Choose Your Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Use our REST API directly or integrate with the OpenAI SDK for seamless compatibility
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Badge variant="outline" className="mt-1">3</Badge>
              <div>
                <h4 className="font-semibold">Start Building</h4>
                <p className="text-sm text-muted-foreground">
                  Copy the code examples above and start making API calls. Monitor your usage in the dashboard.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Available Endpoints</CardTitle>
          <CardDescription>
            Complete list of API endpoints and their capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm">/api/v1/chat/completions</code>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Create chat completions with conversational AI models
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm">/api/v1/models</code>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                List all available models and their capabilities
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm">/api/v1/embeddings</code>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Generate vector embeddings for text input
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm">/api/v1/completions</code>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Generate text completions from prompts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}