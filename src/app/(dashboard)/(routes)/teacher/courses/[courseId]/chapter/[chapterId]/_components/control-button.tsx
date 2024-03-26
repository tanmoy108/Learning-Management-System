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
  chapterId: string;
  courseId: string;
  isPublished: Boolean;
}

const ControlButton = ({
  disabled,
  chapterId,
  courseId,
  isPublished,
}: isCompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

const alertContinue = async()=>{
    const {data} =await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`)
    if(data.success){
        toast.success("Deleted")
        router.push(`/teacher/courses/${courseId}`)
        router.refresh()
    }
}

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Button disabled={!disabled || isLoading}>
            {isPublished ? "Publish" : "Unpublish"}
          </Button>
        </div>
        <div>
        <AlertModal onClickAlert={alertContinue} >
          <Button>
            <Trash className="h-4 w-4" />
          </Button>
          </AlertModal>
        </div>
      </div>
    </>
  );
};

export default ControlButton;
