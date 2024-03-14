'use client'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import {cn} from "@/lib/utils"

interface propsValue {
    icon:LucideIcon,
    label:string,
    href:string
}

const SideItem = ({icon:Icon,label,href}:propsValue) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === "/" && href==="/") || pathname === href || pathname?.startsWith(`${href}/`) 

   const  handleClick = () =>{
    router.push(href)
   } 
  return (
    <button type='button' className={cn("pl-3 flex items-center gap-x-2 transition-all",isActive && "bg-[#c8e9dfb9] " )} onClick={handleClick}>
       <div className='w-full flex items-center gap-x-2  py-2'> 
       <Icon size={20} />
        {label}
       </div>
       <div className={cn('opacity-0 border-2 border-[#045041] h-10 transition-all',isActive && 'opacity-100')}/>
    </button>
  )
}

export default SideItem