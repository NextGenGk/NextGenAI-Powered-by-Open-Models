import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Secure API Management",
      description:
        "Generate and manage multiple API keys with granular permissions and secure authentication powered by Clerk.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Rate Limiting Control",
      description:
        "Set custom rate limits per API key to control usage and prevent abuse of your LLM resources.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Usage Analytics",
      description:
        "Track requests, tokens, and response times with detailed analytics for each API key.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "LLM Proxy Gateway",
      description: "Secure proxy between your applications and local LLM servers with full request/response logging.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-Key Architecture",
      description: "Create separate API keys for different applications or team members with individual rate limits.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Real-time Monitoring",
      description:
        "Monitor your API usage in real-time with comprehensive logging and performance metrics.",
      icon: <IconHelp />,
    },
    {
      title: "Enterprise Security",
      description:
        "Enterprise-grade security with JWT validation, request encryption, and complete audit trails.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "OpenAI Compatible",
      description: "Fully compatible with OpenAI API format - integrate seamlessly with existing applications.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="py-20 bg-background">
      {/* Heading and Tagline */}
      <div className="text-center mb-16 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
          Powerful API Management
          <span className="block text-primary">
            for Your AI Infrastructure
          </span>
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Take complete control of your LLM API ecosystem with enterprise-grade security,
          intelligent rate limiting, and comprehensive analytics.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 4) && "lg:border-l border-border",
        index < 4 && "lg:border-b border-border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/10 dark:from-primary/20 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/10 dark:from-primary/20 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-black dark:text-gray-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-primary/30 dark:bg-primary/70 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-black dark:text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
