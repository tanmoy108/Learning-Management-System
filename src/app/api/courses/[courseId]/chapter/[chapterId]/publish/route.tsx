import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json(
        { data: "Unauthorize", success: false },
        { status: 401 }
      );

    const findCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!findCourse)
      return NextResponse.json(
        { data: "Can't find course", success: false },
        { status: 401 }
      );

      const chapter = await db.chapter.findUnique({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        }
      });

      const muxData = await db.muxData.findUnique({
        where: {
          chapterId: params.chapterId,
        }
      });
  
      if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
        return new NextResponse("Missing required fields", { status: 400 });
      }
  

    const updateChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json({ updateChapter, success: true }, { status: 200 });
  } catch (error) {
    console.log("api/courses/[courseId]", error);
    return new NextResponse("something error", { status: 500 });
  }
}
