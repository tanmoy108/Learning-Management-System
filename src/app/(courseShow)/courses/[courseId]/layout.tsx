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

  if (!findCourse) return redirect("/");

  const getProgressValueofUser = await GetProgress(userId, params.courseId);

  return (
    <>
      <div className="w-full h-[80px] bg-[#fff] shadow-own z-40 flex px-8 fixed">
        <Navbar />
      </div>
      <div className="bg-[#fff] border-r h-full w-[250px] z-50 inset-y-0 hidden lg:flex flex-col fixed">
        <CoursesSidebar course={findCourse} progress={getProgressValueofUser} />
      </div>
      <div className="px-5 lg:pl-[280px] pt-[100px]">{children}</div>
    </>
  );
};

export default CoursesLayout;
