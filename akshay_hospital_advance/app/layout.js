import './globals.css'
import Navbar from '../components/Navbar'
import { initDB } from '../lib/database'

// Initialize database on app start
initDB()

export const metadata = {
  title: 'Akshay Hospital',
  description: 'Your trusted healthcare partner',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        
      </body>
    </html>
  )
}
