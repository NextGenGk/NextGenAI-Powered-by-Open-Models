'use client'

import Navbar from '@/components/navbar'
import { Code, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const curlExample = `curl -X POST https://your-domain.com/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "max_tokens": 150
  }'`

  const jsExample = `const response = await fetch('https://your-domain.com/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Hello, how are you?'
      }
    ],
    max_tokens: 150
  })
});

const data = await response.json();
console.log(data);`

  const pythonExample = `import requests

url = "https://your-domain.com/api/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ],
    "max_tokens": 150
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete guide to integrating with NextGenAI APIs
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Quick Start
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started with NextGenAI API in minutes. First, you&apos;ll need to create an API key from your dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 font-semibold mb-2">1. Get API Key</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Create your API key in the dashboard</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-semibold mb-2">2. Make Request</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Send requests to our endpoints</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-purple-600 dark:text-purple-400 font-semibold mb-2">3. Monitor Usage</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Track your API usage and analytics</div>
            </div>
          </div>
        </div>

        {/* Base URL */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Base URL</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
            https://your-domain.com/api/v1
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All API requests require authentication using your API key in the Authorization header:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </div>

        {/* Endpoints */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Endpoints</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                POST /chat/completions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create a chat completion using your configured LLM model.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Request Body</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">model</code> (string): The model to use</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">messages</code> (array): Array of message objects</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">max_tokens</code> (number): Maximum tokens to generate</li>
                  <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">temperature</code> (number): Sampling temperature (0-1)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Code Examples</h2>
          
          <div className="space-y-6">
            {/* cURL Example */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">cURL</h3>
                <button
                  onClick={() => copyToClipboard(curlExample, 'curl')}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copiedCode === 'curl' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === 'curl' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">{curlExample}</pre>
              </div>
            </div>

            {/* JavaScript Example */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JavaScript</h3>
                <button
                  onClick={() => copyToClipboard(jsExample, 'js')}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copiedCode === 'js' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === 'js' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">{jsExample}</pre>
              </div>
            </div>

            {/* Python Example */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Python</h3>
                <button
                  onClick={() => copyToClipboard(pythonExample, 'python')}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copiedCode === 'python' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCode === 'python' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">{pythonExample}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rate Limits</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            API requests are subject to rate limiting to ensure fair usage:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Free Tier</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">100 requests per hour</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-semibold mb-2">Pro Tier</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">1,000 requests per hour</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="size-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">NextGenAI</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 NextGenAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}