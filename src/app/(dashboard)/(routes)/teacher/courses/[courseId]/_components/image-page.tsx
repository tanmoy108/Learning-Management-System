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
    <div className="bg-orange-100">
      <div className="flex items-center">
        <h2>Course imageUrl</h2>
        <Button onClick={toogleEditing} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !courseInfo.imageUrl && <>Add Image</>}
          {!isEditing && courseInfo.imageUrl && <>Edit Image</>}
        </Button>
      </div>
      {!isEditing &&
        (!courseInfo.imageUrl ? (
          <div className="h-20  bg-slate-400"></div>
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
            console.log("UUrrll: ",url)
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
