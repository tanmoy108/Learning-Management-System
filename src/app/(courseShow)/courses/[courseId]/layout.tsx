import { db } from "@/lib/db";
import CoursesSidebar from "./_components/coursesSidebar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { GetProgress } from "@/actions/getProgress";
import Navbar from "@/app/(dashboard)/_components/Navbar";

const CoursesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const findCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
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

  console.log("f",findCourse);
  if (!findCourse) return redirect("/");

  const getProgressValueofUser = await GetProgress(userId,params.courseId)
  console.log("a",getProgressValueofUser)

  return (
    <>
      <div className="w-full h-16 bg-[#fff] border-b flex px-5 fixed">
      <Navbar/>
      </div>
      <div className="bg-[#fff] border-r h-full w-56 z-50 inset-y-0 hidden md:flex flex-col fixed">
        <CoursesSidebar course={findCourse} progress={getProgressValueofUser} />
      </div>
      <div className="px-5 md:pl-56 pt-16">{children}</div>
    </>
  );
};

export default CoursesLayout;
