import Topbar from '@/components/shared/Topbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Contact Management App',
  description: 'Contact management app made up with Charts and Maps using ReactJS, TypeScript, TailwindCSS, React Router v6 and React Query aka TanstackQuery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
        <main className='flex flex-row bg-dark-1'>
            <LeftSidebar/>
            <section className='main-container w-full '>
              <div className='w-full max-w-4xl '>{children}</div>
            </section>
            {/* @ts-ignore */}
          </main>
          <Bottombar/>
      </body>
    </html>
  )
}
