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
  courseInfo: {
    title: string;
    id: string;
  };
}
const TitleForm = ({ courseInfo }: obj) => {
    const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: courseInfo.title,
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
    const {data} = await axios.patch(`/api/courses/${courseInfo.id}`,values)
    toogleEditing()
    if(data.success){
        toast.success("Updated")
        router.refresh()
    }
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <div className="bg-orange-100">
      <div className="flex items-center">
        <h2>Course Title</h2>
        <Button onClick={toogleEditing} variant={"ghost"}>
          {!isEditing ? <>Edit Title</> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && <p>{courseInfo.title}</p>}
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
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
