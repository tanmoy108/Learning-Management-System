import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ChapterList from "./chapterList";
import { CourseProgress } from "@/components/courseProgress";
import Image from "next/image";
import Link from "next/link";
interface courseSidebarProps {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
}
const CoursesSidebar = async ({ course, progress }: courseSidebarProps) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className='w-full'>
      <div className='flex pl-8 py-[23px]'>
        <Link href="/">
        <Image src="/logo.png" width={164.638} height={34} alt='logo'/>
        </Link>
       </div>
      <div className="pl-8 py-[23px] text-[16px] font-bold capitalize">{course.title}</div>
     <div className="px-2 text-[12px] font-medium ">
     {
        purchase && <div className="py-3">
        <CourseProgress variant="default" value={progress} />
        </div>
      }
     </div>
      <div className='w-full'>
        {course.chapter.length !== 0 &&
          course.chapter.map((item) => {
            return (
              <ChapterList
                key={item.id}
                id={item.id}
                title={item.title}
                isCompleted={!!item.userProgress?.[0]?.isCompleted}
                isLocked={!item.isFree && !purchase}
                courseId={item.courseId}

              />
            );
          })}
      </div>
    </div>
  );
};

export default CoursesSidebar;
