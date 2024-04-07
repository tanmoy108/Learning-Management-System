import { GetChapter } from "@/actions/getChapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "../../_components/videoPlayer";
import EnrollButton from "../../_components/enrollButton";
import CourseCompleteButton from "../../_components/courseCompleteButton";

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
    purchase,
  } = await GetChapter({ userId, chapterId, courseId });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase; // purchase=null !purchase = true if null
  const completeOnEnd = !!purchase && !userProgress?.isCompleted; //userProgress?.isCompleted=true if null
  return (
    <div>
      {isLocked ? <div>chapter not purchased</div> : <div>chapter is free</div>}
      <VideoPlayer
        playbackId={muxData?.playBackId!}
        courseId={courseId}
        chapterId={chapterId}
        nextChapterId={nextChapter?.id!}
        title={chapter.title}
        isLocked={isLocked}
        completeOnEnd={completeOnEnd}
      />

      <div>{chapter.title}</div>
      {
        purchase ? <CourseCompleteButton courseId={params.courseId} chapterId={params.chapterId} nextChapterId={nextChapter?.id!} isComplete={userProgress?.isCompleted}/>:<EnrollButton price={course.price!} courseId={courseId} />
      }
      {
        !!attachments.length && attachments.map((item)=>{
     
        return(
          <a
          href={
            item.url
          }
          key={item.id}
          target="_blank"
          >
            {item.name}
          </a>
        )
          
        })
      }
    </div>
  );
};

export default ChapterInfo;
