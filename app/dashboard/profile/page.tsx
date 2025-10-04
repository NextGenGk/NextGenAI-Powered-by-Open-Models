'use client'

import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm text-muted-foreground">Dashboard</div>
        <div className="text-sm text-muted-foreground">/</div>
        <div className="text-sm font-medium">Profile</div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and profile information</p>
        </div>

        {/* Clerk User Profile Component */}
        <div className="bg-card rounded-lg shadow border p-6">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 w-full",
              },
              variables: {
                colorPrimary: "#ea580c",
                colorBackground: "hsl(var(--background))",
                colorInputBackground: "hsl(var(--background))",
                colorInputText: "hsl(var(--foreground))",
                colorText: "hsl(var(--foreground))",
                colorTextSecondary: "hsl(var(--muted-foreground))",
                borderRadius: "0.5rem"
              }
            }}
          />
        </div>
      </div>
    </>
  )
}