export interface ModelInfo {
  id: string
  name: string
  provider: string
  description?: string
  contextLength?: number
  pricing?: {
    input: number // per 1M tokens
    output: number // per 1M tokens
  }
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: 'ai/gpt-oss-20b',
    name: 'GPT OSS 20B',
    provider: 'NextGenAI',
    description: 'Our flagship 20B parameter open source GPT model with advanced reasoning capabilities',
    contextLength: 32768,
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'ai/gpt-oss-7b',
    name: 'GPT OSS 7B',
    provider: 'NextGenAI',
    description: 'Efficient 7B parameter model optimized for speed and performance',
    contextLength: 16384,
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'ai/gpt-oss-3b',
    name: 'GPT OSS 3B',
    provider: 'NextGenAI',
    description: 'Lightweight 3B parameter model for fast inference and low latency',
    contextLength: 8192,
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'ai/gpt-oss-instruct',
    name: 'GPT OSS Instruct',
    provider: 'NextGenAI',
    description: 'Instruction-tuned model specialized for following complex instructions',
    contextLength: 16384,
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'ai/gpt-oss-code',
    name: 'GPT OSS Code',
    provider: 'NextGenAI',
    description: 'Code-specialized model trained on programming languages and documentation',
    contextLength: 24576,
    pricing: { input: 0, output: 0 }
  }
]

export const EMBEDDING_MODELS: ModelInfo[] = [
  {
    id: 'ai/embed-large',
    name: 'NextGenAI Embed Large',
    provider: 'NextGenAI',
    description: 'High-dimensional embeddings for complex semantic understanding',
    pricing: { input: 0, output: 0 }
  },
  {
    id: 'ai/embed-small',
    name: 'NextGenAI Embed Small',
    provider: 'NextGenAI',
    description: 'Efficient embeddings optimized for speed and resource usage',
    pricing: { input: 0, output: 0 }
  }
]

export function getModelById(modelId: string): ModelInfo | undefined {
  return [...AVAILABLE_MODELS, ...EMBEDDING_MODELS].find(model => model.id === modelId)
}

export function isValidModel(modelId: string): boolean {
  return getModelById(modelId) !== undefined
}

export function getModelsByProvider(provider: string): ModelInfo[] {
  return AVAILABLE_MODELS.filter(model => 
    model.provider.toLowerCase() === provider.toLowerCase()
  )
}