'use client'
import { Button } from '@/components/ui/button'
import { FormatPrice } from '@/lib/formatPrice'
import axios from 'axios'
import React, { useState } from 'react'

const EnrollButton = ({price,courseId}:{price:number,courseId:string}) => {
const [isLoading,setIsLoading] = useState(false);

const onClick=async()=>{

  try {
    setIsLoading(true)
    const {data}= await axios.post(`/api/courses/${courseId}/checkout`)
    window.location.assign(data.url)

  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }

}

  return (
    <div>
      <div className='font-bold text-[#374246] leading-8 tracking-[0.28px] text-[20px]'>{`${FormatPrice(price)}`}</div>
        <Button variant="own" onClick={onClick} disabled={isLoading}>Purchase</Button>
    </div>
  )
}

export default EnrollButton