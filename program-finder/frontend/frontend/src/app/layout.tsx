import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'CYPHER - Program Finder',
  description: 'Find Local Programs for Youth in Your Community',
}

// Client-side initialization component
'use client'
function ScriptInitializer() {
  useEffect(() => {
    // Initialize dropotron after jQuery is loaded
    if (typeof window !== 'undefined' && window.jQuery) {
      window.jQuery('#nav').dropotron({
        offsetY: -22,
        offsetX: 0,
        mode: 'fade',
        noOpenerFade: true,
        speed: 300,
        detach: false
      });
    }
  }, []);

  return null;
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
        <Script 
          src="/assets/js/jquery.min.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="/assets/js/jquery.dropotron.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/jquery.scrollex.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/browser.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/breakpoints.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/util.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/main.js"
          strategy="afterInteractive"
        />
        <ScriptInitializer />
      </body>
    </html>
  )
} 