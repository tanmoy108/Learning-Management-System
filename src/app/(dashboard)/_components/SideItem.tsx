'use client'
import { usePathname, useRouter } from 'next/navigation'
import {cn} from "@/lib/utils"

interface propsValue {
    icon:string,
    label:string,
    href:string
}

const SideItem = ({icon,label,href}:propsValue) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === "/" && href==="/") || pathname === href || pathname?.startsWith(`${href}/`) 

   const  handleClick = () =>{
    router.push(href)
   } 
  return (
    <button type='button' className={cn("pl-8 flex items-center gap-x-3 transition-all",isActive && "bg-[#D8F1EA] " )} onClick={handleClick}>
       <div className='w-full flex items-center gap-x-2  py-2'> 
       <img src={icon} alt={label} />
        {label}
       </div>
       <div className={cn('opacity-0 border-4 border-[#17B686] h-10 transition-all',isActive && 'opacity-100')}/>
    </button>
  )
}

export default SideItem