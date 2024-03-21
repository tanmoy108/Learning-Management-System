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
  courseInfo: Course & {attachments:Attachment[]};
}
const AttachmentForm = ({ courseInfo }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteItem,setDeleteItem] = useState<string|null >(null)
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.post(`/api/courses/${courseInfo.id}/attachments`, values);
    toogleEditing();
    console.log(data)
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
   
  }

  const onDelete =async(id:string)=>{
    try {
      setDeleteItem(id)
      const {data} = await axios.delete(`/api/courses/${courseInfo.id}/attachments/${id}`)
      console.log(data)
      toast.success("Deleted");
      router.refresh()

    } catch (error) {

      console.log(error)
      
    }finally{
      setDeleteItem(null)
    }

  }
  return (
    <div className="bg-orange-100">
      <div className="flex items-center">
        <h2>attachment</h2>
        <Button onClick={toogleEditing} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && <>Add attachemnt</>}
        </Button>
      </div>
      {!isEditing && courseInfo.attachments.length === 0 && <p>Not attachment attached</p> }
      {!isEditing && courseInfo.attachments.length > 0 && (
        <div>
          {
          courseInfo.attachments.map((attachmentItem)=>{
            return(
             <div className="flex justify-around">
               <p>{attachmentItem.name}</p>
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
            )
          })
        }
        </div>
      ) }
      {isEditing && (
        <FileUpload
          onChange={(url) => {
            console.log("UUrrll: ",url)
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
