'use client'
import { Category } from "@prisma/client"
import { IconType } from "react-icons"
import {FcAlphabeticalSortingAz,FcAddImage,FcAnswers,FcAddDatabase,FcBiomass} from "react-icons/fc"
import CategoriesItem from "./categoriesItem"
interface categoryProps{
  item:Category[]
}

const iconMap : Record<Category["name"],IconType>={
  "Computer Science" :FcAddDatabase ,
  "Artificial Intelligence":FcAnswers,
  "Mathematic":FcAddImage,
  "Machine Learning":FcAlphabeticalSortingAz,
  "Chemistry":FcBiomass
}

const CategoriesParents = ({item}:categoryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5  gap-x-3">
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