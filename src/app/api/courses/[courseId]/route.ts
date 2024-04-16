import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  try {
    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    const values = await req.json();
    console.log("route patch", values);
    const findCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json({ findCourse, success: true }, { status: 200 });
  } catch (error) {
    console.log("api/courses/[courseId]", error);
    return new NextResponse("something error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  try {
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
      include: {
        chapter: true
      },
    });
    if (!findCourse)
      return NextResponse.json(
        { data: "not found", success: false },
        { status: 401 }
      );

    // for (const chapter of findCourse?.chapter) {
    //   if (chapter.muxData?.assetId) {
    //     await video.assets.delete(chapter?.muxData?.assetId);
    //   }
    // }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(
      { ...deletedCourse, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("api/courses/[courseId]", error);
    return new NextResponse("something error", { status: 500 });
  }
}
