import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Calendar',
  description: 'Calendar',
  applicationName: 'Test App Calendar',
  authors: {name: 'Sameliuk Oleg'},
  keywords: ['calendar', 'event planing', 'planing', 'events']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
