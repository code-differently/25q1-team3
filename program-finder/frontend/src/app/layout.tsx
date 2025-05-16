import type { Metadata } from 'next'
import Script from 'next/script'
import { useEffect } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'In My Hood - Program Finder',
  description: 'Find Local Programs for Youth in Your Community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body className="is-preload">
        {children}

        {/* Scripts */}
        <Script src="/assets/js/jquery.min.js" />
        <Script src="/assets/js/jquery.dropotron.min.js" />
        <Script src="/assets/js/jquery.scrollex.min.js" />
        <Script src="/assets/js/browser.min.js" />
        <Script src="/assets/js/breakpoints.min.js" />
        <Script src="/assets/js/util.js" />
        <Script src="/assets/js/main.js" />
      </body>
    </html>
  )
} 