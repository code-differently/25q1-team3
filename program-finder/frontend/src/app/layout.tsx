import type { Metadata } from 'next'
import ScriptInitializer from '../components/ScriptInitializer'
import './globals.css'

// Add jQuery type declaration
declare global {
  interface Window {
    jQuery: any;
  }
}

export const metadata: Metadata = {
  title: 'CYPHER - Program Finder',
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
        <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
      </head>
      <body className="is-preload">
        {children}
        <ScriptInitializer />
      </body>
<<<<<<< HEAD
    </html> 
  )
} 