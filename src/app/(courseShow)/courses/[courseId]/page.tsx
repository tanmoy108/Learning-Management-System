import { db } from '@/lib/db'
import { redirect } from 'next/navigation'


const CoursesItemPage = async ({params}:{params:{courseId:string}}) => {

  const getCourse = await db.course.findUnique({
    where:{
      id:params.courseId
    },
    include:{
      chapter:{
        where:{
          isPublished:true
        },
        orderBy:{
          position:"asc"
        }
      }
    }
  })


  if(!getCourse) redirect("/")
  
  return redirect(`/courses/${params.courseId}/chapters/${getCourse?.chapter[0].id}`)
}
export default CoursesItemPage