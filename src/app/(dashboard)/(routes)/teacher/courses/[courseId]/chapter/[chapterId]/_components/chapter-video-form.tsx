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
    console.log(data);
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }
  return (
    <div>
      <div className="flex items-center">
        <div className="text-[#414141] text-[16px] font-medium leading-8">
          Chapter Video
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {isEditing && <>Cancel</>}
          {!isEditing && !chapterInfo.videoUrl && <>Add Video</>}
          {!isEditing && chapterInfo.videoUrl && <>Edit Video</>}
        </Button>
      </div>
      {!isEditing &&
        (!chapterInfo.videoUrl ? (
          <div className="h-40 flex justify-center items-center bg-[#374246] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 13L21.223 16.482C21.2983 16.5321 21.3858 16.5609 21.4761 16.5652C21.5664 16.5695 21.6563 16.5493 21.736 16.5066C21.8157 16.4639 21.8824 16.4004 21.9289 16.3228C21.9754 16.2452 22 16.1565 22 16.066V7.87002C22 7.78204 21.9768 7.69562 21.9328 7.61947C21.8887 7.54332 21.8253 7.48014 21.7491 7.43632C21.6728 7.3925 21.5863 7.36958 21.4983 7.36988C21.4103 7.37017 21.324 7.39368 21.248 7.43802L16 10.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H14C15.1046 18 16 17.1046 16 16V8C16 6.89543 15.1046 6 14 6Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div className="h-40 w-full rounded-md">
            <MuxPlayer playbackId={chapterInfo?.muxData?.playBackId || ""} />
          </div>
        ))}
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
