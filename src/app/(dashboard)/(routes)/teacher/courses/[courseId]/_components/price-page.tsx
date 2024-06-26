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
import { Input } from "@/components/ui/input";
import { FormatPrice } from "@/lib/formatPrice";

const formSchema = z.object({
  price: z.coerce.number()
});

interface obj {
  courseInfo: {
    price: number | null;
    id: string;
  };
}
const PriceForm = ({ courseInfo }: obj) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toogleEditing = () => {
    setIsEditing((previous) => !previous);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: courseInfo.price ? courseInfo.price : undefined,
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
  return (
    <div>
      <div className="flex items-center">
        <div className="text-[#414141] text-[16px] font-medium leading-8">
        Course Price
        </div>
        <Button onClick={toogleEditing} variant="ownedit" size="ownsize">
          {!isEditing ? <>Edit price</> : <>Cancel</>}
        </Button>
      </div>
      {!isEditing && courseInfo?.price && <div className="text-[#414141] font-light text-[14px] leading-8">{FormatPrice(courseInfo?.price)}</div>}
      {/* {!isEditing && !courseInfo?.price && <p>no price</p>} */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Price"
                      disabled={isSubmitting}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="own" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
