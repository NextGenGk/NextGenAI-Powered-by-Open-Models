import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

export default function NextGenAIGridHero() {
  return (
    <div className="relative flex w-full items-center justify-center bg-background dark:bg-black py-20">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
          ✨ Now Available
        </div>
        
        {/* Main Heading */}
        <h1 className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
          Craft Your Digital
          <span className="block bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            AI Identity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Forge personalized API keys that unlock the full potential of AI across every corner of our platform. 
          Your keys, your control, your limitless possibilities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/sign-up">
            <button className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="w-full sm:w-auto px-4 py-2 border border-border hover:border-primary text-foreground hover:text-primary rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
