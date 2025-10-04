"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { BookOpen, Home, Key, LayoutDashboard } from "lucide-react";
import Image from "next/image";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Dashboard navigation data
const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "API Management",
      url: "/dashboard/keys",
      icon: Key,
      items: [
        {
          title: "API Keys",
          url: "/dashboard/keys",
        },
        {
          title: "Usage",
          url: "/dashboard/usage",
        },
      ],
    },

    {
      title: "Documentation",
      url: "/dashboard/docs",
      icon: BookOpen,
      items: [
        {
          title: "Getting Started",
          url: "/dashboard/docs",
        },
        {
          title: "Examples",
          url: "/dashboard/examples",
        },
      ],
    },

  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const userData = {
    name: user?.firstName || user?.fullName || "User",
    email: user?.emailAddresses[0]?.emailAddress || "user@example.com",
    avatar: user?.imageUrl || "/avatars/user.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2 hover:text-orange-500 transition-colors cursor-pointer">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image src="/charge-icon-orange.svg" alt="NextGenAI" width={24} height={24} />
          </div>
          <span className="font-semibold text-lg hover:text-orange-500 transition-colors">NextGenAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
