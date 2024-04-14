"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/editor";
import { Chapter } from "@prisma/client";
import RichPreview from "@/components/preview";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  isFree: z.boolean(),
});

interface obj {
  chapterInfo: Chapter;
  courseId: string;
}
const ChapterIsFreeForm = ({ chapterInfo, courseId }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(chapterInfo.isFree),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.patch(
      `/api/courses/${courseId}/chapter/${chapterInfo.id}`,
      values
    );
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
        Is Chapter Free ?
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {!isEditing ? <>Edit </> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && !chapterInfo?.isFree && <div className="text-[#414141] font-light text-[14px] leading-8">The chapter is not free</div>}
      {!isEditing && chapterInfo?.isFree && <div className="text-[#414141] font-light text-[14px] leading-8">The chapter is free</div>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => {
                console.log("field", { ...field });
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Free
                      </FormLabel>
                      <FormDescription>
                       If it is checked that means it is free of cost
                      </FormDescription>
                    </div>
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

export default ChapterIsFreeForm;
