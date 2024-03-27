import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
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


    const updateCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(
      { ...updateCourse, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("api/courses/[courseId]", error);
    return new NextResponse("something error", { status: 500 });
  }
}
