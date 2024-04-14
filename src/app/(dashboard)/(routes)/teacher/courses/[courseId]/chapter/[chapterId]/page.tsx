import Link from "next/link";
import React from "react";
import ChapterTitleForm from "./_components/chapter-title-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterIsFreeForm from "./_components/chapter-isfree-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import ControlButton from "./_components/control-button";
import { Button } from "@/components/ui/button";

const Chapter = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  console.log(params);
  const { userId } = auth();
  if (!userId) return redirect("/");

  const findCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
  });

  if (!findCourse) return redirect("/");
  const findChapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!findChapter) return redirect("/");

  const requiredField = [
    findChapter.title,
    findChapter.description,
    findChapter.videoUrl,
  ];

  const requiredFieldLength = requiredField.length;
  const completeFieldLength = requiredField.filter(Boolean).length;
  const isComplete = requiredField.every(Boolean);

  return (
    <div className="w-full md:w-[90%]">
      <Link href={`/teacher/courses/${params.courseId}`}>
        <Button variant={"secondary"}>Back</Button>
      </Link>
      <div className="flex xs:flex-col md:flex-row md:justify-between md:items-center my-4">
        <div>
          <div className="text-[#414141] text-[20px] font-bold leading-[32px] tracking-[1.8px]">
            Chapter Setup
          </div>
          <div className="text-[#414141] text-[16px] font-vold leading-[32px] tracking-[-0.16px]">
            Complete All Fields{" "}
            {`(${completeFieldLength}/${requiredFieldLength})`}
          </div>
        </div>
        <div className="mt-5">
          <ControlButton
            disabled={isComplete}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={findChapter.isPublished}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-x-2">
        <div className="w-[90%] md:w-[50%] flex flex-col gap-y-5">
          <ChapterTitleForm
            chapterInfo={findChapter}
            courseId={params.courseId}
          />
          <ChapterDescriptionForm
            chapterInfo={findChapter}
            courseId={params.courseId}
          />
          <ChapterIsFreeForm
            chapterInfo={findChapter}
            courseId={params.courseId}
          />
        </div>
        <div className="w-[90%] md:w-[45%] flex flex-col gap-y-5">
          <ChapterVideoForm
            chapterInfo={findChapter}
            courseId={params.courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
