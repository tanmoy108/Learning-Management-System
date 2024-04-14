"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/editor";
import { Chapter } from "@prisma/client";
import RichPreview from "@/components/preview";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

interface obj {
  chapterInfo: Chapter;
  courseId: string;
}
const ChapterDescriptionForm = ({ chapterInfo, courseId }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: chapterInfo.description ? chapterInfo.description : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.patch(`/api/courses/${courseId}/chapter/${chapterInfo.id}`, values);
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <div>
      <div className="flex items-center">
      <div className="text-[#414141] text-[16px] font-medium leading-8">
        Chapter Description
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {!isEditing ? <>Edit</> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && !chapterInfo?.description && (<div className="text-[#414141] font-light text-[14px] leading-8">No description</div>)}
      {!isEditing && chapterInfo?.description && (<RichPreview value={chapterInfo?.description}/>)}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                console.log("field", { ...field });
                return (
                  <FormItem>
                    <FormControl>
                      <RichEditor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button variant={"own"} type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
