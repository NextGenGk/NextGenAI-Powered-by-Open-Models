import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">NextGenAI</h1>
          <p className="text-gray-600 mb-8">AI API Management Platform</p>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border-0",
            },
            variables: {
              colorPrimary: "#ea580c",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorInputText: "#374151",
              colorText: "#374151",
              colorTextSecondary: "#6b7280",
              colorSuccess: "#10b981",
              colorDanger: "#ef4444",
              colorWarning: "#f59e0b",
              borderRadius: "0.5rem"
            }
          }}
        />
      </div>
    </div>
  )
}