import { GetChapter } from "@/actions/getChapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "../../_components/videoPlayer";

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
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase
  } = await GetChapter({ userId, chapterId, courseId });

  if (!chapter || !course) {
    return redirect("/")
  }


  const isLocked = !chapter.isFree && !purchase; // purchase=null !purchase = true if null
  const completeOnEnd = !!purchase && !userProgress?.isCompleted; //userProgress?.isCompleted=true if null
  return(
    <div>
      {
        isLocked ?<div>chapter not purchased</div>:<div>chapter is free</div>
      }
      <VideoPlayer
      playbackId={muxData?.playBackId!}
      />
    </div>
  )
};

export default ChapterInfo;
