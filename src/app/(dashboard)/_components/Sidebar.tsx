import Image from 'next/image'
import React from 'react'
import SidebarItems from './SidebarItems'

const Sidebar = () => {
  return (
    <div className='w-full py-5'>
       <div className='flex justify-center pb-3'>
        <Image src="/logo.svg" width={130} height={130} alt='logo'/>
       </div>
       <div className='w-full'>
        <SidebarItems/>
       </div>
    </div>
  )
}

export default Sidebar