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

    const updateChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const findChapterinCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!findChapterinCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({ updateChapter, success: true }, { status: 200 });
  } catch (error) {
    console.log("api/courses/[courseId]", error);
    return new NextResponse("something error", { status: 500 });
  }
}
