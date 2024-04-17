"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${data?.id}`);
      toast.success("Course Created");
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div
      className="flex justify-center"
      style={{ height: `calc(100vh - 90px)` }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center justify-center "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col  items-center">
                  <Image
                    alt="form logo"
                    src="/create_form.png"
                    width={140}
                    height={123}
                  />
                  <FormLabel>
                    <div className="text-[#414141] text-[18px] font-bold tracking-[0.54px] leading-8">
                      Enter Course Name
                    </div>
                  </FormLabel>
                  <FormDescription>
                    <div className="text-[#414141] text-[14px] font-normal leading-8">
                      This is name wii be show in the course list
                    </div>
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="ex: Nextjs tutorial" {...field} />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            variant="ownfull"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
