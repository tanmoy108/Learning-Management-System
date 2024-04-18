import { GetChapter } from "@/actions/getChapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayers from "../../_components/videoPlayer";
import EnrollButton from "../../_components/enrollButton";
import CourseCompleteButton from "../../_components/courseCompleteButton";
import RichPreview from "@/components/preview";

const ChapterInfo = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  const { chapterId, courseId } = params;

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    // muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await GetChapter({ userId, chapterId, courseId });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase; // purchase=null !purchase = true if null
  const completeOnEnd = !!purchase && !userProgress?.isCompleted; //userProgress?.isCompleted=true if null
  return (
    <div>
      {isLocked ? (
        <div className="bg-[#f6ff78] mb-5 px-5 text-[#414141] font-medium text-[14px] leading-8 capitalize">
          this chapter not purchased
        </div>
      ) : (
        <div className="bg-[#f6ff78] mb-5 px-5 text-[#414141] font-medium text-[14px] leading-8 capitalize">
          this chapter is free
        </div>
      )}
      <div className="w-full md:w-[90%] flex flex-col gap-3">
        <div className="text-[#414141] text-[18px] font-bold leading-8 tracking-[0.2px] capitalize">
          Chapter Name: {chapter.title}
        </div>

        <div className="w-[70%]">
          <VideoPlayers
            // playbackId={muxData?.playBackId!}
            courseId={courseId}
            chapterId={chapterId}
            nextChapterId={nextChapter?.id!}
            title={chapter.title}
            videoUrl={chapter.videoUrl!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
        <div className="text-[#414141] text-[18px] font-medium leading-8">
          Chapter Description
        </div>
        <div className="text-[#666666] text-[12px] font-normal leading-5 xs:w-full md:w-[70%]">
         {chapter.description && <RichPreview value={chapter.description} />}
        </div>
        </div>
        <div>
        <div className="text-[#414141] text-[18px] font-medium leading-8">
          {!!attachments.length && "Chapter Attachments"}
        </div>
        <ol className="text-[#1786B6] list-decimal pl-3 flex flex-col gap-2 underline text-[14px] font-normal leading-5 xs:w-full md:w-[70%]">
        {!!attachments.length &&
          attachments.map((item) => {
            return (
              <li key={item.id}>
                <a href={item.url} key={item.id} target="_blank">
                {item.name}
              </a>
              </li>
            );
          })}
        </ol>
        </div>

        <div className="my-5">
        {purchase ? (
          <CourseCompleteButton
            courseId={params.courseId}
            chapterId={params.chapterId}
            nextChapterId={nextChapter?.id!}
            isComplete={userProgress?.isCompleted}
          />
        ) : (
          <EnrollButton price={course.price!} courseId={courseId} />
        )}
        </div>
      </div>
    </div>
  );
};

export default ChapterInfo;
