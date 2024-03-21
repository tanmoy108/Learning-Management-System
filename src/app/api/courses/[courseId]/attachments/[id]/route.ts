import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; id: string } }
) {
  try {
    console.log("params::",params)
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const findAttachment = await db.attachment.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!findAttachment)
      return new NextResponse("Can't find attachment", { status: 401 });

    const deleteAttachment = await db.attachment.delete({
      where: {
        id: params.id,
      },
    });
    if (deleteAttachment)
      return NextResponse.json(
        { ...deleteAttachment, succeess: true },
        { status: 200 }
      );
  } catch (error) {
    return new NextResponse("Server Problem", { status: 500 });
  }
}
