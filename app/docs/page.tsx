'use client'

import Navbar from '@/components/navbar'
import { Book, Shield, BarChart3, Key, Settings, Zap } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about NextGenAI
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Book className="w-6 h-6 text-blue-600" />
            Getting Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Setup</h3>
              <ol className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Sign up for a NextGenAI account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Create your first API key</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Configure your LLM endpoint</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <span>Start making API calls</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Enterprise-grade security</span>
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Real-time analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span>Smart rate limiting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-purple-600" />
                  <span>API key management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              API Key Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn how to create, manage, and secure your API keys with granular permissions.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Creating API keys</li>
              <li>• Setting permissions</li>
              <li>• Key rotation</li>
              <li>• Security best practices</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Usage Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor your API usage with detailed analytics and insights.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Real-time monitoring</li>
              <li>• Usage patterns</li>
              <li>• Performance metrics</li>
              <li>• Custom dashboards</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Rate Limiting
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Protect your APIs with intelligent rate limiting and quotas.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Setting rate limits</li>
              <li>• Quota management</li>
              <li>• Burst handling</li>
              <li>• Custom policies</li>
            </ul>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Configuration
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Environment Setup</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Configure your environment variables for optimal performance:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                <div>NEXTGENAI_API_KEY=your_api_key_here</div>
                <div>NEXTGENAI_BASE_URL=https://your-domain.com/api/v1</div>
                <div>NEXTGENAI_TIMEOUT=30000</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">LLM Configuration</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect your local LLM or configure cloud providers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Local LLM</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Connect to your local Ollama, LM Studio, or other local models</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="font-semibold text-green-600 dark:text-green-400 mb-2">Cloud Providers</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Integrate with OpenAI, Anthropic, or other cloud APIs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I get started with NextGenAI?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simply sign up for an account, create your first API key, and start making requests to our endpoints. 
                Check out our Quick Start guide above for detailed steps.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What LLM models are supported?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                NextGenAI supports any OpenAI-compatible API, including local models like Ollama, LM Studio, 
                and cloud providers like OpenAI, Anthropic, and more.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How does rate limiting work?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rate limiting is applied per API key and can be configured based on requests per minute, hour, or day. 
                You can set custom limits for different endpoints and monitor usage in real-time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we implement enterprise-grade security with encrypted API keys, secure data transmission, 
                and no data logging by default. Your conversations and data remain private.
              </p>
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