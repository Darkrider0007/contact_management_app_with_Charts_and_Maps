"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

const Topbar = () => {
  const pathname = usePathname();
  return (
    <div className='bg-blue-600'>
      <nav className='flex items-center justify-between flex-wrap  p-2'>
        <p className='text-heading3-bold text-dark-4 font-bold text-3xl max-xs:hidden mx-auto'>
        {pathname === '/' ? 'Contact Page' : 'Charts and Maps'}
        </p>
      </nav>
    </div>
  )
}

export default Topbar
