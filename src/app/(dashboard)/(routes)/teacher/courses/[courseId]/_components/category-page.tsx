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
import { Category, Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  categoryId: z.string().min(1)
});

interface obj {
  courseInfo: Course,
 options:{
    label:string,
    value:string
  }[]
}
const CategoryForm = ({ courseInfo,options }: obj) => {
  console.log("category page course: ", courseInfo )
  console.log("category page options: ", options )


  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: courseInfo.categoryId ? courseInfo.categoryId : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await axios.patch(`/api/courses/${courseInfo.id}`, values);
    toogleEditing();
    if (data.success) {
      toast.success("Updated");
      router.refresh();
    }
  }

  const { isSubmitting, isValid } = form.formState;

  const selectedOption = options.find((option)=>option.value === courseInfo.categoryId)

  return (
    <div className="bg-orange-100">
      <div className="flex items-center">
        <h2>Course category</h2>
        <Button onClick={toogleEditing} variant={"ghost"}>
          {!isEditing ? <>Edit category</> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && <p>{selectedOption?.label || `no category`} </p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} value={courseInfo} onChange={(value)=>{
                      console.log(value) 
                      onSubmit({ categoryId: value });
                      }}   />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
