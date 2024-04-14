import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full bg-[#F2F2F2] flex justify-center items-center'>
        {children}
    </div>
  )
}

export default AuthLayout