import './globals.css'

import { SessionProvider } from './providers'
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'Product Store - Next.js App',
  description: 'A modern product store built with Next.js and NextAuth',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link href="/dist/styles.css" rel="stylesheet"></link>
      </head>
      <body>
        <SessionProvider>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#4F459B',
                color: '#fff',
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
