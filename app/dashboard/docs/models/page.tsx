"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, CheckCircle, ChevronDown } from "lucide-react";

interface Model {
  id: string;
  name: string;
  provider: string;
  description?: string;
  context_length?: number;
  contextLength?: number;
  pricing?: {
    input: number;
    output: number;
  };
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("ai/gpt-oss-20b");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  // Update selected model if it doesn't exist in the models list
  useEffect(() => {
    if (models.length > 0 && !models.find((m) => m.id === selectedModel)) {
      console.log(
        "Selected model not found, selecting first available:",
        models[0].id
      );
      setSelectedModel(models[0].id);
    }
  }, [models, selectedModel]);

  const fetchModels = async () => {
    try {
      // For the documentation page, we'll use static models data
      // since the API requires authentication
      const staticModels = [
        {
          id: "ai/gpt-oss-20b",
          name: "GPT OSS 20B",
          provider: "NextGenAI",
          description:
            "Our flagship 20B parameter open source GPT model with advanced reasoning capabilities",
          contextLength: 32768,
          pricing: { input: 0, output: 0 },
        },
        {
          id: "ai/gpt-oss-7b",
          name: "GPT OSS 7B",
          provider: "NextGenAI",
          description:
            "Efficient 7B parameter model optimized for speed and performance",
          contextLength: 16384,
          pricing: { input: 0, output: 0 },
        },
        {
          id: "ai/gpt-oss-3b",
          name: "GPT OSS 3B",
          provider: "NextGenAI",
          description:
            "Lightweight 3B parameter model for fast inference and low latency",
          contextLength: 8192,
          pricing: { input: 0, output: 0 },
        },
        {
          id: "ai/gpt-oss-instruct",
          name: "GPT OSS Instruct",
          provider: "NextGenAI",
          description:
            "Instruction-tuned model specialized for following complex instructions",
          contextLength: 16384,
          pricing: { input: 0, output: 0 },
        },
        {
          id: "ai/gpt-oss-code",
          name: "GPT OSS Code",
          provider: "NextGenAI",
          description:
            "Code-specialized model trained on programming languages and documentation",
          contextLength: 24576,
          pricing: { input: 0, output: 0 },
        },
      ];

      console.log("Loading static models:", staticModels);
      setModels(staticModels);
    } catch (error) {
      console.error("Error loading models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const chatExample = (
    modelId: string
  ) => `curl -X POST https://your-api-domain.com/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "max_tokens": 100,
    "temperature": 0.7
  }'`;

  const jsExample = (
    modelId: string
  ) => `const response = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: '${modelId}',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ],
    max_tokens: 100,
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`;

  const pythonExample = (modelId: string) => `import openai

client = openai.OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://your-api-domain.com/api/v1"
)

response = client.chat.completions.create(
    model="${modelId}",
    messages=[
        {"role": "user", "content": "Hello, how are you?"}
    ],
    max_tokens=100,
    temperature=0.7
)

print(response.choices[0].message.content)`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading models...</div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">No models available</div>
          <Button onClick={fetchModels} variant="outline">
            Retry Loading Models
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm text-muted-foreground">Dashboard</div>
        <div className="text-sm text-muted-foreground">/</div>
        <div className="text-sm text-muted-foreground">Docs</div>
        <div className="text-sm text-muted-foreground">/</div>
        <div className="text-sm font-medium">Models</div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Available Models</h1>
          <p className="text-muted-foreground">
            Select and configure the AI model for your applications. Use the
            model ID in your API requests.
          </p>
        </div>

        {/* Model Selection Dropdown */}
        <Card>
          <CardHeader>
            <CardTitle>Model Selection</CardTitle>
            <CardDescription>
              Choose your preferred model for API requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dropdown Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {model.provider}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Model Details */}
            {selectedModel && models.find((m) => m.id === selectedModel) && (
              <div className="border rounded-lg p-4 bg-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">
                        {models.find((m) => m.id === selectedModel)?.name}
                      </h3>
                      <Badge variant="secondary">
                        {models.find((m) => m.id === selectedModel)?.provider}
                      </Badge>
                    </div>
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {selectedModel}
                    </code>
                    {models.find((m) => m.id === selectedModel)
                      ?.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {
                          models.find((m) => m.id === selectedModel)
                            ?.description
                        }
                      </p>
                    )}
                    <div className="flex gap-4 mt-3 text-sm">
                      {(models.find((m) => m.id === selectedModel)
                        ?.context_length ||
                        models.find((m) => m.id === selectedModel)
                          ?.contextLength) && (
                        <div>
                          <span className="text-muted-foreground">
                            Context:
                          </span>
                          <span className="ml-1 font-medium">
                            {(
                              models.find((m) => m.id === selectedModel)
                                ?.context_length ||
                              models.find((m) => m.id === selectedModel)
                                ?.contextLength
                            )?.toLocaleString()}{" "}
                            tokens
                          </span>
                        </div>
                      )}
                      {models.find((m) => m.id === selectedModel)?.pricing && (
                        <div>
                          <span className="text-muted-foreground">
                            Pricing:
                          </span>
                          <span className="ml-1 font-medium">Free</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(selectedModel, "model-id")}
                className="flex items-center gap-2"
              >
                {copiedCode === "model-id" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                Copy Model ID
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const element = document.getElementById("code-examples");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-3 h-3" />
                View Examples
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* All Available Models */}
        <Card>
          <CardHeader>
            <CardTitle>All Available Models</CardTitle>
            <CardDescription>
              Complete list of models available in your API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-primary/50 ${
                    selectedModel === model.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border"
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedModel === model.id && (
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{model.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {model.provider}
                          </Badge>
                        </div>
                        <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {model.id}
                        </code>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      {(model.context_length || model.contextLength) && (
                        <div>
                          {(
                            model.context_length || model.contextLength
                          )?.toLocaleString()}{" "}
                          tokens
                        </div>
                      )}
                      {model.pricing && <div>Free</div>}
                    </div>
                  </div>
                  {model.description && (
                    <p className="text-xs text-muted-foreground mt-2 ml-7">
                      {model.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Examples for Selected Model */}
        <Card id="code-examples">
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>
              Copy and paste these examples using the selected model:{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                {selectedModel}
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>

              <TabsContent value="curl" className="mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{chatExample(selectedModel)}</code>
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(chatExample(selectedModel), "curl")
                    }
                    className="absolute top-2 right-2 p-2 rounded bg-background/80 hover:bg-background"
                  >
                    {copiedCode === "curl" ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="javascript" className="mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{jsExample(selectedModel)}</code>
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(jsExample(selectedModel), "js")
                    }
                    className="absolute top-2 right-2 p-2 rounded bg-background/80 hover:bg-background"
                  >
                    {copiedCode === "js" ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="python" className="mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{pythonExample(selectedModel)}</code>
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(pythonExample(selectedModel), "python")
                    }
                    className="absolute top-2 right-2 p-2 rounded bg-background/80 hover:bg-background"
                  >
                    {copiedCode === "python" ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Model Selection</h4>
              <p className="text-sm text-muted-foreground">
                You can specify the model in your API requests using the{" "}
                <code className="bg-muted px-1 py-0.5 rounded">model</code>{" "}
                parameter. If no model is specified, the default model{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  ai/gpt-oss-20b
                </code>{" "}
                will be used.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">OpenAI Compatibility</h4>
              <p className="text-sm text-muted-foreground">
                Our API is fully compatible with OpenAI&apos;s API format. You
                can use existing OpenAI SDKs by simply changing the base URL to
                your API endpoint.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rate Limits</h4>
              <p className="text-sm text-muted-foreground">
                Each API key has its own rate limit configuration. Check your
                API key settings for current limits.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
