"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseCompleteButtonProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isComplete?: boolean;
}

const CourseCompleteButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isComplete,
}: CourseCompleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const Complete = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        `/api/courses/${courseId}/chapter/${chapterId}/progress`,
        {
          isComplete: !isComplete,
        }
      );
     
      if(data.success){
        if (!isComplete && !nextChapterId) {
          toast.success("congratulation, you complete whole course");
        }
        if (!isComplete && nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        router.refresh()
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant={"own"} onClick={Complete} disabled={isLoading}>
      {isComplete ? "Not Completed" : "Mark as Complete"}
    </Button>
  );
};

export default CourseCompleteButton;
