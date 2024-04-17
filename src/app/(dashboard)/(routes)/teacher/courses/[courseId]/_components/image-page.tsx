"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import FileUpload from "@/components/file-upload";
import Image from "next/image";

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "image is required",
  }),
});

interface obj {
  courseInfo: Course;
}
const ImageForm = ({ courseInfo }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.patch(`/api/courses/${courseInfo.id}`, values);
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
          Course Banner
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {isEditing && <>Cancel</>}
          {!isEditing && !courseInfo.imageUrl && <>Add Image</>}
          {!isEditing && courseInfo.imageUrl && <>Edit Image</>}
        </Button>
      </div>
      {!isEditing &&
        (!courseInfo.imageUrl ? (
          <div className="h-40 flex justify-center items-center bg-[#374246] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 42 42"
              fill="none"
            >
              <path
                d="M33.25 5.25H8.75C6.817 5.25 5.25 6.817 5.25 8.75V33.25C5.25 35.183 6.817 36.75 8.75 36.75H33.25C35.183 36.75 36.75 35.183 36.75 33.25V8.75C36.75 6.817 35.183 5.25 33.25 5.25Z"
                stroke="#FDFDFD"
                stroke-width="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.75 19.25C17.683 19.25 19.25 17.683 19.25 15.75C19.25 13.817 17.683 12.25 15.75 12.25C13.817 12.25 12.25 13.817 12.25 15.75C12.25 17.683 13.817 19.25 15.75 19.25Z"
                stroke="#FDFDFD"
                stroke-width="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.75 26.25L31.3495 20.8495C30.6932 20.1933 29.8031 19.8247 28.875 19.8247C27.9469 19.8247 27.0568 20.1933 26.4005 20.8495L10.5 36.75"
                stroke="#FDFDFD"
                stroke-width="2"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        ) : (
          <Image
            src={courseInfo.imageUrl}
            alt="upload"
            width={300}
            height={100}
            className="object-cover"
          />
        ))}
      {isEditing && (
        <FileUpload
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
          endpoint="courseImage"
        />
      )}
    </div>
  );
};

export default ImageForm;
