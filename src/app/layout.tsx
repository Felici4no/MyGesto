import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'MyGesto - Um gesto. Sem esforço.',
  description: 'Crie e envie cartões digitais premium com prévia rica no WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(outfit.className, "antialiased min-h-screen bg-white text-slate-900")}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
