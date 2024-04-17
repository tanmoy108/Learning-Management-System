import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-page";
import DescriptionForm from "./_components/description-page";
import ImageForm from "./_components/image-page";
import CategoryForm from "./_components/category-page";
import PriceForm from "./_components/price-page";
import AttachmentForm from "./_components/attachment-page";
import ChapterForm from "./_components/chapter-page";
import ControlButtonCourse from "./_components/control-button";

const SpecificCoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapter: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (course?.userId !== userId) return redirect("/");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requireField = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapter.some((chapter) => chapter.isPublished),
  ];
  const totalFieldLength = requireField.length;
  const completeField = requireField.filter(Boolean).length;
  const isComplete = requireField.every(Boolean);

  return (
    <div className="w-full md:w-[90%]">
      <div className="flex xs:flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <div className="text-[#414141] text-[20px] font-bold leading-[32px] tracking-[1.8px]">
            Course Setup
          </div>
          <div className="text-[#414141] text-[16px] font-vold leading-[32px] tracking-[-0.16px]">
            Complete All Fields ({`(${completeField}/${totalFieldLength})`})
          </div>
        </div>
        <div className="mt-5">
          <ControlButtonCourse
            disabled={isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
      </div>

      {/* <div className="flex gap-x-3 items-center">
        <IconBadge icon={LayoutDashboard} size="sm" />
        <p>Customize your course</p>
      </div> */}
      <div className="flex flex-col md:flex-row justify-between gap-x-2">
        <div className="w-[90%] md:w-[50%] flex flex-col gap-y-5">
          <TitleForm courseInfo={course} />
          <DescriptionForm courseInfo={course} />
          <ImageForm courseInfo={course} />
          <CategoryForm
            courseInfo={course}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="w-[90%] md:w-[45%] flex flex-col gap-y-5">
          <PriceForm courseInfo={course} />
          <AttachmentForm courseInfo={course} />
          <ChapterForm courseInfo={course} />
        </div>
      </div>
    </div>
  );
};

export default SpecificCoursePage;
