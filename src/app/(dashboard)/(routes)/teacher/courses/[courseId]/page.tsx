import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-page";
import DescriptionForm from "./_components/description-page";
import ImageForm from "./_components/image-page";

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
  });
  console.log(course);
  if (course?.userId !== userId) return redirect("/");

  const requireField = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFieldLength = requireField.length;
  const completeField = requireField.filter(Boolean).length;

  return (
    <>
      <h1>Course Setup</h1>
      <p>Complete All Fields {`(${completeField}/${totalFieldLength})`}</p>
      <div className="flex gap-x-3 items-center">
        <IconBadge icon={LayoutDashboard} size="sm" />
        <p>Customize your course</p>
      </div>
      <TitleForm courseInfo={course} />
      <DescriptionForm courseInfo={course} />
      <ImageForm courseInfo={course} />
    </>
  );
};

export default SpecificCoursePage;
