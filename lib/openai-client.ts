import OpenAI from "openai";

export function createOpenAIClient() {
  return new OpenAI({
    apiKey: "1", // Placeholder since we're using local LLM
    baseURL: process.env.LLM_BASE_URL || "http://localhost:12434/engines/llama.cpp/v1",
  });
}

export function calculateResponseTime(): number {
  return Math.floor(Math.random() * 3) + 1;
}