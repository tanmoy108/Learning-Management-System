"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

const formSchema = z.object({
  videoUrl: z.string().min(2, {
    message: "image is required",
  }),
});

interface obj {
  chapterInfo: Chapter & { muxData?: MuxData | null };
  courseId: string;
}
const ChapterVideoForm = ({ chapterInfo, courseId }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.patch(
      `/api/courses/${courseId}/chapter/${chapterInfo.id}`,
      values
    );
    console.log(data)
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }
  return (
    <div className="bg-orange-100">
      <div className="flex items-center">
        <h2>Chapter Video</h2>
        <Button onClick={toogleEditing} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !chapterInfo.videoUrl && <>Add Video</>}
          {!isEditing && chapterInfo.videoUrl && <>Edit Video</>}
        </Button>
      </div>
      {!isEditing &&
        (!chapterInfo.videoUrl ? (
          <div className="h-20  bg-slate-400"></div>
        ) : (
          <MuxPlayer playbackId={chapterInfo?.muxData?.playBackId || ""} />
        )||<p>here will be video player, your free video player is expiered</p>)}
      {isEditing && (
        <FileUpload
          onChange={(url) => {
            console.log("UUrrll: ", url);
            if (url) {
              onSubmit({ videoUrl: url });
            }
          }}
          endpoint="chapterVideo"
        />
      )}
    </div>
  );
};

export default ChapterVideoForm;
