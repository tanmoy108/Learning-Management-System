import NavbarButton from '@/components/navbarButton'
import React from 'react'
import BrowseMobileNavbar from './browseMobileNavbar'

const BrowseNavbar = ({courseId}:{courseId:string}) => {
  return (
    // <div className='w-full flex items-center justify-between'>
        
    //     <NavbarButton/>
    // </div>
    <div className='w-full flex items-center justify-between'>
    <BrowseMobileNavbar courseId={courseId}/>
    <NavbarButton/>
</div>
  )
}

export default BrowseNavbar