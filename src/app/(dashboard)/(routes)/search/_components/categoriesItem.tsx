'use client'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"
import qs from "query-string"
import { cn } from "@/lib/utils"

interface categoryItemProps{
  itemName:string,
  itemId:string,
  itemIcon:IconType
}

const CategoriesItem = ({itemName,itemId,itemIcon:Icon}:categoryItemProps) => {
  
  const pathName = usePathname();
  const searchParam = useSearchParams()
  const router = useRouter()

  const currentCategoryId = searchParam.get("categoryId");
  const currentTitle = searchParam.get("title");
  const isSelected = currentCategoryId === itemId;
  
  const onAction = ()=>{
    const url = qs.stringifyUrl({
      url:pathName,
      query:{
        title:itemName,
        categoryId:isSelected ? null : itemId
      }
    },{ skipNull: true, skipEmptyString: true })
    router.push(url)
    }

  return (
    <div className="flex items-center gap-x-3">
     <button type="button" className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )} onClick={onAction} >
     {Icon && <Icon size={20}/>}
      <div className="truncate">
        {itemName}
      </div>
     </button>
    </div>
  )
}

export default CategoriesItem