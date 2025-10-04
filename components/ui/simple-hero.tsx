"use client";

import Link from "next/link";

export default function SimpleHero() {
  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center py-20">
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          AI API Management Made Simple
        </h1>
        <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
          Secure gateway to your local LLM with API key management, rate limiting, 
          usage analytics, and real-time monitoring. Get started in minutes.
        </p>
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/sign-up">
            <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Get Started Free
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
              Sign In
            </button>
          </Link>
        </div>
        <div className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="text-xl md:text-2xl font-bold text-blue-600">API Keys</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Secure Management</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="text-xl md:text-2xl font-bold text-green-600">Analytics</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Real-time Insights</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="text-xl md:text-2xl font-bold text-purple-600">Rate Limits</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Smart Controls</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Dashboard Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}