"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl, FormField,
  FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

interface obj {
  chapterInfo:{
    id:string,
    title:string
  },
  courseId:string
}
const ChapterTitleForm = ({ chapterInfo,courseId }: obj) => {
    const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: " ",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
    const {data} = await axios.patch(`/api/courses/${courseId}/chapter/${chapterInfo.id}`,values)
    toogleEditing()
    if(data.success){
        toast.success("Updated")
        router.refresh()
    }
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <div>
      <div className="flex items-center">
      <div className="text-[#414141] text-[16px] font-medium leading-8">
        Chapter Title
        </div>
        <Button onClick={toogleEditing} variant={"ownedit"} size="ownsize">
          {!isEditing ? <>Edit Title</> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && <div className="text-[#414141] font-light text-[14px] leading-8">{chapterInfo.title}</div>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

export default ChapterTitleForm;
