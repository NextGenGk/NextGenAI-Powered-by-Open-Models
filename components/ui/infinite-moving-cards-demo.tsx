import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
            What Developers Say
            <span className="block text-primary">
              About NextGenAI
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Join thousands of developers who trust NextGenAI for their AI API management
          </p>
        </div>

        <div className="h-[28rem] rounded-md flex flex-col antialiased bg-background items-center justify-center relative">
          <div className="w-full h-full overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "NextGenAI transformed how we manage our AI APIs. The rate limiting and usage analytics give us complete control over our LLM costs. It's a game-changer for our development workflow.",
    name: "Sarah Chen",
    title: "CTO, TechFlow Inc.",
  },
  {
    quote:
      "As an AI startup, we needed a robust API management solution. NextGenAI's multi-key architecture and enterprise security features let us scale confidently while maintaining control.",
    name: "Marcus Rodriguez",
    title: "Lead AI Engineer, DataMind AI",
  },
  {
    quote:
      "The OpenAI compatibility made integration seamless. We migrated from our custom solution to NextGenAI in just two days. The request logging and monitoring are incredibly detailed.",
    name: "Emily Watson",
    title: "Senior Developer, InnovateLab",
  },
  {
    quote:
      "Managing multiple API keys for different environments was a nightmare before NextGenAI. Now we have granular control with Clerk authentication and comprehensive audit trails.",
    name: "David Kim",
    title: "DevOps Engineer, CloudSync",
  },
  {
    quote:
      "The real-time monitoring and usage analytics help us optimize our API usage and predict costs accurately. NextGenAI pays for itself in the first month of use.",
    name: "Lisa Thompson",
    title: "Product Manager, AI Solutions Ltd",
  },
];
