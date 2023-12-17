import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppBar from './AppBar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/auth'
import Provider from './Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <AppBar />
          <div className="min-h-screen">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
