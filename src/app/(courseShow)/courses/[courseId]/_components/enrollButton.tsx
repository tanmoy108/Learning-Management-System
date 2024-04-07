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
        <Button onClick={onClick} disabled={isLoading}>{`Buy with ${FormatPrice(price)}`}</Button>
    </div>
  )
}

export default EnrollButton