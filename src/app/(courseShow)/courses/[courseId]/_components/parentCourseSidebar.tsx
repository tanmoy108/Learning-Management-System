import React from 'react'
import CoursesSidebar from './coursesSidebar'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { GetProgress } from '@/actions/getProgress';

const ParentCourseSidebar = async({courseId}:{courseId:string}) => {
    const { userId } = auth();
    if (!userId) return redirect("/");
  
    const findCourse = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapter: {
          where: {
            isPublished: true,
          },
          include: {
            userProgress: {
              where: {
                userId,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
  
    if (!findCourse) return redirect("/");
    const getProgressValueofUser = await GetProgress(userId, courseId);
  return (
    <div className="h-full w-full z-50 inset-y-0 block lg:hidden ">
        <CoursesSidebar course={findCourse} progress={getProgressValueofUser} />
      </div>
  )
}

export default ParentCourseSidebar