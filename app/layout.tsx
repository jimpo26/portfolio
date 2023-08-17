import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MouseContextProvider from "@/context/mouse";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lorenzo\'s Portfolio',
  description: 'Lorenzo\'s Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <MouseContextProvider>
            {children}
        </MouseContextProvider>
      </body>
    </html>
  )
}
