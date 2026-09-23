import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Encontro com Deus — Get Church Floripa',
  description: 'Sistema de gestão do Encontro com Deus',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Encontro com Deus',
  },
}

export const viewport: Viewport = {
  themeColor: '#111A24',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-figtree antialiased">
        {children}
        <Toaster
          theme="dark"
          richColors
          position="top-right"
          toastOptions={{
            style: {
              background: '#17222F',
              border: '1px solid #2A3848',
              color: '#F2EDE6',
            },
          }}
        />
      </body>
    </html>
  )
}
