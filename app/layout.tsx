import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextGenAI - API Management',
  description: 'Manage your AI API keys and usage',
  icons: {
    icon: [
      {
        url: '/charge-icon-orange.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/charge-icon-orange.svg',
    apple: '/charge-icon-orange.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}