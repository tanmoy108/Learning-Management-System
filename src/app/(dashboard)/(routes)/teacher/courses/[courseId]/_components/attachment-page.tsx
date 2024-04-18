"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/file-upload";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

const formSchema = z.object({
  url: z.string().min(2),
});

interface obj {
  courseInfo: Course & { attachments: Attachment[] };
}
const AttachmentForm = ({ courseInfo }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.post(
      `/api/courses/${courseInfo.id}/attachments`,
      values
    );
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeleteItem(id);
      const { data } = await axios.delete(
        `/api/courses/${courseInfo.id}/attachments/${id}`
      );
      toast.success("Deleted");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteItem(null);
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="text-[#414141] text-[16px] font-medium leading-8">
          Attachment
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {isEditing && <>Cancel</>}
          {!isEditing && <>Add attachemnt</>}
        </Button>
      </div>
      {!isEditing && courseInfo.attachments.length === 0 && (
        <div className="text-[#414141] font-light text-[14px] leading-8">
          Not attachment attached
        </div>
      )}
      {!isEditing && courseInfo.attachments.length > 0 && (
        <div>
          {courseInfo.attachments.map((attachmentItem) => {
            return (
              <div key={attachmentItem.id} className="flex justify-around">
                <div className="text-[#414141] font-light text-[14px] leading-8">
                  {attachmentItem.name}
                </div>
                {deleteItem === attachmentItem.id && (
                  <div>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {deleteItem !== attachmentItem.id && (
                  <button
                    onClick={() => onDelete(attachmentItem.id)}
                    className="ml-auto hover:opacity-75 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {isEditing && (
        <FileUpload
          onChange={(url) => {
            if (url) {
              onSubmit({ url: url });
            }
          }}
          endpoint="courseAttachment"
        />
      )}
    </div>
  );
};

export default AttachmentForm;
