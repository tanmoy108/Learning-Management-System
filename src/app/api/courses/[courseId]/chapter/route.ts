import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const value = await req.json();

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

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await db.chapter.create({
      data: {
        ...value,
        courseId: params.courseId,
        position: newPosition,
      },
    });

    if (newChapter)
      return NextResponse.json(
        {
          ...newChapter,
          success: true,
        },
        { status: 201 }
      );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: "Something Error", success: false },
      { status: 500 }
    );
  }
}
