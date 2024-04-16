'use client'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useSearchTime } from '@/hook/useSearchTime'


const Search = () => {

  const [value,setValue] = useState("")
  const searchValue = useSearchTime(value)
  const pathName = usePathname();
  const searchParam = useSearchParams()
  const router = useRouter()

  const currentCategoryId = searchParam.get("categoryId");

useEffect(()=>{
  const url = qs.stringifyUrl({
    url:pathName,
    query:{
      title:searchValue ,
      categoryId:currentCategoryId
    }
  },{ skipNull: true, skipEmptyString: true })
  router.push(url)

},[searchValue,pathName,router,currentCategoryId])
  return (
    <div>
      <Input onChange={(e)=>setValue(e.target.value)} value={value} type="text" placeholder="Search courses" />
    </div>
  )
}

export default Search