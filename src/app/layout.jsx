import Footer from '@/components/layout/Footer'
import { Inter } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nomatic - Premium Kitchen Solutions',
  description: 'Modern kitchen designs and interior solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
