import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Cerrajero Córdoba 24H - Servicio Urgente de Cerrajería',
    template: '%s | Cerrajero Córdoba 24H',
  },
  description: 'Cerrajero Córdoba 24H - Servicio urgente de cerrajería en Córdoba y provincia. Apertura de puertas, cambio de cerraduras, bombillos y persianas. Llama al 900 433 189. Presupuesto gratis y atención 24 horas.',
  keywords: ['cerrajero córdoba', 'cerrajero urgente córdoba', 'cerrajería 24 horas', 'apertura de puertas córdoba', 'cambio de cerraduras', 'cerrajero barato córdoba', '900 433 189'],
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cerrajerocordoba.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Cerrajero Córdoba 24H',
    images: ['/logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
