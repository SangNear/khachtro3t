import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { ReactNode } from 'react'
import { DataApi } from './api/login'
import { SessionProvider } from './api/SessionProvider'
import HeaderComponent from './components/header/page'
import { usePathname } from 'next/navigation'
import ContainerComponent2 from './components/wrappComponent2/page'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Khách trọ 3T',
  description: 'Generated by create next app',
}

interface Iprops {
  children: ReactNode

}

export default function RootLayout({ children }: Iprops) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        
        {children}
      </body>
    </html>
  )
}
