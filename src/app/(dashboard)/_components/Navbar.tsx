import React from 'react'
import MobileNavbar from './MobileNavbar'
import NavbarButton from '@/components/navbarButton'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-between'>
        <MobileNavbar/>
        <NavbarButton/>
    </div>
  )
}

export default Navbar