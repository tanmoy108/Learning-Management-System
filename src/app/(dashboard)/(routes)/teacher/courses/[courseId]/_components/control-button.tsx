"use client";
import AlertModal from "@/components/alertModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface isCompleteProps {
  disabled: Boolean;
  courseId: string;
  isPublished: Boolean;
}

const ControlButtonCourse = ({
  disabled,
  courseId,
  isPublished,
}: isCompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

const alertContinue = async()=>{
  try {
    setIsLoading(true)
    const {data} =await axios.delete(`/api/courses/${courseId}`)
    if(data.success){
        toast.success("course Deleted")
        router.push(`/teacher/courses`)
        router.refresh()
    }
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
}

const publishAction = async () => {
  try {
    setIsLoading(true);
    if (isPublished) {
      const { data } = await axios.patch(
        `/api/courses/${courseId}/unpublish`
      );
      if (data.success) {
        toast.success("Successfully unpublished");
      }
    } else {
      const { data } = await axios.patch(
        `/api/courses/${courseId}/publish`
      );
      if (data.success) {
        toast.success("Successfully published");
      }
    }
    router.refresh();
  } catch (error) {
    console.log("error in control button course", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <div className="flex gap-x-3">
        
          <Button variant="own" onClick={publishAction} disabled={!disabled || isLoading}>
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
        
        <div>
        <AlertModal onClickAlert={alertContinue} >
          <Button variant="owndelete" disabled={isLoading} >
            <Trash className="h-4 w-4" />
          </Button>
          </AlertModal>
        </div>
      </div>
    </>
  );
};

export default ControlButtonCourse;
