import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ChapterList from "./chapterList";
import { CourseProgress } from "@/components/courseProgress";
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
    <div>
      <div>{course.title}</div>
      {
        purchase && <div className="py-3">
        <CourseProgress variant="success" value={progress} />
        </div>
      }
      <div>
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
