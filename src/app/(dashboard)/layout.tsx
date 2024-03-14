import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <div className='w-full h-16 bg-[#fff] border-b flex px-5 fixed' >
      <Navbar/>
    </div>
    <div className='bg-[#fff] border-r h-full w-56 z-50 inset-y-0 hidden md:flex flex-col fixed'>
        <Sidebar/>
    </div>
    <div className='px-5 md:pl-56 pt-16'>
    {children}
    </div>
    </>
  )
}

export default DashBoardLayout