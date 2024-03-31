import React from 'react'
import { db } from '@/lib/db'
import CategoriesParents from '@/app/(dashboard)/(routes)/search/_components/categoriesParent'
import CourseList from '@/app/(dashboard)/(routes)/search/_components/courseList';
import Search from '@/components/search';
import { GetCourses } from '@/actions/getCourse';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface searchParamsProps{
  searchParams:{
    title:string,
    categoryId:string
  }
}

const SearchPage =async ({searchParams}:searchParamsProps) => {
  console.log("ss",searchParams)

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const Category = await db.category.findMany({
    orderBy:{
      name:"asc"
    }
  })

  const getCourse = await GetCourses({
    userId:userId,
   ...searchParams
  })
  console.log("getCourse",getCourse)
  return (
    <>
    <div className='block md:hidden'>
    <Search/>
    </div>
    <CategoriesParents item={Category} />
    <CourseList item={getCourse}/>
    </>
  )
}

export default SearchPage