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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChaptersList } from "./chapter-list";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

interface obj {
  courseInfo: Course & { chapter: Chapter[] };
}
const ChapterForm = ({ courseInfo }: obj) => {
  const router = useRouter();
  const [isCreating, setisCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toogleEditing = () => {
    setisCreating((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.post(
      `/api/courses/${courseInfo.id}/chapter`,
      values
    );
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseInfo.id}/chapter/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseInfo.id}/chapter/${id}`);
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <div>
      <div className="flex items-center">
        <div className="text-[#414141] text-[16px] font-medium leading-8">
        Course Chapters
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {!isCreating ? <>Add Chapter</> : <>Cancel</>}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g. chapter name"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"own"} disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className=
            "text-[#414141] font-light text-[14px] leading-8"
        >
          {!courseInfo.chapter.length && "No chapters"}
        </div>
      )}

      <ChaptersList
      onEdit={onEdit}
      onReorder={onReorder}
      items={courseInfo.chapter || []}
      />

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
