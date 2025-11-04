import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Scaleo',
  description: '대규모 트래픽 테스트 플랫폼',
  icons: { icon: '/service-logo.png', }
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-sans antialiased' suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
