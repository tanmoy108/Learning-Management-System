'use client'
import { Category } from "@prisma/client"
import { IconType } from "react-icons"
import {FcAlphabeticalSortingAz,FcAddImage,FcAnswers,FcAddDatabase} from "react-icons/fc"
import CategoriesItem from "./categoriesItem"
interface categoryProps{
  item:Category[]
}

const iconMap : Record<Category["name"],IconType>={
  "Computer Science" :FcAddDatabase ,
  "Artificial Intelligence":FcAnswers,
  "Mathematic":FcAddImage,
  "Machience Learning":FcAlphabeticalSortingAz
}

const CategoriesParents = ({item}:categoryProps) => {
  return (
    <div className="flex items-center gap-x-3">
      {
        item.map((category)=>{
          return(
            <CategoriesItem key={category.id} itemName={category.name} itemId={category.id} itemIcon={iconMap[category.name]} />
          )
        })
      }
    </div>
  )
}

export default CategoriesParents