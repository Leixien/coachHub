import '@repo/ui/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Coach Hub - Piattaforma Avanzata per Personal Training',
  description: 'La piattaforma completa per personal trainer e atleti. Gestione anamnesi, schede, monitoraggio e molto altro.',
  keywords: ['personal training', 'fitness', 'coaching', 'workout', 'exercise'],
  authors: [{ name: 'Coach Hub Team' }],
  creator: 'Coach Hub',
  publisher: 'Coach Hub',
  metadataBase: new URL('https://coachhub.it'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://coachhub.it',
    siteName: 'Coach Hub',
    title: 'Coach Hub - Piattaforma Avanzata per Personal Training',
    description: 'La piattaforma completa per personal trainer e atleti.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coach Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coach Hub - Piattaforma Avanzata per Personal Training',
    description: 'La piattaforma completa per personal trainer e atleti.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
