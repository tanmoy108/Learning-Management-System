"use client";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";

interface videoPlayerProps {
  // playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId: string;
  title: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  videoUrl:string
}

const VideoPlayers = ({
  // playbackId,
  courseId,
  chapterId,
  nextChapterId,
  title,
  isLocked,
  completeOnEnd,
  videoUrl
}: videoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const onEnd = async () => {
    try {
      const { data } = await axios.put(
        `/api/courses/${courseId}/chapter/${chapterId}/progress`,
        {
          isComplete: true,
        }
      );
      if (data.success) {
        if (!nextChapterId) {
          toast.success("congratulation, you complete whole course");
        }
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center w-5 h-6 bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center w-5 h-6 bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer playing={true} controls={true}
        pip={true} stopOnUnmount={false} width={640} height={360} url={videoUrl} onPlay={() => setIsReady(true)}
          onEnded={onEnd} /> 
        // <MuxPlayer
        //   title={title}
        //   className={cn(!isReady && "hidden w-5 h-6")}
        //   onCanPlay={() => setIsReady(true)}
        //   onEnded={onEnd}
        //   autoPlay
        //   playbackId={playbackId}
        // />
      )}
    </div>
  );
};

export default VideoPlayers;
