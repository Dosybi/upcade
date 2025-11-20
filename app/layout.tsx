import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Upcade | Trading Launchpad',
  description: 'Modern trading terminal for meme tokens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
