import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Program Finder',
  description: 'Find programs in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>

  )
} 