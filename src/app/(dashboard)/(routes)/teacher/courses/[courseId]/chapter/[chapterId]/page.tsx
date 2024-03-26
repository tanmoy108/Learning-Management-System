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

const Chapter = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  console.log(params);
  const {userId} = auth()
  if(!userId) return redirect("/")

  const findCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId:userId,
    }
  });

  if(!findCourse) return redirect("/")
  const findChapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if(!findChapter) return redirect("/")

  const requiredField = [
    findChapter.title,
    findChapter.description,
    findChapter.videoUrl
  ]

  const requiredFieldLength = requiredField.length;
  const completeFieldLength = requiredField.filter(Boolean).length;
  const isComplete = requiredField.every(Boolean);

  return (
<>
<div>
      <Link href={`/teacher/courses/${params.courseId}`}>
        <div>back</div>
      </Link>
      <p>Complete All Fields {`(${completeFieldLength}/${requiredFieldLength})`}</p>
      <div className="mt-5">
        <ControlButton disabled={isComplete} courseId={params.courseId} chapterId={params.chapterId} isPublished={findChapter.isPublished}/>
      </div>
      <div>chapter {params.chapterId}</div>
      <div>chapter edit</div>
      <ChapterTitleForm
      chapterInfo = {findChapter}
      courseId={params.courseId}
      />
      <ChapterDescriptionForm
       chapterInfo = {findChapter}
       courseId={params.courseId}
      />
      <ChapterIsFreeForm
       chapterInfo = {findChapter}
       courseId={params.courseId}
      />
    </div>
    <div>
    <ChapterVideoForm
       chapterInfo = {findChapter}
       courseId={params.courseId}
      />
    </div>

</>
  );
};

export default Chapter;
