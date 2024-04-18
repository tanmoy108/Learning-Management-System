import Image from 'next/image'
import React from 'react'
import SidebarItems from './SidebarItems'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='w-full'>
       <div className='flex pl-8 py-[23px]'>
        <Link href="/">
        <Image src="/logo.png" width={164.638} height={34} alt='logo'/>
        </Link>
       </div>
       <div className='w-full'>
        <SidebarItems/>
       </div>
    </div>
  )
}

export default Sidebar