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
  const router = useRouter();

  const alertContinue = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `/api/courses/${courseId}/chapter/${chapterId}`
      );
      if (data.success) {
        toast.success("Deleted");
        router.push(`/teacher/courses/${courseId}`);
        router.refresh();
      }
    } catch (error) {
      console.log("error in control button chapter", error);
    } finally {
      setIsLoading(false);
    }
  };

  const publishAction = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        const { data } = await axios.patch(
          `/api/courses/${courseId}/chapter/${chapterId}/unpublish`
        );
        if (data.success) {
          toast.success("Successfully unpublished");
        }
      } else {
        const { data } = await axios.patch(
          `/api/courses/${courseId}/chapter/${chapterId}/publish`
        );
        if (data.success) {
          toast.success("Successfully published");
        }
      }
      router.refresh();
    } catch (error) {
      console.log("error in control button chapter", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Button onClick={publishAction} disabled={!disabled || isLoading}>
            {isPublished ? "UnPublish" : "Publish"}
          </Button>
        </div>
        <div>
          <AlertModal onClickAlert={alertContinue}>
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
